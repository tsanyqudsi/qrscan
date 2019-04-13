/* eslint-disable */
import Vue from 'vue';
import ShardsVue from 'shards-vue';
import SuiVue from 'semantic-ui-vue';
import axios from 'axios';
import VueAxios from 'vue-axios'
import VueSession from 'vue-session';
import VueQrcodeReader from "vue-qrcode-reader";

// Styles
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@/scss/shards-dashboards.scss';
import '@/assets/scss/date-range.scss';

// Core
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

// Layouts
import Default from '@/layouts/Default.vue';
import NonAdmin from '@/layouts/NonAdmin.vue';

ShardsVue.install(Vue);

Vue.component('default-layout', Default);
Vue.component('non-admin-layout',NonAdmin);

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();

Vue.use(VueAxios, axios);
Vue.use(SuiVue);
Vue.use(VueSession);
Vue.use(VueQrcodeReader);

//router authentication
router.beforeEach((to, from, next) => {
    if(to.path.split('/')[1].split('/')[0] == 'admin') {
    	if(localStorage.getItem('user_role') == 'admin') {
    		next();
    	}
    	else {
	    	next({
	        	path: '/not-admin',
	        })
	    }
    }
    else {
    	next();
    }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
