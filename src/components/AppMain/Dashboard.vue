<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap justify-center class="mb-5 pb-5">
      <!--NUMBER WIDGETS-->
      <!--TOTAL PURCHASE-->
      <v-flex flex xs3>
        <v-card class="dashCards elevation-5">
          <v-card-title primary-title class="ma-0 pa-2"><h6 class="title ma-0 pa-0">Total Sales</h6></v-card-title>
          <v-card-text>

            <h2 class="display-3 green--text ma-0 pa-0">
                {{ totalSales }}
            </h2>
          </v-card-text>
        </v-card>
      </v-flex>
      <!--TOTAL INTERCEPTION-->
      <v-flex flex xs3>
        <v-card class="dashCards elevation-10" >
          <v-card-title primary-title class="ma-0 pa-2"><h6 class="title ma-0 pa-0">Interceptions</h6></v-card-title>
          <v-card-text>
            <h2 class="display-3 green--text ma-0 pa-0" >{{ totalInterceptions }}</h2>
          </v-card-text>
        </v-card>
      </v-flex>
      <!--TOTAL Brand Ambassador-->
      <v-flex flex xs3>
        <v-card class="dashCards elevation-15" >
          <v-card-title primary-title class="ma-0 pa-2"><h6 class="title ma-0 pa-0">Brand Ambassador</h6></v-card-title>
          <v-card-text>
            <h2 class="display-3 green--text ma-0 pa-0" >{{ totalBAs }}</h2>
          </v-card-text>
        </v-card>
      </v-flex>
      <!--Store Amount-->
      <v-flex flex xs3>
        <v-card class="dashCards elevation-20" >
          <v-card-title primary-title class="ma-0 pa-2"><h6 class="title ma-0 pa-0">Stores</h6></v-card-title>
          <v-card-text>
            <h2 class="display-3 green--text ma-0 pa-0" >{{ totalStores }}</h2>
          </v-card-text>
        </v-card>
      </v-flex>
      <!--TOTAL Conversion-->
        <v-layout row wrap >
          <v-flex xs3 class="GraphsContainer elevation-20">
            <!--user chart-->
            <div class="header">Total Conversion</div>
            <v-progress-circular v-if="showProgress" indeterminate v-bind:size="75" color="yellow"></v-progress-circular>
            <DoughNutChart :chart-data="conversionData" :options="optionsDoughnut"></DoughNutChart>
          </v-flex>
          <!--TOTAL TasteTrial-->
          <v-flex xs3 class="GraphsContainer elevation-20">
            <!--user chart-->
            <div class="header">Total Consumer Tasted</div>
            <v-progress-circular v-if="showProgress" indeterminate v-bind:size="75" color="yellow"></v-progress-circular>
            <DoughNutChart :chart-data="tasteTrialData" :options="optionsDoughnut"></DoughNutChart>
          </v-flex>
            <v-flex xs5 class="reportContainer elevation-20">
                <div class="header indigo">Cheese Previous User</div>
                <div class="barChart">
                    <BarChart :chart-data="previousUserCheeseData" :options="optionsCity"></BarChart>
                </div>
            </v-flex>
        </v-layout>
      <!--Previous Users of Butter-->
      <v-layout row wrap class="mb-0 pb-0">
          <v-flex xs6 class="reportContainer elevation-20">
              <div class="header indigo">Butter Previous User</div>
              <div class="barChart">
                  <BarChart :chart-data="previousUserButterData" :options="optionsCity"></BarChart>
              </div>
          </v-flex>
          <v-flex xs5 class="reportContainer elevation-20">
              <div class="header indigo">Frozen Previous User</div>
              <div class="barChart">
                  <BarChart :chart-data="previousUserFrozenData" :options="optionsCity"></BarChart>
              </div>
          </v-flex>
      </v-layout>
      <v-flex xs12 class="reportContainer elevation-20">
        <div class="header indigo">Sales By Category</div>
        <div class="barChart">
          <BarChart :chart-data="productCategoryData" :options="optionsCity"></BarChart>
        </div>
      </v-flex>
      <!--Soya Supreme Cooking Oil-->
      <!--<v-flex xs7 class="reportContainer elevation-21">-->
        <!--<div class="header light-green">Cooking Oil</div>-->
        <!--<div class="barChart">-->
          <!--<ssCookingOil :chart-data="soyaSupremeCookingOilChart" :options="optionsCity"></ssCookingOil>-->
        <!--</div>-->
      <!--</v-flex>-->
      <!--Soya Supreme Banaspati-->
      <!--<v-flex xs2 class="reportContainer elevation-20">-->
        <!--<div class="header red">Banaspati</div>-->
        <!--<div class="barChart">-->
          <!--<ssBanaspatiOil :chart-data="soyaSupremeBanaspatiChart" :options="optionsCity"></ssBanaspatiOil>-->
        <!--</div>-->
      <!--</v-flex>-->
      <!--Soya Supreme Banaspati with Olive Oil-->
      <!--<v-flex xs2 class="reportContainer elevation-20">-->
        <!--<div class="header orange">Banaspati with Olive Oil</div>-->
        <!--<div class="barChart">-->
          <!--<ssBanaspatiWOlive :chart-data="soyaSupremeBanaspatiOliveChart" :options="optionsCity"></ssBanaspatiWOlive>-->
        <!--</div>-->
      <!--</v-flex>-->
    </v-layout>
  </v-container>
</template>

<script>
//  importing Charts
  import ssCookingOil from '../Charts/ssCanolaOil'
  import UserCount from '../Charts/LineChart'
  import DoughNutChart from '../Charts/DoughNutChart'
  import BarChart from '../Charts/BarChart'
  import ssCanolaOil from '../Charts/ssCanolaOil'
  import ssBanaspati from '../Charts/ssBanaspatiGhee'
  import ssBanaspatiWOlive from '../Charts/ssBanaspatiWOlive'

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
        recentStore: [
          {title: 'loading...'},
          {title: 'loading...'},
          {title: 'loading...git'},
        ],
        conversionData: null,
        tasteTrialData: null,
        productCategoryData: null,
        previousUserButterData: null,
        previousUserCheeseData: null,
        previousUserFrozenData: null,
        StoreDataCollection: null,
        CityDataCollection: null,
        soyaSupremeCookingOilChart: null,
        soyaSupremeCanolaOilChart: null,
        soyaSupremeBanaspatiChart: null,
        soyaSupremeBanaspatiOliveChart: null,
//        soyaSupremeSKU: {
//          sscbottle1ltr: 1,
//          sscbottle3ltr: 2,
//          sscbottle5ltr: 3,
//          sscpoly1_5ltr: 18,
//          ssctin2_5ltr: 5,
//          ssctin5ltr: 6,
//          ssctin10ltr: 66,
//          sscpresspour3ltr: 8,
//          sscpresspour5ltr: 9,
//          sscjcan10ltr: 10,
//          sscjcan16ltr: 11,
//          scbottle1ltr: 1,
//          scbottle3ltr: 2,
//          scbottle4_5ltr: 3,
//          scpoly1_5ltr: 18,
//          sctin2_5ltr: 5,
//          scjcan10ltr: 6,
//          scjcan16ltr: 66,
//          ssbpoly1_5ltr: 1,
//          ssbtin25ltr: 23,
//          ssbtin5ltr: 3,
//          ssbopoly1_5ltr: 33,
//          ssbotin25ltr: 23,
//          ssbotin5ltr: 3
//        },
//          ============================
        //      SKUS EMBORG
        skusEmborg:  [
              { name: ' Mozzarella Cheese 200gm', id:'1001', category: 'Dairy - Block Cheese'},
              { name: ' Bulk M.Cheese 2.32kg', id:'1002', category: 'Dairy - Block Cheese'},
              { name: ' Grana Padano Italian Cheese 200gm', id:'1003', category: 'Dairy - Block Cheese' },
              { name: ' Cheddar Cheese White 2.67kg', id:'1004', category: 'Dairy - Block Cheese' },
              { name: ' Irish Cheddar Coloured Cheese 400gm', id:'1005', category: 'Dairy - Block Cheese' },
              { name: ' Irish Cheddar White Cheese 400gm', id:'1006', category: 'Dairy - Block Cheese' },
              { name: ' Emmentaler Cheese 200gm', id:'1007', category: 'Dairy - Block Cheese' },
              { name: ' Gouda Cheese 350gm', id:'1008', category: 'Dairy - Block Cheese' },
              { name: ' Mature Cheddar Cheese 200gm', id:'1009', category: 'Dairy - Block Cheese' },
              { name: ' Vintage Cheddar Cheese 200gm', id:'1010', category: 'Dairy - Block Cheese' },
              { name: ' Gouda Wheel 4.5kg', id:'1011', category: 'Dairy - Block Cheese' },
              { name: ' Cheddar Cheese White 4.850kg', id:'1012', category: 'Dairy - Block Cheese' },
              //        Butter
              { name: ' Butter Unsalted 500gm', id:'1013', category: 'Dairy - Butter' },
              { name: ' Butter Unsalted 200gm', id:'1014', category: 'Dairy - Butter' },
              { name: ' Butter Unsalted 100gm', id:'1015', category: 'Dairy - Butter' },
              { name: ' Spreadable Butter 250gm', id:'1016', category: 'Dairy - Butter' },
              { name: ' Butter Salted Portion', id:'1017', category: 'Dairy - Butter' },
              { name: ' Butter Unsalted Portion', id:'1018', category: 'Dairy - Butter' },
              { name: ' Butter Unsalted 400gm', id:'1019', category: 'Dairy - Butter' },
              { name: ' Butter Unsalted 9x8gm', id:'1020', category: 'Dairy - Butter' },
              //        Cheese
              { name: ' Mild Color Cheese 200gm', id:'1021', category: 'Dairy - Cheese' },
              { name: ' Havarti Slices Cheese 150gm', id:'1022', category: 'Dairy - Cheese' },
              { name: ' Camembert Moulded Cheese 125gm', id:'1023', category: 'Dairy - Cheese' },
              { name: ' Brie Plastic Cup 125gm', id:'1024', category: 'Dairy - Cheese' },
              { name: ' Danablu 100gm', id:'1025', category: 'Dairy - Cheese' },
              { name: ' Cottage Cheese 500gm Tub', id:'1026', category: 'Dairy - Cheese' },
              { name: ' Edam Slice 8`S 150gm', id:'1027', category: 'Dairy - Cheese' },
              { name: ' Feta Chesse In Brine 200gm', id:'1028', category: 'Dairy - Cheese' },
              { name: ' Havarti Cheese 200gm', id:'1029', category: 'Dairy - Cheese' },
              { name: ' Feta In Oil With Herbs & Olives 300gm', id:'1030', category: 'Dairy - Cheese' },
              { name: ' Feta In Oil With Herbs & Spices 300gm', id:'1031', category: 'Dairy - Cheese' },
              { name: ' Feta Sliceable Cheese 200gm', id:'1032', category: 'Dairy - Cheese' },
              { name: ' Edam 230gm', id:'1033', category: 'Dairy - Cheese' },
              { name: ' Swiss Slices Emmental Cheese 200gm', id:'1034', category: 'Dairy - Cheese' },
              { name: ' Cheddar Cubes 150gm', id:'1035', category: 'Dairy - Cheese' },
              { name: ' Cheddar Slices 10x10 150gm', id:'1036', category: 'Dairy - Cheese' },
              { name: ' Emmentaler Cheese Sliced 150gm', id:'1037', category: 'Dairy - Cheese' },
              { name: ' Gouda Cubes 150gm', id:'1038', category: 'Dairy - Cheese' },
              { name: ' Gouda Slice 150gm', id:'1039', category: 'Dairy - Cheese' },
              //        Cream
              { name: ' Whipped Cream 250gm', id:'1040', category: 'Dairy - Cream' },
              { name: ' Whipped Cream Uht 200gm', id:'1041', category: 'Dairy - Cream' },
              { name: ' Cooking Cream 200ml', id:'1042', category: 'Dairy - Cream' },
              { name: ' Cream Cheese 200gm', id:'1043', category: 'Dairy - Cream' },
              { name: ' Cream Cheese Light 200gm', id:'1044', category: 'Dairy - Cream' },
              { name: ' Whipped Cream Uht 1ltr', id:'1045', category: 'Dairy - Cream' },
              { name: ' Sour Cream 1000gm', id:'1046', category: 'Dairy - Cream' },
              { name: ' Dessert Whip Cream 200ml', id:'1047', category: 'Dairy - Cream' },
              { name: ' Pasta Cream 200ml', id:'1048', category: 'Dairy - Cream' },
              //        Food Service
              { name: ' Cream Cheese 1.5kg', id:'1049', category: 'Dairy - Cream Food Service' },
              //        Milk
              { name: ' Full Cream Milk 1ltr', id:'1050', category: 'Dairy - Milk' },
              { name: ' Low Fat Milk 1ltr', id:'1051', category: 'Dairy - Milk' },
              { name: ' Skimmed Milk 1ltr', id:'1052', category: 'Dairy - Milk' },
              //       Process Cheese
              { name: ' American Cheddar Slice 10`S 200gm', id:'1053', category: 'Dairy - Process Cheese' },
              { name: ' Butter Salted 200gm', id:'1054', category: 'Dairy - Process Cheese' },
              { name: ' Italian Mozzarella Slice 10`S 200gm', id:'1055', category: 'Dairy - Process Cheese' },
              { name: ' Mild White Cheese 200gm', id:'1056', category: 'Dairy - Process Cheese' },
              { name: ' Sandwich Cheese Cheddar Taste 200gm', id:'1057', category: 'Dairy - Process Cheese' },
              { name: ' Sandwich Cheese Cheddar Taste 400gm', id:'1058', category: 'Dairy - Process Cheese' },
              { name: ' 8 Portions Cheese Bites 140gm', id:'1059', category: 'Dairy - Process Cheese' },
              { name: ' Cheddar Slices 84slices 1.033Kg', id:'1060', category: 'Dairy - Process Cheese' },
              { name: ' Dutch Slices Gouda Cheese 200gm', id:'1061', category: 'Dairy - Process Cheese' },
              { name: ' Sandwich Cheese Cheddar Taste 100gm', id:'1062', category: 'Dairy - Process Cheese' },
              { name: ' Cheese Snack 5`s 100gm', id:'1063', category: 'Dairy - Process Cheese' },
              { name: ' Sandwich 200gm X 2 Kinder Joy Bundle Pack', id:'1064', category: 'Dairy - Process Cheese' },
              //        Shakes
              { name: ' Protien Smoothie Orange & Mango 250ml', id:'1065', category: 'Dairy - Shakes' },
              { name: ' Protien Smoothie Pineapple & Coconut 250ml', id:'1066', category: 'Dairy - Shakes' },
              { name: ' Protien Smoothie Rasberry & Blueberry 250ml', id:'1067', category: 'Dairy - Shakes' },
              //        Shredded Cheese
              { name: ' Cheddar Shredded Cheese 200gm', id:'1068', category: 'Dairy - Shredded Cheese' },
              { name: ' Mozzarella Shredded Cheese 200gm', id:'1069', category: 'Dairy - Shredded Cheese' },
              { name: ' Pasta Shredded Cheese 200gm', id:'1070', category: 'Dairy - Shredded Cheese' },
              { name: ' Pizza Topping Shredded Cheese 200gm', id:'1071', category: 'Dairy - Shredded Cheese' },
              { name: ' Cheddar Topping Shredded White 200gm', id:'1072', category: 'Dairy - Shredded Cheese' },
              { name: ' Emmental Shredded Cheese 200gm', id:'1073', category: 'Dairy - Shredded Cheese' },
              { name: ' Parmesan Shredded Cheese 150gm', id:'1074', category: 'Dairy - Shredded Cheese' },
              { name: ' 3 Cheese Bake Shredded 200gm', id:'1075', category: 'Dairy - Shredded Cheese' },
              //        Fish
              { name: ' Pangasuis Fillet 1000gm', id:'1076', category: 'Frozen - Fish' },
              //        French Fries
              { name: ' French Fries Straight 1kg', id:'1077', category: 'Frozen - Frenchfries' },
              { name: ' French Fries Crinkle 1000gm', id:'1078', category: 'Frozen - Frenchfries' },
              { name: ' French Fries Shoestring 1000gm', id:'1079', category: 'Frozen - Frenchfries' },
              { name: ' French Fries Straight 2.5kg', id:'1080', category: 'Frozen - Frenchfries' },
              //        Fruits
              { name: ' Strawberries 450gm', id:'1081', category: 'Frozen - Fruits' },
              { name: ' Blueberries & Strawberries 400gm', id:'1082', category: 'Frozen - Fruits' },
              { name: ' Blueberries 400gm', id:'1083', category: 'Frozen - Fruits' },
              //        Meat
              { name: ' Chicken Franks 350gm', id:'1084', category: 'Frozen - Meat' },
              { name: ' Chicken Burgers 200gm 4`s', id:'1085', category: 'Frozen - Meat' },
              { name: ' Chicken Kabab 280gm 8`s', id:'1086', category: 'Frozen - Meat' },
              { name: ' Whole Turkey', id:'1087', category: 'Frozen - Meat' },
              { name: ' Chicken Nuggets 510gm', id:'1088', category: 'Frozen - Meat' },
              { name: ' Beef Burger Onion 200gm 4`s', id:'1089', category: 'Frozen - Meat' },
              { name: ' Chicken Burger 1200gm 24`s', id:'1090', category: 'Frozen - Meat' },
              { name: ' Beef Burger Onion 1200gm 24`s', id:'1091', category: 'Frozen - Meat' },
              { name: ' Beef Kabab 280gm 8`s', id:'1092', category: 'Frozen - Meat' },
              { name: ' Beef Burger Onion 1000gm 20`s', id:'1093', category: 'Frozen - Meat' },
              { name: ' Chicken Burgers 1000gm 20`s', id:'1094', category: 'Frozen - Meat' },
              //        Sea food
              { name: ' Surimi Crab Sticks 250gm', id:'1095', category: 'Frozen - Sea Food' },
              { name: ' Lumpfish Cavier Red 100gm', id:'1096', category: 'Frozen - Sea Food' },
              { name: ' Lumpfish Cavier Black 100gm', id:'1097', category: 'Frozen - Sea Food' },
              { name: ' Pepper Mackerel With Pepper 200gm', id:'1098', category: 'Frozen - Sea Food' },
              //        Vegetable
              { name: ' 4 Whole Corn On The Cob 950gm', id:'1099', category: 'Frozen - Vegetables' },
              { name: ' Chopped Spinach 450gm', id:'1100', category: 'Frozen - Vegetables' },
              { name: ' Malaysian Wokmix 450gm', id:'1101', category: 'Frozen - Vegetables' },
              { name: ' Mix Vegetable Frozen 450gm', id:'1102', category: 'Frozen - Vegetables' },
              { name: ' Mix Vegetable Frozen 900gm', id:'1103', category: 'Frozen - Vegetables' },
              { name: ' Peas & Carrots 450gm', id:'1104', category: 'Frozen - Vegetables' },
              { name: ' Sliced Mushroom 450gm', id:'1105', category: 'Frozen - Vegetables' },
              { name: ' Garden Mix 450gm', id:'1106', category: 'Frozen - Vegetables' },
              { name: ' Garden Peas Frozen 450gm', id:'1107', category: 'Frozen - Vegetables' },
              { name: ' 3-Floret Mix 450gm', id:'1108', category: 'Frozen - Vegetables' },
              { name: ' Broccoli Mix 450gm', id:'1109', category: 'Frozen - Vegetables' },
              { name: ' Onion Rings 450gm', id:'1110', category: 'Frozen - Vegetables' },
              { name: ' Whole Leaf Spinach 450gm', id:'1111', category: 'Frozen - Vegetables' },
              { name: ' Broccoli Florets 450gm', id:'1112', category: 'Frozen - Vegetables' },
              { name: ' Broccoli Mix 750gm', id:'1113', category: 'Frozen - Vegetables' },
              { name: ' Broad Beans 450gm', id:'1114', category: 'Frozen - Vegetables' },
              { name: ' Cut Bean 450gm', id:'1115', category: 'Frozen - Vegetables' },
              { name: ' French Salad Mix 450gm', id:'1116', category: 'Frozen - Vegetables' },
              { name: ' Garden Peas & Sweet Corn 450gm', id:'1117', category: 'Frozen - Vegetables' },
              { name: ' Brussels Sprouts 900gm', id:'1118', category: 'Frozen - Vegetables' },
              { name: ' Peas & Carrots 900gm', id:'1119', category: 'Frozen - Vegetables' },
              { name: ' Sweet Corn Frozen 450gm', id:'1120', category: 'Frozen - Vegetables' },
              { name: ' Oriental Mix 750gm', id:'1121', category: 'Frozen - Vegetables' },
              { name: ' 6 Half Ear Corn On The Cob 700gm', id:'1122', category: 'Frozen - Vegetables' },
              { name: ' Organic Garden Peas 400gm', id:'1123', category: 'Frozen - Vegetables' },
              { name: ' Organic Mix Vegetable 400gm', id:'1124', category: 'Frozen - Vegetables' },
              { name: ' Organic Spinach Chopped 400gm', id:'1125', category: 'Frozen - Vegetables' },
              { name: ' Organic Sweet Corn 400gm', id:'1126', category: 'Frozen - Vegetables' },
              { name: ' Sweet Corn Frozen 900gm', id:'1127', category: 'Frozen - Vegetables' },
              { name: ' Garden Peas Frozen 900gm', id:'1128', category: 'Frozen - Vegetables' },
              { name: ' Cut Bean 900gm', id:'1129', category: 'Frozen - Vegetables' },
              { name: ' Calamari Rings 500gm', id:'1130', category: 'Frozen - Vegetables' },
              { name: ' Broccoli & Vegetable Mix Bundle Pack', id:'1131', category: 'Frozen - Vegetables' },

          ],
//          ============================
        stores: 20,
        optionsCity: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
            labels: {
              // This more specific font property overrides the global property
              fontColor: '#FFFFFF',
              padding: 1,
              boxWidth: 1,
              usePointStyle: true
            }
          },
          scales: {
            xAxes: [{
              ticks: {
                fontColor: "white",
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
            }
          }
        },
        optionsDoughnut: {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: 'white',
                }
            }
        }
      }
    },

    components:{
      'DoughNutChart' : DoughNutChart,
      'app-user-count': UserCount,
      'ssCookingOil': ssCookingOil,
      'ssCanolaOil': ssCanolaOil,
      'ssBanaspatiOil': ssBanaspati,
      'ssBanaspatiWOlive': ssBanaspatiWOlive,
      'BarChart': BarChart
    },

    created(){
//        getting Random store Details
      if (this.$store.getters.user === null) {
        this.$router.push('/login')
      }
//      Fetching Interception Action
      this.$store.dispatch('fetchTotalInterceptions');
      this.$store.dispatch('fetchStoreReports');
      this.$store.dispatch('fetchCampaignReports');
      this.$store.dispatch('fetchAllStoreReports');
      this.$store.dispatch('baListUPD');
      this.$store.dispatch('storeListUPD');
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

    },

    computed:{
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
        }
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
        }
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
        }
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
        }
        this.conversionData = {
            labels: ['Yes', 'No'],
            datasets: [
                {
                    backgroundColor: ['#d6a150', '#3f91db'],
                    borderWidth: 0,
                    color: ['#ffc85a', '#49a9ff'],
                    data: [
                        this.totalConversion,
//                        Taking Out Peoples who said Nothing or Clearly Say "NO"
                        (this.totalInterceptions - this.totalConversion)
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
    background-color: rgba(120,120,120,0.2);
    margin: 10px;
    text-align: center;
    padding-bottom: 0px;
    border: 1px solid #333;
    border-radius: 2px;
    z-index: 2;
  }
  .GraphsContainer .header {
    background-color: rgba(30,30,30,0.3);
    font-size:18px;
  }
  .reportContainer {
    min-width: 30%;
    background-color: rgba(120,120,120,0.2);
    margin: 10px;
    height: 240px;
    border: 1px solid #333;
    border-radius: 2px;
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
    background-color: rgba(50,50,50,0.2);
    margin: 10px;
    text-align: center;
    padding-bottom: 5px;
    border: 1px solid #333;
    border-radius: 2px;
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
