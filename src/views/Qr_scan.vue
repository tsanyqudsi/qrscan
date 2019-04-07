<template lang="pug">
  div
    p( class="error") {{ error }}
    p( class="decode-result") Last result: {{ result }}
    qrcode-stream( @decode="onDecode" @init="onInit")
    div( class="form-group")
      label Full Name :
      d-input( class="form-control" type="text" v-model="fullname" placeholder="Fullname")
    div( class="form-group")
      label Age :
      d-input( class="form-control" type="text" v-model="age" placeholder="Age")
    div( class="form-group")
      div( class="inline fields")
        label Sex :
        div( class="field")
          div( class="ui radio checkbox")
            input( type="radio" value="Male" v-model="sex")
            label Male
        div( class="field")
          div( class="ui radio checkbox")
            input( type="radio" value="Female" v-model="sex")
            label Female
    div( class="form-group")
      label QR Code :
      d-input( class="form-control" type="text" v-model="result" disabled)
    div( class="form-group")
      d-button( class="btn-accent" v-on:click="submitForm()") Submit
  </div>
</template>

<script>
import address from '../address';

export default {
  data () {
    return {
      fullname: '',
      age: '',
      sex: '',
      result: '',
      error: '',
      form: 0
    }
  },

  created: function()
  {
    this.fullname = this.$session.get('user').fullname;
  },

  methods: {
    showIdb() {
      var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

      // Open (or create) the database
      var open = indexedDB.open("QrScanner", 1);

      // Create the schema
      open.onupgradeneeded = function() {
        var db = open.result;
        var store = db.createObjectStore("UserData", {keyPath: "email"});
      };

      open.onsuccess = function() {
        // Start a new transaction
        var db = open.result;
        var tx = db.transaction("UserData", "readwrite");
        var store = tx.objectStore("UserData");
        
        // Query the data
        var getData = store.getAll();

        getData.onsuccess = function() {
            console.log(getData.result);
        };

        // Close the db when the transaction is done
        tx.oncomplete = function() {
            db.close();
        };
      }
    },
    createIdb(input) {
      var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

      // Open (or create) the database
      var open = indexedDB.open("QrScanner", 1);

      // Create the schema
      open.onupgradeneeded = function() {
        var db = open.result;
        var store = db.createObjectStore("UserData", {keyPath: "email"});
      };

      open.onsuccess = function() {
        // Start a new transaction
        var db = open.result;
        var tx = db.transaction("UserData", "readwrite");
        var store = tx.objectStore("UserData");

        // Add some data
        store.put({
          email: input.email, 
          fullname: input.fullname,
          age: input.age,
          sex: input.sex,
          result: input.result
        });
        
        // Query the data
        var getData = store.getAll();
        // var getData = store.get("dyo.pyon@gmail.com");

        getData.onsuccess = function() {
            console.log(getData.result);
        };

        // Close the db when the transaction is done
        tx.oncomplete = function() {
            db.close();
        };
      }
    },

    clearIdb() {
      var open = indexedDB.open("QrScanner", 1);

      open.onsuccess = function() {
        var db = open.result;
        var tx = db.transaction("UserData", "readwrite");
        var objectStore = tx.objectStore("UserData");
        var objectStoreRequest = objectStore.clear();

        objectStoreRequest.onsuccess = function(event) {
          // report the success of our request
          console.log("Object Store Cleared");
        };
      }
    },

    onDecode (result) {
      this.result = result
      this.showForm(result);
    },

    showForm(qr_result) {
      if(qr_result.startsWith("L") || qr_result.startsWith("l")) {
        this.form = 1;
      }
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    },

    submitForm() {
      let postObj = {
        email: this.$session.get('user').email, 
        fullname: this.fullname,
        age: this.age,
        sex: this.sex,
        result: this.result
      };
      this.createIdb(postObj);
      alert("Data Posted");
      this.$router.push('/tables');
      location.reload();
    }
  }
}
</script>