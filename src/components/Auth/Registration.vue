<template>
  <v-container text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h4 style="margin: 0px">REGISTRATION</h4>
        <h6 style="margin: 0px">ADMINISTRATOR & CLIENT</h6>
      </v-flex>

      <form @submit.prevent="onSignUp" class="mb-5">

        <!--Names-->
        <v-flex xs10 offset-xs1 >
          <v-text-field
            required
            name="username"
            label="FIRST NAME"
            v-model="userInfo.name"
          ></v-text-field>
          <v-text-field
            required
            name="userLastName"
            label="LAST NAME"
            v-model="userInfo.lastName"
          ></v-text-field>
        </v-flex>
        <!--useremail-->
        <v-flex xs10 offset-xs1 >
          <v-text-field
            required
            name="emailId"
            label="E-MAIL"
            v-model="useremail"
          ></v-text-field>
        </v-flex>
        <!--password-->
        <v-flex xs10 offset-xs1>
          <v-text-field
            required
            name="userPassword"
            label="PASSWORD"
            min="6"
            v-model="userpass"
            :type="'password'"
          ></v-text-field>
        </v-flex>
        <!-- Location -->
        <v-flex xs10 offset-xs1>
          <v-text-field
            required
            name="userLocation"
            label="ADDRESS"
            min="6"
            v-model="userInfo.address"
          ></v-text-field>
        </v-flex>
        <!-- Role -->
        <v-flex xs10 offset-xs1>
          <v-select
            v-bind:items="roles"
            v-model="userInfo.role"
            label="ROLE"
            single-line
            bottom
          ></v-select>
        </v-flex>
        <!-- Assign Store -->
        <v-flex xs10 offset-xs1>
          <v-select
            v-if="checkRole"
            v-bind:items="availableStores"
            v-model="userInfo.assignStore"
            label="ASSIGN STORE"
            single-line
            :loading="availableStoreLoading"
            bottom
          ></v-select>
        </v-flex>
        <!--submission-->
        <v-flex xs12>
          <v-btn color="blue" :disabled="!formIsValid" type="submit" > REGISTER <v-icon right>send</v-icon></v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn small color="red" dark to="/">Cancel</v-btn>
        </v-flex>

      </form>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
//    UI Data
//    setting Loading on Selector
        availableStoreLoading: false,
        roles: [
          'Administrator',
          'Client',
          'Super'
        ],
        availableStores: [
        ],
//    =============
        appTitle: 'LOGIN',
//    userInfo
        userInfo:{
          name: '',
          lastName: '',
          address: '',
          role: '',
        },
        useremail: '',
        userpass: '',
      }
    },
    computed: {
//      Validating Fields
      formIsValid(){
        return this.useremail !== '' && this.userInfo.name !== '' && this.userInfo.role !== '' && this.userpass !== ''
      },
      checkRole(){
        return this.userInfo.role === 'BrandAmbassador';
      },
      user (){
        return this.$store.getters.user
      }
    },
    mounted(){
//      this.$store.dispatch('shopsListUPD');
//      this.availableStoreLoading = true;
//      setTimeout(() => {
////  dispatch Order to retrieve Current store List
//        this.populateStoreList();
//        this.availableStoreLoading = false;
//      },6000);
    },
    methods:{
      onSignUp() {
        this.$store.dispatch('userSignUp', {email: this.useremail, password: this.userpass, userInfo: this.userInfo}).then(() => {
//        after successfully Signed Up Route to Login Page
          this.$router.push('/')
        })
      },
      populateStoreList(){
//      Converting Firebase Raw Returns to Vialable Form
//        let obj = this.$store.getters.shops;
//        let convert = Object.keys(obj).map((key) => {
//          return obj[key].name
//        });
//  Storing to Application
//        this.availableStores = convert;
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .bordered {
    border: 4px solid #eee;
  }
  form {
    margin: 0px; padding: 0px; width: 100%;
  }
</style>
