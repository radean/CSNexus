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
            <v-progress-circular v-if="showProgress" indeterminate v-bind:size="75" color="yellow"></v-progress-circular>
            <Doughtnut :is="widgets.widget1.category" :chart-data="optionals[widgets.widget1.source]" :colors="widgets.widget1.colors" :options="optionsDoughnut"></Doughtnut>

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
            <!--<div class="header">{{ widgets.widget2.title }} </div> {{ widgets.widget2.description }}-->
            <!--<v-progress-circular v-if="showProgress" indeterminate v-bind:size="75" color="yellow"></v-progress-circular>-->
            <!--<Doughtnut :is="widgets.widget2.category" :chart-data="optionals[widgets.widget2.source]" :options="optionsDoughnut"></Doughtnut>-->

          </v-flex>
        </v-layout>
        </v-flex>
      <!--Three Charts-->
        <v-flex xs12>
            <v-layout wrap row class="ma-0 pb-0">
              <v-flex xs3 sm3 md3 class="GraphsContainer elevation-20">
                  <div class="header"> &nbsp; {{ widgets.widget3.title }} &nbsp; </div>{{ widgets.widget3.description }}
                  <!--<div class="barChart">-->
                  <!--<Doughtnut :is="widgets.widget3.category" :chart-data="optionals[widgets.widget3.source]" :options="optionsDoughnut"></Doughtnut>-->
                  <!--</div>-->
              </v-flex>
              <v-flex  class="GraphsContainer elevation-20">
                  <div xs3 sm3 md3 class="header"> &nbsp; {{ widgets.widget4.title }} &nbsp; </div>{{ widgets.widget4.description }}
                  <!--<div class="barChart">-->
                  <!--<Doughtnut :is="widgets.widget4.category" :chart-data="optionals[widgets.widget4.source]" :options="optionsDoughnut"></Doughtnut>-->
                  <!--</div>-->
              </v-flex>
              <v-flex xs3 sm3 md3  class="GraphsContainer elevation-20">
                  <div class="header"> &nbsp; {{ widgets.widget6.title }} &nbsp; </div>{{ widgets.widget6.description }}
                  <!--<div class="barChart">-->
                  <!--<Doughtnut :is="widgets.widget6.category" :chart-data="optionals[widgets.widget6.source]" :options="optionsDoughnut"></Doughtnut>-->
                  <!--</div>-->
              </v-flex>
            </v-layout>
        </v-flex>


      <v-flex xs12 class="reportContainer elevation-20">
        <!--<div class="header">&nbsp; {{ appInfo.widgets.widget06.title }} &nbsp;</div> {{ appInfo.widgets.widget06.description }}-->
        <div class="barChart">
          <!--<BarChart :chart-data="productCategoryData" :options="optionsCity"></BarChart>-->
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//  importing Charts
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
        widgets: {},
        recentReports: [
        ],
        recentEntriesHeader: [
            { text: 'B.A Name', value: 'baName', sortable: false },
            { text: 'Store Name', value: 'storeName', sortable: false },
            { text: 'Address', value: 'storeAddress', sortable: false },
            { text: 'Customer', value: 'customer', sortable: false }
        ],
        conversionData: null,
        tasteTrialData: null,
        productCategoryData: null,
        StoreDataCollection: null,
        CityDataCollection: null,
        stores: 20,
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
        optionsDoughnut: {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
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
      'Doughnut' : DoughNutChart,
      'app-user-count': UserCount,
      'ssCookingOil': ssCookingOil,
      'ssCanolaOil': ssCanolaOil,
      'ssBanaspatiOil': ssBanaspati,
      'ssBanaspatiWOlive': ssBanaspatiWOlive,
      'BarChart': BarChart,
//        Charts
      'LineChart': line,
      'radarChart': radarChart,
      'bubbleChart': BubbleChart
    },

    created(){
//        getting Random store Details
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
        this.dashboardSettings()
      this.$store.dispatch('fetchStoreReports');
      this.$store.dispatch('fetchAllStoreReports').then(() => {
////        Generating Objects
//        let widgets = this.widgets;
////        Iterating each widget to created related Labels and apply colors;
//        for(let key in widgets){
//            let source = widgets[key].source
//            let color = widgets[key].colors;
//            this.optionals[source] = {};
//            this.optionals[source].color = color
//            console.log('Each Iteration', widgets[key].colors);
//        }
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
        this.fillData();
//        this.$store.dispatch('fetchShopDetails', this.rndNumber.toString());
      }, 3000);
//      Sync Once after 3 seconds
        setTimeout(() =>{
//            let widgetUpdate = this.widgets.widget1;
//            let widgetUpdateSource = widgetUpdate.source;
//            let widgetSource = this.optionals[widgetUpdateSource];
//            let widgetColors = widgetUpdate.color;
            console.log('Sources', 'Times Up')
//        this.optionals[this.widgets.widget01.source] =
        }, 5000);

    },

    computed:{
      recentReport(){
        return this.$store.getters.recentReport;
      },
      optionalReport(){
        console.log('From Dashboard',this.$store.getters.optionalReport)
        return this.$store.getters.optionalReport;
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
      totalConversion(){
        return this.$store.getters.totalConversion;
      },
      totalTasteTrial(){
        return this.$store.getters.totalTasteTrial;
      },
      totalSales() {
        return this.$store.getters.totalSales;
      },
      totalPreviousUserButter() {
          return this.$store.getters.totalPreviousUserButter;
      },
      totalPreviousUserCheese() {
          return this.$store.getters.totalPreviousUserCheese;
      },
      totalPreviousUserFrozen() {
          return this.$store.getters.totalPreviousUserFrozen;
      },
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
      totalPurchases (){
//        GVs
        let sSCO = 0;
        let sCO = 0;
        let sSB = 0;
        let sSBO = 0;
        let sortSKU = []
        let totalSales = []
        let totalSaleCount = 0;
//        Getting Total Number of Purchases Form Server
        let totalPurchases = this.$store.getters.totalPurchases;
//        Breaking Down to Categories
        let obj = totalPurchases;
        for (let key in obj){
          sortSKU.push(obj[key].purchased)
        }
//        Total Sale Calculate
        sortSKU.forEach((obj) => {
          Object.keys(obj).forEach(function(k) {
            totalSales[k] = (totalSales[k] || 0) + parseInt(obj[k]);
          })
        });
        for (let key in totalSales){
            totalSaleCount += totalSales[key];
        }
        this.soyaSupremeSKU = totalSales;
//        Assigning to GVBs
        this.Purchases.sSCO = parseInt(sSCO);
        this.Purchases.sCO = parseInt(sCO);
        this.Purchases.sSB = parseInt(sSB);
        this.Purchases.sSBO = parseInt(sSBO);
//        this.totalSales = totalSaleCount;
        return totalSaleCount;
      },
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
        this.recentStore = check;
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
        fillData () {
        this.showProgress = false;
//        Recent Purchase
        this.recentPurchase();
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
        this.productCategoryData = {
            labels: [
                'Cheese',
                'Butter',
                'Block Cheese Cream',
                'Cream Food Service',
                'Milk',
                'Process Cheese',
                'Shakes',
                'Shredded Cheese',
                'Fish',
                'French Fries',
                'Fruits',
                'Meat',
                'Sea Food',
                'Vegetable'
            ],
            datasets: [
                {
                    backgroundColor: ['#d6a150', '#b78de5', '#3849d6', '#10293d', '#64d680', '#dbbf3a', '#937135','#d6a150', '#401585', '#3849d6', '#10293d', '#64d680', '#dbbf3a', '#937135'],
                    borderWidth: 0,
                    color: ['#d6a150', '#b78de5', '#3849d6', '#10293d', '#64d680', '#dbbf3a', '#937135','#d6a150', '#401585', '#3849d6', '#10293d', '#64d680', '#dbbf3a', '#937135'],
                    data: [
                        this.productCategory.BlockCheese,
                        this.productCategory.Butter,
                        this.productCategory.BlockCheeseCream,
                        this.productCategory.CreamFoodService,
                        this.productCategory.Milk,
                        this.productCategory.ProcessCheese,
                        this.productCategory.Shakes,
                        this.productCategory.ShreddedCheese,
                        this.productCategory.Fish,
                        this.productCategory.FrenchFries,
                        this.productCategory.Fruits,
                        this.productCategory.Meat,
                        this.productCategory.SeaFood,
                        this.productCategory.Vegetable
                    ]
                },
            ],
        };
//      Conversion Progress
//      How Many peoples converted to Emborg from other brands
//          For Butter
        this.previousUserButterData = {
            labels: ['Lurpak', 'Emborg', 'BlueBand', 'Nurpur', 'Aseel', 'Mumtaz', 'Other'],
            datasets: [
                {
                    backgroundColor: ['#172c69', '#6a2686', '#3ac2ff', '#ffe684', '#ac0705', '#158d45', '#b8b8b8'],
                    borderWidth: 0,
                    color: ['#172c69', '#6a2686', '#3ac2ff', '#ffe684', '#ac0705', '#158d45', '#b8b8b8'],
                    data: [
                        this.totalPreviousUserButter.Lurpak,
                        this.totalPreviousUserButter.Emborg,
                        this.totalPreviousUserButter.Blueband,
                        this.totalPreviousUserButter.Nurpur,
                        this.totalPreviousUserButter.Aseel,
                        this.totalPreviousUserButter.Mumtaz,
                        this.totalPreviousUserButter.Other
                    ]
                },
            ],
        };
//      For Cheese
        this.previousUserCheeseData = {
            labels: ['Emborg', 'Happy Cow', 'Adams', 'President', 'Lactima', 'Other'],
            datasets: [
                {
                    backgroundColor: ['#6a2686', '#a53a1a', '#05081b', '#f64614', '#0074bf', '#b8b8b8'],
                    borderWidth: 0,
                    color: ['#6a2686', '#a53a1a', '#05081b', '#f64614', '#0074bf', '#b8b8b8'],
                    data: [
                        this.totalPreviousUserCheese.Emborg,
                        this.totalPreviousUserCheese.HappyCow,
                        this.totalPreviousUserCheese.Adams,
                        this.totalPreviousUserCheese.President,
                        this.totalPreviousUserCheese.Lactima,
                        this.totalPreviousUserCheese.Other
                    ]
                },
            ],
        };
//        For Frozen
        this.previousUserFrozenData = {
            labels: ['Star', 'Fresh & Frozen', 'Other'],
            datasets: [
                {
                    backgroundColor: ['#467e25', '#41395e', '#b8b8b8'],
                    borderWidth: 0,
                    color: ['#467e25', '#41395e', '#b8b8b8'],
                    data: [
                        this.totalPreviousUserFrozen.Star,
                        this.totalPreviousUserFrozen.FreshAndFreeze,
                        this.totalPreviousUserFrozen.Other,
                    ]
                },
            ],
        };


        let optionalLabels = Object.keys( this.optionalReport.food);
        this.optionals['food'] = {
            labels: optionalLabels,
            datasets: [
                {
                    backgroundColor: ['#d6a150', '#3f91db'],
                    color: ['#ffc85a', '#49a9ff'],
                    data: [
                        this.optionalReport.food.yes,
//                        Taking Out Peoples who said Nothing or Clearly Say "NO"
                        this.optionalReport.food.no
                    ]
                },
            ],
        }
        let optionalLabelCuisine = Object.keys( this.optionalReport.days);
        this.optionals['days'] = {
          labels: optionalLabelCuisine,
          datasets: [
              {
                  backgroundColor: ['#d6a150', '#3f91db'],
                  borderWidth: 0,
                  color: ['#ffc85a', '#49a9ff'],
                  data: [
                      this.optionalReport.days.yes,
        //                        Taking Out Peoples who said Nothing or Clearly Say "NO"
                      this.optionalReport.days.no
                  ]
              },
          ],
        }


//      Conversion Progress
//      How Many peoples converted to Emborg from other brands
        this.tasteTrialData = {
            labels: ['Yes', 'No'],
            datasets: [
              {
                  backgroundColor: ['#d6a150', '#3f91db'],
                  borderWidth: 0,
                  color: ['#ffc85a', '#49a9ff'],
                  data: [
                      this.totalTasteTrial,
        //                        Taking Out Peoples who said Nothing or Clearly Say "NO"
                      (this.totalInterceptions - this.totalTasteTrial)
                  ]
              },
            ],
        }
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .GraphsContainer {
    /*max-width: 50%;*/
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
    min-width: 30%;
    background-color: rgba(240,240,240,0.2);
    margin: 10px;
    height: 240px;
    border: 1px solid #d8d8d8;
    border-radius: 14px;
    z-index: 2;
  }
  .reportContainer .header {
    height: 16%;
    margin-bottom: 10px;
    line-height: 200%;
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
