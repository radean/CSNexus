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
        </v-tabs-items>
      </v-tabs>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
//        Reports
//        reports: [],
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

</style>
