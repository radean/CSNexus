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
      name : 'BAMS™ Emborg Nexus',
      fullname: 'Brand Ambassador Management System Dashboard',
      author : 'radean',
      authorEmail : 'radeanf@gmail.com',
      developer : 'radean',
      company : 'Vision Direct Marketing',
      version : 'beta 0.12zX',
      status : true,
      theme: 'purple accent-4',
      startDate: '4-24-2018',
      endDate: '5-22-2018',
      mode: '',
      broadcast: true,
      subscription: true
    },
    // Data
    totalInterceptions: 0,
    totalPurchases: [],
    totalConversion: 0,
    totalTasteTrial: 0,
    totalSales: 0,
    totalPreviousUserButter: 0,
    totalPreviousUserCheese: 0,
    totalPreviousUserFrozen: 0,
    productCategory: {},
    unAssignedStores: [],
    selectedBa: {},
    recentReports: [],
    // Total Number of Stores
    totalStore: 0,
    stores: [],
    storeDetails: [],
    storeStockReports: [],
    consumerStoreReports: [],
    storeReports: [],
    currentStoreReports: [],
    compileReports: [],
    // Workers List
    // B.A List
    baList: {},
    totalBA: 0,
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
    setTotalInterceptions (state, payload){
      state.totalInterceptions = payload;
    },
    setTotalPurchases (state, payload){
      state.totalPurchases = payload;
    },
    setUser (state, payload){
      state.user = payload;
    },
    setBaList (state, payload){
      state.baList = payload;
    },
    settotalBA (state, payload){
      state.totalBA = payload;
    },
    setTotalConversion (state, payload) {
      state.totalConversion = payload;
    },
    setSelectedBa (state, payload){
      state.selectedBa = payload;
    },
    setConsumerReport (state, payload){
      state.consumerStoreReports = payload;
    },
    setCompileReport (state, payload){
      state.compileReports = payload;
    },
    setTotalStore (state, payload) {
      state.totalStore = payload;
    },
    setTotalTasteTrial (state, payload){
      return state.totalTasteTrial = payload
    },
    setTotalSales (state, payload){
      return state.totalSales = payload
    },
    setTotalPreviousUserButter (state, payload){
      return state.totalPreviousUserButter = payload
    },
    setTotalPreviousUserCheese (state, payload){
        return state.totalPreviousUserCheese= payload
    },
    setTotalPreviousUserFrozen (state, payload){
        return state.totalPreviousUserFrozen= payload
    },
    setProductCategory (state, payload){
      return state.productCategory = payload;
    },
    setStoreReport (state, payload){
      state.storeReports = payload;
    },
    setCurrentStoreReport (state, payload){
      state.currentStoreReports = payload;
    },
    setAllStoreReport (state, payload){
      state.recentReports = payload
    },
    setStockReport (state, payload){
      state.storeStockReports = payload;
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
    // GUI
    setMainLoading({commit}, payload){
        commit('SET_MAIN_LOADING', payload);
    },
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
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function() {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
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
      // dispatch('appStatus');
      firebase.auth().onAuthStateChanged((appUser) => {
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
    subUserInfo({commit, getters, dispatch}){
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
        console.log('inside sub user',userinfo)
        if(userinfo === _.isEmpty({})) {
          console.log('No User Exist');
          commit('SET_USER_ERROR', true);
          setTimeout(() => {
            commit('SET_USER_ERROR', false);
            window.location.reload();
          }, 4000)
          dispatch('userSignOut');
        }
        commit('setUserInfo', userinfo);
        commit('SET_MAIN_LOADING', false);
      })
    },
//     ===================
    // USER UPDATES
    updateSelectedBa({commit, getters},payload){
      // initiate Loading
      console.log("Reached Action");
      commit('SET_MAIN_LOADING', true);
      firebase.database().ref('stores/' + getters.selectedBa.store.id).update({
        assign: 'none'
      }).then(() => {
        return firebase.database().ref('users/' + getters.selectedBa.id + '/').update({
          name: payload.name,
          store: payload.store
        }).then(() => {
          return firebase.database().ref('stores/' + payload.store.id + '/').update({
            assign: getters.selectedBa.uniqueId
          }).then(() => {
            commit('SET_MAIN_LOADING', false);
          })
        });
      })
    },
    //==============
    // DASHBOARD GUI DATA
    // ===================
    fetchTotalInterceptions({commit}){
      // Fetching List of Dates
      firebase.database().ref('storedata').on('value', (report) => {
        // Creating a temporary Variable
        let totalInterceptions = 0;
        report.forEach((childReport) => {
          const obj = childReport.val();
          // reports[currentKey] = new Array;
          for (let key in obj) {
            // Counting Objects Means interceptions
            totalInterceptions += 1;
          }
        });
        commit('setTotalInterceptions', totalInterceptions);
      })
    },
    // ==============
    // Fetching Data
    //   Fetching Total Number of Stores
    // Total Store list
    storeListUPD({commit}){
      commit('SET_MAIN_LOADING', true);
      firebase.database().ref('stores').on('value', (storelist) => {
        const stores = [];
        const obj = storelist.val();
        let totalStores = 0;
        for (let key in obj) {
          stores.push({
            id: key,
            name: obj[key].name,
            address: obj[key].address,
            city: obj[key].city,
          })
          totalStores = totalStores + 1;
        }
        commit('setTotalStore', totalStores)
        commit('SET_MAIN_LOADING', false);
        // console.log(stores);
        commit('SET_STORES', stores);
      });
    },
    // Unassigned Stores
    unAssignedStoresListUPD({commit}){
      firebase.database().ref('stores').orderByChild('assign').equalTo('none').on('value', (storelist) => {
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
    // All B.A list
    //   Feching Total NUmbers of BA
    baListUPD({commit}){
      commit('SET_MAIN_LOADING', true);
      firebase.database().ref('users').once('value', (balist) => {
        const ba = [];
        const obj = balist.val();
        let totalBA = 0;
        for (let key in obj) {
          ba.push({
            id: key,
            name: obj[key].name,
            // storeName: obj[key].store.name,
            store: obj[key].store,
            address: obj[key].address,
            email: obj[key].email,
            uniqueId: obj[key].uniqueId,
          })
            // Adding BA
          totalBA = totalBA + 1;
        }
        commit('SET_MAIN_LOADING', false);
        commit('settotalBA', totalBA);
        commit('setBaList', ba);
      });
    },
    // All B.A list
    fetchSelectedBa({commit}, payload){
      commit('SET_MAIN_LOADING', true);
      firebase.database().ref('users').orderByKey().equalTo(payload).on('value', (baValue) => {
        let ba = {};
        const obj = baValue.val();
         for (let key in obj) {
           ba = ({
             id: key,
             name: obj[key].name,
             store: obj[key].store,
             address: obj[key].address,
             email: obj[key].email,
             uniqueId: obj[key].uniqueId,
           });
         }
        commit('SET_MAIN_LOADING', false);
        commit('setSelectedBa', ba);
      });
    },
    // Fetching Store Details
    fetchShopDetails({commit, getters}, payload){
      commit('SET_MAIN_LOADING', true);
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
        commit('SET_MAIN_LOADING', false);
        commit('SET_STORE_DETAILS', storeDetail)
      });
    },
    // Fetch By ADMIN --ONLY
    fetchStockReports({commit}, payload){
      commit('SET_MAIN_LOADING', true);
      firebase.database().ref('stockdata').orderByChild('date').equalTo(payload.toString()).once('value', (report) => {
        const reports = [];
        const obj = report.val();
        for (let key in obj) {
          reports.push({
            id: key,
            date: obj[key].date,
            // Images
            baPictureUrl: obj[key].baPictureImgUrl,
            storePictureUrl: obj[key].storePicImgUrl,
            shelfPictureUrl: obj[key].shelfPictureImgUrl,
            // Store info
            baName: obj[key].baName,
            interceptions: obj[key].interceptions,
            storeId: obj[key].storeid,
            storeName: obj[key].storename,
            userName: obj[key].userName,
            // Stock Information
            stock : obj[key].soyaSupremeStock
          });
        }
        commit('SET_MAIN_LOADING', false);
        commit('setStockReport', reports)
      });
    },
    // Fetch By ADMIN --ONLY
    fetchConsumerReports({commit}, payload){
      commit('SET_MAIN_LOADING', true);
      firebase.database().ref('storedata/' + payload.date).orderByChild('store/id').equalTo(payload.store).once('value', (report) => {
        const reports = [];
        const obj = report.val();
        for (let key in obj) {
          reports.push({
            id: key,
            // Customer Information
            customerName: obj[key].customerName,
            customerContact: obj[key].customerContact,
            // Store info
            storeName: obj[key].store.name,
            userName: obj[key].userName,
            // Stock Information
            purchased : obj[key].purchased
          });
        }
        commit('SET_MAIN_LOADING', false);
        commit('setConsumerReport', reports)
      });
    },
    // Fetch Store Reports By Campaign
    fetchStoreReports({commit}){
      commit('SET_MAIN_LOADING', true);
      firebase.database().ref('storedata').on('value', (report) => {
        let reports = [];
        let currentKey = null;
        let TotalSales =0;
        let totalConversion = 0;
        let totalTasteTrial = 0;
        // Previous User
        //   For More information i omported all of these text from Node
        //   These are current Competitors of Emborg
        //     competitorButterList: [
        //         'Lurpak', 'Emborg', 'Blueband', 'Nurpur', 'Aseel', 'Mumtaz', 'Other'
        //     ],
        //     competitorCheeseList: [
        //     'Emborg', 'Happy Cow', 'Adams', 'President', 'Lactima', 'Other'
        // ],
        //     competitorFrozenList: [
        //     'Star', 'Fresh & Freeze', 'Other'
        // ],
        let totalPreviousUserButter = {
            Lurpak: 0,
            Emborg: 0,
            Blueband: 0,
            Nurpur: 0,
            Aseel: 0,
            Mumtaz: 0,
            Other: 0
        };
        // Total Consumer of Cheese
        let totalPreviousUserCheese = {
            Emborg: 0,
            HappyCow: 0,
            Adams: 0,
            President: 0,
            Lactima: 0,
            Other: 0
        };
        // Total Consumer of Frozen
        let totalPreviousUserFrozen = {
            Star: 0,
            FreshAndFreeze: 0,
            Other: 0
        };
        let productCategories = {
              BlockCheese: 0,
              Butter: 0,
              BlockCheeseCream: 0,
              CreamFoodService: 0,
              Milk: 0,
              ProcessCheese: 0,
              Shakes: 0,
              ShreddedCheese: 0,
              Fish: 0,
              FrenchFries: 0,
              Fruits: 0,
              Meat: 0,
              SeaFood: 0,
              Vegetable: 0
        };
        // console.log(reports.val)
        report.forEach((childReport) => {
          const obj = childReport.val();
          currentKey = childReport.key;
          // TotalSale
          let Sales = 0;
          // Conversion Variable
          let conversion = 0;
          let tasteTrial = 0
          let pUserButter = '';
          let pUserCheese = '';
          let pUserFrozen = '';
          // reports[currentKey] = new Array;
          for (let key in obj){
            reports.push({
              id: key,
              date: childReport.key,
              // Customer Information
              customerName: obj[key].customerName,
              customerContact: obj[key].customerContact,
              // Conversion
              conversion: obj[key].conversion,
              // Taste Trail
              tasteTrial: obj[key].tasteTrial,
              pUFrozen: obj[key].pUFrozen,
              pUCheese: obj[key].pUCheese,
              pUButter: obj[key].pUButter,
              // Store info
              storeName: obj[key].store.name,
              store: obj[key].store,
              userName: obj[key].userName,
              // Stock Information
              purchased: obj[key].purchased
            });
            // Getting the Number of Previous Butter, Cheese, Frozen Consumers
            // By using Switch statement
            //   Cleaning Non-Entered Data
            if (obj[key].pUButter == '' || obj[key].pUButter == null ){
                pUserButter = 'other'
            }else {
                pUserButter = obj[key].pUButter;
            }
            // Cheese
            if (obj[key].pUCheese == '' || obj[key].pUCheese == null ){
                pUserCheese = 'other'
            }else {
                pUserCheese = obj[key].pUCheese;
            }
            // Frozen
            if (obj[key].pUFrozen == '' || obj[key].pUFrozen == null ){
                pUserFrozen = 'other'
            }else {
                pUserFrozen = obj[key].pUFrozen;
            }
            // After Cleaning We should put them in their suitable slots
            switch(pUserButter) {
                case 'Lurpak':
                    totalPreviousUserButter.Lurpak++;
                    break;
                case 'Emborg':
                    totalPreviousUserButter.Emborg++;
                    break;
                case 'Blueband':
                    totalPreviousUserButter.Blueband++;
                    break;
                case 'Nurpur':
                    totalPreviousUserButter.Nurpur++;
                    break;
                case 'Aseel':
                    totalPreviousUserButter.Aseel++;
                    break;
                case 'Mumtaz':
                    totalPreviousUserButter.Mumtaz++;
                    break;
                case 'Other':
                    totalPreviousUserButter.Other++;
                    break;
                default:
                    totalPreviousUserButter.Other++;
            }
            switch(pUserCheese) {
                case 'Emborg':
                    totalPreviousUserCheese.Emborg++;
                    break;
                case 'Happy Cow':
                    totalPreviousUserCheese.HappyCow++;
                    break;
                case 'Adams':
                    totalPreviousUserCheese.Adams++;
                    break;
                case 'President':
                    totalPreviousUserCheese.President++;
                    break;
                case 'Lactima':
                    totalPreviousUserCheese.Lactima++;
                    break;
                case 'Other':
                    totalPreviousUserCheese.Other++;
                    break;
                default:
                    totalPreviousUserCheese.Other++;
            }
            switch(pUserFrozen) {
                  case 'Star':
                      totalPreviousUserFrozen.Star++;
                      break;
                  case 'Fresh & Freeze':
                      totalPreviousUserFrozen.FreshAndFreeze++;
                      break;
                  case 'Other':
                      totalPreviousUserFrozen.Other++;
                      break;
                  default:
                      totalPreviousUserFrozen.Other++;
            }
            // Calculating total number of unit sale
            let currentSales = obj[key].purchased;
            // Now i am iterating through a Object of Items
            for (let key in currentSales) {
              let toInteger;
                if (currentSales.hasOwnProperty(key)) {
                    toInteger = parseInt(currentSales[key]);
                    Sales = Sales + toInteger;
                }
            }
            // Converting Purchase Data to categories
            // console.log(currentSales);
            let product = '';
            for(let key in currentSales) {
              // if Key lies among product Range
                let Val = parseInt(key);
                let amount = parseInt(currentSales[key]);
              if(Val >= 1001 && Val <= 1012){
                  product = 'BlockCheese';
                  productCategories.BlockCheese = productCategories.BlockCheese + amount
              } else
              if(Val >= 1013 && Val <= 1020){
                  product = 'Butter';
                  productCategories.Butter = productCategories.Butter + amount
              } else
              if(Val >= 1021 && Val <= 1039){
                  product = 'Cheese';
                  productCategories.Cheese = productCategories.Cheese + amount
              } else
              if(Val >= 1040 && Val <= 1049){
                  product = 'Cream';
                  productCategories.Cream = productCategories.Cream + amount
              } else
              if(Val >= 1050 && Val <= 1052){
                  product = 'Milk';
                  productCategories.Milk = productCategories.Milk + amount
              } else
              if(Val >= 1053 && Val <= 1064){
                  product = 'ProcessCheese';
                  productCategories.ProcessCheese = productCategories.ProcessCheese + amount
              } else
              if(Val >= 1064 && Val <= 1067){
                  product = 'Shakes';
                  productCategories.Shakes = productCategories.Shakes + amount
              } else
              if(Val >= 1068 && Val <= 1075){
                  product = 'ShreddingCheese';
                  productCategories.ShreddingCheese = productCategories.ShreddingCheese + amount
              } else
              if(Val >= 1076 && Val <= 1076){
                  product = 'Fish';
                  productCategories.Fish = productCategories.Fish + amount
              } else
              if(Val >= 1077 && Val <= 1080){
                  product = 'FrenchFries';
                  productCategories.FrenchFries = productCategories.FrenchFries + amount
              } else
              if(Val >= 1081 && Val <= 1083){
                  product = 'Fruits';
                  productCategories.Fruits = productCategories.Fruits + amount
              } else
              if(Val >= 1084 && Val <= 1094){
                  product = 'Meat';
                  productCategories.Meat = productCategories.Meat + amount
              } else
              if(Val >= 1095 && Val <= 1098){
                  product = 'SeaFood';
                  productCategories.SeaFood = productCategories.SeaFood + amount
              } else
              if(Val >= 1099 && Val <= 1131){
                  product = 'Vegetable';
                  productCategories.Vegetable = productCategories.Vegetable + amount
              }
            }

            // if Consumer Converted to Emborg
            // Then we have to increment in state vriable to global access
            // But first increment in local variable
            if (obj[key].conversion === 'Yes'){
                conversion = conversion + 1;
            }
            // We Also Take out other information such as TasteTrail & Gifts
            // Now Applying Same Method for TasteTrial
            if (obj[key].tasteTrial === 'Yes'){
                tasteTrial = tasteTrial + 1;
            }
          }
          totalConversion = totalConversion + conversion;
          totalTasteTrial = totalTasteTrial + tasteTrial;
          TotalSales = TotalSales + Sales;
          currentKey = null;
        });
        // console.log(totalPreviousUserCheese)
        commit('setProductCategory', productCategories)
        commit('setTotalPreviousUserButter', totalPreviousUserButter);
        commit('setTotalPreviousUserCheese', totalPreviousUserCheese);
        commit('setTotalPreviousUserFrozen', totalPreviousUserFrozen);
        commit('setTotalTasteTrial', totalTasteTrial);
        commit('setTotalConversion', totalConversion);
        commit('setTotalSales', TotalSales);
        commit('SET_MAIN_LOADING', false);
        commit('setStoreReport', reports);
        });
    },
    // Fetch Store Reports By Campaign
    fetchStoreReportsByObject({commit}, payload){
        commit('SET_MAIN_LOADING', true);
        firebase.database().ref('storedata/' + payload.date).orderByChild('store/id').equalTo(payload.id).once('value', (report) => {
            let reports = [];
            let currentKey = null;
            report.forEach((childReport) => {
                const obj = childReport.val();
                currentKey = childReport.key;
                reports.push({
                    // date: currentKey,
                    // Customer Information
                    date: obj[key],
                    customerName: obj.customerName,
                    customerContact: obj.customerContact,
                    customerRemarks: obj.customerRemarks,
                    // Conversion
                    conversion: obj.conversion,
                    // Taste Trail
                    tasteTrial: obj.tasteTrial,
                    pUFrozen: obj.pUFrozen,
                    pUCheese: obj.pUCheese,
                    pUButter: obj.pUButter,
                    // Store info
                    store: obj.store,
                    userName: obj.userName,
                    // Stock Information
                    purchased: obj.purchased
                });
                // reports[currentKey] = new Array;
                // for (let key in obj){
                //     reports.push({
                //         id: key,
                //         date: childReport.key,
                //         // Customer Information
                //         customerName: obj[key].customerName,
                //         customerContact: obj[key].customerContact,
                //         // Conversion
                //         conversion: obj[key].conversion,
                //         // Taste Trail
                //         tasteTrial: obj[key].tasteTrial,
                //         pUFrozen: obj[key].pUFrozen,
                //         pUCheese: obj[key].pUCheese,
                //         pUButter: obj[key].pUButter,
                //         // Store info
                //         store: obj[key].store,
                //         userName: obj[key].userName,
                //         // Stock Information
                //         purchased: obj[key].purchased
                //     });
                // }
                currentKey = null;
            });
            // console.log(reports)
            // console.log(reports)
            commit('SET_MAIN_LOADING', false);
            commit('setStoreReport', reports);
        });
  },
    // Fetch All Store Related Reports
    fetchStoreReportsByName({commit}){
        commit('SET_MAIN_LOADING', true);
        // let define some variables for Dates
        let date = new Date();
        let dateStart = date.getDate();
        console.log(dateStart);
        firebase.database().ref('storedata').once('value', (report) => {
            let reports = [];
            let currentKey = null;
            // console.log(reports)
            report.forEach((childReport) => {
                const obj = childReport.val();
                currentKey = childReport.key;
                // console.log(obj)
                // reports[currentKey] = new Array;
                for (let key in obj){
                    reports.push({
                        // date: currentKey,
                        // Customer Information
                        date: obj[key],
                        customerName: obj[key].customerName,
                        customerContact: obj[key].customerContact,
                        customerRemarks: obj[key].customerRemarks,
                        // Conversion
                        conversion: obj[key].conversion,
                        // Taste Trail
                        tasteTrial: obj[key].tasteTrial,
                        pUFrozen: obj[key].pUFrozen,
                        pUCheese: obj[key].pUCheese,
                        pUButter: obj[key].pUButter,
                        // Store info
                        store: obj[key].store,
                        userName: obj[key].userName,
                        // Stock Information
                        purchased: obj[key].purchased
                    });
                }
                // currentKey = null;
            });
            commit('SET_MAIN_LOADING', false);
            // commit('setCurrentStoreReport', report);
        });
    },
    // Fetch All Last Reports
    fetchAllStoreReports({commit}){
      commit('SET_MAIN_LOADING', true);
      firebase.database().ref('storedata').limitToLast(1).on('value', (report) => {
        let reports = [];
        let currentKey = null;
        // console.log(reports)
        report.forEach((childReport) => {
          const obj = childReport.val();
          currentKey = childReport.key;
          // reports[currentKey] = new Array;
          for (let key in obj){
            reports.push({
              id: key,
              date: childReport.key,
              // Customer Information
              customerName: obj[key].customerName,
              // Store info
              store: obj[key].store,
              userName: obj[key].userName,
            });
          }
          currentKey = null;
        });
        let crypted = reports.slice(-3);
        // console.log(reports)
        commit('SET_MAIN_LOADING', false);
        commit('setAllStoreReport', crypted);
      });
    },
    // Fetch Compile Reports By Campaign
    fetchCompileReports({commit}, payload){
      commit('SET_MAIN_LOADING', true);
      firebase.database().ref('storedata').orderByKey().startAt(payload.from).endAt(payload.to).once('value', (report) => {
        const reports = [];
        // let purchased;
        // let totals;
        report.forEach((childReport) => {
          const obj = childReport.val();
          for (let key in obj) {
            reports.push({
              id: key,
              // Customer Information
              customerName: obj[key].customerName,
              customerContact: obj[key].customerContact,
              // Store info
              storeName: obj[key].store.name,
              store: obj[key].store,
              userName: obj[key].userName,
              // Stock Information
              purchased : obj[key].purchased
            });
          }
        });
        commit('SET_MAIN_LOADING', false);
        commit('setCompileReport', reports)
      });
    },
    // Total Purchase Amount
    fetchPurchaseReports({commit}){
      firebase.database().ref('storedata').on('value', (report) => {
        const reports = [];
        // let purchased;
        // let totals;
        let totalPurchase = null;
        let purchaseArray = [];
        report.forEach((childReport) => {
          const obj = childReport.val();
          for (let key in obj) {
            reports.push({
                // Stock Information
                purchased : obj[key].purchased
            });
            //  START HERE
            purchaseArray.push(obj[key].purchased);
          }
        });
        console.log(purchaseArray);
        // console.log(reports);
        commit('setTotalPurchases', reports)
      });
    },
    // Fetch Compile Reports By Campaign
    fetchCampaignReports({commit}){
      firebase.database().ref('storedata').on('value', (report) => {
        const reports = [];
        // let purchased;
        // let totals;
        report.forEach((childReport) => {
          const obj = childReport.val();
          for (let key in obj) {
            reports.push({
              // Stock Information
              purchased : obj[key].purchased
            });
          }
        });
        // console.log(reports);
        commit('setTotalPurchases', reports)
      });
    },

    // ========================
    // Employees CRUD
    // Adding New Registration Entries
    // Brand Ambassador PUT
    brandAmbassadorReg({commit}, payload){
      // Start Loading
      commit('SET_MAIN_LOADING', true);
      // Authenticate Firebase User
      var config = {
        apiKey: "AIzaSyDsQvtEgYT_SiYeZ7YXtbAP0MLE1rudkJY",
        authDomain: "bams-e190d.firebaseapp.com",
        databaseURL: "https://bams-e190d.firebaseio.com"
      };
      let secondaryApp = firebase.initializeApp(config, "Secondaryy");
      // admin.auth().createUser({
      //   email: payload.email,
      //   displayName: payload.ba.name,
      //   emailVerified: false,
      //   password: payload.password
      // })
      secondaryApp.auth().createUserWithEmailAndPassword(payload.email, payload.password).then((user) => {
        const brandAmbassador = {
          uniqueId: user.uid,
          name: payload.ba.name,
          address: payload.ba.address,
          email: payload.email,
          password: payload.password,
          store: payload.ba.store,
          role: 'BrandAmbassador'
        };
        return firebase.database().ref('users').push(brandAmbassador).then(() => {
          // assign store
          return firebase.database().ref('stores/' + payload.ba.store.id + '/').update({
            assign: user.uid
          }).then(() => {
            // End Loading
            secondaryApp.auth().signOut();
            commit('SET_MAIN_LOADING', false);
            // Sending Success Message
            commit('SET_SUCCESS_MSG', 'B.A Successfully Created');
            setTimeout(() => {
              commit('SET_SUCCESS_MSG', 'Operation Successful');
            }, 4000);
          })
        });
      });
    },
    //UPD
    updbrandAmbassadorReg({commit}, payload){
      // Start Loading
      commit('SET_MAIN_LOADING', true);
      // Authenticate Firebase User
      var config = {
        apiKey: "AIzaSyDsQvtEgYT_SiYeZ7YXtbAP0MLE1rudkJY",
        authDomain: "bams-e190d.firebaseapp.com",
        databaseURL: "https://bams-e190d.firebaseio.com"
      };
      let secondaryApp = firebase.initializeApp(config, "Secondary");
      // admin.auth().createUser({
      //   email: payload.email,
      //   displayName: payload.ba.name,
      //   emailVerified: false,
      //   password: payload.password
      // })
      secondaryApp.auth().createUserWithEmailAndPassword(payload.email, payload.password).then((user) => {
        const brandAmbassador = {
          uniqueId: user.uid,
          name: payload.ba.name,
          address: payload.ba.address,
          email: payload.email,
          password: payload.password,
          store: payload.ba.store,
          role: 'BrandAmbassador'
        };
        return firebase.database().ref('users').push(brandAmbassador).then(() => {
          // assign store
          return firebase.database().ref('stores/' + payload.ba.store.id + '/').update({
            assign: user.uid
          }).then(() => {
            // End Loading
            secondaryApp.auth().signOut();
            commit('SET_MAIN_LOADING', false);
            // Sending Success Message
            commit('SET_SUCCESS_MSG', 'B.A Successfully Created');
            setTimeout(() => {
              commit('SET_SUCCESS_MSG', 'Operation Successful');
            }, 4000);
          })
        });
      });
    },
    // Supervisor PUT
    supervisorReg({commit}, payload){
      // Start Loading
      commit('SET_MAIN_LOADING', true);
      // Authenticate Firebase User
      var config = {
        apiKey: "AIzaSyDsQvtEgYT_SiYeZ7YXtbAP0MLE1rudkJY",
        authDomain: "bams-e190d.firebaseapp.com",
        databaseURL: "https://bams-e190d.firebaseio.com"
      };
      let secondaryApp = firebase.initializeApp(config, "Secondary");
      // admin.auth().createUser({
      //   email: payload.email,
      //   displayName: payload.ba.name,
      //   emailVerified: false,
      //   password: payload.password
      // })
      secondaryApp.auth().createUserWithEmailAndPassword(payload.email, payload.password).then((user) => {
        const supervisor = {
          uniqueId: user.uid,
          name: payload.supervisor.name,
          address: payload.supervisor.address,
          email: payload.email,
          store: {
            id: 'none',
            name: 'none'
          },
          password: payload.password,
          role: 'Supervisor'
        };
        return firebase.database().ref('users').push(supervisor).then(() => {
            // End Loading
            secondaryApp.auth().signOut();
            commit('SET_MAIN_LOADING', false);
            // Sending Success Message
            commit('SET_SUCCESS_MSG', 'Supervisor Successfully Created');
            setTimeout(() => {
              commit('SET_SUCCESS_MSG', 'Operation Successful');
            }, 4000);
          })
        });
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
    userError(state){
      return state.userError
    },
    unAssignedStores (state){
      return state.unAssignedStores
    },

    // Accumulative Figures

    totalInterceptions (state){
      return state.totalInterceptions
    },
    totalPurchases (state){
      return state.totalPurchases
    },
    totalBA (state) {
      return state.totalBA
    },
    totalStore (state) {
        return state.totalStore
    },
    totalConversion (state) {
      return state.totalConversion
    },
    totalTasteTrial (state) {
      return state.totalTasteTrial
    },
    totalSales (state) {
      return state.totalSales
    },
    totalPreviousUserButter (state){
      return state.totalPreviousUserButter
    },
    totalPreviousUserCheese (state){
        return state.totalPreviousUserCheese
    },
    totalPreviousUserFrozen (state){
        return state.totalPreviousUserFrozen
    },
    productCategory (state) {
      return state.productCategory
    },
    // ==================

    availableBA (state){
      return state.baList
    },
    selectedBa (state){
      return state.selectedBa
    },
    storeList (state){
      return state.stores
    },
    storeDetails (state) {
      return state.storeDetails
    },
    storeStockReports (state) {
      return state.storeStockReports
    },
    recentReport (state){
      return state.recentReports
    },
    consumerStoreReports (state) {
      return state.consumerStoreReports
    },
    compileReport (state) {
      return state.compileReports
    },
    storeReport (state) {
      return state.storeReports
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
