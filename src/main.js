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
import lodash from 'lodash';
import VueParticles from 'vue-particles'
import VueColorpicker from 'vue-pop-colorpicker'
import VueProgressBar from 'vue-progressbar'

// Vue Usage
Vue.use(Vuetify);
Vue.use(lodash);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueParticles);
Vue.use(VueColorpicker);
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '8px'
})

// Setting HTTP
// Vue.http.headers.common['Content-Type'] = 'application/json';
// Vue.http.headers.common['Authorization'] = 'key=AIzaSyDOUy35eMYN7woRgGdiRw0ypeShbHMDxgM';

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
    let config = {
        // databaseURL: "https://tasttrial.firebaseio.com",
        // ================================================
        apiKey: "AIzaSyCKJGwsH2vCHTbBYAIa0kSdG3A_JjYdUzU",
        authDomain: "bams-vanilla.firebaseapp.com",
        databaseURL: "https://bams-vanilla.firebaseio.com",
        projectId: "bams-vanilla",
        storageBucket: "bams-vanilla.appspot.com",
        messagingSenderId: "572602321357"
        // apiKey: "AIzaSyD9xMA6OZnafkhfwmCP17VE-FtiDZ_KIGQ",
        // authDomain: "tasttrial.firebaseapp.com",
        // databaseURL: "https://tasttrial.firebaseio.com",
        // projectId: "tasttrial",
        // storageBucket: "tasttrial.appspot.com",
        // messagingSenderId: "328928648457"
    };
    firebase.initializeApp(config);
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
  }
});
