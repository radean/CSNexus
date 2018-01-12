<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap >
      <v-tabs fixed icons centered class="mb-5 pb-5">
        <v-toolbar class="gradientHead" dark>
          <v-spacer></v-spacer>
          <v-toolbar-title slot="extension" class="display-1">REPORTS</v-toolbar-title>
        </v-toolbar>
        <v-tabs-bar class="gradientHead">
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tabs-item href="c1">
            <v-icon>store</v-icon>
            Consumers Reports
          </v-tabs-item>
          <v-tabs-item href="c2">
            <v-icon>store</v-icon>
            Store Report
          </v-tabs-item>
          <v-tabs-item href="c3">
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
                    <v-flex xs12 ><h6>CONSUMER REPORT</h6></v-flex>
                    <v-flex xs6 class="text-xs-left">SORTING OPTIONS</v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                      <v-flex xs4 offset-xs8 class="mt-3">
                        <v-menu
                          lazy
                          :close-on-content-click="true"
                          :close-on-click="false"
                          v-model="consumerMenu"
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
                            v-model="consumerSelectedDate"
                            prepend-icon="event"
                            readonly
                          ></v-text-field>
                          <v-date-picker v-model="consumerSelectedDate" no-title scrollable actions>
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
                          <v-flex xs3 v-for="store in storeList" :key="store.id" v-on:click="fetchConsumerReport(store)">
                            <v-card color="grey lighten-2" class="black--text elevation-12" ripple>
                              <v-card-title primary-title>
                                <div class="headline">{{ store.name }} Report </div>
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
                      <v-dialog v-model="consumerReportDialog" maxWidth="1200px" >
                        <v-card>
                          <v-card-title>
                            <span class="headline">{{ selectedStore }} Report - Date : {{consumerSelectedDate}}</span>
                          </v-card-title>
                          <v-card-text>
                            <div class="table__overflow" id="consumerHeaderData" style="overflow-x: hidden" >
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
                              v-bind:headers="consumerReportListHeaders"
                              v-bind:onscroll="syncConsumerScroll"
                              id="consumerTableData"
                              :items="consumerReport"
                              hide-actions
                              :loading="selectLoading"
                            >
                              <template slot="items" slot-scope="props" >
                                <td class="text-xs-left">{{ consumerDateQuery }}</td>
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
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.sscbottle1ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.sscbottle3ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.sscbottle5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.sscpoly1_5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.sscpresspour3ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.sscpresspour5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.ssctin2_5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.ssctin5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.ssctin10ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.sscjcan10ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.sscjcan16ltr }}</td>
                                <!--Smart Cooking OIl-->
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.scbottle1ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.scbottle3ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.scbottle4_5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.scpoly1_5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.scjcan10ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.scjcan16ltr }}</td>
                                <!--Soya Supreme Banaspati-->
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.ssbpoly1_5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.ssbtin5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.ssbtin25ltr }}</td>
                                <!--Soya Supreme banaspati with olive oil-->
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.ssbopoly1_5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.ssbotin5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ consumerTotal.ssbotin25ltr }}</td>
                              </template>
                            </v-data-table>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" flat="flat" @click="consumerReportDialog = false">OK</v-btn>
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
                  <v-layout row wrap>
                    <v-flex xs12 ><h6>STORE REPORT</h6></v-flex>
                    <v-flex xs6 class="text-xs-left">SORTING OPTIONS</v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                      <v-flex xs4 offset-xs8 class="mt-3">
                        <!--<v-menu-->
                          <!--lazy-->
                          <!--:close-on-content-click="true"-->
                          <!--:close-on-click="false"-->
                          <!--v-model="storeMenu"-->
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
                            <!--v-model="storeSelectedDate"-->
                            <!--prepend-icon="event"-->
                            <!--readonly-->
                          <!--&gt;</v-text-field>-->
                          <!--<v-date-picker v-model="storeSelectedDate" no-title scrollable actions>-->
                            <!--<template slot-scope="{ save, cancel }">-->
                              <!--<v-card-actions>-->
                                <!--<v-spacer></v-spacer>-->
                                <!--<v-btn flat color="primary" @click="cancel">Cancel</v-btn>-->
                                <!--<v-btn flat color="primary" @click="save">OK</v-btn>-->
                              <!--</v-card-actions>-->
                            <!--</template>-->
                          <!--</v-date-picker>-->
                        <!--</v-menu>-->
                      </v-flex>
                    </v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                      <v-container fluid style="min-height: 0;" grid-list-lg>
                        <v-layout row wrap >
                          <v-flex xs3 v-for="store in storeList" :key="store.id" v-on:click="fetchStoreReport(store)">
                            <v-card color="grey lighten-2" class="black--text elevation-12" ripple>
                              <v-card-title primary-title>
                                <div class="headline">{{ store.name }} Report </div>
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
                            <span class="headline">{{ storeSelected.name }} Report </span>
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
                              :items="storeReportDatewise"
                              hide-actions
                              :loading="selectLoading"
                            >
                              <template slot="items" slot-scope="props" >
                                <td class="text-xs-left">{{ props.item.date }}</td>
                                <td class="text-xs-center">{{ props.item.store.address }}</td>
                                <td class="text-xs-left">{{ props.item.userName }}</td>
                                <td class="text-xs-center">{{ props.item.interception }}</td>
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
                                <td class="text-xs-center grey darken-1">{{ storeTotal.sscbottle1ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.sscbottle3ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.sscbottle5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.sscpoly1_5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.sscpresspour3ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.sscpresspour5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.ssctin2_5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.ssctin5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.ssctin10ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.sscjcan10ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.sscjcan16ltr }}</td>
                                <!--Smart Cooking OIl-->
                                <td class="text-xs-center grey darken-1">{{ storeTotal.scbottle1ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.scbottle3ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.scbottle4_5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.scpoly1_5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.scjcan10ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.scjcan16ltr }}</td>
                                <!--Soya Supreme Banaspati-->
                                <td class="text-xs-center grey darken-1">{{ storeTotal.ssbpoly1_5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.ssbtin5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.ssbtin25ltr }}</td>
                                <!--Soya Supreme banaspati with olive oil-->
                                <td class="text-xs-center grey darken-1">{{ storeTotal.ssbopoly1_5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.ssbotin5ltr }}</td>
                                <td class="text-xs-center grey darken-1">{{ storeTotal.ssbotin25ltr }}</td>
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
          <v-tabs-content id="c3">
            <v-card flat>
              <v-card-text>
                <v-container grid-list-md text-xs-center>
                  <v-btn large class="green" v-on:click="fetchCompileReports" :disabled="!compileDateValid" :loading="selectLoading">Prepare Compile</v-btn>
                  <v-layout row wrap>
                    <!--MONTH FROM-->
                    <v-flex xs4>
                      <v-menu
                        lazy
                        :close-on-content-click="true"
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
                        :close-on-content-click="true"
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
                            :items="compileReport"
                            hide-actions
                            :loading="selectLoading"
                          >
                            <template slot="items" slot-scope="props" >
                              <td class="text-xs-left">{{ props.item.storeName }}</td>
                              <td class="text-xs-center">{{ props.item.userName }}</td>
                              <td class="text-xs-left">{{ props.item.userName }}</td>
                              <td class="text-xs-center">{{ props.item.interception }}</td>
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
        storeTotal: [],
//      GUI HEADERS
        consumerReportListHeaders: [
          { text: 'Date', value: 'date', align: 'left'},
          { text: 'Customer', value: 'customer', align: 'left' },
          { text: 'Contact', value: 'contact', align: 'left' },
          { text: 'B.A Name', value: 'baName', align: 'left' },
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
        storeReportListHeaders: [
          { text: 'Date', value: 'date', align: 'left', class: 'grey darken-1' },
          { text: 'Location', value: 'location', align: 'left', class: 'grey darken-1' },
          { text: 'B.A Name', value: 'baName', align: 'left', class: 'grey darken-1' },
          { text: 'Interceptions', value: 'interceptions', align: 'left', class: 'grey darken-1' },
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
          { text: 'Location', value: 'location', align: 'left', class: 'grey darken-1' },
          { text: 'B.A Name', value: 'baName', align: 'left', class: 'grey darken-1' },
          { text: 'Interceptions', value: 'interceptions', align: 'left', class: 'grey darken-1' },
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
        consumerStockReport: [],
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
        let day = ("0" + date.getDate()).slice(-2);
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        this.compileMonth.to = year + '-' + month + '-' + day;
        this.compileMonth.from = year + '-' + month + '-' + day;
        this.consumerSelectedDate = year + '-' + month + '-' + day;
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
//        let init = {date: this.storeDateQuery, store: storeinfo};
        this.$store.dispatch('fetchStoreReports', storeinfo).then(() =>{
          setTimeout(() => {
            this.selectLoading = false;
            this.storeReportDialog = true;
          },2000);
        });
        this.storeSelected = storeinfo;
        this.storeMenu = false;
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
//      SCROLLS SYNCING
      syncConsumerScroll(e){
        let obj = e.srcElement.scrollLeft;
        document.getElementById('consumerHeaderData').scrollLeft = obj;
      },
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
          document.getElementById('consumerTableData').onscroll = this.syncConsumerScroll;
          document.getElementById('compileTableData').onscroll = this.syncCompileScroll;
          document.getElementById('storeTableData').onscroll = this.syncStoreScroll;
//          Fetching Base Data Queries
          this.$store.dispatch('storeListUPD');
//          this.$store.dispatch('fetchCompileReportsByStores');
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
