// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import * as firebase from 'firebase'
import VueRouter from 'vue-router';
import { store } from './store/store'
import { routes } from './router';



// Vue Usage
Vue.use(Vuetify);
Vue.use(VueResource);
Vue.use(VueRouter);



Vue.config.productionTip = false;

// Registring Routes
const router = new VueRouter({
  routes,
  mode: 'history'
});



import('../node_modules/vuetify/dist/vuetify.min.css');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  created (){
    firebase.initializeApp({
      apiKey: 'AIzaSyAcSebiuwUnGMtWn5oH8GovxENomLG55Zk',
      authDomain: 'vdmdb-3d8b4.firebaseapp.com',
      databaseURL: 'https://vdmdb-3d8b4.firebaseio.com',
      projectId: 'vdmdb-3d8b4',
      storageBucket: 'gs://vdmdb-3d8b4.appspot.com',
    })
  }
})
