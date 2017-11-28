<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap >
      <v-tabs fixed icons centered >
        <v-toolbar color="blue" dark>
          <v-toolbar-title class="display-1">CREATE</v-toolbar-title>
        </v-toolbar>
        <v-tabs-bar class="blue">
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tabs-item href="c1">
            <v-icon>people</v-icon>
            Add B.A
          </v-tabs-item>
          <v-tabs-item href="c2">
            <v-icon>person</v-icon>
            Add Supervisor
          </v-tabs-item>
          <v-tabs-item href="c3">
            <v-icon>store</v-icon>
            Add Store
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content id="c1" >
            <v-card flat>
              <v-card-text>
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs12><h6>ADD BRANDAMBASSADOR</h6> All fields are required</v-flex>

                    <form @submit.prevent="onMerchandierReg" class="mb-5">

                      <!--EMAIL-->
                      <v-flex xs10 offset-xs1>
                        <v-text-field
                          required
                          name="emailId"
                          label="E-MAIL"
                          v-model="addBA.email"
                        ></v-text-field>
                      </v-flex>
                      <!--username-->
                      <v-flex xs10 offset-xs1>
                        <v-text-field
                          required
                          name="userId"
                          label="NAME"
                          id="testing"
                          v-model="addBA.name"
                        ></v-text-field>
                      </v-flex>
                      <!--Address-->
                      <v-flex xs10 offset-xs1>
                        <v-text-field
                          required
                          name="userId"
                          label="ADDRESS"
                          id="testing"
                          v-model="addBA.address"
                        ></v-text-field>
                      </v-flex>
                      <!--StoreID-->
                      <v-flex xs10 offset-xs1>
                        <v-text-field
                          required
                          name="userId"
                          label="STORE ID"
                          id="testing"
                          v-model="addBA.storeId"
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
                          v-model="addBA.password"
                          :type="'password'"
                        ></v-text-field>
                      </v-flex>
                      <!--submission-->
                      <v-flex xs12>
                        <v-btn large :disabled="!baFormValid" type="submit" class="green" > + CREATE <v-icon right>send</v-icon></v-btn>
                      </v-flex>

                    </form>

                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tabs-content>
          <v-tabs-content id="c2">
          <v-card flat>
            <v-card-text>
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs12><h6>ADD SUPERVISOR</h6> All fields are required</v-flex>

                  <form @submit.prevent="onSupervisorReg" class="mb-5">
                    <!--username-->
                    <v-flex xs10 offset-xs1>
                      <v-text-field
                        required
                        name="emailId"
                        label="E-MAIL"
                        v-model="addSupervisor.email"
                      ></v-text-field>
                    </v-flex>
                    <!--password-->
                    <v-flex xs10 offset-xs1>
                      <v-text-field
                        required
                        name="userPassword"
                        label="PASSCODE"
                        min="6"
                        v-model="addSupervisor.password"
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
                        v-model="addSupervisor.name"
                      ></v-text-field>
                    </v-flex>
                    <!-- Location -->
                    <v-flex xs10 offset-xs1>
                      <v-text-field
                        required
                        name="userLocation"
                        label="ADDRESS"
                        min="6"
                        v-model="addSupervisor.address"
                      ></v-text-field>
                    </v-flex>
                    <!-- Assign Store -->
                    <!--<v-flex xs10 offset-xs1>-->
                      <!--<v-select-->
                        <!--v-bind:items="availableStores"-->
                        <!--v-model="addSupervisor.storeId"-->
                        <!--label="ASSIGN STORE"-->
                        <!--single-line-->
                        <!--:loading="availableStoreLoading"-->
                        <!--bottom-->
                      <!--&gt;</v-select>-->
                    <!--</v-flex>-->
                    <!--submission-->
                    <v-flex xs12>
                      <v-btn large :disabled="!supervisorFormValid" type="submit" class="green" > SUBMIT <v-icon right>send</v-icon></v-btn>
                    </v-flex>

                  </form>

                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
          </v-tabs-content>
          <v-tabs-content id="c3">
            <v-card flat>
              <v-card-text>
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs12><h6>ADD STORE</h6> All fields are required</v-flex>

                    <form @submit.prevent="onStoreReg" class="mb-5">
                      <!--username-->
                      <v-flex xs10 offset-xs1>
                        <v-text-field
                          required
                          name="storeName"
                          label="STORE NAME"
                          v-model="addStore.name"
                        ></v-text-field>
                      </v-flex>
                      <!--username-->
                      <v-flex xs10 offset-xs1>
                        <v-text-field
                          required
                          name="address"
                          label="ADDRESS"
                          id="testing"
                          v-model="addStore.address"
                        ></v-text-field>
                      </v-flex>
                      <!--password-->
                      <v-flex xs10 offset-xs1>
                        <v-text-field
                          required
                          name="city"
                          label="CITY"
                          min="6"
                          v-model="addStore.city"
                        ></v-text-field>
                      </v-flex>
                      <!--submission-->
                      <v-flex xs12>
                        <v-btn large :disabled="!storeFormValid" type="submit" class="green" > ADD STORE <v-icon right>send</v-icon></v-btn>
                      </v-flex>

                    </form>

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
//        Add B.A
        addBA: {
          name: '',
          address: '',
          email: '',
          password: '',
          storeId: '',
          role: 'BrandAmbassador',
        },
//        Add Store
        addStore: {
          city: '',
          address: '',
          name: '',
          assign: ''
        },
//        Add Supervisor
        addSupervisor: {
          name: '',
          address: '',
          email: '',
          password: '',
          role: 'Supervisor',
        },
        //      userInfo
        useremail: '',
        username: '',
        v_key: '',
        userpass: '',
      }
    },
    methods:{
      onBAReg() {
        this.$store.dispatch('brandAmbassadorReg', {email: this.useremail, password: this.userpass, ba: this.addBA})
      },
      onSupervisorReg() {
        this.$store.dispatch('supervisorReg', {email: this.useremail, password: this.userpass, supervisor: this.supervisor})
      },
      onStoreReg() {
        this.$store.dispatch('storeReg', this.addStore)
      }
    },
    computed: {
//      Fetching Data
//      unAssigned Store List
      unAssignedStore(){
        return this.$store.getters.unAssignedStores
      },


//      Validating Fields
      supervisorFormValid(){
        return this.addSupervisor.name !== ''
          && this.addSupervisor.address !== ''
          && this.addSupervisor.email !== ''
          && this.addSupervisor.password !== ''
      },
      storeFormValid(){
        return this.addStore.name !== '' && this.addStore.address !== '' && this.addStore.city !== ''
      },
      baFormValid(){
        return this.addBA.name !== ''
          && this.addBA.address !== ''
          && this.addBA.email !== ''
          && this.addBA.password !== ''
          && this.addBA.storeId !== ''
      },
    },
    created(){
        this.$store.dispatch('unAssignedStoresListUPD').then(() => {
//           Un-Assigned stores Updated
          console.log("Store Updated");
        });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
