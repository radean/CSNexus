<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap >
      <v-tabs fixed icons centered >
        <v-toolbar color="blue" dark>
          <v-toolbar-title class="display-1">UPDATE USER INFORMATION</v-toolbar-title>
        </v-toolbar>
        <v-tabs-bar class="blue">
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tabs-item href="c1">
            <v-icon>people</v-icon>
            EDIT B.A
          </v-tabs-item>
          <v-tabs-item href="c2">
            <v-icon>person</v-icon>
            EDIT Supervisor
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content id="c1" >
            <v-card flat>
              <v-card-text>
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs12><h6>EDIT BRANDAMBASSADOR</h6> All fields are required</v-flex>

                    <form @submit.prevent="onBAUPD" class="mb-5">

                      <!--EMAIL-->
                      <!--username-->
                      <v-flex xs10 offset-xs1>
                        <v-text-field
                          required
                          name="name"
                          label="NAME"
                          v-bind:value="selectedBAData.name"
                          v-model="editBA.name"
                        ></v-text-field>
                      </v-flex>
                       <!--Assign Store -->
                      <v-flex xs10 offset-xs1>
                        <v-select
                        v-bind:items="unAssignedStores"
                        v-model="editBA.store"
                        label="ASSIGN NEW STORE"
                        single-line
                        item-text="name"
                        item-value="{id,name}"
                        :loading="selectLoading"
                        bottom
                        ></v-select>
                      </v-flex>
                      <!--submission-->
                      <v-flex xs12>
                        <v-btn large v-on:click="onBAUPD" type="submit" class="green" > + UPDATE <v-icon right>refresh</v-icon></v-btn>
                      </v-flex>

                    </form>
                    <v-flex xs12>
                      <v-divider></v-divider>
                      <h4>B.A LIST</h4>
                      Available Brand Ambassador List.
                    </v-flex>
                    <v-data-table
                      v-bind:headers="baListHeaders"
                      :items="baList"
                      hide-actions
                      :loading="selectLoading"
                      class="elevation-12"
                    >
                      <template slot="items" slot-scope="props" >
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.email }}</td>
                        <td class="text-xs-left">{{ props.item.address }}</td>
                        <td class="text-xs-left">{{ props.item.storeName }}</td>
                        <td><v-btn type="submit" v-on:click="sel_BA(props.item.id)" class="black" > SELECT <v-icon right>check</v-icon></v-btn></td>
                      </template>
                    </v-data-table>
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

                 This Feature is under development.

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
        selectedBA: null,
        selectedBAData: {

        },
        editBA: {
          name: '',
          store: null
        },
//        Add Supervisor
        addSupervisor: {
          name: '',
          address: '',
          email: '',
          password: '',
          role: 'Supervisor',
        },
//        GUI DATA
        selectLoading: true,
        baListHeaders: [
          {
            text: 'Name',
            value: 'name',
            align: 'left'
          },
          { text: 'E-Mail', value: 'email', align: 'left' },
          { text: 'Address', value: 'address', align: 'left' },
          { text: 'Store', value: 'storeId', align: 'left' },
        ],
        baList: [],
        unAssignedStores: [],
        cities: [
          'KHI',
          'LHR',
          'ISD'
        ],
      }
    },
    methods:{
//    Selections
      sel_BA(id){
        this.selectedBA = id;
        this.onBASelect();
      },
      onBASelect() {
        this.$store.dispatch('fetchSelectedBa', this.selectedBA).then(() => {
          this.selectedBAData = this.$store.getters.selectedBa;
          this.editBA.name = this.selectedBAData.name;
          this.editBA.store = this.selectedBAData.store;
        });
      },
      onBAUPD() {
        this.$store.dispatch('updateSelectedBa', this.editBA).then(() => {
          setTimeout(() => {
//  dispatch Order to retrieve Unassigned store List
            this.populateBAList();
            this.populateUnassignedStoreList();
            this.selectLoading = false;
          },2000);
        });
      },
      onSupervisorReg() {
        this.$store.dispatch('supervisorReg', {email: this.addSupervisor.email, password: this.addSupervisor.password, supervisor: this.addSupervisor})
      },
      populateBAList(){
//      Converting Firebase Raw Returns to Vialable Form
        let obj = this.baListfetch;
        let convert = Object.keys(obj).map((key) => {
          return {
            id: obj[key].id,
            name : obj[key].name,
            storeName: obj[key].storeName,
            address: obj[key].address,
            email: obj[key].email,
            uniqueId: obj[key].uniqueId,
          };
        });
//      Storing to Application
        this.baList = convert;
      },
      populateUnassignedStoreList(){
//      Converting Firebase Raw Returns to Vialable Form
        console.log('Population under working')
        let obj = this.unAssignedStore;
        let convert = Object.keys(obj).map((key) => {
          return {
            id: obj[key].id,
            name : obj[key].name};
        });
//      Storing to Application
        this.unAssignedStores = convert;
      },
    },
    computed: {
//      Fetching Data
//      unAssigned Store List
      unAssignedStore(){
        return this.$store.getters.unAssignedStores
      },
//        BA List
      baListfetch(){
        return this.$store.getters.availableBA
      },
//      Validating Fields
      supervisorFormValid(){
        return this.addSupervisor.name !== ''
          && this.addSupervisor.address !== ''
          && this.addSupervisor.email !== ''
          && this.addSupervisor.password !== ''
      },
    },
    created(){
      //        getting Random store Details
      if (this.$store.getters.user === null) {
        this.$router.push('/login')
      }
        this.$store.dispatch('baListUPD').then(() => {
//           Un-Assigned stores Updated
          console.log("BA List Updated");
        });

      setTimeout(() => {
//  dispatch Order to retrieve Unassigned store List
        this.populateUnassignedStoreList();
        this.selectLoading = false;
        this.populateBAList();
      },4000);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
