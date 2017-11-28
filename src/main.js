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
      apiKey: "AIzaSyDsQvtEgYT_SiYeZ7YXtbAP0MLE1rudkJY",
      authDomain: "bams-e190d.firebaseapp.com",
      databaseURL: "https://bams-e190d.firebaseio.com",
      projectId: "bams-e190d",
      storageBucket: "bams-e190d.appspot.com",
      messagingSenderId: "110309011275"
    });
  }
});
