<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap >
      <v-tabs fixed icons centered class="mb-5 pb-5">
        <v-toolbar color="blue" dark>
          <v-spacer></v-spacer>
          <v-toolbar-title slot="extension" class="display-1">STOCK REPORTS</v-toolbar-title>
        </v-toolbar>
        <v-tabs-bar class="blue">
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tabs-item href="c1">
            <v-icon>local_shipping</v-icon>
            Stock Reports
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content id="c1">
            <v-card flat>
              <v-card-text>
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs12><h6>STOCK REPORT</h6></v-flex>
                    <v-flex xs12>Stock shortage on stores</v-flex>
                    <v-flex xs12>
                      <v-flex xs4 offset-xs8>
                        <v-menu
                          lazy
                          :close-on-content-click="false"
                          :close-on-click="false"
                          v-model="menu"
                          transition="scale-transition"
                          offset-y
                          full-width
                          :nudge-right="40"
                          max-width="290px"
                          min-width="290px"
                        >
                          <v-text-field
                            slot="activator"
                            label="By Date"
                            v-model="selectedDate"
                            prepend-icon="event"
                            readonly
                          ></v-text-field>
                          <v-date-picker v-model="selectedDate" no-title scrollable actions>
                            <template slot-scope="{ save, cancel }">
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="fetchStockReport">OK</v-btn>
                              </v-card-actions>
                            </template>
                          </v-date-picker>
                        </v-menu>
                      </v-flex>
                    </v-flex>
                    <v-flex xs12 >
                      <div class="table__overflow" id="headerData" style="overflow-x: hidden" >
                        <table style="width: 1450px; overflow-y: scroll" >
                          <thead>
                          <th style="width: 240px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center">BASIC INFORMATION</th>
                          <th style="width: 380px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center ">SOYA SUPREME COOKING OIL</th>
                          <th style="width: 220px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center">Smart Canola Oil</th>
                          <th style="width: 100px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center ">SS Banaspati</th>
                          <th style="width: 100px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center ">SSB Olive Oil</th>
                          </thead>
                        </table>
                      </div>
                      <v-data-table
                        v-bind:headers="stockReportListHeaders"
                        v-bind:onscroll="syncScroll"
                        id="tableData"
                        :items="stockReport"
                        hide-actions
                        :loading="selectLoading"
                      >
                        <template slot="items" slot-scope="props" >
                          <td class="text-xs-left">{{ props.item.storeName }}</td>
                          <td class="text-xs-center">{{ props.item.interceptions }}</td>
                          <td class="text-xs-left">{{ props.item.baName }}</td>
                          <td class="text-xs-center">{{ props.item.userName }}</td>
                          <!--Soya Supreme Cooking Oil-->
                          <td class="text-xs-center">{{ props.item.stock.sscbottle1ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.sscbottle3ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.sscbottle5ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.sscpoly1_5ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.sscpresspour3ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.sscpresspour5ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.ssctin2_5ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.ssctin5ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.ssctin10ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.sscjcan10ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.sscjcan16ltr }}</td>
                          <!--Smart Cooking OIl-->
                          <td class="text-xs-center">{{ props.item.stock.scbottle1ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.scbottle3ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.scbottle4_5ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.scpoly1_5ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.scjcan10ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.scjcan16ltr }}</td>
                          <!--Soya Supreme Banaspati-->
                          <td class="text-xs-center">{{ props.item.stock.ssbpoly1_5ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.ssbtin5ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.ssbtin25ltr }}</td>
                          <!--Soya Supreme banaspati with olive oil-->
                          <td class="text-xs-center">{{ props.item.stock.ssbopoly1_5ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.ssbotin5ltr }}</td>
                          <td class="text-xs-center">{{ props.item.stock.ssbotin25ltr }}</td>
                        </template>
                      </v-data-table>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </v-layout>
  </v-container>
</template>

<script>
//  Setting Basic GUI
  export default {
    data () {
      return {
//          GUI DATA
        scrollPosition: null,
        menu: false,
        selectedStore: 'Store',
        stockReportListHeaders: [
          { text: 'Store Name', value: 'storeName', align: 'left'},
          { text: 'Interceptions', value: 'interceptions', align: 'left' },
          { text: 'B.A Name', value: 'baName', align: 'left' },
          { text: 'Supervisor', value: 'supervisor', align: 'left' },
//          Soya Supreme
          { text: 'B 1', value: 'stock.sscbottle1ltr', align: 'left', class: 'red' },
          { text: 'B 3', value: 'stock.sscbottle3ltr', align: 'left', class: 'red' },
          { text: 'B 5', value: 'stock.sscbottle5ltr', align: 'left', class: 'red' },
          { text: 'P 1x5', value: 'stock.sscpoly1_5ltr', align: 'left', class: 'red' },
          { text: 'P&P 3', value: 'stock.sscpresspour3ltr', align: 'left', class: 'red' },
          { text: 'P&P 5', value: 'stock.sscpresspour5ltr', align: 'left', class: 'red' },
          { text: 'T 2.5', value: 'stock.ssctin2_5ltr', align: 'left', class: 'red' },
          { text: 'T 5', value: 'stock.ssctin5ltr', align: 'left', class: 'red' },
          { text: 'T 10', value: 'stock.ssctin10ltr', align: 'left', class: 'red' },
          { text: 'J.C 10', value: 'stock.sscjcan10ltr', align: 'left', class: 'red' },
          { text: 'J.C 16', value: 'stock.sscjcan16ltr', align: 'left', class: 'red' },
//          smart canola
          { text: 'B 1', value: 'stock.scbottle1ltr', align: 'left',class:'cyan darken-2' },
          { text: 'B 3', value: 'stock.scbottle3ltr', align: 'left',class:'cyan darken-2' },
          { text: 'B 4.5', value: 'stock.scbottle4_5ltr', align: 'left',class:'cyan darken-2' },
          { text: 'P 1x5', value: 'stock.scpoly1_5ltr', align: 'left',class:'cyan darken-2' },
          { text: 'J.C 10', value: 'stock.scjcan10ltr', align: 'left',class:'cyan darken-2' },
          { text: 'J.C 16', value: 'stock.scjcan16ltr', align: 'left',class:'cyan darken-2' },
//          banaspati
          { text: 'P 1x5', value: 'stock.ssbpoly1_5ltr', align: 'left',class:'green darken-1' },
          { text: 'T 2.5', value: 'stock.ssbtin25ltr', align: 'left',class:'green darken-1' },
          { text: 'T 5', value: 'stock.ssbtin5ltr', align: 'left',class:'green darken-1' },
//          olive oil
          { text: 'P 1x5', value: 'stock.ssbopoly1_5ltr', align: 'left',class:'amber darken-3' },
          { text: 'T 2.5', value: 'stock.ssbotin25ltr', align: 'left',class:'amber darken-3' },
          { text: 'T 5', value: 'stock.ssbotin5ltr', align: 'left',class:'amber darken-3' },
        ],
        selectLoading: true,
//        Fetched Data
        storeStockReport: [],
//        Sent Data
        selectedDate: '2017-12-04',
      }
    },
    computed: {
      stockReport(){
        return this.$store.getters.storeStockReports
      },
      dateQuery(){
        return this.selectedDate.slice(5,10);
      },
    },
    methods: {
      currentDate(){
        let date = new Date();
        let day = ("0" + date.getDate()).slice(-2);
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        this.selectedDate = year + '-' + month + '-' + day;
      },
//      STOCK QUERY
      fetchStockReport(){
        this.selectLoading = true;
        this.$store.dispatch('fetchStockReports', this.dateQuery).then(() =>{
            setTimeout(() => {
              this.selectLoading = false;
            },1000)
        });
        this.storeMenu = false;
        this.menu = false;
      },
      syncScroll(e){
        let obj = e.srcElement.scrollLeft;
        document.getElementById('headerData').scrollLeft = obj;
      }
    },
    created(){
//        getting Random store Details
      if (this.$store.getters.user === null) {
        this.$router.push('/login')
      }else{
//          Initiate Connection
//        setting Time
        this.currentDate();
//        After 1 Second
        setTimeout(() => {
          document.getElementById('tableData').onscroll = this.syncScroll;
          this.$store.dispatch('storeListUPD');
//          this.$store.dispatch('fetchStoreReports', this.dateQuery);
          this.$store.dispatch('fetchStockReports', this.dateQuery);
//          Stop Loading
          this.selectLoading = false;
        }, 2000)
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  table.table tbody td:first-child, table.table tbody td:not(:first-child), table.table tbody th:first-child, table.table tbody th:not(:first-child), table.table thead td:first-child, table.table thead td:not(:first-child), table.table thead th:first-child, table.table thead th:not(:first-child) {
    padding: 0 3px !important;
  }
</style>
