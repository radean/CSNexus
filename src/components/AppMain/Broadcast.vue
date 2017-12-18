<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap >
      <v-tabs dark grow>
        <v-toolbar color="cyan" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Monitor B.A</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-tabs-bar class="cyan" slot="extension">
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tabs-item href="B1">
              Boradcast
            </v-tabs-item>
            <v-tabs-item href="B2">
              Position
            </v-tabs-item>
          </v-tabs-bar>
        </v-toolbar>
        <v-tabs-items>
          <v-tabs-content id="B1">
            <v-card flat>
              <v-card-text>
                <v-container fluid style="min-height: 0;" >
                  <v-layout row wrap >
                    <v-flex xs12 class="title"> BROADCAST PUSHES </v-flex>
                    <v-divider></v-divider>
                    <!--Notification Title-->
                    <v-flex xs12><v-text-field box label="Notification Title" min="6" max="32" counter="32" v-model="nTitle"></v-text-field></v-flex>
                    <!--Notification Message-->
                    <v-flex xs12><v-text-field box label="Notification Body" min="6" max="64" counter="64" v-model="nBody"></v-text-field></v-flex>
                    <!--Notification submission Button-->
                    <v-flex xs12> <v-btn :disabled="!ValidateForm" large raised color="pink" v-on:click="sendNotification"> Send Message </v-btn> </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tabs-content>
          <v-tabs-content id="B2">
            <v-card flat>
              <v-card-text>
                <v-container fluid style="min-height: 0;" >
                  <v-layout row wrap >
                    <v-flex xs12 class="title"> MONITOR EMPLOYEE POSITION </v-flex>
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
//        GUI Nodes
        nBody: '',
        nTitle: '',

        items: [
          'Broadcast', 'shopping', 'videos'
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
      },
    computed: {
      ValidateForm(){
          return this.nBody !== '' && this.nTitle !== ''
      }
    },
    methods: {
      sendNotification(){
//       this.$http.headers.common['Authorization'] = 'key=AIzaSyDOUy35eMYN7woRgGdiRw0ypeShbHMDxgM';
//        this.$http.headers.common.Authorization = 'key=AIzaSyDOUy35eMYN7woRgGdiRw0ypeShbHMDxgM';
//      sending Request
        this.$http.post('https://fcm.googleapis.com/fcm/send',
          {
            "notification": {
              "title": this.nTitle,
              "body": this.nBody,
              "click_action" : "https://vdm.com.pk"
            },

            "to" : "/topics/alert",
          },{
            headers: {
              'Authorization': 'key=AIzaSyDOUy35eMYN7woRgGdiRw0ypeShbHMDxgM',
              'Content-Type': 'application/json'
            }
          }
        ).then((response) => {
          console.log(response);
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
