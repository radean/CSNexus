<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap >
      <v-tabs fixed icons centered class="mb-5 pb-5">
        <v-toolbar color="blue" dark>
          <v-spacer></v-spacer>
          <v-toolbar-title slot="extension" class="display-1">REPORTS</v-toolbar-title>
        </v-toolbar>
        <v-tabs-bar class="blue">
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tabs-item href="c1">
            <v-icon>store</v-icon>
            Stores Reports
          </v-tabs-item>
          <v-tabs-item href="c2">
            <v-icon>view_module</v-icon>
            COMPILE
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content id="c1">
            <v-card flat>
              <v-card-text>
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs12 ><h6>STORE REPORT</h6></v-flex>
                    <v-flex xs6 class="text-xs-left">SORTING OPTIONS</v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                      <v-flex xs4 offset-xs8 class="mt-3">
                        <v-menu
                          lazy
                          :close-on-content-click="false"
                          :close-on-click="false"
                          v-model="storeMenu"
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
                            v-model="storeSelectedDate"
                            prepend-icon="event"
                            readonly
                          ></v-text-field>
                          <v-date-picker v-model="storeSelectedDate" no-title scrollable actions>
                            <template slot-scope="{ save, cancel }">
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                <v-btn flat color="primary" @click="save">OK</v-btn>
                              </v-card-actions>
                            </template>
                          </v-date-picker>
                        </v-menu>
                      </v-flex>
                    </v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                      <v-container fluid style="min-height: 0;" grid-list-lg>
                        <v-layout row wrap >
                          <v-flex xs3 v-for="store in storeList" :key="store.id" v-on:click="fetchStoreReport(store)">
                            <v-card color="grey lighten-2" class="black--text elevation-12">
                              <v-card-title primary-title>
                                <div class="headline">{{ store.name }} Report</div>
                                <v-flex xs6 offset-xs3><v-icon x-large class="black--text">store</v-icon></v-flex>
                              </v-card-title>
                              <v-card-actions >
                                <v-flex xs8 offset-xs2>
                                  <!--<v-btn flat class="black&#45;&#45;text">FETCH</v-btn>-->
                                </v-flex>
                              </v-card-actions>
                            </v-card>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-flex>
                    <v-flex xs12 >
                      <v-dialog v-model="storeReportDialog" maxWidth="1200px" >
                        <v-card>
                          <v-card-title>
                            <span class="headline">{{ selectedStore }} Report</span>
                          </v-card-title>
                          <v-card-text>
                            <div class="table__overflow" id="storeHeaderData" style="overflow-x: hidden" >
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
                              v-bind:headers="storeReportListHeaders"
                              v-bind:onscroll="syncStoreScroll"
                              id="storeTableData"
                              :items="storeReport"
                              hide-actions
                              :loading="selectLoading"
                            >
                              <template slot="items" slot-scope="props" >
                                <td class="text-xs-left">{{ props.item.storeName }}</td>
                                <td class="text-xs-center">{{ props.item.customerName }}</td>
                                <td class="text-xs-left">{{ props.item.customerContact }}</td>
                                <td class="text-xs-center">{{ props.item.userName }}</td>
                                <!--Soya Supreme Cooking Oil-->
                                <td class="text-xs-center">{{ props.item.purchased.sscbottle1ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.sscbottle3ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.sscbottle5ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.sscpoly1_5ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.sscpresspour3ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.sscpresspour5ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.ssctin2_5ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.ssctin5ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.ssctin10ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.sscjcan10ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.sscjcan16ltr }}</td>
                                <!--Smart Cooking OIl-->
                                <td class="text-xs-center">{{ props.item.purchased.scbottle1ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.scbottle3ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.scbottle4_5ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.scpoly1_5ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.scjcan10ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.scjcan16ltr }}</td>
                                <!--Soya Supreme Banaspati-->
                                <td class="text-xs-center">{{ props.item.purchased.ssbpoly1_5ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.ssbtin5ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.ssbtin25ltr }}</td>
                                <!--Soya Supreme banaspati with olive oil-->
                                <td class="text-xs-center">{{ props.item.purchased.ssbopoly1_5ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.ssbotin5ltr }}</td>
                                <td class="text-xs-center">{{ props.item.purchased.ssbotin25ltr }}</td>
                              </template>
                            </v-data-table>
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
          </v-tabs-content>
          <v-tabs-content id="c2">
            <v-card flat>
              <v-card-text>
                <v-container grid-list-md text-xs-center>
                  <v-btn large class="green" v-on:click="fetchCompileReports" :disabled="!compileDateValid" :loading="selectLoading">Prepare Compile</v-btn>
                  <v-layout row wrap>
                      <!--MONTH FROM-->
                      <v-flex xs4>
                        <v-menu
                          lazy
                          :close-on-content-click="false"
                          :close-on-click="false"
                          v-model="compileMenu.from"
                          transition="scale-transition"
                          offset-y
                          full-width
                          :nudge-right="40"
                          max-width="290px"
                          min-width="290px"
                        >
                          <v-text-field
                            slot="activator"
                            label="From"
                            v-model="compileMonth.from"
                            prepend-icon="event"
                            readonly
                          ></v-text-field>
                          <v-date-picker  v-model="compileMonth.from" no-title scrollable actions>
                            <template slot-scope="{ save, cancel }">
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="save">OK</v-btn>
                              </v-card-actions>
                            </template>
                          </v-date-picker>
                        </v-menu>
                      </v-flex>
                      <!--MONTH TO-->
                      <v-flex xs4>
                        <v-menu
                          lazy
                          :close-on-content-click="false"
                          :close-on-click="false"
                          v-model="compileMenu.to"
                          transition="scale-transition"
                          offset-y
                          full-width
                          :nudge-right="40"
                          max-width="290px"
                          min-width="290px"
                        >
                          <v-text-field
                            slot="activator"
                            label="To"
                            v-model="compileMonth.to"
                            prepend-icon="event"
                            readonly
                          ></v-text-field>
                          <v-date-picker v-model="compileMonth.to" no-title scrollable actions>
                            <template slot-scope="{ save, cancel }">
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="save">OK</v-btn>
                              </v-card-actions>
                            </template>
                          </v-date-picker>
                        </v-menu>
                      </v-flex>
                    <v-flex xs12 class="ma-3"><v-divider></v-divider></v-flex>
                    <v-flex xs12 >
                      <!--DataTable Compile-->
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ compileSelectedStore }} Report</span>
                        </v-card-title>
                        <v-card-text>
                          <div class="table__overflow" id="compileHeaderData" style="overflow-x: hidden" >
                            <table style="width: 1450px; overflow-y: scroll" >
                              <thead>
                              <th style="width: 240px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center grey darken-1">BASIC INFORMATION</th>
                              <th style="width: 380px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center grey darken-1">SOYA SUPREME COOKING OIL</th>
                              <th style="width: 220px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center grey darken-1">Smart Canola Oil</th>
                              <th style="width: 100px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center grey darken-1">SS Banaspati</th>
                              <th style="width: 100px;" role="columnheader" scope="col"aria-sort="none"class="column sortable text-xs-center grey darken-1">SSB Olive Oil</th>
                              </thead>
                            </table>
                          </div>
                          <v-data-table
                            v-bind:headers="compileReportListHeaders"
                            v-bind:onscroll="syncCompileScroll"
                            id="compileTableData"
                            :items="compileReports"
                            hide-actions
                            :loading="selectLoading"
                          >
                            <template slot="items" slot-scope="props" >
                              <td class="text-xs-left">{{ props.item.storeName }}</td>
                              <td class="text-xs-center">{{ props.item.customerName }}</td>
                              <td class="text-xs-left">{{ props.item.customerContact }}</td>
                              <td class="text-xs-center">{{ props.item.userName }}</td>
                              <!--Soya Supreme Cooking Oil-->
                              <td class="text-xs-center">{{ props.item.purchased.sscbottle1ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.sscbottle3ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.sscbottle5ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.sscpoly1_5ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.sscpresspour3ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.sscpresspour5ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.ssctin2_5ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.ssctin5ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.ssctin10ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.sscjcan10ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.sscjcan16ltr }}</td>
                              <!--Smart Cooking OIl-->
                              <td class="text-xs-center">{{ props.item.purchased.scbottle1ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.scbottle3ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.scbottle4_5ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.scpoly1_5ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.scjcan10ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.scjcan16ltr }}</td>
                              <!--Soya Supreme Banaspati-->
                              <td class="text-xs-center">{{ props.item.purchased.ssbpoly1_5ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.ssbtin5ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.ssbtin25ltr }}</td>
                              <!--Soya Supreme banaspati with olive oil-->
                              <td class="text-xs-center">{{ props.item.purchased.ssbopoly1_5ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.ssbotin5ltr }}</td>
                              <td class="text-xs-center">{{ props.item.purchased.ssbotin25ltr }}</td>
                            </template>
                            <!--Total Footer-->
                            <template slot="footer">
                              <!--Soya Supreme Cooking Oil-->
                              <td class="text-xs-left grey darken-1" ></td>
                              <td class="text-xs-center grey darken-1"></td>
                              <td class="text-xs-left grey darken-1">Total</td>
                              <td class="text-xs-center grey darken-1"></td>
                              <!--Soya Supreme Cooking Oil-->
                              <td class="text-xs-center grey darken-1">{{ compileTotal.sscbottle1ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.sscbottle3ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.sscbottle5ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.sscpoly1_5ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.sscpresspour3ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.sscpresspour5ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.ssctin2_5ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.ssctin5ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.ssctin10ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.sscjcan10ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.sscjcan16ltr }}</td>
                              <!--Smart Cooking OIl-->
                              <td class="text-xs-center grey darken-1">{{ compileTotal.scbottle1ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.scbottle3ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.scbottle4_5ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.scpoly1_5ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.scjcan10ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.scjcan16ltr }}</td>
                              <!--Soya Supreme Banaspati-->
                              <td class="text-xs-center grey darken-1">{{ compileTotal.ssbpoly1_5ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.ssbtin5ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.ssbtin25ltr }}</td>
                              <!--Soya Supreme banaspati with olive oil-->
                              <td class="text-xs-center grey darken-1">{{ compileTotal.ssbopoly1_5ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.ssbotin5ltr }}</td>
                              <td class="text-xs-center grey darken-1">{{ compileTotal.ssbotin25ltr }}</td>
                            </template>
                          </v-data-table>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
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
//      GUI DATA
        storeScrollPosition: null,
        storeMenu: false,
        storeReportDialog: false,
        compileMenu: {
          to: false,
          from: false
        },
        selectLoading: true,
        selectedStore: 'Store',
        compileSelectedStore: 'Compile',
//      PROCESSED
        compileTotal: {},
//      GUI HEADERS
        storeReportListHeaders: [
          { text: 'Store Name', value: 'storeName', align: 'left'},
          { text: 'Customer', value: 'customer', align: 'left' },
          { text: 'Contact', value: 'contact', align: 'left' },
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
        compileReportListHeaders: [
          { text: 'Store Name', value: 'storeName', align: 'left', class: 'grey darken-1' },
          { text: 'Interceptions', value: 'interceptions', align: 'left', class: 'grey darken-1' },
          { text: 'B.A Name', value: 'baName', align: 'left', class: 'grey darken-1' },
          { text: 'Supervisor', value: 'supervisor', align: 'left', class: 'grey darken-1' },
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
//      Fetched Data
        storeStockReport: [],
//      Sent Data
        compileMonth: {
          to: null,
          from: null
        },
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
      storeReport(){
        return this.$store.getters.storeStoreReports
      },
      compileReports(){
        let report = this.$store.getters.compileReport;
        let purchased = [];
        let total = {};
        let totalPurchased = {
        sscbottle1ltr: 0,
        sscbottle3ltr: 0,
        sscbottle5ltr: 0,
        sscpoly1_5ltr: 0,
        sscpresspour3ltr: 0,
        sscpresspour5ltr: 0,
        ssctin2_5ltr: 0,
        ssctin5ltr: 0,
        ssctin10ltr: 0,
        sscjcan10ltr: 0,
        sscjcan16ltr: 0,
//          Smart Cooking OIl
        scbottle1ltr: 0,
        scbottle3ltr: 0,
        scbottle4_5ltr: 0,
        scpoly1_5ltr: 0,
        scjcan10ltr: 0,
        scjcan16ltr: 0,
//          Soya Supreme Banaspati
        ssbpoly1_5ltr: 0,
        ssbtin5ltr: 0,
        ssbtin25ltr: 0,
//          Soya Supreme banaspati with olive oil
        ssbopoly1_5ltr: 0,
        ssbotin5ltr: 0,
        ssbotin25ltr: 0
        };
        for (let key in report){
          purchased.push(report[key].purchased);
        };
        // iterate over the input array
        purchased.forEach(function(obj) {
          // get key from object and iterate
          Object.keys(obj).forEach(function(k) {
            // define or increment object property value
            total[k] = (total[k] || 0) + parseInt(obj[k]);
          })
        })
//        })
//        for (let key in report){
//          console.log((1 + parseInt(report[key].purchased.sscbottle1ltr)));
//          totalPurchased.sscbottle1ltr += parseInt(report[key].purchased.sscbottle1ltr);
//          totalPurchased.sscbottle3ltr += parseInt(report[key].purchased.sscbottle3ltr);
//          totalPurchased.sscbottle5ltr += parseInt(report[key].purchased.sscbottle5ltr);
//          totalPurchased.sscpoly1_5ltr += parseInt(report[key].purchased.sscpoly1_5ltr);
//          totalPurchased.sscpresspour3ltr += parseInt(report[key].purchased.sscpresspour3ltr);
//          totalPurchased.sscpresspour5ltr += parseInt(report[key].purchased.sscpresspour5ltr);
//          totalPurchased.ssctin2_5ltr += parseInt(report[key].purchased.ssctin2_5ltr);
//          totalPurchased.ssctin5ltr += parseInt(report[key].purchased.ssctin5ltr);
//          totalPurchased.ssctin10ltr += parseInt(report[key].purchased.ssctin10ltr);
//          totalPurchased.sscjcan10ltr += parseInt(report[key].purchased.sscjcan10ltr);
//          totalPurchased.sscjcan16ltr += parseInt(report[key].purchased.sscjcan16ltr);
////          Smart Cooking OIl
//          totalPurchased.scbottle1ltr += parseInt(report[key].purchased.scbottle1ltr);
//          totalPurchased.scbottle3ltr += parseInt(report[key].purchased.scbottle3ltr);
//          totalPurchased.scbottle4_5ltr += parseInt(report[key].purchased.scbottle4_5ltr);
//          totalPurchased.scpoly1_5ltr += parseInt(report[key].purchased.scpoly1_5ltr);
//          totalPurchased.scjcan10ltr += parseInt(report[key].purchased.scjcan10ltr);
//          totalPurchased.scjcan16ltr += parseInt(report[key].purchased.scjcan16ltr);
////          Soya Supreme Banaspati
//          totalPurchased.ssbpoly1_5ltr += parseInt(report[key].purchased.ssbpoly1_5ltr);
//          totalPurchased.ssbtin5ltr += parseInt(report[key].purchased.ssbtin5ltr);
//          totalPurchased.ssbtin25ltr += parseInt(report[key].purchased.ssbtin25ltr);
////          Soya Supreme banaspati with olive oil
//          totalPurchased.ssbopoly1_5ltr += parseInt(report[key].purchased.ssbopoly1_5ltr);
//          totalPurchased.ssbotin5ltr += parseInt(report[key].purchased.ssbotin5ltr);
//          totalPurchased.ssbotin25ltr += parseInt(report[key].purchased.ssbotin25ltr);
//        }
//        console.log(purchased);
        this.compileTotal = total;
        return report
      },
//      Date Validator
      compileDateQuery(){
        let to = this.compileMonth.to.slice(5,10);
        let from = this.compileMonth.from.slice(5,10);
        return {to: to, from: from}
      },
      storeDateQuery(){
        return this.storeSelectedDate.slice(5,10);
      }
    },
    methods: {
      currentDate(){
        let date = new Date();
        let day = ("0" + date.getDate()).slice(-2);
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        this.compileMonth.to = year + '-' + month + '-' + day;
        this.compileMonth.from = year + '-' + month + '-' + day;
        this.storeSelectedDate = year + '-' + month + '-' + day;
      },
      sumObjects(){
        return Array.from(arguments).reduce((a, b) => {
          for (let k in b) {
            if (b.hasOwnProperty(k))
              a[k] = (a[k] || 0) + b[k];
          }
          return a;
        }, {});
      },
//      COMPILE
      fetchCompileReports(){
        this.selectLoading = true;
        let query = this.compileDateQuery;
        console.log(query);
        this.$store.dispatch('fetchCompileReports', query).then(() =>{
          setTimeout(() => {
            this.selectLoading = false;
          },3000);
        });
//        this.storeMenu = false;
      },
//      STORE QUERY
      fetchStoreReport(storeinfo){
        this.selectedStore = storeinfo.name;
        this.selectLoading = true;
        let init = {date: this.storeDateQuery, store: storeinfo.id};
        this.$store.dispatch('fetchStoreReports', init).then(() =>{
          setTimeout(() => {
            this.selectLoading = false;
            this.storeReportDialog = true;
          },2000);
        });
        this.storeMenu = false;
      },
//      SCROLLS SYNCING
      syncStoreScroll(e){
        let obj = e.srcElement.scrollLeft;
        document.getElementById('storeHeaderData').scrollLeft = obj;
      },
      syncCompileScroll(e){
        let obj = e.srcElement.scrollLeft;
        document.getElementById('compileHeaderData').scrollLeft = obj;
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
//        After 1 Second
        setTimeout(() => {
//            Syncing Scrolls
          document.getElementById('storeTableData').onscroll = this.syncStoreScroll;
          document.getElementById('compileTableData').onscroll = this.syncCompileScroll;
//          Fetching Base Data Queries
          this.$store.dispatch('storeListUPD');
//          this.$store.dispatch('fetchStoreReports', this.dateQuery);
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
