<template>
  <v-container grid-list-lg>
    <h4>Welcome to MCS</h4>
    <h2>Get started here.</h2>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-card color="red darken-2" class="white--text">
          <v-card-title primary-title>
            <div class="headline">Add a new Merchandiser</div>
            <div>Add unlimited merchandiser with MCS™ and track their progress in Real-time.</div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark to="/addMerchandiser">Add <v-icon right>group_add</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card color="yellow darken-1" class="white--text">
          <v-card-title primary-title>
            <div class="headline">Track your Merchandisers</div>
            <div> Monitor current progress. </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark>Stats <v-icon right>poll</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card color="blue darken-3" class="white--text">
          <v-card-title primary-title>
            <div class="headline">Download Reports</div>
            <div> Download Report Generated by MCS™. </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark>Reports <v-icon right>content_paste</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card color="green darken-2" class="white--text">
          <v-card-title primary-title>
            <div class="headline">More Information</div>
            <div> Every thing to know about MCS™ and its API Documentations. </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark>Download<v-icon right>file_download</v-icon></v-btn>
            <v-btn flat dark>Information <v-icon right>content_copy</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
    name: 'app',
    data () {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
