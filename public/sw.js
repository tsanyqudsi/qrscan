console.log("Hi, I'm Service Worker");

function showIdb(callback) {
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
        // console.log(getData.result);
        if(callback) {
        	return callback(getData.result);
        }
    };

    // Close the db when the transaction is done
    tx.oncomplete = function() {
        db.close();
    };
  }
}

function clearIdb() {
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
}

var cacheFiles = [
  '/',
	'/qrscan',
  '/tables',
	'/index.html',
	'/manifest.json',
	'/favicon.ico',
	'/app.js',
	'/0.js',
	'/1.js',
	'/2.js',
	'/3.js',
	'/4.js'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
    	// Open the cache
	    caches.open("cache-v1").then(function(cache) {
	    	// Add all the default files to the cache
			console.log('[ServiceWorker] Caching cacheFiles');
			return cache.addAll(cacheFiles);
	    })
	);
});

self.addEventListener('activate', function(e) {
    e.waitUntil(
    	// Get all the cache keys (cacheName)
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {

				// If a cached item is saved under a previous cacheName
				if (thisCacheName !== "cache-v1") {

					// Delete that cached file
					console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	);
});

self.addEventListener('fetch', (event) => {
    // Respond to the document with what is returned from 
    
    event.respondWith(

		// 1. Check the cache if a file matching that request is available
        
		caches.match(event.request).then((response) => {
		
			// 2. If it is, respond to the document with the file from the cache		
        	if ( response ) return response 
		
			// 3. If it isn’t, fetch the file from the network and respond to the document with the fetched file
			return  fetch(event.request)
	
		})

    );

});

if (navigator.onLine) {
  console.log('online');
  showIdb(function(result) {
  	var headers = {
  		'Accept': 'application/json',
  		'Content-Type': 'application/json'
  	}
  	fetch('https://qrcode.wearesqood.com:3000/add-bio', {
    // fetch('http://localhost:3000/add-bio', {
  		headers: headers,
  		method: 'POST',
  		body: JSON.stringify(result)
  	}).then(function(response) {
  		console.log('server response', response)
  		if(response.status < 400) {
  			clearIdb();
  		}
  	})
  });
}
