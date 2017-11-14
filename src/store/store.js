// importing VUE X
import Vue from 'vue';
import Vuex from 'vuex';
// importing Firebase
import * as firebase from 'firebase'


Vue.use(Vuex);


// Storage


export const store = new Vuex.Store({
  state: {
    // App Loading Stats
    userError: false,
    mainLoading: false,
    successFlag: false,
    successMsg: 'Operation Successful',
    // Services Status
    services:{

    },
    // Application meta Information
    appinfo : {
      name : 'MCS™ Nexus',
      fullname: 'Merchandiser Control System Nexus',
      author : 'radean',
      authorEmail : 'radeanf@gmail.com',
      developer : 'radean',
      company : 'Vision Direct Marketing',
      version : 'initial',
      status : 'active'
    },
    // Data
    stores: [],
    storeDetails: [],
    merchandiserReports: [],
  },
  mutations: {
    'SET_STORES'(state, payload){
      state.stores = payload
    },
    'SET_STORE_DETAILS'(state, payload){
      state.storeDetails = payload;
    },
    'SET_MERCHANDISER_REPORTS'(state, payload) {
      state.merchandiserReports = payload
    },
    'SET_MAIN_LOADING'(state, payload){
      state.mainLoading = payload;
    },
    'SET_USER_ERROR'(state, payload){
      state.userError = payload;
    },
    'SET_SUCCESS_MSG'(state, payload){
      state.successFlag = !state.successFlag;
      state.successMsg = payload;
    }
  },
  actions: {
    // Merchandiser Registration
    merchandiserReg({commit}, payload){
      // Start Loading
      commit('SET_MAIN_LOADING', true);
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
            };
            // End Loading
           commit('SET_MAIN_LOADING', false);
           // Sending Success Message
           commit('SET_SUCCESS_MSG', 'Merchandiser Successfully Registered');
            setTimeout(() => {
              commit('SET_SUCCESS_MSG', 'Operation Successful');
            },4000);
           console.log('Registerd')
          }
        ).catch(
        error => {
          commit('SET_USER_ERROR', true);
          console.log(error);
          setTimeout(() => {
            commit('SET_USER_ERROR', false);
          },4000)
        }
      )
    },
    // Fetching Data
    shopsListUPD({commit}){
      firebase.database().ref('storedata').on('value', (storelist) => {
        const stores = [];
        const obj = storelist.val();
        for (let key in obj) {
          stores.push({
            id: key,
            name: obj[key].name,
            location: obj[key].location,
          })
        }
        commit('SET_STORES', stores);
      });
    },
    fetchShopDetails({commit, getters}, payload){
      firebase.database().ref('stores').orderByKey().equalTo(payload).once('value', (storedetails) => {
        const storeDetail = getters.storeDetails;
        if(getters.storeDetails.length === 3){
            getters.storeDetails.shift();
        }
        const obj = storedetails.val();
        for (let key in obj) {
          storeDetail.push({
            id: key,
            name: obj[key].name,
            location: obj[key].location
          });
        }
        commit('SET_STORE_DETAILS', storeDetail)
      });
    },

    // Fetch By Merchandiser
    fetchMerchandiserReport({commit},){
      firebase.database().ref('storedata').once('value', (report) => {
        const reports = [];
        const obj = report.val();
        for (let key in obj) {
          reports.push({
            id: key,
            time: obj[key].time,
            name: obj[key].merchandiserName,
            store: obj[key].storename,
            storeId: obj[key].storeid,
            storeImg: obj[key].storePicImgUrl,
          });
        }
        commit('SET_MERCHANDISER_REPORTS', reports)
      });
    }
  },
  getters: {
    // Application Details
    appinfo (state){
      return state.appinfo
    },
    storeList (state){
      return state.stores
    },
    storeDetails (state) {
      return state.storeDetails
    },
    merchandiserReports (state) {
      return state.merchandiserReports
    },
    mainLoading (state){
      return state.mainLoading
    },
    successMsg (state){
      return state.successMsg
    },
    successFlag (state){
      return state.successFlag
    }
  }
});
