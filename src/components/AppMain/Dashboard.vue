<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap class="mb-5 pb-5">
      <!--<v-toolbar class="green lighten-2">-->
        <!--<v-toolbar-title>DASHBOARD</v-toolbar-title>-->
        <!--<v-spacer></v-spacer>-->
        <!--<v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>-->
        <!--<v-toolbar-items class="hidden-sm-and-down">-->
          <!--<v-btn flat>STATS</v-btn>-->
        <!--</v-toolbar-items>-->
      <!--</v-toolbar>-->

      <!--NUMBER WIDGETS-->
      <v-flex flex xs2>
        <v-card class="dashCards elevation-10">
          <v-card-title primary-title class="ma-0 pa-1"><h6 class="ma-0 pa-0">TOTAL SALES</h6></v-card-title>
          <v-card-text>
            <h2 class="green--text ma-0 pa-0">{{ totalPurchases }}</h2>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex flex xs2>
        <v-card class="dashCards elevation-5" >
          <v-card-title primary-title class="ma-0 pa-1"><h6 class="ma-0 pa-0">INTERCEPTIONS</h6></v-card-title>
          <v-card-text>
            <h2 class="green--text ma-0 pa-0" >{{ totalInterceptions }}</h2>
          </v-card-text>
        </v-card>
      </v-flex>

        <!--Store Amount-->
      <v-flex xs3 class="GraphsContainer elevation-20">
        <!--user chart-->
        <div class="header">STORES</div>
        <v-progress-circular v-if="showProgress" indeterminate v-bind:size="75" color="yellow"></v-progress-circular>
        <app-user-count :chart-data="StoreDataCollection" :options="optionsDoughnut"></app-user-count>
      </v-flex>





      <v-flex xs4 class="GraphsContainer elevation-20">
        <div class="header">RECENT STORES</div>
      </v-flex>
      <!--Active users-->
      <!--<v-flex xs3 class="GraphsContainer elevation-20" style="height: 100px">-->
        <!--<div class="header">ACTIVE USER</div>-->
          <!--<h3 class="green&#45;&#45;text">{{ activeMerchandiser }}</h3>-->
      <!--</v-flex>-->
      <!--Soya Supreme Cooking Oil-->
      <v-flex xs11 class="reportContainer elevation-21">
        <div class="header">SOYA SUPREME COOKING OIL</div>
            <div class="barChart">
              <ssCookingOil :chart-data="soyaSupremeCookingOilChart" :options="optionsCity"></ssCookingOil>
            </div>
      </v-flex>
      <!--Soya Supreme Canola Oil-->
      <v-flex xs11 class="reportContainer elevation-20">
        <div class="header">SOYA SUPREME CANOLA OIL</div>
        <div class="barChart">
          <ssCanolaOil :chart-data="soyaSupremeCanolaOilChart" :options="optionsCity"></ssCanolaOil>
        </div>
      </v-flex>
      <!--Soya Supreme Banaspati-->
      <v-flex xs5 class="reportContainer elevation-20">
        <div class="header">SOYA SUPREME BANASPATI</div>
        <div class="barChart">
          <ssBanaspatiOil :chart-data="soyaSupremeBanaspatiChart" :options="optionsCity"></ssBanaspatiOil>
        </div>
      </v-flex>
      <!--Soya Supreme Banaspati with Olive Oil-->
      <v-flex xs5 class="reportContainer elevation-20">
        <div class="header">SOYA SUPREME BANASPATI WITH OLIVE OIL</div>
        <div class="barChart">
          <ssBanaspatiWOlive :chart-data="soyaSupremeBanaspatiOliveChart" :options="optionsCity"></ssBanaspatiWOlive>
        </div>
      </v-flex>
      <!--<v-flex xs4 class="reportContainer elevation-20">-->
        <!--<div class="header">REPORT</div>-->
        <!--<v-container grid-list-md text-xs-center>-->
          <!--<v-layout row wrap>-->
            <!--<v-flex xs6>-->
              <!--<h6>TODAY</h6>-->
              <!--<v-progress-circular-->
                <!--v-bind:size="100"-->
                <!--v-bind:width="15"-->
                <!--v-bind:rotate="360"-->
                <!--v-bind:value="todayProgress"-->
                <!--color="green"-->
              <!--&gt;-->
                <!--{{ todayProgress }}-->
              <!--</v-progress-circular>-->
            <!--</v-flex>-->
            <!--<v-flex xs6>-->
              <!--<h6>MONTH</h6>-->
              <!--<v-progress-circular-->
                <!--v-bind:size="100"-->
                <!--v-bind:width="15"-->
                <!--v-bind:rotate="360"-->
                <!--v-bind:value="monthProgress"-->
                <!--color="yellow"-->
              <!--&gt;-->
                <!--{{ monthProgress }}-->
              <!--</v-progress-circular>-->
            <!--</v-flex>-->
          <!--</v-layout>-->
        <!--</v-container>-->
      <!--</v-flex>-->
    </v-layout>
  </v-container>
</template>

<script>
//  importing Charts
  import ssCookingOil from '../Charts/ssCanolaOil'
  import UserCount from '../Charts/LineChart'
  import ssCanolaOil from '../Charts/ssCanolaOil'
  import ssBanaspati from '../Charts/ssBanaspatiGhee'
  import ssBanaspatiWOlive from '../Charts/ssBanaspatiWOlive'


  export default {
    data () {
      return {
//      data
        totalSales: 0,
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
        StoreDataCollection: null,
        CityDataCollection: null,
        soyaSupremeCookingOilChart: null,
        soyaSupremeCanolaOilChart: null,
        soyaSupremeBanaspatiChart: null,
        soyaSupremeBanaspatiOliveChart: null,
        soyaSupremeSKU: {
          sscbottle1ltr: 1,
          sscbottle3ltr: 2,
          sscbottle5ltr: 3,
          sscpoly1_5ltr: 18,
          ssctin2_5ltr: 5,
          ssctin5ltr: 6,
          ssctin10ltr: 66,
          sscpresspour3ltr: 8,
          sscpresspour5ltr: 9,
          sscjcan10ltr: 10,
          sscjcan16ltr: 11,
          scbottle1ltr: 1,
          scbottle3ltr: 2,
          scbottle4_5ltr: 3,
          scpoly1_5ltr: 18,
          sctin2_5ltr: 5,
          scjcan10ltr: 6,
          scjcan16ltr: 66,
          ssbpoly1_5ltr: 1,
          ssbtin25ltr: 23,
          ssbtin5ltr: 3,
          ssbopoly1_5ltr: 33,
          ssbotin25ltr: 23,
          ssbotin5ltr: 3
        },
        stores: 20,
        Purchases: {
          sSCO: 32,
          sCO: 48,
          sSB: 8,
          sSBO: 16
        },
        optionsCity: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
            labels: {
              // This more specific font property overrides the global property
              fontColor: '#FFFFFF',
              padding: 10,
              boxWidth: 10,
              usePointStyle: false
            }
          },
          scales: {
            xAxes: [{
              ticks: {
                fontColor: "white",
              },
              barPercentage: 1,
              gridLines: {
                offsetGridLines: false
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero:true,
                fontColor: "white",
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
              fontColor: 'white',
              padding: 10,
              boxWidth: 20,
              usePointStyle: true
            }
          }
        },
        optionsDoughnut: {
          responsive: true,
          maintainAspectRatio: true,
          fullWidth: true,
          legend: {
            position: 'bottom',
            display: true,
            labels: {
              // This more specific font property overrides the global property
              fontColor: 'white',
              padding: 20,
              boxWidth: 0,
              usePointStyle: true
            }
          }
        }
      }
    },

    components:{
      'app-user-count': UserCount,
      'ssCookingOil': ssCookingOil,
      'ssCanolaOil': ssCanolaOil,
      'ssBanaspatiOil': ssBanaspati,
      'ssBanaspatiWOlive': ssBanaspatiWOlive
    },

    created(){
//        getting Random store Details
      if (this.$store.getters.user === null) {
        this.$router.push('/login')
      }
//      Fetching Interception Action
      this.$store.dispatch('fetchTotalInterceptions');
      this.$store.dispatch('fetchCampaignReports');
//      setTimeout(() => {
//        this.$store.dispatch('fetchCampaignReports');
//      },4000)
    },

    mounted () {
//        sync Data after 2 seconds
      setInterval(() =>{
        this.fillData();
        this.updateStore();
//        this.$store.dispatch('fetchShopDetails', this.rndNumber.toString());
      }, 3000);

    },

    computed:{
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

//        Total soya supreme banaspati with Olive Oil
        sSBO = totalSales.ssbopoly1_5ltr + totalSales.ssbotin5ltr + totalSales.ssbotin25ltr;

//        Total smart canola oil
        sCO =
          totalSales.scbottle1ltr +
          totalSales.scbottle3ltr +
          totalSales.scbottle4_5ltr +
          totalSales.scpoly1_5ltr +
          totalSales.sctin2_5ltr +
          totalSales.scjcan10ltr +
          totalSales.scjcan16ltr;

//        Total soyaSupremeStock
        sSCO =
          totalSales.sscbottle1ltr +
          totalSales.sscbottle3ltr +
          totalSales.sscbottle5ltr +
          totalSales.sscpoly1_5ltr +
          totalSales.ssctin2_5ltr +
          totalSales.ssctin5ltr +
          totalSales.ssctin10ltr +
          totalSales.sscpresspour3ltr +
          totalSales.sscpresspour5ltr +
          totalSales.sscjcan10ltr +
          totalSales.sscjcan16ltr;

//        Total Soya Supreme Banaspati
        sSB =
          totalSales.ssbpoly1_5ltr +
          totalSales.ssbtin25ltr +
          totalSales.ssbtin5ltr;

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

    methods: {
      updateStore(){
        this.rndNumber = Math.floor(Math.random() * (30506 - 30501 + 1)) + 30501;
        this.khi_Stores_visited = this.khi_Stores_visited + Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        this.lhr_Stores_visited = this.lhr_Stores_visited + Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        this.isd_Stores_visited = this.isd_Stores_visited + Math.floor(Math.random() * (5 - 1 + 1)) + 1;
      },
      fillData () {
        this.showProgress = false;
        this.todayProgress = Math.floor((Math.random() * 100) + 1);
        this.monthProgress = Math.floor((Math.random() * 100) + 1);
        this.activeMerchandiser = Math.floor((Math.random() * 100) + 1);
//        City progress
        this.CityDataCollection = {
          labels: ['KHI', 'LHR', 'ISD'],

          datasets: [
            {
              labels: ['KHI', 'LHR', 'ISD'],
              backgroundColor: ['#FF4944', '#D80600', '#990000'],
              borderWidth: 1,
              color: ['#FF4944', '#D80600', '#990000'],
              data: [this.khi_Stores_visited,this.lhr_Stores_visited,this.isd_Stores_visited]
            },
          ],
        };
//        soyaSupremeCookingOil Progress
        this.soyaSupremeCookingOilChart = {
          labels: ['1 Ltr', '3 Ltr', '5 Ltr', '1x5 Poly', '2.5 Ltr', '5 Tin', '10 Tin', 'PP 3 Ltr', 'PP 5 Ltr', 'JCan 10 Ltr', 'JCan 16 Ltr'],

          datasets: [
            {
              labels: ['1 Ltr', '3 Ltr', '5 Ltr', '1x5 Poly', '2.5 Ltr', '5 Tin', '10 Tin', 'PP 3 Ltr', 'PP 5 Ltr', 'JCan 10 Ltr', 'JCan 16 Ltr'],
              backgroundColor: ['#FFEBEE', '#FFCDD2', '#EF9A9A','#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#000'],
              borderWidth: 1,
              color: ['#FFEBEE', '#FFCDD2', '#EF9A9A','#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#000'],
              data: [
                this.soyaSupremeSKU.sscbottle1ltr,
                this.soyaSupremeSKU.sscbottle3ltr,
                this.soyaSupremeSKU.sscbottle5ltr,
                this.soyaSupremeSKU.sscpoly1_5ltr,
                this.soyaSupremeSKU.ssctin2_5ltr,
                this.soyaSupremeSKU.ssctin5ltr,
                this.soyaSupremeSKU.ssctin10ltr,
                this.soyaSupremeSKU.sscpresspour3ltr,
                this.soyaSupremeSKU.sscpresspour5ltr,
                this.soyaSupremeSKU.sscjcan10ltr,
                this.soyaSupremeSKU.sscjcan16ltr
              ]
            },
          ],
        }
//        soyaSupremeCanola Progress
        this.soyaSupremeCanolaOilChart = {
          labels: ['1 Ltr', '3 Ltr', '4.5 Ltr', '1x5 Poly', 'JCan 10 Ltr', 'JCan 16 Ltr'],

          datasets: [
            {
              labels: ['1 Ltr', '3 Ltr', '5 Ltr', '1x5 Poly', '2.5 Ltr', '5 Tin', '10 Tin', 'PP 3 Ltr', 'PP 5 Ltr', 'JCan 10 Ltr', 'JCan 16 Ltr'],
              backgroundColor: ['#FFEBEE', '#FFCDD2', '#EF9A9A','#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#000'],
              borderWidth: 1,
              color: ['#FFEBEE', '#FFCDD2', '#EF9A9A','#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#000'],
              data: [
                this.soyaSupremeSKU.scbottle1ltr,
                this.soyaSupremeSKU.scbottle3ltr,
                this.soyaSupremeSKU.scbottle4_5ltr,
                this.soyaSupremeSKU.scpoly1_5ltr,
                this.soyaSupremeSKU.scjcan10ltr,
                this.soyaSupremeSKU.scjcan16ltr
              ]
            },
          ],
        }
//        soyaSupremeBanaspati Progress
        this.soyaSupremeBanaspatiChart = {
          labels: ['1 Poly', '2.5 Tin', '5 Tin',],

          datasets: [
            {
              labels: ['1 Poly', '2.5 Tin', '5 Tin',],
              backgroundColor: ['#FF4944', '#D80600', '#990000'],
              borderWidth: 1,
              color: ['#FF4944', '#D80600', '#990000'],
              data: [
                this.soyaSupremeSKU.ssbpoly1_5ltr,
                this.soyaSupremeSKU.ssbtin25ltr,
                this.soyaSupremeSKU.ssbtin5ltr
              ]
            },
          ],
        }
//        soyaSupremeBanaspatiOlive Progress
        this.soyaSupremeBanaspatiOliveChart = {
          labels: ['1 Poly', '2.5 Tin', '5 Tin',],
          datasets: [
            {
              labels: ['1 Poly', '2.5 Tin', '5 Tin',],
              backgroundColor: ['#FF4944', '#D80600', '#990000'],
              borderWidth: 1,
              color: ['#FF4944', '#D80600', '#990000'],
              data: [
                this.soyaSupremeSKU.ssbopoly1_5ltr,
                this.soyaSupremeSKU.ssbotin25ltr,
                this.soyaSupremeSKU.ssbotin5ltr
              ]
            },
          ],
        }
//          Store Progress
        this.StoreDataCollection = {
          labels: ['Cooking Oil', 'Canola Oil', 'Banaspati', 'Banaspati with Olive'],

          datasets: [
            {
              backgroundColor: ['#2196F3', '#673AB7', '#F44336', '#FFB300'],
              borderWidth: 1,
              color: ['#2196F3', '#673AB7', '#F44336', '#FFB300'],
              data: [this.Purchases.sSCO, this.Purchases.sCO,this.Purchases.sSB,this.Purchases.sSBO]
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
    max-width: 25%;
    background-color: rgba(120,120,120,0.2);
    margin: 10px;
    text-align: center;
    padding-bottom: 5px;
    border: 1px solid #333;
    border-radius: 2px;
  }
  .GraphsContainer .header {
    background-color: rgba(30,30,30,0.3);
    font-size:24px;
  }
  .reportContainer {
    min-width: 40%;
    background-color: rgba(120,120,120,0.2);
    margin: 10px;
    height: 240px;
    padding-bottom: 10px;
    border: 1px solid #333;
    border-radius: 2px;
  }
  .reportContainer .header {
    background-color: rgba(30,30,30,0.3);
    height: 20%;
    line-height: 200%;
    font-size: 18px;
  }
  .dashCards {
    max-width: 100%;
    background-color: rgba(50,50,50,0.2);
    margin: 10px;
    text-align: center;
    padding-bottom: 5px;
    border: 1px solid #333;
    border-radius: 2px;
  }

  .barChart {
    width: 90%;
    height: 120px;
  }
  .barChart div{
    height: 180px;
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
