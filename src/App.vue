<template>
  <v-app
    id="inspire"
  >
    <v-navigation-drawer
      v-if="notLogin"
      class="transper"
      persistent
      clipped
      enable-resize-watcher
      v-model="drawer"
      app
      width="240"
    >
      <v-list class="transper">
        <img align-center src="./assets/BAMSLogob.png" style="padding-left: 25%; padding-top: 10%; padding-bottom: 10%;" />
        <v-divider></v-divider>
        <v-subheader class="mt-3 mb-3">
          <v-avatar size="48px" class="mr-3">
          <img :src="userDetail.picture" alt="">
          </v-avatar>
          {{ userDetail.name }}
          [ {{ userDetail.title }} ]
        </v-subheader>
        <v-list-tile to="/" ripple>
          <v-list-tile-action >
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content >
            <v-list-tile-title >
              DashBoard
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile ripple to="/reports">
          <v-list-tile-action>
            <v-icon>event_note</v-icon>
            <!--<v-icon>lock</v-icon>-->
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Reports
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile ripple ripple to="/metaedit">
          <v-list-tile-action>
            <v-icon>chrome_reader_mode</v-icon>
            <!--<v-icon>lock</v-icon>-->
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Meta Edit
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile ripple>
          <v-list-tile-action>
            <!--<v-icon>local_shipping</v-icon>-->
            <v-icon>lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Stock Reports
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile ripple>
          <v-list-tile-action>
            <v-icon>map</v-icon>
            <!--<v-icon>lock</v-icon>-->
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Monitor / Broadcast
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader class="mt-3 grey--text text--darken-1">Date</v-subheader>
        <v-divider></v-divider>
        <v-flex xs7 offset-xs3 class="pt-4 pb-4"><h4 class="headline" style="font-weight: 200">{{ currentDate }}</h4> </v-flex>
        <v-divider></v-divider>
        <v-list-tile @click="" >
          <v-list-tile-action>
            <!--<v-icon >add_circle_outline</v-icon>-->
            <v-icon>lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Update User Parameters</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="bugReportDialog =!bugReportDialog"ripple>
          <v-list-tile-action>
            <v-icon>bug_report</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Bug Reporting</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="transper" fixed clipped-left app>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-0">
        <v-toolbar-side-icon v-if="notLogin" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        {{ appinfo.name }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="notLogin">
        <v-btn icon pulse><v-icon>notifications</v-icon></v-btn>
        <v-btn icon pulse><v-icon>message</v-icon></v-btn>
        <v-btn pulse flat v-on:click="helpDialog = !helpDialog">NEED HELP</v-btn>
        <v-btn pulse flat v-on:click="onSignOut" >Sign out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!--<main>-->
      <v-content>
        <v-container>
          <vue-particles
             class="flying"
             color="#000"
             :particleOpacity="0.1"
             :particlesNumber="70"
             shapeType="circle"
             :particleSize="6"
             linesColor="#000"
             :linesWidth="1"
             :lineLinked="true"
             :lineOpacity="0.2"
             :linesDistance="150"
             :moveSpeed="1"
             :hoverEffect="false"
             hoverMode="none"
             :clickEffect="true"
             clickMode="push"
          ></vue-particles>
          <transition name="fade">
            <!--Content goes here-->
            <v-layout>
            <router-view></router-view>
            </v-layout>
          </transition>
        </v-container>
      </v-content>
    <!--</main>-->
    <!--DIALOGS-->
    <!--Bug Report Dialog-->
    <v-dialog v-model="bugReportDialog" width="500" persistent>
      <!--<v-btn color="primary" dark slot="activator">Open Dialog</v-btn>-->
      <v-card>
        <v-card-title class="headline">BUG REPORTING</v-card-title>
        <v-card-text>
          Email: help@vdm.com.pk<br>Phone #: (021)-85432156 <br>
          All the other tool will be active on next patch [1.2]. <br>
          Release Date : TBA
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="bugReportDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--HELP DIALOG-->
    <v-dialog v-model="helpDialog" width="500" persistent>
      <!--<v-btn color="primary" dark slot="activator">Open Dialog</v-btn>-->
      <v-card>
        <v-card-title class="headline">Help & Contact</v-card-title>
        <v-card-text>Email: help@vdm.com.pk<br>Phone #: (021)-85432156</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="helpDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Percentage Loading Dialog-->
    <v-dialog v-model="appPercentageLoadingStats.isLoading" width="600" persistent >
      <!--<v-btn color="primary" dark slot="activator">Open Dialog</v-btn>-->
      <v-card>
        <v-card-title class="headline">Fetching Please Wait...  </v-card-title>
        <v-card-text>BAMS™ is fetching Meta Information, If something went wrong please notify us.</v-card-text>
        <v-container>
          <v-layout row wrap center>
            <v-flex >
              <v-progress-linear v-model="appPercentageLoadingStats.percentage"></v-progress-linear>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
    <!--Loading Dialog-->
    <v-dialog v-model="appLoadingStats.mainLoading" width="400" persistent >
      <!--<v-btn color="primary" dark slot="activator">Open Dialog</v-btn>-->
      <v-card dark>
        <v-card-title class="headline">Please Wait </v-card-title>
        <v-card-text>if this query taking more than 30 seconds contact VDM.</v-card-text>
        <v-container>
          <v-layout row wrap center>
            <v-flex xs2 offset-xs5>
              <v-progress-circular indeterminate v-bind:size="50" color="amber"></v-progress-circular>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
    <!--Messages-->
    <!--Snackers-->
    <v-snackbar
      v-model="successFlag"
      :top="true"
      class="green"
      dark
    >
      {{ successMsg }}
      <v-btn flat color="white" @click.native="successFlag = false">Close</v-btn>
    </v-snackbar>
    <!--Errors-->
    <!--B.A Sign in Error-->
    <v-dialog v-model="appError" persistent >
      <!--<v-btn color="primary" dark slot="activator">Open Dialog</v-btn>-->
      <v-card>
        <v-card-title class="headline">Authorization Error</v-card-title>
        <v-card-text>Please double check your Username and Password.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat>Wait 5 seconds</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Footer-->
    <v-footer class="pa-3 transper" fixed>
      <div>{{ appinfo.fullname }} - version - {{ appinfo.version }}</div>
      <v-spacer></v-spacer>
      <div class="transperr blue--text"> VDM™ {{ new Date().getFullYear() }} | {{ appinfo.company }}</div>
    </v-footer>
  </v-app>
</template>

<script>
//  import 'particles.js';
//  Adding Particles
export default {
  data () {
    return {
//      Settings
      drawer: null,
      notLogin: false,
//      User Details
      currentDate: null,
      userDetail: {
        name: '',
        title: '',
        picture: './static/img/app/placeholder.jpg',
      },
//      Dialogs
      bugReportDialog: false,
      helpDialog: false,
//      Toasts
    }
  },
  watch: {
    user(value){
      if (value !== null && value !== undefined){
        this.notLogin = true;
      }else if(value === null && value === undefined){
        this.notLogin = false;
      }
    },
    userInfo (value){
      if (value !== null && value !== undefined) {
        switch (this.userInfo.role) {

          default:
            this.notLogin = false;
            break;

          case "Administrator":
            this.notLogin = true;
            console.log('Role =  Administrator')
            this.$router.push('/');
            break;

          case "Client":
            this.notLogin = true;
            console.log('Role =  Client')
            this.$router.push('/merc');
            break;
        }
      }
      else if(value == null ) {
          console.log('user info Error')
          this.$router.push('/login')
      }
    }
  },
  created(){
//      Fetching Information
    this.$store.dispatch('fetchAppInformation');
//      Making User Session
    this.$store.dispatch('userSession');
    let user = this.$store.getters.user;
    if (user === null) {
      this.$router.push('/login')
    };
    setTimeout(() => {
      this.$http.get('https://api.timezonedb.com/v2/list-time-zone?key=QNVJJL9QLWE4&format=json&country=PK').then(response => {
        let date = new Date((response.body.zones[0].timestamp * 1000) - response.body.zones[0].gmtOffset * 1000);
        let year = 1900 + date.getYear();
        let day = ("0" + date.getDate()).slice(-2);
        let month = date.getMonth() + 1;
        this.currentDate = month + '-' + day + '-' + year;
      }).catch(() => {
        let date = new Date();
          let year = 1900 + date.getYear();
          let day = ("0" + date.getDate()).slice(-2);
        let month = date.getMonth() + 1;
        this.currentDate = month + '-' + day + '-' + year;
      });
      this.setUpUser();
      console.log('done')
    }, 3000)
  },
  computed: {
      userInfo(){
        return this.$store.getters.userInfo;
      },
      appinfo(){
        return this.$store.getters.appinfo
      },
      appError(){
        let error = this.$store.getters.userError
        if (error) {
          setTimeout(() => {
            this.$router.push('/login')
          }, 4000)
        }
        return error
      },
      user (){
        return this.$store.getters.user
      },
      appLoadingStats(){
        return this.$store.getters.mainLoading
      },
      appPercentageLoadingStats(){
        return this.$store.getters.percentageLoading
      },
      successMsg(){
        return this.$store.getters.successMsg
      },
      successFlag(){
        return this.$store.getters.successFlag
      }
  },
  methods:{
    onSignOut(){
      this.$store.dispatch('userSignOut');
      this.$router.push('/login')
      document.location.reload(true);
    },
    setUpUser(){
      this.userDetail.name = this.userInfo.name;
    }
  }
}
</script>

<style>
  /*importing Font*/
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300');
  /*Applying Font*/
  body {
    font-family: 'Open Sans', sans-serif;
    /*user-select: all;*/
  }
  #inspire{
    font-family: 'Open Sans', sans-serif;
    background: #3aa0ff;  /* fallback for old browsers */
    /*background-image: url("assets/bg.jpg");*/
    background:  -webkit-linear-gradient(to left, #514A9D, #24C6DC);  /* Chrome 10-25, Safari 5.1-6 */
    background:  linear-gradient(to left, #fafafa, #e0e0e0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background-repeat: repeat;
  }
  .gradientHead{
    background: #3aa0ff;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #fafafa, #f5f5f5);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #fafafa, #f5f5f5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .gradientDialog{
    background: #000428;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #ada3ff, #3aa0ff);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #ada3ff, #3aa0ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: #FFF;
  }
  .transper {
    background-color: rgba(240,240,240,0.8) !important;
    box-shadow: 0px 0px 32px 0px rgba(0,0,0,0.2);
    color: #222;
  }
  .flying {
    position: absolute;
    width: 100%;
    height: 90%;
  }
  #app {
    /*font-family: 'Barlow', sans-serif;*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
  }
  /* ==========================================================================
    W  I  N  D  O  W     S  T  Y  L  E
   ========================================================================== */
  ::-webkit-scrollbar {
    width: .4em;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(218, 218, 218, 0.6);
    transition: all .2s ease-out;
  }
  ::-webkit-scrollbar-track:hover {
    transition: all .2s ease-out;
    background-color: rgb(251, 251, 251);
  }

  ::-webkit-scrollbar-thumb {
    background-color: #3aa0ff;
    outline: 3px solid #3aa0ff;
  }
  .input-group__details:after {
    background-color: rgba(255, 255, 255, 0.32) !important;
  }

  a {color: inherit !important;}

  form {
    margin: 0px; padding: 0px; width: 100%;
  }

  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s;
  }

  .fade-enter-active {
    transition-delay: .25s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
