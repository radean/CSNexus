<template>
  <v-app
    id="inspire"
  >
    <v-navigation-drawer
      persistent
      clipped
      enable-resize-watcher
      v-model="drawer"
      app
      width="240"
    >
      <v-list>
        <img align-center src="./assets/mlogo-b.png" style="padding-left: 25%" />
        <v-divider></v-divider>
        <v-subheader class="mt-3 mb-3 grey--text text--darken-1">
          <v-avatar size="48px" class="mr-3">
          <img :src="user.picture" alt="">
          </v-avatar>
          {{ user.name }} [ {{ user.title }} ]
        </v-subheader>
        <v-list-tile ripple="true">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >
              DashBoard
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>insert_chart</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Reports
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>people</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Merchandiser
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>line_style</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Broadcast
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>map</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Monitor
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader class="mt-3 grey--text text--darken-1">Latest Feed</v-subheader>
        <v-divider></v-divider>
        <v-list-tile class="mt-3" @click="">
          <v-list-tile-action>
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Create Merchandiser</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon color="grey darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Manage Merchandiser</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>



    <v-toolbar color="red" dense fixed clipped-left app dark>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        {{ appinfo.name }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon pulse><v-icon>notifications</v-icon></v-btn>
        <v-btn icon pulse><v-icon>message</v-icon></v-btn>
        <v-btn pulse flat v-on:click="helpDialog = !helpDialog">help</v-btn>
        <v-btn pulse flat>LOGOUT</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fill-height>
          <v-layout justify-center>
            <!--Content goes here-->
            <router-view></router-view>
          </v-layout>
        </v-container>
      </v-content>
    </main>

    <v-dialog v-model="helpDialog" persistent>
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


    <!--Footer-->
    <v-footer class="pa-3" fixed light>
      <div>{{ appinfo.fullname }}</div>
      <v-spacer></v-spacer>
      <div> VDM™ {{ new Date().getFullYear() }} | {{ appinfo.authorEmail }}</div>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
//      Settings
      drawer: false,
//      User Details
      user: {
        name: 'Akram Khan',
        title: 'Admin',
        picture: 'https://randomuser.me/api/portraits/men/35.jpg',
      },
//      Dialogs
      helpDialog: false,
    }
  },
  computed: {
      appinfo(){
          return this.$store.getters.appinfo
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.input-group__details:after {
  background-color: rgba(255, 255, 255, 0.32) !important;
}
</style>
