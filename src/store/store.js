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
    loadingState:{
      mainLoading: false,
      compressorLoadingStats: false,
    },
    successFlag: false,
    successMsg: 'Operation Successful',
    // Services Status
    services:{

    },
    // Application meta Information
    appinfo : {
      name : 'BAMS™ Nexus',
      fullname: 'Brand Ambassador Nexus',
      author : 'radean',
      authorEmail : 'radeanf@gmail.com',
      developer : 'radean',
      company : 'Vision Direct Marketing',
      version : 'initial',
      status : true,
      theme: 'red accent-4',
      mode: '',
      broadcast: true,
      subscription: true
    },
    // Data
    unAssignedStores: [],
    stores: [],
    storeDetails: [],
    merchandiserReports: [],
    // Workers List
    // B.A List
    baList: {},
    // Super visor List
    supervisorList: {},
    // usersession
    userinfo: {},
    user: null,
  },
  mutations: {
    setAppConnection (state, payload) {
      state.app.connection = payload;
    },
    setTheme(state, payload){
      state.app.theme = payload;
    },
    setAppHeader(state, payload){
      state.app.header.name = payload.name;
      state.app.header.location = payload.location;
    },
    setMode(state, payload){
      state.app.mode = payload;
    },
    setUser (state, payload){
      state.user = payload;
    },
    setBaList (state, payload){
      state.baList = payload;
    },
    setUserInfo (state, payload){
      state.userinfo = payload;
    },
    'SET_UNASSIGNED_STORES'(state, payload){
      state.unAssignedStores = payload
    },
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
      state.loadingState.mainLoading = payload;
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
    // USER AUTHENTICATION
    userSignUp({commit}, payload){
      // Converting Varialble
      let userID;
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('SET_MAIN_LOADING', true);
          const userInfo = {
            uniqueId: user.uid,
            name: payload.userInfo.name,
            password: payload.password,
            email: payload.email,
            address: payload.userInfo.address,
            role: payload.userInfo.role
          };
          console.log(userInfo);
            return firebase.database().ref('administrator').push(userInfo).then(() => {
            commit('SET_MAIN_LOADING', false);
            commit('SET_SUCCESS_MSG', "Successfuly Sign Up.");
              setTimeout(() => {
                commit('SET_USER_ERROR', false);
              }, 4000)
          }).catch((error) => {
            commit('SET_MAIN_LOADING', false);
            commit('SET_USER_ERROR', false);
            console.log(error)
          })
        }).catch(error => {
          commit('SET_USER_ERROR', true);
          setTimeout(() => {
            commit('SET_USER_ERROR', false);
          }, 4000)
        }
      );
    },
    userSignIn({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebase.auth().onAuthStateChanged(appUser => {
          commit('setUser', appUser)
        })).catch(
        error => {
          commit('SET_USER_ERROR', true);
          console.log(error);
          setTimeout(() => {
            commit('SET_USER_ERROR', false);
          }, 4000)
        })
    },
    // user Log out
    userSignOut({commit}){
      commit('SET_MAIN_LOADING', true);
      firebase.auth().signOut().then(() =>{
        // Setting ApplicationDetails
        let storeData = {
          name: 'BAMS™',
          location: ''
        };
        // setting App Header
        commit('setUserInfo', null);
        commit('setUser', null);
        commit('SET_MAIN_LOADING', false);
      });
    },
    // User Session Check
    userSession({dispatch, commit}){
      // Checking Firebase user
      // dispatch('appStatus');
      firebase.auth().onAuthStateChanged(appUser => {
        if(appUser) {
          // setting Authorization
          commit('setUser', appUser);
          dispatch('subUserInfo');
          // dispatch('appMode');
        }else{
          commit('setUser', null);
          console.log("Not logged in")
        }
      });
    },
    // user information update
    subUserInfo({commit, getters}){
      // Setting Loading
      commit('SET_MAIN_LOADING', true);
      // setting user information
      firebase.database().ref('administrator').orderByChild('uniqueId').equalTo(getters.user.uid).once('value', (user) => {
        let userinfo = {};
        const obj = user.val();
        for (let key in obj) {
          userinfo = {
            uid: obj[key].uniqueId,
            name: obj[key].name,
            email: obj[key].email,
            address: obj[key].address,
            role: obj[key].role
          };
        }
        commit('setUserInfo', userinfo);
        commit('SET_MAIN_LOADING', false);
      });
    },

//     ===================
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
    // Unassigned Stores
    unAssignedStoresListUPD({commit}){
      firebase.database().ref('stores').orderByChild('assign').equalTo('').on('value', (storelist) => {
        const stores = [];
        const obj = storelist.val();
        for (let key in obj) {
          stores.push({
            id: key,
            name: obj[key].name,
            address: obj[key].address,
            city: obj[key].city
          })
        }
        commit('SET_UNASSIGNED_STORES', stores);
      });
    },



    // ========================
    // Employees CRUD
    // Adding New Registration Entries
    // Brand Ambassador PUT
    brandAmbassadorReg({commit}, payload){
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
    // Supervisor PUT
    supervisorReg({commit}, payload){
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
    // Store PUT
    storeReg({commit}, payload){
      // Start Loading
      commit('SET_MAIN_LOADING', true);
      let storeDetails = {
        name: payload.name,
        address: payload.address,
        city: payload.city,
        assign: 'none'
      };
      firebase.database().ref('stores').push(storeDetails).then(() => {
        // End Loading
        commit('SET_MAIN_LOADING', false);
        // Sending Success Message
        commit('SET_SUCCESS_MSG', 'Store Successfully Added');
        setTimeout(() => {
          commit('SET_SUCCESS_MSG', 'Operation Successful');
        },4000);
      }).catch(error => {
        commit('SET_USER_ERROR', true);
          setTimeout(() => {
            commit('SET_USER_ERROR', false);
          },4000)
      });
    },

    // Fetching Store Details
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
    user (state){
      return state.user
    },
    userInfo (state){
      return state.userinfo
    },
    unAssignedStores (state){
      return state.unAssignedStores
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
      return state.loadingState
    },
    successMsg (state){
      return state.successMsg
    },
    successFlag (state){
      return state.successFlag
    }
  }
});
