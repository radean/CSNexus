<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap >
      <v-tabs fixed icons centered >
        <v-toolbar color="blue" dark>
          <v-spacer></v-spacer>
          <v-btn flat large v-on:click="refreshDB">
            <v-icon left>refresh</v-icon> REFRESH DB
          </v-btn>
          <v-toolbar-title slot="extension" class="display-1">REPORTS</v-toolbar-title>
        </v-toolbar>
        <v-tabs-bar class="blue">
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tabs-item href="c1">
            <v-icon>people</v-icon>
            B.A Reports
          </v-tabs-item>
          <v-tabs-item href="c2">
            <v-icon>store</v-icon>
            Stores Reports
          </v-tabs-item>
          <v-tabs-item href="c3">
            <v-icon>local_shipping</v-icon>
            Stock Reports
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content id="c1">
            <v-card flat>
              <v-card-text>
                <v-container text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs12 md12><h6>Today's Reports</h6> Merchandiser Pool is over</v-flex>
                    <v-flex xs12 md12>
                    <v-list three-line>
                      <template v-for="report in reports">
                        <v-subheader v-if="report.id" v-text="report.name"></v-subheader>
                        <v-list-tile avatar  v-bind:key="report.id" @click="">
                          <v-list-tile-avatar>
                            <img v-bind:src="report.storeImg"/>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="report.store"></v-list-tile-title>
                            <v-list-tile-sub-title> View full report </v-list-tile-sub-title>
                          </v-list-tile-content>
                          <v-list-tile-action>vyrApJUsikfbvaAc14Ec6XHu5Lv2
                            <v-list-tile-action-text>{{ report.time }}</v-list-tile-action-text>
                            <v-icon color="grey lighten-1">delete</v-icon>
                          </v-list-tile-action>
                        </v-list-tile>
                        <v-divider></v-divider>
                      </template>
                    </v-list>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tabs-content>
          <v-tabs-content id="c2">
            <v-card flat>
              <v-card-text>Hi There it is Second Component</v-card-text>
            </v-card>
          </v-tabs-content>
          <v-tabs-content id="c3">
            <v-card flat>
              <v-card-text>
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs12><h6>STOCK REPORT</h6></v-flex>
                    <v-flex xs12>Stock shortage on stores</v-flex>
                    <v-flex style="overflow: auto" >
                      <v-data-table
                        v-bind:headers="stockReportListHeaders"
                        :items="baList"
                        hide-actions
                        :loading="selectLoading"
                        class="elevation-12"
                      >
                        <template slot="items" slot-scope="props" >
                          <td class="text-xs-left">{{ props.item.name }}</td>
                          <td class="text-xs-left">{{ props.item.email }}</td>
                          <td class="text-xs-left">{{ props.item.address }}</td>
                          <td class="text-xs-left">{{ props.item.storeName }}</td>
                          <td><v-btn type="submit" v-on:click="sel_BA(props.item.id)" class="black" > SELECT <v-icon right>check</v-icon></v-btn></td>
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
  export default {
    data () {
      return {
//          GUI DATA
        stockReportListHeaders: [
          { text: 'Store Name', value: 'storeName', align: 'left'},
          { text: 'Area', value: 'address', align: 'left' },
          { text: 'B 1', value: 'sscoBottle1Ltr', align: 'left' },
          { text: 'B 3', value: 'sscoBottle3Ltr', align: 'left' },
          { text: 'B 5', value: 'sscoBottle5Ltr', align: 'left' },
          { text: 'P 1x5', value: 'sscoPoly1x5Ltr', align: 'left' },
          { text: 'P&P 3', value: 'sscoPressPour3Ltr', align: 'left' },
          { text: 'P&P 5', value: 'sscoPressPour5Ltr', align: 'left' },
          { text: 'T 2.5', value: 'sscoTin2.5Ltr', align: 'left' },
          { text: 'T 5', value: 'sscoTin5Ltr', align: 'left' },
          { text: 'T 10', value: 'sscoTin10Ltr', align: 'left' },
          { text: 'J.C 10', value: 'sscoJCan10Ltr', align: 'left' },
          { text: 'J.C 16', value: 'sscoJCan16Ltr', align: 'left' },
          { text: 'B 1', value: 'scBottle1Ltr', align: 'left' },
          { text: 'B 3', value: 'scBottle3Ltr', align: 'left' },
          { text: 'B 4.5', value: 'scBottle4.5Ltr', align: 'left' },
          { text: 'P 1x5', value: 'scPoly1x5Ltr', align: 'left' },
          { text: 'J.C 10', value: 'scJC10Ltr', align: 'left' },
          { text: 'J.C 16', value: 'scJC16Ltr', align: 'left' },
          { text: 'P 1x5', value: 'ssbPoly1x5Ltr', align: 'left' },
          { text: 'T 2.5', value: 'ssbTin2.5Ltr', align: 'left' },
          { text: 'T 5', value: 'ssbTin5Ltr', align: 'left' },
          { text: 'P 1x5', value: 'ssboTin1x5Ltr', align: 'left' },
          { text: 'T 2.5', value: 'ssboTin2.5Ltr', align: 'left' },
          { text: 'T 5', value: 'ssboTin5Ltr', align: 'left' },
        ],
      }
    },
    computed: {
        reports(){
            return this.$store.getters.merchandiserReports
        }
    },
    methods: {
        refreshDB(){
          this.$store.dispatch('fetchMerchandiserReport');
        }
    },
    created(){
//        getting Random store Details
      if (this.$store.getters.user === null) {
        this.$router.push('/login')
      }
    },
    mounted () {
      this.$store.dispatch('fetchMerchandiserReport');
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  table.table thead th:not(:first-child) {
    padding: 0 6px;
  }
</style>
