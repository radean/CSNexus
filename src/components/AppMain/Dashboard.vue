<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap justify-center class="mb-5 pb-5">
      <!--NUMBER WIDGETS-->
      <!--TOTAL PURCHASE-->
      <v-flex flex xs3>
        <v-card class="dashCards elevation-20">
          <v-card-title primary-title class="ma-0 pa-2"><h6 class="title ma-0 pa-0">Total Sales</h6></v-card-title>
          <v-card-text>
            <h2 class="display-3 blue--text ma-0 pa-0">
                {{ totalSales }}
            </h2>
          </v-card-text>
        </v-card>
      </v-flex>
      <!--TOTAL INTERCEPTION-->
      <v-flex flex xs3>
        <v-card class="dashCards elevation-20 " >
          <v-card-title primary-title class="ma-0 pa-2"><h6 class="title ma-0 pa-0">Interceptions</h6></v-card-title>
          <v-card-text>
            <h2 class="display-3 blue--text ma-0 pa-0" >
            {{ totalInterceptions }}
            </h2>
          </v-card-text>
        </v-card>
      </v-flex>
      <!--TOTAL Brand Ambassador-->
      <v-flex flex xs3>
        <v-card class="dashCards elevation-20 " >
          <v-card-title primary-title class="ma-0 pa-2"><h6 class="title ma-0 pa-0">Brand Ambassador</h6></v-card-title>
          <v-card-text>
            <h2 class="display-3 blue--text ma-0 pa-0" >
            {{ totalBAs }}
            </h2>
          </v-card-text>
        </v-card>
      </v-flex>
      <!--Store Amount-->
      <v-flex flex xs3>
        <v-card class="dashCards elevation-20 " >
          <v-card-title primary-title class="ma-0 pa-2"><h6 class="title ma-0 pa-0">Stores</h6></v-card-title>
          <v-card-text>
            <h2 class="display-3 blue--text ma-0 pa-0" >
            {{ totalStores }}
            </h2>
          </v-card-text>
        </v-card>
      </v-flex>
      <!--TOTAL Conversion-->
        <v-flex xs12>
            <v-layout row wrap >
          <v-flex md3 class="GraphsContainer elevation-20">
            <!--user chart WIDGET # 1-->
            <div class="header">{{ widgets.widget1.title }}</div> {{ widgets.widget1.description }}
            <!--<v-progress-circular v-if="showProgress" indeterminate v-bind:size="75" color="yellow"></v-progress-circular>-->
            <Doughtnut :is="widgets.widget1.category" :chart-data="questions[widgets.widget1.source]" :colors="widgets.widget1.colors" :options="chartOptionSelector(widgets.widget1.category)"></Doughtnut>

          </v-flex>
            <!--Recent Entries-->
            <v-flex md5 class="GraphsContainer elevation-20">
                <!--Entries-->
                <div class="header">Recent Entries</div>
                <v-data-table
                        :headers="recentEntriesHeader"
                        :items="recentReport"
                        hide-actions
                        class="elevation-0"
                        :loading = true
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.userName }}</td>
                        <td>{{ props.item.store.name }}</td>
                        <td>{{ props.item.store.address }}</td>
                        <td>{{ props.item.customerName }}</td>
                    </template>
                    <template slot="footer">
                        <td colspan="100%">
                            <strong>
                                <!--Footer Recent Entries-->
                            </strong>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>
          <!--TOTAL TasteTrial-->
          <v-flex md3 class="GraphsContainer elevation-20">
            <!--user chart WIDGET # 2-->
            <div class="header">{{ widgets.widget2.title }} </div> {{ widgets.widget2.description }}
            <!--<v-progress-circular v-if="showProgress" indeterminate v-bind:size="75" color="yellow"></v-progress-circular>-->
            <Doughtnut :is="widgets.widget2.category" :chart-data="questions[widgets.widget2.source]" :options="chartOptionSelector(widgets.widget2.category)"></Doughtnut>

          </v-flex>
        </v-layout>
        </v-flex>
      <!--Three Charts-->
        <!--<v-flex xs12>-->
            <!--<v-layout wrap row class="ma-0 pb-0">-->
              <!--<v-flex xs3 sm3 md3 class="GraphsContainer elevation-20">-->
                  <!--<div class="header"> &nbsp; {{ widgets.widget3.title }} &nbsp; </div>{{ widgets.widget3.description }}-->
                  <!--&lt;!&ndash;<div class="barChart">&ndash;&gt;-->
                  <!--&lt;!&ndash;<Doughtnut :is="widgets.widget3.category" :chart-data="optionals[widgets.widget3.source]" :options="chartOptionSelector(widgets.widget3.category)"></Doughtnut>&ndash;&gt;-->
                  <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--</v-flex>-->
              <!--<v-flex xs5 sm5 md5 class="GraphsContainer elevation-20">-->
                  <!--<div class="header"> &nbsp; {{ widgets.widget4.title }} &nbsp; </div>{{ widgets.widget4.description }}-->
                  <!--&lt;!&ndash;<div class="barChart">&ndash;&gt;-->
                  <!--&lt;!&ndash;<Doughtnut :is="widgets.widget4.category" :height='240' :chart-data="optionals[widgets.widget4.source]" :options="chartOptionSelector(widgets.widget4.category)"></Doughtnut>&ndash;&gt;-->
                  <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--</v-flex>-->
              <!--<v-flex xs3 sm3 md3 class="GraphsContainer elevation-20">-->
                  <!--<div class="header"> &nbsp; {{ widgets.widget5.title }} &nbsp; </div>{{ widgets.widget5.description }}-->
                  <!--&lt;!&ndash;<div class="barChart">&ndash;&gt;-->
                  <!--&lt;!&ndash;<Doughtnut :is="widgets.widget5.category" :chart-data="optionals[widgets.widget5.source]" :options="chartOptionSelector(widgets.widget5.category)"></Doughtnut>&ndash;&gt;-->
                  <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--</v-flex>-->
            <!--</v-layout>-->
        <!--</v-flex>-->

      <!--Two Charts-->
      <v-flex xs12>
          <v-container grid-list-md text-xs-left class="pa-0">
            <v-layout wrap row class="ma-0 pb-0">
                <v-flex xs12 class="GraphsContainer elevation-20">
                    <div class="header"> &nbsp; Optional Questions &nbsp; </div>
                    <!--<div class="barChart">-->
                    <Doughtnut :is="widgets.widget3.category" :height='240' :chart-data="optionalDataset" :options="optionsCity"></Doughtnut>
                    <!--</div>-->
                </v-flex>
                <v-flex xs12 class="GraphsContainer elevation-20">
                    <div class="header"> &nbsp; Product Sales &nbsp; </div>
                    <!--<div class="barChart">-->
                    <Doughtnut :is="widgets.widget3.category" :height='240' :chart-data="purchaseChart" :options="optionsCity"></Doughtnut>
                    <!--</div>-->
                </v-flex>
            </v-layout>
          </v-container>
    </v-flex>
    <!--<v-flex xs12>-->
        <!--<v-container grid-list-md text-xs-left class="pa-0">-->
            <!--<v-layout wrap row class="ma-0 pb-0">-->
                <!--<v-flex class="GraphsContainer elevation-20">-->
                    <!--<div class="header"> &nbsp; {{ widgets.widget3.title }} &nbsp; </div>{{ widgets.widget3.description }}-->
                    <!--&lt;!&ndash;<div class="barChart">&ndash;&gt;-->
                    <!--<Doughtnut :is="widgets.widget3.category" :height='240' :chart-data="optionals[widgets.widget3.source]" :options="chartOptionSelector(widgets.widget3.category)"></Doughtnut>-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--</v-flex>-->
                <!--<v-flex  class="GraphsContainer elevation-20">-->
                    <!--<div class="header"> &nbsp; {{ widgets.widget4.title }} &nbsp; </div>{{ widgets.widget4.description }}-->
                    <!--&lt;!&ndash;<div class="barChart">&ndash;&gt;-->
                    <!--<Doughtnut :is="widgets.widget4.category" :height='240' :chart-data="optionals[widgets.widget4.source]" :options="chartOptionSelector(widgets.widget4.category)"></Doughtnut>-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--</v-flex>-->
            <!--</v-layout>-->
        <!--</v-container>-->
    <!--</v-flex>-->

      <!--<v-flex xs12 class="reportContainer elevation-20">-->
        <!--<div class="header">&nbsp; {{ widgets.widget5.title }} &nbsp;</div> {{ widgets.widget5.description }}-->
        <!--<div class="barChart">-->
          <!--<BarChart :chart-data="datasetChart" :options="optionsCity"></BarChart>-->
        <!--</div>-->
      <!--</v-flex>-->
    </v-layout>
  </v-container>
</template>

<script>
//  Importing Charts

//  Importing Charts
  import ssCookingOil from '../Charts/ssCanolaOil'
  import UserCount from '../Charts/LineChart'
  import DoughNutChart from '../Charts/DoughNutChart'
  import BarChart from '../Charts/BarChart'
  import BubbleChart from '../Charts/bubbleChart'
  import line from '../Charts/line'
  import ssCanolaOil from '../Charts/ssCanolaOil'
  import ssBanaspati from '../Charts/ssBanaspatiGhee'
  import ssBanaspatiWOlive from '../Charts/ssBanaspatiWOlive'
  import radarChart from "../Charts/radarChart";

  export default {
    data () {
      return {
//      data
        storeData: [],
//      progress Bars
        showProgress: true,
        todayProgress: 58,
        monthProgress: 40,
        activeMerchandiser: 0,
        khi_Stores_visited: 12,
        lhr_Stores_visited: 15,
        isd_Stores_visited: 24,
//      Charts Data
        optionals: {},
        questions: {},
        widgets: {},
        recentReports: [
        ],
        recentEntriesHeader: [
            { text: 'B.A Name', value: 'baName', sortable: false },
            { text: 'Store Name', value: 'storeName', sortable: false },
            { text: 'Address', value: 'storeAddress', sortable: false },
            { text: 'Customer', value: 'customer', sortable: false }
        ],
//        conversionData: null,
//        tasteTrialData: null,
//        productCategoryData: null,
//        StoreDataCollection: null,
//        CityDataCollection: null,
        stores: 20,
//          Chart Data
        optionalDataset: {
        },
        questionsDataset: {
        },
        datasetChart: {
          labels: ['KHI', 'LHR', 'ISD'],
          datasets: [
              {
                  labels: ['Yes'],
                  backgroundColor: ['#FF4944', '#D80600', 'yellow'],
                  borderWidth: 1,
                  color: ['#FF4944', '#D80600', 'yellow'],
                  data: [33,23,16]
              },
              {
                  labels: ['No'],
                  backgroundColor: ['#f5ff4e', '#f5ff4e', 'f5ff4e'],
                  borderWidth: 1,
                  color: ['#f5ff4e', '#f5ff4e', 'f5ff4e'],
                  data: [5,5,9]
              },
          ],
        },
        purchaseChart: {},
        chartOptions: {
            dataLabels: {
                enabled: false
            },
            chart: {
                id: "chartArea",
                toolbar: {
                    autoSelected: "pan",
                    show: false
                }
            },
            responsive: [{
                breakpoint: 320,
                options: {
                    chart: {
                        width: 240
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            legend: {
                show: false
            }
        },
//          Charts Configurations
        optionsCity: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
            labels: {
              // This more specific font property overrides the global property
              fontColor: '#000000',
              padding: 1,
              boxWidth: 1,
              usePointStyle: true
            }
          },
          scales: {
            xAxes: [{
              ticks: {
                fontColor: "black",
                autoSkip: false
              },
              barPercentage: 1,
              gridLines: {
                offsetGridLines: false
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero:true,
                fontColor: "black",

              },
              gridLines: {
                offsetGridLines: false
              }
            }]
          }
        },
        optionsLine: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            labels: {
              // This more specific font property overrides the global property
              fontColor: 'black',
            }
          }
        },
        barChart: {
            legend: {
                display: false,
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: '#000000',
                    padding: 1,
                    boxWidth: 1,
                    usePointStyle: true
                }
            },
            barValueSpacing: 20,
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: "black",
                        autoSkip: false
                    },
                    barPercentage: 1,
                    gridLines: {
                        offsetGridLines: false,
                        display:false
                    }
                }],
                yAxes: [{
                    stacked:true,
                    gridLines: {
                        display:true,
                        offsetGridLines: false,
                        color:"rgba(255,99,132,0.2)"
                    },
                    ticks: {
                        beginAtZero:true,
                        fontColor: "black",
                    }
                }]
            }
        },
        doughnutChart: {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                display: false,
                position: 'top',
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: 'black',
                }
            }
        }
      }
    },

    components:{
      'DoughnNutChart' : DoughNutChart,
      'doughnutChart' : DoughNutChart,
      'app-user-count': UserCount,
      'ssCookingOil': ssCookingOil,
      'ssCanolaOil': ssCanolaOil,
      'ssBanaspatiOil': ssBanaspati,
      'ssBanaspatiWOlive': ssBanaspatiWOlive,
      'BarChart': BarChart,
//        Charts
      'LineChart': line,
      'radarChart': radarChart,
      'bubbleChart': BubbleChart,
    },

    created(){
//        Pushing out user from the system
      if (this.$store.getters.user === null) {
        this.$router.push('/login')
      }


//        widgets.forEach((widget) => {
//            console.log('Each Iteration', widget);
//        });

//      Fetching Interception Action
//            Please Look in it!
//        ===========================================================
//      this.$store.dispatch('fetchTotalInterceptions');
      this.dashboardSettings();
      this.$store.dispatch('fetchStoreReports');
      this.$store.dispatch('fetchRecentReports');
//      start NProgress
      this.$Progress.start();
      this.$store.dispatch('fetchAllStoreReports').then(() => { setTimeout(() => {
//    First Creating Optionals objects and its DATA
//          Getting the optionals put variable
          let optional = this.optionals;
//          Getting Data from Server [In this case coming from $Store]
          let optionalReports = this.$store.getters.optionalReport;

//          Now iterating Data[from Server] to find its keys
          let keyName = Object.keys(optionalReports);
//          Creating a new object inside optional
          keyName.forEach((name) => {
              optional[name] = {}
          });
          this.$Progress.finish();
//          console.log( 'Total Purchased' , this.totalPurchases)
      }, 6000);

      });
      this.$store.dispatch('baListUPD');
      this.$store.dispatch('storeListUPD');
//        ===========================================================
//      let recentReports =
//      setTimeout(() => {
//        this.$store.dispatch('fetchCampaignReports');
//      },4000)
    },

    mounted() {
//        sync Data after 2 seconds
      setInterval(() =>{
//        this.fillData();
//          Setting up chart PaymentDetails
        this.updateCharts();
//        this.$store.dispatch('fetchShopDetails', this.rndNumber.toString());
//          console.log('3 Seconds Timer', 'Ping!')
      }, 5000);
//      Sync Once after 3 seconds

    },

    computed:{
      recentReport(){
        return this.$store.getters.recentReport;
      },
      optionalReports(){
//        console.log('From Dashboard',this.$store.getters.optionalReport)
        return this.$store.getters.optionalReport;
      },
      optionalParameter(){
          return this.$store.getters.optionalParameter;
      },
      appInfo(){
        return this.$store.getters.appinfo;
      },
      dashboardWidgets(){
//      local variables
//          let dashboardWidgetList = this.$store.getters.dashboardWidgets
          return this.$store.getters.dashboardWidgets
      },
      totalBAs(){
        return this.$store.getters.totalBA;
      },
      totalStores(){
        return this.$store.getters.totalStore;
      },
      totalPurchases(){
        return this.$store.getters.totalPurchases;
      },
      skusData(){
        return this.$store.getters.skusLists;
      },
      totalConversion(){
        return this.$store.getters.totalConversion;
      },
//      totalTasteTrial(){
//        return this.$store.getters.totalTasteTrial;
//      },
      totalSales() {
        return this.$store.getters.totalSales;
      },
//      totalPreviousUserButter() {
//          return this.$store.getters.totalPreviousUserButter;
//      },
//      totalPreviousUserCheese() {
//          return this.$store.getters.totalPreviousUserCheese;
//      },
//      totalPreviousUserFrozen() {
//          return this.$store.getters.totalPreviousUserFrozen;
//      },
      productCategory() {
          return this.$store.getters.productCategory;
      },
//      storelist(){
//        return this.$store.getters.storeList.length;
//      },
      storeDetails(){
        this.storeData = this.$store.getters.storeDetails;
      },
//      fetching interception
      totalInterceptions(){
        return this.$store.getters.totalInterceptions;
      },
//      totalPurchases (){
////        GVs
//        let sSCO = 0;
//        let sCO = 0;
//        let sSB = 0;
//        let sSBO = 0;
//        let sortSKU = []
//        let totalSales = []
//        let totalSaleCount = 0;
////        Getting Total Number of Purchases Form Server
//        let totalPurchases = this.$store.getters.totalPurchases;
////        Breaking Down to Categories
//        let obj = totalPurchases;
//        for (let key in obj){
//          sortSKU.push(obj[key].purchased)
//        }
////        Total Sale Calculate
//        sortSKU.forEach((obj) => {
//          Object.keys(obj).forEach(function(k) {
//            totalSales[k] = (totalSales[k] || 0) + parseInt(obj[k]);
//          })
//        });
//        for (let key in totalSales){
//            totalSaleCount += totalSales[key];
//        }
//        this.soyaSupremeSKU = totalSales;
////        Assigning to GVBs
//        this.Purchases.sSCO = parseInt(sSCO);
//        this.Purchases.sCO = parseInt(sCO);
//        this.Purchases.sSB = parseInt(sSB);
//        this.Purchases.sSBO = parseInt(sSBO);
////        this.totalSales = totalSaleCount;
//        return totalSaleCount;
//      },
    },
//    All Charts Update Information
    methods: {
        recentPurchase() {
        let storeReport = [];
        storeReport = this.$store.getters.recentReport;
        let check = [];
        for (let key in storeReport){
          check.push({
            title: storeReport[key].store.name,
            address: storeReport[key].store.address,
            customer: storeReport[key].customerName,
            baName: storeReport[key].userName
          })
        }
//        console.log('Recent Reports', check)
        this.recentReports = check;
        return true
      },
        dashboardSettings(){
            let widgets = this.widgets;
            let settings = this.$store.getters.dashboardSettings;
            let guiData = this.$store.getters.dashboardWidgets;

        //          iterate and applying each settings on Widgets
            for(let key in guiData){
                for (let skey in settings){
                    if(settings[skey] == guiData[key].id){
                        widgets[skey] = guiData[key];
                    }
                }
            }
//            console.log('GUI Data', widgets);
        },
        chartOptionSelector(category) {
//            Conditioning the existance of parameter
            if (category != null || category != ''){
//                Matching the Category from list of Charts
                switch(category) {
                    case 'barChart':
                        return this.barChart;
                        break;
                    case 'doughnutChart':
                        return this.doughnutChart;
                        break;
                    case 'lineChart':
                        return this.barChart
                        break;
//                    case 'radarChart':
//                        return 'radarChart'
//                        break;
//                    case 'bubbleChart':
//                        return 'bubbleChart'
//                        break;
                    default:
                        return 'doughnutChart';
                }
            } else {
                console.log('Not appropriate Category');
            }
        },
        updateCharts(){
//            Before anything we have to launch
            this.recentPurchase();
//          First Creating Optionals objects and its DATA
//          Getting the optionals put variable
            let optional = this.optionals;
            let totalPurchase = this.totalPurchases;
            let skus = this.skusData;
            let skusColor = [];
            let totalPurchaseChart = {};
            let questions = this.questions;
//          Getting Data from Server [In this case coming from $Store]
            let optionalReports = this.$store.getters.optionalReport;
            let questionReports = this.$store.getters.questionReport;
            let widgets = this.widgets;

//      Increasing autonimius Process
//            console.log('Question Report', questionReports);
//      Creating Dataset of each Chart for optionals
//            console.log('optional Data', optional);
//            for (let okey in optional){
////              Finding assigned Widget
//                for (let wkey in widgets){
////                  Conditioning if Match
//                    if (widgets[wkey].source == okey){
////                        Total Numbers
//                        let yes = parseInt(optionalReports[okey].yes);
//                        let no = parseInt(optionalReports[okey].no);
////                      console.log('From Widget', widgets[wkey])
////                        console.log('From Widget MATCHED', ' ==>  Widget Source = ' + widgets[wkey].source + ' . Optionals Key = ' + okey)
////                      If Widget contain a color array then
//                        if (widgets[wkey].colors != null){
////                            If the charts category is Doughnut or Pie
//                            if (widgets[wkey].category == 'doughnutChart' || widgets[wkey].category == 'pieChart') {
////                                console.log(widgets[wkey].id)
//                                let color = widgets[wkey].colors;
//                                optional[okey] = {
//                                    labels: ['Yes', 'No'],
//                                    datasets: [{
//                                        label: widgets[wkey].title,
//                                        backgroundColor: color,
//                                        color: color,
//                                        data: [yes, no]
//                                    }
//                                    ]
//                                }
//                            } else {
////                            If the charts category are not Doughnut or Pie
//                                let color = widgets[wkey].colors;
//                                console.log(yes + '-' + no);
//                                optional[okey] = {
//                                    labels: ['Yes', 'No'],
//                                    datasets: [{
//                                        backgroundColor: color,
//                                        color: color,
//                                        data: [
//                                            yes,
////                                    Taking Out Peoples who said Nothing or Clearly Say "NO"
//                                            no
//                                        ]
//                                        }
//                                    ]
//                                }
//                            }
//                        } else {
//                            optional[okey] = {
//                                labels: ['Yes', 'No'],
//                                datasets: [{
//                                    backgroundColor: ['#d6a150', '#3f91db'],
//                                    color: ['#ffc85a', '#49a9ff'],
//                                    data: [
//                                        yes,
////                                    Taking Out Peoples who said Nothing or Clearly Say "NO"
//                                        no
//                                    ]
//                                }
//                                ]
//                            }
////                            console.log('From Widget Color UNMATCHED',
////                                ' ==>  Widget Source = ' + widgets[wkey].id +
////                                ' . Data Array = ' + optionalReports[okey].yes +
////                                '-' + optionalReports[okey].no);
////                      Assigning parameters on charts
////                      let keyNames = Object.keys(optionalReport[okey]);
////                      console.log('Optional Keys',optionalReport[okey])
//
//                        }
////                        console.log('From Widget MATCHED', ' ==>  Widget Source = ' + widgets[wkey].source + ' . Optionals Key = ' + optional[okey])
//                    }
//                }
//    }
//      Creating Dataset of  each Chart for questiosn

//            Total Purchases into Data Chart
//            Setting Colors
            for (let cKey in skus){
                skusColor.push(skus[cKey].color)
            }

//            Setting DataSets
            totalPurchaseChart = {
                labels: totalPurchase.name,
                datasets: [
                    {
                        backgroundColor: skusColor,
                        borderWidth: 1,
                        color: skusColor,
                        data: totalPurchase.data
                    },
                ],
            }

//            Setting to Main totalPurchase
            this.purchaseChart = totalPurchaseChart;


//            console.log('SKUS Color Array ', skusColor)
//              Finding assigned Widget

//            Total Question into Data Chart
            for (let qkey in questionReports){
//                console.log('Question inside Data', questions[qkey] +' KEY '+ qkey + 'INIT' + questions);
//              Finding assigned Widget
                for (let wkey in widgets){
//                  Conditioning if Match
                    if (widgets[wkey].source == qkey){
//                        Total Numbers
//                        let yes = parseInt(optionalReports[okey].yes);
//                        let no = parseInt(optionalReports[okey].no);
//                        console.log('Question inside Data', questionReports[qkey]);
//                        console.log('qkey', qkey);
//                        console.log('qkey', questionReports);
                        let dataArray = []
                        let labels = [];
                        for (var items in questionReports[qkey]){
                            dataArray.push( questionReports[qkey][items]);
                            labels.push(items);
                        }
//                        console.log('DArray', qkey + '=>' + labels);
//                      console.log('From Widget', widgets[wkey])
//                        console.log('From Widget MATCHED', ' ==>  Widget Source = ' + widgets[wkey].source + ' . Optionals Key = ' + okey)
//                      If Widget contain a color array then
                        if (widgets[wkey].colors != null){
//                            If the charts category is Doughnut or Pie
                            if (widgets[wkey].category == 'doughnutChart' || widgets[wkey].category == 'pieChart') {
//                                console.log(widgets[wkey].id)
                                let color = widgets[wkey].colors;
                                questions[qkey] = {
                                    labels: labels,
                                    datasets: [{
                                        label: widgets[wkey].title,
                                        backgroundColor: color,
                                        color: color,
                                        data: dataArray
                                    }
                                    ]
                                }
                            } else {
//                            If the charts category are not Doughnut or Pie
                                let color = widgets[wkey].colors;
//                                console.log(yes + '-' + no);
                                questions[qkey] = {
                                    labels: labels,
                                    datasets: [{
                                        backgroundColor: color,
                                        color: color,
                                        data: dataArray
                                    }
                                    ]
                                }
                            }
                        } else {
                            questions[qkey] = {
                                labels: labels,
                                datasets: [{
                                    backgroundColor: ['#d6a150', '#3f91db'],
                                    color: ['#ffc85a', '#49a9ff'],
                                    data: dataArray
                                }
                                ]
                            }
//                            console.log('From Widget Color UNMATCHED',
//                                ' ==>  Widget Source = ' + widgets[wkey].id +
//                                ' . Data Array = ' + optionalReports[okey].yes +
//                                '-' + optionalReports[okey].no);
//                      Assigning parameters on charts
//                      let keyNames = Object.keys(optionalReport[okey]);
//                      console.log('Optional Keys',optionalReport[okey])

                        }
//                        console.log('From Widget MATCHED', ' ==>  Widget Source = ' + widgets[wkey].source + ' . Optionals Key = ' + optional[okey])
                    }
                }
            }
//            console.log('Question inside Data', question);
//            Creating Datasets of Cumulative charts means y adding all optionals into one
//            let chartsdatasets = {};
            let datasetsLabels = [];
//            let datasetColors = [];
            let dataset = [];
            let chartsData = {};
            let chartsAltData = {};
            let chartColors = {
                yes: [],
                no: []
            };

            chartsData.color = [];
            chartsData.data = {}
//            Setting keys in ChartsData
            for (let key in optionalReports){
                let optionalData = optionalReports[key];
                for (let okey in optionalData){
                    chartsData.data[okey] = [];
                    chartsAltData[okey] = [];

                }
            }

            for (let key in optionalReports){
//                pushing labels inside labels
                datasetsLabels.push(key);
//                Dividing the labels
                let optionalData = optionalReports[key];
//                Setting Datas Values
                chartsAltData = optionalReports[key];
                for (let okey in optionalData){
                    chartsData.data[okey].push(optionalData[okey]);
                }
            }
//            Creating Colors
            let optParameter = this.optionalParameter;
//            let rgbColors = ['rgb(200, 160, 140)', 'rgb(162, 33, 140)', 'rgb(12, 160, 50)', 'rgb(18, 160, 60)', 'rgb(90, 160, 20)', 'rgb(0, 160, 0)', 'rgb(0, 160, 140)' , 'rgb(0, 33, 140)']
//            chartsData.color = rgbColors;
            for (let optPKe in optParameter) {
//                pushing Color inside labels
                chartsData.color.push(optParameter[optPKe].color);
                chartColors['yes'].push(optParameter[optPKe].color[0]);
                chartColors['no'].push(optParameter[optPKe].color[1]);
            }
//          Iterating from chartsData to form Datasets
//            comparing optianl parameter to assign colors
            for (let ckey in chartsData.data) {
//              Forming datasets
                dataset.push({
//                        label: ['yes', 'No'],
                    label: ckey,
                    backgroundColor: chartColors[ckey],
                    color: chartsData.color[ckey],
                    data: chartsData.data[ckey]
                });
            }
//            Forming the optionals
            this.optionalDataset = {
                labels: datasetsLabels,
                datasets: dataset
            };

//            For Setting Questions Charts
//            console.log('Charts =>', chartsData);
//            console.log('Charts Dataset', this.optionalDataset);
//            console.log('optionals from DT', optional);
//            console.log('Charts Dataset before', chartsdatasets);
//            combining Labels and datasets
//            console.log('Charts Dataset', chartsdatasets);
//            this.optionalDataset = dataset;
//            chartsdatasets.forEach((chartData, key) => {
//                this.optionalDataset[key] = chartData
//            })
//       Setting loading to false
            this.showProgress = false;
        },
//        fillData () {
//        this.showProgress = false;
//        Recent Purchase
//        this.recentPurchase();
//        City progress
//        this.CityDataCollection = {
//          labels: ['KHI', 'LHR', 'ISD'],
//          datasets: [
//            {
//              labels: ['KHI', 'LHR', 'ISD'],
//              backgroundColor: ['#FF4944', '#D80600', '#990000'],
//              borderWidth: 1,
//              color: ['#FF4944', '#D80600', '#990000'],
//              data: [this.khi_Stores_visited,this.lhr_Stores_visited,this.isd_Stores_visited]
//            },
//          ],
//        };
//      Category Wise Bar Chart
//      first we have to Define how many Categories we have
//        We have:
//          BlockCheese
//          Butter
//          BlockCheeseCream
//          CreamFoodService
//          Milk
//          ProcessCheese
//          Shakes
//          ShreddedCheese
//          Fish
//          FrenchFries
//          Fruits
//          Meat
//          SeaFood
//          Vegetable
//          console.log(this.productCategory);/**/
//        this.productCategoryData = {
//            labels: [
//                'Cheese',
//                'Butter',
//                'Block Cheese Cream',
//                'Cream Food Service',
//                'Milk',
//                'Process Cheese',
//                'Shakes',
//                'Shredded Cheese',
//                'Fish',
//                'French Fries',
//                'Fruits',
//                'Meat',
//                'Sea Food',
//                'Vegetable'
//            ],
//            datasets: [
//                {
//                    backgroundColor: ['#d6a150', '#b78de5', '#3849d6', '#10293d', '#64d680', '#dbbf3a', '#937135','#d6a150', '#401585', '#3849d6', '#10293d', '#64d680', '#dbbf3a', '#937135'],
//                    borderWidth: 0,
//                    color: ['#d6a150', '#b78de5', '#3849d6', '#10293d', '#64d680', '#dbbf3a', '#937135','#d6a150', '#401585', '#3849d6', '#10293d', '#64d680', '#dbbf3a', '#937135'],
//                    data: [
//                        this.productCategory.BlockCheese,
//                        this.productCategory.Butter,
//                        this.productCategory.BlockCheeseCream,
//                        this.productCategory.CreamFoodService,
//                        this.productCategory.Milk,
//                        this.productCategory.ProcessCheese,
//                        this.productCategory.Shakes,
//                        this.productCategory.ShreddedCheese,
//                        this.productCategory.Fish,
//                        this.productCategory.FrenchFries,
//                        this.productCategory.Fruits,
//                        this.productCategory.Meat,
//                        this.productCategory.SeaFood,
//                        this.productCategory.Vegetable
//                    ]
//                },
//            ],
//        };

//      Optionals Information Manuplating
//      Re-rendering all charts


//        let optionalLabels = Object.keys( this.optionalReports.food);
//        let optionalLabelCuisine = Object.keys( this.optionalReports.days);
//      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .GraphsContainer {
    /*max-width: 50%;*/
    max-height: 320px;
    background-color: rgba(240,240,240,0.2);
    margin: .5vw;
    text-align: center;
    padding-bottom: 0px;
    border: 1px solid #d8d8d8;
    border-radius: 14px;
    z-index: 2;
  }
  .GraphsContainer .header {
    background-color: rgba(0,0,0,0.1);
    border-radius: 14px;
    font-size:18px;
  }
  .reportContainer {
    /*min-width: 30%;*/
    background-color: rgba(240,240,240,0.2);
    margin: .5vw;
    max-height: 280px;
    height: 240px;
    border: 1px solid #d8d8d8;
    text-align: center;
    padding-bottom: 0px;
    border-radius: 14px;
    z-index: 2;
  }
  .reportContainer .header {
    background-color: rgba(0,0,0,0.1);
    border-radius: 14px;
    font-size: 18px;
  }
  .dashCards {
    max-width: 100%;
    background-color: rgba(240,240,240,0.6);
    margin: 10px;
    text-align: center;
    padding-bottom: 5px;
    border: 1px solid #d8d8d8;
    border-radius: 14px;
    z-index: 2;
  }
  .barChart {
    width: 100%;
    height: 120px;
    z-index: 2;
  }
  .barChart div{
    height: 180px;
    z-index: 2;
  }
  .BigContainerChart{
    width: 100%;
    height: 180px;
    z-index: 2;
  }
  .BigContainerChart div{
    height: 180px;
    z-index: 2;
  }
  table.table tbody td {
      padding: 0px 0px 0px 0px;
  }
  soyaSupremeCookingOilbarChart{
    width: 100%;
    height: 260px;
  }
  .soyaSupremeCookingOilbarChart div{
    height: 160px;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    /*transform: translateX(-10px);*/
    transform: scaleY(0)
  }

</style>
