<template>
  <v-container text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 md12>
        <v-avatar :tile="false" :size="'128px'" class="grey lighten-4 ma-1">
          <img class="bordered" src="../../assets/placeholder.jpg" alt="avatar">
        </v-avatar>
      </v-flex>
      <form @submit.prevent="">
      <!--username-->
      <v-flex xs10 md4 offset-md4>
        <v-text-field
          name="useremail"
          label="UserName"
          id="testing"
          v-model="useremail"
        ></v-text-field>
      </v-flex>
      <!--password-->
      <v-flex xs10 md4 offset-md4 >
        <v-text-field
          name="userPassword"
          label="PASSCODE"
          id="testing"
          min="6"
          v-model="userpass"
          type="password"
        ></v-text-field>
      </v-flex>
      <!--submission-->
      <v-flex xs12>
        <v-btn color="green" :disabled="!formIsValid" type="submit"> SUBMIT <v-icon right>send</v-icon></v-btn>
      </v-flex>
      <v-flex xs12>
        <v-btn small color="red" :disabled="user" >Forgotten Pass</v-btn>
      </v-flex>
    </form>
    </v-layout>
  </v-container>
</template>


  <script>
  export default {
    data () {
      return {
//      userInfo
        useremail: '',
        userpass: '',
      }
    },
    computed:{
      formIsValid(){
        return this.username !== '' && this.userpass !== ''
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
