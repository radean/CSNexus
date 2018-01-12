<template>
  <div>
    <h3>Add B.A Here</h3>
    <v-btn dark flat v-on:click="goBack">Back</v-btn>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data () {
      return {

      }
    },
    methods:{
        goBack(){
         this.$router.go(-1)
        }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
