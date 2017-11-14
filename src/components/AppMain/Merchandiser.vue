<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap >
      <v-tabs fixed icons centered >
        <v-toolbar color="blue" dark>
          <v-toolbar-title class="display-1">MERCHANDISER</v-toolbar-title>
        </v-toolbar>
        <v-tabs-bar class="blue">
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tabs-item href="c1">
            <v-icon>people</v-icon>
            Add Merchandiser
          </v-tabs-item>
          <v-tabs-item href="c2">
            <v-icon>reorder</v-icon>
            Merchandiser List
          </v-tabs-item>
          <v-tabs-item href="c3">
            <v-icon>settings</v-icon>
            Settings
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content id="c1" >
            <v-card flat>
              <v-card-text>
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs12><h6>Please fill the following fields.</h6> All fields are required</v-flex>

                    <form @submit.prevent="onMerchandierReg" class="mb-5">

                      <!--username-->
                      <v-flex xs10 offset-xs1>
                        <v-text-field
                          required
                          name="emailId"
                          label="E-MAIL"
                          id="testing"
                          v-model="useremail"
                        ></v-text-field>
                      </v-flex>
                      <!--vdm key-->
                      <v-flex xs10 offset-xs1>
                        <v-text-field
                          required
                          name="v_key"
                          label="V-KEY"
                          id="testing"
                          min="6"
                          v-model="v_key"
                          :type="'password'"
                        ></v-text-field>
                      </v-flex>
                      <!--username-->
                      <v-flex xs10 offset-xs1>
                        <v-text-field
                          required
                          name="userId"
                          label="USERNAME"
                          id="testing"
                          v-model="username"
                        ></v-text-field>
                      </v-flex>
                      <!--password-->
                      <v-flex xs10 offset-xs1>
                        <v-text-field
                          required
                          name="userPassword"
                          label="PASSCODE"
                          id="testing"
                          min="6"
                          v-model="userpass"
                          :type="'password'"
                        ></v-text-field>
                      </v-flex>
                      <!--submission-->
                      <v-flex xs12>
                        <v-btn large :disabled="!formIsValid" type="submit" class="green" > SUBMIT <v-icon right>send</v-icon></v-btn>
                      </v-flex>

                    </form>

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
              <v-card-text>Hi There it is Third Component</v-card-text>
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
//        Add Merchandiser
        //      userInfo
        useremail: '',
        username: '',
        v_key: '',
        userpass: '',
      }
    },
    methods:{
      onMerchandierReg() {
        this.$store.dispatch('merchandiserReg', {email: this.useremail, password: this.userpass})
      }
    },
    computed: {
      //      Validating Fields
      formIsValid(){
        return this.useremail !== '' && this.username !== '' && this.v_key !== '' && this.userpass !== '' && this.v_key == 2648
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
