<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap >
      <div style="width: 100%">
        <v-toolbar
                class="gradientHead"
                tabs
        >
          <v-toolbar-title>META EDIT</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-tabs
                  slot="extension"
                  v-model="tab"
                  class="gradientHead"
                  fixed-tabs
                  grow
          >
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab class="gradientHead" href="#c1" v-on:click="fetchStoreList">
              <v-icon>people</v-icon>
               Edit Meta Data
            </v-tab>
            <v-tab class="gradientHead" href="#c2">
              <v-icon>person</v-icon>
               Add Brand Amb.
            </v-tab>
            <v-tab class="gradientHead" href="#c3">
              <v-icon>store</v-icon>
               Add Stores
            </v-tab>
          </v-tabs>
        </v-toolbar>

        <v-tabs-items v-model="tab">
          <v-tab-item id="c1">
            <v-card flat class="gradientHead">
              <v-card-text>
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs12 class="title">EDIT META DATA</v-flex>
                    <v-flex xs12 class="body-2"> Changing existing application meta information</v-flex>
                    <v-flex xs12 class="body-1"> Please fill all required fields and then click on Edit/Create.</v-flex>
                    <v-flex xs12 >
                      Please make sure you are aware of this section this can cause <strong>massive DB errors</strong>  and BAMS™ can break.
                        <br>
                      Misuse of this section can take a minimum duration of <strong>six working days</strong>  to fix.
                    </v-flex>

                    <form @submit.prevent="onBAReg" class="mb-5">

                      <v-container grid-list-md text-xs-center>
                        <v-layout row wrap>
                          <!--Section halfA-->
                          <v-flex xs6 >
                            <!--title-->
                            <v-flex xs12 class="title"> BAMS™ Initial Data </v-flex>
                            <v-flex xs12> All basic application information can be edited by below </v-flex>
                            <!--Application Name-->
                            <v-flex xs10 offset-xs1>
                              <v-text-field
                                      required
                                      hint="Application name that will appear on main title bar After BAMS™ "
                                      persistent-hint
                                      name="appName"
                                      label="Application Name"
                                      v-model="editMetaData.appName"
                                      :clearable="true"
                              ></v-text-field>
                            </v-flex>
                            <!--Company Name -->
                            <v-flex xs10 offset-xs1>
                              <v-text-field
                                      required
                                      hint="Company name that appear (default is VDM)"
                                      persistent-hint
                                      name="company"
                                      label="Company"
                                      v-model="editMetaData.company"
                              ></v-text-field>
                            </v-flex>
                            <!--Full Name -->
                            <v-flex xs10 offset-xs1>
                              <v-text-field
                                      required
                                      hint="Full Name of Brand"
                                      persistent-hint
                                      name="name"
                                      label="Full Name"
                                      v-model="editMetaData.fullAppName"
                              ></v-text-field>
                            </v-flex>
                            <!--Activation Start Date-->
                            <v-flex xs10 offset-xs1>
                              <v-text-field
                                      required
                                      hint="From which data collection started"
                                      persistent-hint
                                      name="address"
                                      label="Activation Start Date"
                                      v-model="editMetaData.address"
                              ></v-text-field>
                            </v-flex>
                            <!--Activation End Date-->
                            <v-flex xs10 offset-xs1>
                              <v-text-field
                                      required
                                      hint="To the date when data collection end"
                                      persistent-hint
                                      name="Password"
                                      label="Activation End Date"
                                      min="6"
                                      v-model="editMetaData.password"
                                      :type="'password'"
                              ></v-text-field>
                            </v-flex>
                            <!--Version-->
                            <v-flex xs10 offset-xs1>
                              <v-text-field
                                      required
                                      hint="Should be 1.0.0 [Any three digit according to build Number]"
                                      persistent-hint
                                      name="appVersion"
                                      label="Version"
                                      v-model="editMetaData.version"
                              ></v-text-field>
                            </v-flex>
                            <!--Application Mode-->
                            <v-flex xs10 offset-xs1>
                              <v-text-field
                                      required
                                      hint="Application Licensed Mode must be either Licensed or Non-Licensed"
                                      persistent-hint
                                      name="appMode"
                                      label="Application Mode"
                                      v-model="editMetaData.appMode"
                              ></v-text-field>
                            </v-flex>
                            <!--Subscription-->
                            <v-flex xs10 offset-xs1>
                              <v-text-field
                                      required
                                      hint="Application Subscription Package either Spark[1], Flame[2] or Blaze[3]"
                                      persistent-hint
                                      name="subscription"
                                      label="Subscription Status"
                                      v-model="editMetaData.subscription"
                              ></v-text-field>
                            </v-flex>
                            <!--Theme-->
                            <v-flex xs10 offset-xs1>
                              <v-text-field
                                      required
                                      hint="Change between 3 Different Color Theme"
                                      persistent-hint
                                      name="Password"
                                      label="Application Color Theme"
                                      v-model="editMetaData.colorTheme"
                              ></v-text-field>
                            </v-flex>
                            <!--Version -->
                            <v-flex xs10 offset-xs1>
                              <v-select
                                      v-bind:items="unAssignedStores"
                                      v-model="editMetaData.store"
                                      label="ASSIGN STORE"
                                      single-line
                                      item-text="name"
                                      item-value="id,name"
                                      :loading="selectLoading"
                                      bottom
                              ></v-select>
                            </v-flex>
                          </v-flex>
                          <!--Section halfA-->
                          <v-flex xs6 >
                            <!--EMAIL-->
                            <v-flex xs10 offset-xs1>
                              <v-text-field
                                      required
                                      name="email"
                                      label="E-MAIL"
                                      v-model="addBA.email"
                                      max="5"
                                      :counter="true"
                                      :clearable="true"
                              ></v-text-field>
                            </v-flex>
                            <!--username-->
                            <v-flex xs10 offset-xs1>
                              <v-text-field
                                      required
                                      name="name"
                                      label="NAME"
                                      v-model="addBA.name"
                              ></v-text-field>
                            </v-flex>
                            <!--Address-->
                            <v-flex xs10 offset-xs1>
                              <v-text-field
                                      required
                                      name="address"
                                      label="ADDRESS"
                                      v-model="addBA.address"
                              ></v-text-field>
                            </v-flex>
                            <!--password-->
                            <v-flex xs10 offset-xs1>
                              <v-text-field
                                      required
                                      name="Password"
                                      label="PASSCODE"
                                      min="6"
                                      v-model="addBA.password"
                                      :type="'password'"
                              ></v-text-field>
                            </v-flex>
                            <!--Assign Store -->
                            <v-flex xs10 offset-xs1>
                              <v-select
                                      v-bind:items="unAssignedStores"
                                      v-model="addBA.store"
                                      label="ASSIGN STORE"
                                      single-line
                                      item-text="name"
                                      item-value="id,name"
                                      :loading="selectLoading"
                                      bottom
                              ></v-select>
                            </v-flex>
                          </v-flex>
                        </v-layout>
                      </v-container>


                      <!--submission-->
                      <v-flex xs12>
                        <v-btn large :disabled="!baFormValid" type="submit" class="green" > EDIT/CREATE <v-icon right>send</v-icon></v-btn>
                      </v-flex>

                    </form>

                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item id="c2">
            <v-card flat class="gradientHead">
              <v-card-text>
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs12 class="title">ADD SUPERVISOR </v-flex>
                    <v-flex xs12 class="body-2"> Create a new Supervisor.</v-flex>
                    <v-flex xs12 class="body-1"> Please fill all fields and then click on SUBMIT.</v-flex>
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
                      <!--submission-->
                      <v-flex xs12>
                        <v-btn large :disabled="!supervisorFormValid" type="submit" class="green" > SUBMIT <v-icon right>send</v-icon></v-btn>
                      </v-flex>

                    </form>

                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item id="c3">
            <v-card flat class="gradientHead">
              <v-card-text>
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs12 class="title">ADD STORE </v-flex>
                    <v-flex xs12 class="body-2"> Create a new Store.</v-flex>
                    <v-flex xs12 class="body-1"> Please fill all fields and then click on Add Store.</v-flex>
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
                      <!-- Assign Store -->
                      <v-flex xs10 offset-xs1>
                        <v-select
                                v-bind:items="cities"
                                v-model="addStore.city"
                                label="CITY"
                                single-line
                                bottom
                        ></v-select>
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
          </v-tab-item>
        </v-tabs-items>

        <v-tabs-items v-model="tab">
          <v-tab-item
                  v-for="item in items"
                  :key="item"
          >
            <v-card flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>
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
          store: '',
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
        editMetaData: {
          appName: '',
          fullAppName: '',
          companyName: '',
          startDate: '',
          endDate: '',
          version: '',
          mode: '',
          status: '',
          subscription: '',
          colorTheme: ''
        },
//        GUI DATA
        selectLoading: true,
        tab: '',
        unAssignedStores: [

        ],
        cities: [
          'KHI',
          'LHR',
          'ISD'
        ],
      }
    },
    methods:{
      onBAReg() {
        this.$store.dispatch('brandAmbassadorReg', {email: this.addBA.email, password: this.addBA.password, ba: this.addBA}).then(() => {
            setTimeout(() => {
                document.location.reload();
            },6000)
        })
      },
      onSupervisorReg() {
        this.$store.dispatch('supervisorReg', {email: this.addSupervisor.email, password: this.addSupervisor.password, supervisor: this.addSupervisor})
      },
      onStoreReg() {
        this.$store.dispatch('storeReg', this.addStore)
      },
      fetchStoreList(){
//        Fetching Required Data
        this.$store.dispatch('unAssignedStoresListUPD')
      },
      populateUnassignedStoreList(){
//      Converting Firebase Raw Returns to Vialable Form
        let obj = this.unAssignedStore;
        let convert = Object.keys(obj).map((key) => {
          return { id: obj[key].id,name : obj[key].name};
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
      //        getting Random store Details
      if (this.$store.getters.user === null) {
        this.$router.push('/login')
      }
      this.$store.dispatch('unAssignedStoresListUPD').then(() => {
      });
      setTimeout(() => {
//  dispatch Order to retrieve Unassigned store List
        this.populateUnassignedStoreList();
        this.selectLoading = false;
      },2000);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
