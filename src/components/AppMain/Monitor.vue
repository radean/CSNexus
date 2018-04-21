<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap >
    <h1>Monitor</h1>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    created(){
//        getting Random store Details
      if (this.$store.getters.user === null) {
        this.$router.push('/login')
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
