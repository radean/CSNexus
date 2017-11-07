// importing VUE X
import Vue from 'vue';
import Vuex from 'vuex';
// importing Firebase
import * as firebase from 'firebase'


Vue.use(Vuex);


// Storage


export const store = new Vuex.Store({
  state: {
      appinfo : {
        name : 'MCS™ Nexus',
        fullname: 'Merchandiser Control System Nexus',
        author : 'radean',
        authorEmail : 'radeanf@gmail.com',
        developer : 'radean',
        company : 'Vision Direct Marketing',
        version : 'initial',
        status : 'active'
      }
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    // Application Details
    appinfo (state){
      return state.appinfo
    }
  }
});
