<template>
  <div>
    <v-toolbar color="purple" dark tabs>
      <v-toolbar-title>REPORTS</v-toolbar-title>
      <!--<v-spacer></v-spacer>-->
      <v-tabs centered color="purple" slot="extension" slider-color="yellow" v-model="reportTabs">
        <!--<v-tab-->
                <!--key="1"-->
                <!--href="#tab-$c1"-->
        <!--&gt;-->
          <!--Item 1-->
        <!--</v-tab>-->
        <v-tab key="2" href="#tab-c2" >
          Store Report
        </v-tab>
        <v-tab key="3" href="#tab-c3">
          Compile Report
        </v-tab>
      </v-tabs>
      </v-toolbar>
      <v-tabs-items v-model="reportTabs">
        <v-tab-item
                key="1"
                id="tab-c1"
        >
          <v-card flat>
            <v-card-text>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item key="2" id="tab-c2">
          <v-card flat>
            <v-card-text>
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs12 sm12>
                    <h2 class="display-1">Store Report</h2>
                  </v-flex>
                  <v-flex xs6 class="text-xs-left">Sort Options</v-flex>
                  <v-flex xs12>
                    <v-divider></v-divider>
                    <v-flex xs4 offset-xs8 class="mt-3">
                      <v-dialog
                              ref="dateDialogue"
                              persistent
                              v-model="dateDialogue"
                              lazy
                              full-width
                              width="290px"
                              :return-value.sync="selectedDate"
                      >
                        <v-text-field
                                slot="activator"
                                label="Date"
                                v-model="selectedDate"
                                prepend-icon="event"
                                readonly
                        ></v-text-field>
                        <v-date-picker v-model="selectedDate" scrollable @input="formatDate()">
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="dateDialogue = false">Cancel</v-btn>
                          <v-btn flat color="primary" @click="$refs.dateDialogue.save(selectedDate)">OK</v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-flex>
                  </v-flex>
                  <v-flex xs12>
                    <v-divider></v-divider>
                    <v-card>
                      <v-card-title>
                        Stores List
                        <v-spacer></v-spacer>
                        <v-text-field append-icon="search" label="Search Store" single-line hide-details v-model="storeSearch"></v-text-field>
                      </v-card-title>
                      <v-data-table :headers="storeListHeaders" :items="storeList" :search="storeSearch">
                        <template slot="items" slot-scope="props">
                          <td class="text-xs-center">{{ props.item.id }}</td>
                          <td class="text-xs-left">{{ props.item.name }}</td>
                          <td class="text-xs-left">{{ props.item.city }}</td>
                          <td class="text-xs-left">{{ props.item.address }}</td>
                          <td class="text-xs-center">
                            <v-btn outline small fab color="purple" @click="fetchStoreReport(props.item)">
                              <v-icon color="white">event_note</v-icon>
                            </v-btn>
                          </td>
                        </template>
                        <v-alert slot="no-results" :value="true" color="error" icon="warning">
                          Your search for "{{ storeSearch }}" found no results.
                        </v-alert>
                      </v-data-table>
                    </v-card>
                    <!--<v-container fluid style="min-height: 0;" grid-list-lg>-->
                    <!--<v-layout row wrap >-->
                    <!--<v-flex xs3 v-for="store in storeList" :key="store.id" v-on:click="fetchStoreReport(store)">-->
                    <!--<v-card color="grey lighten-2" class="black--text elevation-12" ripple>-->
                    <!--<v-card-title primary-title>-->
                    <!--<div class="headline">{{ store.name }} Report </div>-->
                    <!--<v-flex xs6 offset-xs3><v-icon x-large class="black--text">store</v-icon></v-flex>-->
                    <!--</v-card-title>-->
                    <!--<v-card-actions >-->
                    <!--<v-flex xs8 offset-xs2>-->
                    <!--&lt;!&ndash;<v-btn flat class="black--text">FETCH</v-btn>&ndash;&gt;-->
                    <!--</v-flex>-->
                    <!--</v-card-actions>-->
                    <!--</v-card>-->
                    <!--</v-flex>-->
                    <!--</v-layout>-->
                    <!--</v-container>-->
                  </v-flex>
                  <v-flex xs12 >
                    <v-dialog v-model="storeReportDialog" maxWidth="1200px" >
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ storeSelected.name }} Report </span>
                        </v-card-title>
                        <v-card-text>
                          <v-data-table :headers="storeReportHeaders" :items="selectedStoreReport" hide-actions class="elevation-1">
                            <template slot="items" slot-scope="props">
                              <td>{{ props.item.userName }}</td>
                              <td class="text-xs-right grey-1">{{ props.item.address }}</td>
                              <td class="text-xs-right grey-2">{{ props.item.interception }}</td>
                              <td class="text-xs-right grey-3">{{ props.item.BlockCheese }}</td>
                              <td class="text-xs-right grey-1">{{ props.item.Butter }}</td>
                              <td class="text-xs-right grey-3">{{ props.item.BlockCheeseCream }}</td>
                              <td class="text-xs-right grey-1">{{ props.item.Cream }}</td>
                              <td class="text-xs-right grey-2">{{ props.item.CreamFoodService }}</td>
                              <td class="text-xs-right grey-3">{{ props.item.Milk }}</td>
                              <td class="text-xs-right grey-1">{{ props.item.ProcessCheese }}</td>
                              <td class="text-xs-right grey-2">{{ props.item.Shakes }}</td>
                              <td class="text-xs-right grey-3">{{ props.item.ShreddedCheese }}</td>
                              <td class="text-xs-right grey-1">{{ props.item.Fish }}</td>
                              <td class="text-xs-right grey-2">{{ props.item.FrenchFries }}</td>
                              <td class="text-xs-right grey-3">{{ props.item.Fruits }}</td>
                              <td class="text-xs-right grey-1">{{ props.item.Meat }}</td>
                              <td class="text-xs-right grey-2">{{ props.item.SeaFood }}</td>
                              <td class="text-xs-right grey-3">{{ props.item.Vegetable }}</td>
                            </template>
                          </v-data-table>
                          <!--<div class="table__overflow" id="storeHeaderData" style="overflow-x: hidden" >-->
                            <!--<table style="width: 1450px; overflow-y: scroll" >-->
                              <!--<thead>-->
                              <!--<th style="width: 240px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center">BASIC INFORMATION</th>-->
                              <!--<th style="width: 380px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center ">SOYA SUPREME COOKING OIL</th>-->
                              <!--<th style="width: 220px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center">Smart Canola Oil</th>-->
                              <!--<th style="width: 100px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center ">SS Banaspati</th>-->
                              <!--<th style="width: 100px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center ">SSB Olive Oil</th>-->
                              <!--</thead>-->
                            <!--</table>-->
                          <!--</div>-->
                          <!--<v-data-table-->
                                  <!--v-bind:headers="storeReportListHeaders"-->
                                  <!--v-bind:onscroll="syncStoreScroll"-->
                                  <!--id="storeTableData"-->
                                  <!--:items="storeReportDatewise"-->
                                  <!--hide-actions-->
                                  <!--:loading="selectLoading"-->
                          <!--&gt;-->
                            <!--<template slot="items" slot-scope="props" >-->
                              <!--<td class="text-xs-left">{{ props.item.date }}</td>-->
                              <!--<td class="text-xs-center">{{ props.item.store.address }}</td>-->
                              <!--<td class="text-xs-left">{{ props.item.userName }}</td>-->
                              <!--<td class="text-xs-center">{{ props.item.interception }}</td>-->
                              <!--&lt;!&ndash;Soya Supreme Cooking Oil&ndash;&gt;-->
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="green darken-1" flat="flat" @click="storeReportDialog = false">OK</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item
                key="3"
                id="tab-c3"
        >
          <v-card flat>
            <v-card-text>

            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
  </div>
</template>

<script>
//  Setting Basic GUI
  export default {
    data () {
      return {
//      GUI DATA
        consumerScrollPosition: null,
        storeScrollPosition: null,
        consumerMenu: false,
        consumerReportDialog: false,
        storeReportDialog: false,
        compileMenu: {
          to: false,
          from: false
        },
        storeMenu: {
          to: false,
          from: false
        },
        selectLoading: true,
        selectedStore: 'Store',
        compileSelectedStore: 'Compile',
        storeSelected: 'Compile',
//      PROCESSED
        compileTotal: [],
        compileReport: [],
        consumerTotal: [],
        storeReport: [],
        selectedStoreReport: [],
        storeTotal: [],
//      GUI HEADERS
//          StoreReport Gui Data
        storeSearch: '',
        storeListHeaders: [
            {
                text: 'ID',
                align: 'center',
                sortable: true,
                value: 'id'
            },
            {
                text: 'Name',
                align: 'left',
                sortable: true,
                value: 'name'
            },
            {
                text: 'City',
                align: 'left',
                sortable: true,
                value: 'city'
            },
            {
                text: 'Address',
                align: 'left',
                sortable: true,
                value: 'address'
            },
            {
                text: 'Actions',
                align: 'center',
                sortable: true,
                value: 'action'
            },
        ],
        storeReportHeaders: [
            {text: 'B.A', align: 'center', sortable: false, value:'b.a' },
            {text: 'Address', align: 'center', sortable: false, value:'Address' },
            {text: 'Interceptions', color: 'blue', align: 'center', sortable: true, value:'Interceptions' },
            {text: 'BlockCheese', align: 'center', sortable: true, value:'BlockCheese' },
            {text: 'Butter', align: 'center', sortable: true, value:'Butter' },
            {text: 'BlockCheeseCream', align: 'center', sortable: true, value:'BlockCheeseCream' },
            {text: 'Cream', align: 'center', sortable: true, value:'Cream' },
            {text: 'CreamFoodService', align: 'center', sortable: true, value:'CreamFoodService' },
            {text: 'Milk', align: 'center', sortable: true, value:'Milk' },
            {text: 'ProcessCheese', align: 'center', sortable: true, value:'ProcessCheese' },
            {text: 'Shakes', align: 'center', sortable: true, value:'Shakes' },
            {text: 'ShreddedCheese', align: 'center', sortable: true, value:'ShreddedCheese' },
            {text: 'Fish', align: 'center', sortable: true, value:'Fish' },
            {text: 'FrenchFries', align: 'center', sortable: true, value:'FrenchFries' },
            {text: 'Fruits', align: 'center', sortable: true, value:'Fruits' },
            {text: 'Meat', align: 'center', sortable: true, value:'Meat' },
            {text: 'SeaFood', align: 'center', sortable: true, value:'SeaFood' },
            {text: 'Vegetable', align: 'center', sortable: true, value:'Vegetable' }
        ],
        selectedDate: '2018-04-04',
        selectedFormatedDate: null,
        reportTabs: null,
        dateDialogue: false,
//      Fetched Data
        consumerStockReport: [],
        currentReport: null,
//      Sent Data
        compileMonth: {
          to: null,
          from: null
        },
        storeMonth: {
          to: null,
          from: null
        },
        consumerSelectedDate: null,
        storeSelectedDate: null,
      }
    },
    computed: {
      compileDateValid(){
        return this.compileMonth.to !== null && this.compileMonth.from !== null
      },
      storeList(){
        return this.$store.getters.storeList
      },
      totalReport(){
        return this.$store.getters.storeReport
      },
      storeReportDatewise(){
//      Main Fetched Report
//        Main fetched Report
        let report = this.$store.getters.storeReport;
//        Selected Store
        let selectedStore = this.storeSelected;
//        Holders
        let dateholder = [];
        let storeTotal = {};
        let purchaseHolder = [];
//        Results
        let filteredStore = [];
        let storeReport = [];
//        selecting Specified Store
        for (let key in report){
//            Store FILTER
          if (report[key].store.id == selectedStore.id){
            filteredStore.push(report[key]);
          }
        }

//       Filter Total Dates
        for (let key in filteredStore){
//       Store FILTER
          dateholder.push(filteredStore[key].date);
        }
        dateholder = _.union(dateholder);


//        Making Thing Sense
        for (let key in dateholder){
          let matchedStore = [];
          let matchedPurchased = [];
          let storeClean = [];
          let storeInterception = 0;
          let total = {};
          filteredStore.forEach((obj) => {
            if(obj.date === dateholder[key]){
//                Add interception
              storeInterception = storeInterception + 1;
//                Save to matched Stores
              matchedStore = {
                id: obj.id,
                date: obj.date,
                store: obj.store,
                storeName: obj.store.name,
                userName: obj.userName,
                interception: storeInterception,
              };
//                Save to MatchedStores Purchased
              matchedPurchased.push(obj.purchased);
//                 Cleaning Array
//                Summing All matched purchases of iterated Store
              matchedPurchased.forEach(function(obj) {
                Object.keys(obj).forEach(function(k) {
                  total[k] = (total[k] || 0) + parseInt(obj[k]);
                });
                let Purchased = {
                  purchased: total
                };
                storeClean = Object.assign(matchedStore, Purchased);
              });
            }
            else return null;
            total = {};
          });
          storeInterception = 0;
          storeReport.push(storeClean);
          matchedPurchased = [];
        }

//        Making Purchase Count
        for (let key in storeReport){
          purchaseHolder.push(storeReport[key].purchased);
        };
        purchaseHolder.forEach(function(obj) {
          Object.keys(obj).forEach(function(k) {
            storeTotal[k] = (storeTotal[k] || 0) + parseInt(obj[k]);
          })
        });
        this.storeTotal = storeTotal;
        this.storeReport = storeReport;
        return storeReport;
      },
      consumerReport(){
        let report = this.$store.getters.consumerStoreReports;
        let purchased = [];
        let total = {};
//        Calculating all the Entries
        for (let key in report){
          purchased.push(report[key].purchased);
        };
        purchased.forEach(function(obj) {
          Object.keys(obj).forEach(function(k) {
            total[k] = (total[k] || 0) + parseInt(obj[k]);
          })
        })
        this.consumerTotal = total;
        return this.$store.getters.consumerStoreReports
      },
      compileReportStores(){
//      Main Fetched Report
        let report = this.$store.getters.compileReport;
        let purchased = [];
//      Making Purchases count
        for (let key in report){
          purchased.push(report[key].purchased);
        };
//      Store List
        let stores = this.$store.getters.storeList;
        let storeid = [];
//      Getting store IDs in storeList
        for (let key in stores){
          storeid.push(stores[key].id);
        }
//      CompiledReport
        let compiledReport = [];
        let CleanPurchased = [];
//      Compile Total
        let compiledReportTotal = [];
//      Finding Store in Each Report
        for (let key in storeid){
          let matchedStore = [];
          let storeClean = [];
          let matchedPurchased = [];
          let storeInterception = 0;
          let total = {};
            report.forEach((obj) => {
                if(obj.store.id === storeid[key]){
//                Add interception
                  storeInterception = storeInterception + 1;
//                Save to matched Stores
                  matchedStore = {
                    id: obj.id,
                    customerName: obj.customerName,
                    customerContact: obj.customerContact,
                    store: obj.store,
                    storeName: obj.store.name,
                    userName: obj.userName,
                    interception: storeInterception,
                  };
//                Save to MatchedStores Purchased
                  matchedPurchased.push(obj.purchased);
//                 Cleaning Array
//                Summing All matched purchases of iterated Store
                  matchedPurchased.forEach(function(obj) {
                    Object.keys(obj).forEach(function(k) {
                      total[k] = (total[k] || 0) + parseInt(obj[k]);
                    });
                    let Purchased = {
                      purchased: total
                    };
                    storeClean = Object.assign(matchedStore, Purchased);
                  });
                }
                else return null;
              total = {};
            });
          storeInterception = 0;
          compiledReport.push(storeClean);
          matchedPurchased = [];
        }
//      Cleaning Array
        compiledReport = compiledReport.filter((n) => { return n != ''});

//      Calculating Total purchases
//      Removing Empty Arrays
        for (let key in compiledReport){
          CleanPurchased.push(compiledReport[key].purchased);
        };
        CleanPurchased.forEach(function(obj) {
          Object.keys(obj).forEach(function(k) {
            compiledReportTotal[k] = (compiledReportTotal[k] || 0) + parseInt(obj[k]);
          })
        });

//        SETTING GVARIABLES
        this.compileReport = compiledReport;
        this.compileTotal = compiledReportTotal;
        return true;
      },
//      compileReports(){
//        let report = this.$store.getters.compileReport;
//        let purchased = [];
//        let total = {};
//        for (let key in report){
//          purchased.push(report[key].purchased);
//        };
//        purchased.forEach(function(obj) {
//          Object.keys(obj).forEach(function(k) {
//            total[k] = (total[k] || 0) + parseInt(obj[k]);
//          })
//        });
////        DISABLED
////        this.compileTotal = total;
//        return true;
//      },
//      Date Validator
      compileDateQuery(){
        let to = this.compileMonth.to.slice(5,10);
        let from = this.compileMonth.from.slice(5,10);
        return {to: to, from: from}
      },
      consumerDateQuery(){
        return this.consumerSelectedDate.slice(5,10);
      },
      storeDateQuery(){
//        return this.storeSelectedDate.slice(5,10);
      }
    },
    methods: {
      currentDate(){
        let date = new Date();
        let year = 1900 + date.getYear();
        let day = ("0" + date.getDate()).slice(-2);
        let month = date.getMonth() + 1;
        this.compileMonth.to = year + '-' + month + '-' + day;
        this.compileMonth.from = year + '-' + month + '-' + day;
        this.consumerSelectedDate = year + '-' + month + '-' + day;
        this.selectedDate = year + '-' + month + '-' + day;
      },
//     Format Date According to our DB
      formatDate(){
          let currentSelectedDate = this.selectedDate;
          let date = new Date(currentSelectedDate);
          let year = 1900 + date.getYear();
          let day = ("0" + date.getDate()).slice(-2);
          let month = date.getMonth() + 1;
          let formatedDate =  month + '-' + day + '-' + year;
          this.selectedFormatedDate = formatedDate;
      },
//      converting Data Category wise
      toCategory(){
//          first we have to reset this.selectedStoreReport
        this.selectedStoreReport = []
//      To convert we first have to get Full Category List and purchase Object from DB
//        Here is Category ListCache
        let totalPurchase = this.$store.getters.storeReport;
        let productCategories = {
            BlockCheese: 0,
            Butter: 0,
            BlockCheeseCream: 0,
            Cream: 0,
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

//        now we require an Purchase object which must carry details about purchases and their ids
        for(let key in totalPurchase) {
            // if Key lies among product Range
//            We have to dig more to get purchased values
//            console.log(totalPurchase[key].purchased);
            let totalItems = totalPurchase[key].purchased;
            for (let key in totalItems){
                let Val = parseInt(key);
                let product = '';
                let amount = parseInt(totalItems[key]);
//                console.log(amount)
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
                    product = 'ShreddedCheese';
                    productCategories.ShreddedCheese = productCategories.ShreddedCheese + amount
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
        }
//        Counting Interceptions through Purchase Object
        let currentReport = this.totalReport;
        let totalInterceptions = 0;
        let username = ''
        for(let key in currentReport){
            username = currentReport[key].userName;
            totalInterceptions++
        }
//        console.log("Selected Report");
//        Now i should add more information to purchased object
        let report = productCategories;
        let store = this.storeSelected;
        report['interception'] = totalInterceptions;
        report['address'] = store.address;
        report['userName'] = username;
        console.log(report)
        this.selectedStoreReport.push(report);

      },
//      COMPILE
      fetchCompileReports(){
        this.selectLoading = true;
        let query = this.compileDateQuery;
        console.log(query);
        this.$store.dispatch('fetchCompileReports', query).then(() =>{
          setTimeout(() => {
            this.compileReportStores;
            this.selectLoading = false;
          },3000);
        });
//        this.storeMenu = false;
      },
//      STORE QUERY
      fetchStoreReport(storeinfo){
        this.selectLoading = true;
        this.formatDate();
//      let init = {date: this.storeDateQuery, store: storeinfo};
        let selectedDate = this.selectedFormatedDate;
        let data = storeinfo;
        data['date'] = this.selectedFormatedDate;
        this.$store.dispatch('fetchStoreReportsByObject',data).then(() =>{
          setTimeout(() => {
            this.selectLoading = false;
            this.storeReportDialog = true;
          },2000);
        });
        console.log(storeinfo);
        this.storeSelected = storeinfo;
        this.storeMenu = false;
        this.toCategory();
      },
//      CONSUMER FETCH REPORT
      fetchConsumerReport(storeinfo){
        this.selectedStore = storeinfo.name;
        this.selectLoading = true;
        let init = {date: this.consumerDateQuery, store: storeinfo.id};
        this.$store.dispatch('fetchConsumerReports', init).then(() =>{
          setTimeout(() => {
            this.selectLoading = false;
            this.consumerReportDialog = true;
          },2000);
        });
        this.consumerMenu = false;
      },

    },
    created(){
//        getting Random store Details
      if (this.$store.getters.user === null) {
        this.$router.push('/login')
      }else{
//          Initiate Connection
//        setting Time
        this.currentDate();
//          Fetching Base Data Queries
        this.$store.dispatch('storeListUPD');
        console.log(this.stores);
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  table.table tbody td:first-child, table.table tbody td:not(:first-child), table.table tbody th:first-child, table.table tbody th:not(:first-child), table.table thead td:first-child, table.table thead td:not(:first-child), table.table thead th:first-child, table.table thead th:not(:first-child) {
    padding: 0 3px !important;
  }
  .grey1{
    background-color: #545454;
  }
  .grey2{
    background-color: #5f5f5f;
  }
  .grey3{
    background-color: #787878;
  }

</style>





<!--<v-tabs fixed icons centered class="mb-5 pb-5">-->
<!--<v-toolbar class="gradientHead " dark tabs>-->
<!--<v-spacer></v-spacer>-->
<!--<v-toolbar-title slot="extension" class="display-1">REPORTS</v-toolbar-title>-->
<!--</v-toolbar>-->
<!--<v-tabs class="gradientHead">-->
<!--<v-tabs-slider color="yellow"></v-tabs-slider>-->
<!--&lt;!&ndash;<v-tabs-item href="c1">&ndash;&gt;-->
<!--&lt;!&ndash;<v-icon>store</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;Consumers Reports&ndash;&gt;-->
<!--&lt;!&ndash;</v-tabs-item>&ndash;&gt;-->
<!--<v-tabs href="c2">-->
<!--<v-icon>store</v-icon>-->
<!--Store Report-->
<!--</v-tabs>-->
<!--<v-tabs-item href="c3">-->
<!--<v-icon>view_module</v-icon>-->
<!--COMPILE-->
<!--</v-tabs-item>-->
<!--</v-tabs>-->
<!--<v-tabs-items>-->
<!--<v-tabs-content id="c1">-->
<!--<v-card flat>-->
<!--<v-card-text>-->
<!--<v-container grid-list-md text-xs-center>-->
<!--<v-layout row wrap>-->
<!--<v-flex xs12 ><h6>CONSUMER REPORT</h6></v-flex>-->
<!--<v-flex xs6 class="text-xs-left">SORTING OPTIONS</v-flex>-->
<!--<v-flex xs12>-->
<!--<v-divider></v-divider>-->
<!--<v-flex xs4 offset-xs8 class="mt-3">-->
<!--<v-menu-->
<!--lazy-->
<!--:close-on-content-click="true"-->
<!--:close-on-click="false"-->
<!--v-model="consumerMenu"-->
<!--transition="scale-transition"-->
<!--offset-y-->
<!--full-width-->
<!--:nudge-right="40"-->
<!--max-width="290px"-->
<!--min-width="290px"-->
<!--&gt;-->
<!--<v-text-field-->
<!--slot="activator"-->
<!--label="By Date"-->
<!--v-model="consumerSelectedDate"-->
<!--prepend-icon="event"-->
<!--readonly-->
<!--&gt;</v-text-field>-->
<!--<v-date-picker v-model="consumerSelectedDate" no-title scrollable actions>-->
<!--<template slot-scope="{ save, cancel }">-->
<!--<v-card-actions>-->
<!--<v-spacer></v-spacer>-->
<!--<v-btn flat color="primary" @click="cancel">Cancel</v-btn>-->
<!--<v-btn flat color="primary" @click="save">OK</v-btn>-->
<!--</v-card-actions>-->
<!--</template>-->
<!--</v-date-picker>-->
<!--</v-menu>-->
<!--</v-flex>-->
<!--</v-flex>-->
<!--<v-flex xs12>-->
<!--<v-divider></v-divider>-->
<!--<v-container fluid style="min-height: 0;" grid-list-lg>-->
<!--<v-layout row wrap >-->
<!--<v-flex xs3 v-for="store in storeList" :key="store.id" v-on:click="fetchConsumerReport(store)">-->
<!--<v-card color="grey lighten-2" class="black&#45;&#45;text elevation-12" ripple>-->
<!--<v-card-title primary-title>-->
<!--<div class="headline">{{ store.name }} Report </div>-->
<!--<v-flex xs6 offset-xs3><v-icon x-large class="black&#45;&#45;text">store</v-icon></v-flex>-->
<!--</v-card-title>-->
<!--<v-card-actions >-->
<!--<v-flex xs8 offset-xs2>-->
<!--&lt;!&ndash;<v-btn flat class="black&#45;&#45;text">FETCH</v-btn>&ndash;&gt;-->
<!--</v-flex>-->
<!--</v-card-actions>-->
<!--</v-card>-->
<!--</v-flex>-->
<!--</v-layout>-->
<!--</v-container>-->
<!--</v-flex>-->
<!--<v-flex xs12 >-->
<!--<v-dialog v-model="consumerReportDialog" maxWidth="1200px" >-->
<!--<v-card>-->
<!--<v-card-title>-->
<!--<span class="headline">{{ selectedStore }} Report - Date : {{consumerSelectedDate}}</span>-->
<!--</v-card-title>-->
<!--<v-card-text>-->
<!--<div class="table__overflow" id="consumerHeaderData" style="overflow-x: hidden" >-->
<!--<table style="width: 1450px; overflow-y: scroll" >-->
<!--<thead>-->
<!--<th style="width: 240px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center">BASIC INFORMATION</th>-->
<!--<th style="width: 380px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center ">SOYA SUPREME COOKING OIL</th>-->
<!--<th style="width: 220px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center">Smart Canola Oil</th>-->
<!--<th style="width: 100px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center ">SS Banaspati</th>-->
<!--<th style="width: 100px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center ">SSB Olive Oil</th>-->
<!--</thead>-->
<!--</table>-->
<!--</div>-->
<!--<v-data-table-->
<!--v-bind:headers="consumerReportListHeaders"-->
<!--v-bind:onscroll="syncConsumerScroll"-->
<!--id="consumerTableData"-->
<!--:items="consumerReport"-->
<!--hide-actions-->
<!--:loading="selectLoading"-->
<!--&gt;-->
<!--<template slot="items" slot-scope="props" >-->
<!--<td class="text-xs-left">{{ consumerDateQuery }}</td>-->
<!--<td class="text-xs-center">{{ props.item.customerName }}</td>-->
<!--<td class="text-xs-left">{{ props.item.customerContact }}</td>-->
<!--<td class="text-xs-center">{{ props.item.userName }}</td>-->
<!--&lt;!&ndash;Soya Supreme Cooking Oil&ndash;&gt;-->
<!--<td class="text-xs-center">{{ props.item.purchased.sscbottle1ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.sscbottle3ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.sscbottle5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.sscpoly1_5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.sscpresspour3ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.sscpresspour5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssctin2_5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssctin5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssctin10ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.sscjcan10ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.sscjcan16ltr }}</td>-->
<!--&lt;!&ndash;Smart Cooking OIl&ndash;&gt;-->
<!--<td class="text-xs-center">{{ props.item.purchased.scbottle1ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.scbottle3ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.scbottle4_5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.scpoly1_5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.scjcan10ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.scjcan16ltr }}</td>-->
<!--&lt;!&ndash;Soya Supreme Banaspati&ndash;&gt;-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssbpoly1_5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssbtin5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssbtin25ltr }}</td>-->
<!--&lt;!&ndash;Soya Supreme banaspati with olive oil&ndash;&gt;-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssbopoly1_5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssbotin5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssbotin25ltr }}</td>-->
<!--</template>-->
<!--&lt;!&ndash;Total Footer&ndash;&gt;-->
<!--<template slot="footer">-->
<!--&lt;!&ndash;Soya Supreme Cooking Oil&ndash;&gt;-->
<!--<td class="text-xs-left grey darken-1" ></td>-->
<!--<td class="text-xs-center grey darken-1"></td>-->
<!--<td class="text-xs-left grey darken-1">Total</td>-->
<!--<td class="text-xs-center grey darken-1"></td>-->
<!--&lt;!&ndash;Soya Supreme Cooking Oil&ndash;&gt;-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.sscbottle1ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.sscbottle3ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.sscbottle5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.sscpoly1_5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.sscpresspour3ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.sscpresspour5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.ssctin2_5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.ssctin5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.ssctin10ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.sscjcan10ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.sscjcan16ltr }}</td>-->
<!--&lt;!&ndash;Smart Cooking OIl&ndash;&gt;-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.scbottle1ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.scbottle3ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.scbottle4_5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.scpoly1_5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.scjcan10ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.scjcan16ltr }}</td>-->
<!--&lt;!&ndash;Soya Supreme Banaspati&ndash;&gt;-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.ssbpoly1_5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.ssbtin5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.ssbtin25ltr }}</td>-->
<!--&lt;!&ndash;Soya Supreme banaspati with olive oil&ndash;&gt;-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.ssbopoly1_5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.ssbotin5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ consumerTotal.ssbotin25ltr }}</td>-->
<!--</template>-->
<!--</v-data-table>-->
<!--</v-card-text>-->
<!--<v-card-actions>-->
<!--<v-spacer></v-spacer>-->
<!--<v-btn color="green darken-1" flat="flat" @click="consumerReportDialog = false">OK</v-btn>-->
<!--</v-card-actions>-->
<!--</v-card>-->
<!--</v-dialog>-->
<!--</v-flex>-->
<!--</v-layout>-->
<!--</v-container>-->
<!--</v-card-text>-->
<!--</v-card>-->
<!--</v-tabs-content>-->
<!--<v-tabs-content id="c2">-->
<!---->
<!--</v-tabs-content>-->
<!--<v-tabs-content id="c3">-->
<!--<v-card flat>-->
<!--<v-card-text>-->
<!--<v-container grid-list-md text-xs-center>-->
<!--<v-btn large class="green" v-on:click="fetchCompileReports" :disabled="!compileDateValid" :loading="selectLoading">Prepare Compile</v-btn>-->
<!--<v-layout row wrap>-->
<!--&lt;!&ndash;MONTH FROM&ndash;&gt;-->
<!--<v-flex xs4>-->
<!--<v-menu-->
<!--lazy-->
<!--:close-on-content-click="true"-->
<!--:close-on-click="false"-->
<!--v-model="compileMenu.from"-->
<!--transition="scale-transition"-->
<!--offset-y-->
<!--full-width-->
<!--:nudge-right="40"-->
<!--max-width="290px"-->
<!--min-width="290px"-->
<!--&gt;-->
<!--<v-text-field-->
<!--slot="activator"-->
<!--label="From"-->
<!--v-model="compileMonth.from"-->
<!--prepend-icon="event"-->
<!--readonly-->
<!--&gt;</v-text-field>-->
<!--<v-date-picker  v-model="compileMonth.from" no-title scrollable actions>-->
<!--<template slot-scope="{ save, cancel }">-->
<!--<v-card-actions>-->
<!--<v-spacer></v-spacer>-->
<!--<v-btn flat color="primary" @click="save">OK</v-btn>-->
<!--</v-card-actions>-->
<!--</template>-->
<!--</v-date-picker>-->
<!--</v-menu>-->
<!--</v-flex>-->
<!--&lt;!&ndash;MONTH TO&ndash;&gt;-->
<!--<v-flex xs4>-->
<!--<v-menu-->
<!--lazy-->
<!--:close-on-content-click="true"-->
<!--:close-on-click="false"-->
<!--v-model="compileMenu.to"-->
<!--transition="scale-transition"-->
<!--offset-y-->
<!--full-width-->
<!--:nudge-right="40"-->
<!--max-width="290px"-->
<!--min-width="290px"-->
<!--&gt;-->
<!--<v-text-field-->
<!--slot="activator"-->
<!--label="To"-->
<!--v-model="compileMonth.to"-->
<!--prepend-icon="event"-->
<!--readonly-->
<!--&gt;</v-text-field>-->
<!--<v-date-picker v-model="compileMonth.to" no-title scrollable actions>-->
<!--<template slot-scope="{ save, cancel }">-->
<!--<v-card-actions>-->
<!--<v-spacer></v-spacer>-->
<!--<v-btn flat color="primary" @click="save">OK</v-btn>-->
<!--</v-card-actions>-->
<!--</template>-->
<!--</v-date-picker>-->
<!--</v-menu>-->
<!--</v-flex>-->
<!--<v-flex xs12 class="ma-3"><v-divider></v-divider></v-flex>-->
<!--<v-flex xs12 >-->
<!--&lt;!&ndash;DataTable Compile&ndash;&gt;-->
<!--<v-card>-->
<!--<v-card-title>-->
<!--<span class="headline">{{ compileSelectedStore }} Report</span>-->
<!--</v-card-title>-->
<!--<v-card-text>-->
<!--<div class="table__overflow" id="compileHeaderData" style="overflow-x: hidden" >-->
<!--<table style="width: 1450px; overflow-y: scroll" >-->
<!--<thead>-->
<!--<th style="width: 240px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center grey darken-1">BASIC INFORMATION</th>-->
<!--<th style="width: 380px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center grey darken-1">SOYA SUPREME COOKING OIL</th>-->
<!--<th style="width: 220px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center grey darken-1">Smart Canola Oil</th>-->
<!--<th style="width: 100px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center grey darken-1">SS Banaspati</th>-->
<!--<th style="width: 100px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center grey darken-1">SSB Olive Oil</th>-->
<!--</thead>-->
<!--</table>-->
<!--</div>-->
<!--<v-data-table-->
<!--v-bind:headers="compileReportListHeaders"-->
<!--v-bind:onscroll="syncCompileScroll"-->
<!--id="compileTableData"-->
<!--:items="compileReport"-->
<!--hide-actions-->
<!--:loading="selectLoading"-->
<!--&gt;-->
<!--<template slot="items" slot-scope="props" >-->
<!--<td class="text-xs-left">{{ props.item.storeName }}</td>-->
<!--<td class="text-xs-center">{{ props.item.userName }}</td>-->
<!--<td class="text-xs-left">{{ props.item.userName }}</td>-->
<!--<td class="text-xs-center">{{ props.item.interception }}</td>-->
<!--&lt;!&ndash;Soya Supreme Cooking Oil&ndash;&gt;-->
<!--<td class="text-xs-center">{{ props.item.purchased.sscbottle1ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.sscbottle3ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.sscbottle5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.sscpoly1_5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.sscpresspour3ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.sscpresspour5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssctin2_5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssctin5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssctin10ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.sscjcan10ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.sscjcan16ltr }}</td>-->
<!--&lt;!&ndash;Smart Cooking OIl&ndash;&gt;-->
<!--<td class="text-xs-center">{{ props.item.purchased.scbottle1ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.scbottle3ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.scbottle4_5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.scpoly1_5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.scjcan10ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.scjcan16ltr }}</td>-->
<!--&lt;!&ndash;Soya Supreme Banaspati&ndash;&gt;-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssbpoly1_5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssbtin5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssbtin25ltr }}</td>-->
<!--&lt;!&ndash;Soya Supreme banaspati with olive oil&ndash;&gt;-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssbopoly1_5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssbotin5ltr }}</td>-->
<!--<td class="text-xs-center">{{ props.item.purchased.ssbotin25ltr }}</td>-->
<!--</template>-->
<!--&lt;!&ndash;Total Footer&ndash;&gt;-->
<!--<template slot="footer">-->
<!--&lt;!&ndash;Soya Supreme Cooking Oil&ndash;&gt;-->
<!--<td class="text-xs-left grey darken-1" ></td>-->
<!--<td class="text-xs-center grey darken-1"></td>-->
<!--<td class="text-xs-left grey darken-1">Total</td>-->
<!--<td class="text-xs-center grey darken-1"></td>-->
<!--&lt;!&ndash;Soya Supreme Cooking Oil&ndash;&gt;-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.sscbottle1ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.sscbottle3ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.sscbottle5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.sscpoly1_5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.sscpresspour3ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.sscpresspour5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.ssctin2_5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.ssctin5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.ssctin10ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.sscjcan10ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.sscjcan16ltr }}</td>-->
<!--&lt;!&ndash;Smart Cooking OIl&ndash;&gt;-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.scbottle1ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.scbottle3ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.scbottle4_5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.scpoly1_5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.scjcan10ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.scjcan16ltr }}</td>-->
<!--&lt;!&ndash;Soya Supreme Banaspati&ndash;&gt;-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.ssbpoly1_5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.ssbtin5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.ssbtin25ltr }}</td>-->
<!--&lt;!&ndash;Soya Supreme banaspati with olive oil&ndash;&gt;-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.ssbopoly1_5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.ssbotin5ltr }}</td>-->
<!--<td class="text-xs-center grey darken-1">{{ compileTotal.ssbotin25ltr }}</td>-->
<!--</template>-->
<!--</v-data-table>-->
<!--</v-card-text>-->
<!--<v-card-actions>-->
<!--<v-spacer></v-spacer>-->
<!--</v-card-actions>-->
<!--</v-card>-->
<!--</v-flex>-->
<!--</v-layout>-->
<!--</v-container>-->
<!--</v-card-text>-->
<!--</v-card>-->
<!--</v-tabs-content>-->
<!--</v-tabs-items>-->
<!--</v-tabs>-->
