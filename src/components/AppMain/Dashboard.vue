<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap >
      <v-toolbar class="green lighten-2">
        <v-toolbar-title>DASHBOARD</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat>STATS</v-btn>
        </v-toolbar-items>
      </v-toolbar>
        <!--Store Amount-->
      <v-flex xs4 class="GraphsContainer elevation-20">
        <!--user chart-->
        <div class="header">STORES</div>
        <v-progress-circular  v-if="showProgress" indeterminate v-bind:size="75" color="yellow"></v-progress-circular>
        <app-user-count :chart-data="StoreDataCollection" :options="optionsLine"></app-user-count>
      </v-flex>




      <!--ACTIVE USERS-->
      <v-flex d-flex xs12 sm6 md3>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card class="dashCards elevation-20" >
              <v-card-title primary-title><h4>ACTIVE USER</h4></v-card-title>
              <v-card-text>
                <h2 class="green--text">{{ activeMerchandiser }}</h2>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex d-flex xs12>
                <v-card class="dashCards elevation-20">
                  <v-card-text>
                    All Widgets in this page are dynamic.
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>




      <v-flex xs4 class="GraphsContainer elevation-20">
        <div class="header">RECENT STORES</div>
        <!--Store Detail List-->
        <transition-group name="list">
        <v-list two-line  v-for="store in storeData" v-bind:key="rndNumber">
          <template>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ store.id }} | {{ store.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ store.location }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
       </transition-group>
      </v-flex>
      <!--Active users-->
      <!--<v-flex xs3 class="GraphsContainer elevation-20" style="height: 100px">-->
        <!--<div class="header">ACTIVE USER</div>-->
          <!--<h3 class="green&#45;&#45;text">{{ activeMerchandiser }}</h3>-->
      <!--</v-flex>-->
      <!--Store Visits-->
      <v-flex xs5 class="reportContainer elevation-20">
        <div class="header">STORE VISITS</div>
            <div class="barChart">
              <app-city-progress  :chart-data="CityDataCollection" :options="optionsCity"></app-city-progress>
            </div>
            <!--<v-flex xs4>-->
              <!--<h6>KHI</h6>-->
              <!--<h6 style="margin-top: 40%"> 200 / 640</h6>-->
            <!--</v-flex>-->
            <!--<v-flex xs4>-->
              <!--<h6>LHR</h6>-->
              <!--<h6 style="margin-top: 40%"> 150 / 420</h6>-->
            <!--</v-flex>-->
            <!--<v-flex xs4>-->
              <!--<h6>ISD</h6>-->
              <!--<h6 style="margin-top: 40%"> 260 / 370</h6>-->
            <!--</v-flex>-->
      </v-flex>
      <!--Shop Visited by Cities-->
      <v-flex xs4 class="reportContainer elevation-20">
        <div class="header">REPORT</div>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs6>
              <h6>TODAY</h6>
              <v-progress-circular
                v-bind:size="100"
                v-bind:width="15"
                v-bind:rotate="360"
                v-bind:value="todayProgress"
                color="green"
              >
                {{ todayProgress }}
              </v-progress-circular>
            </v-flex>
            <v-flex xs6>
              <h6>MONTH</h6>
              <v-progress-circular
                v-bind:size="100"
                v-bind:width="15"
                v-bind:rotate="360"
                v-bind:value="monthProgress"
                color="yellow"
              >
                {{ monthProgress }}
              </v-progress-circular>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//  importing Charts
  import CityProgress from '../Charts/CityProgress'
  import UserCount from '../Charts/LineChart'

  export default {
    data () {
      return {
//      data
        rndNumber: 0,
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
        stores: 20,
        optionsCity: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
            labels: {
              // This more specific font property overrides the global property
              fontColor: '#FFFFFF'
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
              fontColor: 'white'
            }
          }
        },
      }
    },


    components:{
      'app-user-count': UserCount,
      'app-city-progress': CityProgress
    },
    created(){
//        getting Random store Details

    },

    mounted () {
//        sync Data after 2 seconds
      setInterval(() =>{
        this.fillData();
        this.updateStore();
        this.$store.dispatch('fetchShopDetails', this.rndNumber.toString());
      }, 4000)
        //        sync Data after 12 seconds
//      setInterval(() =>{
//        this.updateStore()
//        this.$store.dispatch('fetchShopDetails', this.rndNumber.toString());
//      }, 12000)
    },


    computed:{
      storelist(){
        return this.$store.getters.storeList.length;
      },
      storeDetails(){
        this.storeData = this.$store.getters.storeDetails;
      }
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
//          Store Progress
        this.StoreDataCollection = {
          labels: ['Stores', 'Total Stores'],

          datasets: [
            {
              backgroundColor: ['#FF4944', '#D80600'],
              borderWidth: 1,
              color: ['#FF4944', '#D80600'],
              data: [this.storelist,this.stores]
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
    max-width: 50%;
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
    height: 30%;
    font-size: 48px;
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
