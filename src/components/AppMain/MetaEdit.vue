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
                      <v-container>
                        <v-layout row wrap>
                          <!--Section halfA-->
                          <v-flex xs6>
                            <form @submit.prevent="onMetaReg">
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

                            <!--Full Name -->
                            <v-flex xs10 offset-xs1>
                              <v-text-field
                                      required
                                      hint="Full Name of Brand should not exceed 40 letters"
                                      persistent-hint
                                      name="name"
                                      label="Full Name"
                                      max="40"
                                      :counter="true"
                                      v-model="editMetaData.fullAppName"
                              ></v-text-field>
                            </v-flex>

                            <!--Company & Version-->
                            <v-container grid-list-md text-xs-center class="ma-0 pa-0">
                              <v-layout row wrap>

                                <!--Company Name -->
                                <v-flex xs5 sm5 md5 offset-md1>
                                  <v-text-field
                                          required
                                          hint="Company name that appear (default is VDM)"
                                          persistent-hint
                                          name="company"
                                          label="Company"
                                          v-model="editMetaData.companyName"
                                  ></v-text-field>
                                </v-flex>

                                <!--Version-->
                                <v-flex xs5 sm5 md5>
                                  <v-text-field
                                          required
                                          hint="Should be 1.0.0 [Any three digit according to build Number]"
                                          persistent-hint
                                          name="appVersion"
                                          label="Version"
                                          v-model="editMetaData.version"
                                  ></v-text-field>
                                </v-flex>
                              </v-layout>
                            </v-container>

                            <!--Modes & Subscription-->
                            <v-container grid-list-md text-xs-center class="ma-0 pa-0">
                              <v-layout row wrap>
                                <!--Application Mode-->
                                <v-flex xs5 sm5 md5 offset-md1>
                                  <v-select
                                          :items="['Licensed', 'Non-Licensed']"
                                          v-model="editMetaData.status"
                                          hint="Application Licensed status must be either Licensed or Non-Licensed"
                                          persistent-hint
                                          name="appStatus"
                                          label="Application status"
                                  ></v-select>
                                </v-flex>
                                <!--Subscription-->
                                <v-flex xs5 sm5 md5>
                                  <v-select
                                          :items="['Spark', 'Kindle', 'Blaze']"
                                          v-model="editMetaData.subscription"
                                          hint="Spark, Kindle or Blaze, Please add your Subscriptions"
                                          persistent-hint
                                          name="appMode"
                                          label="Application Subscription"
                                  ></v-select>
                                </v-flex>
                              </v-layout>
                            </v-container>

                            <!--Themes & Misc-->
                            <v-container grid-list-md text-xs-center class="ma-0 pa-0">
                              <v-layout row wrap>
                                <!--Theme-->
                                <v-flex xs5 sm5 md5 offset-md1>
                                  <v-select
                                          :items="['Light', 'Dark']"
                                          v-model="editMetaData.colorTheme"
                                          hint="Select basic Theme"
                                          persistent-hint
                                          name="appMode"
                                          label="Application Color Theme"
                                  ></v-select>
                                </v-flex>
                                <!--Version -->
                                <v-flex xs5 sm5 md5>
                                  More Options Will come by
                                </v-flex>
                              </v-layout>
                            </v-container>

                            <!--Activation Dates-->
                            <v-flex xs12 class="title mt-4">Start/End Dates</v-flex>
                            <v-container grid-list-md text-xs-center class="ma-0 pa-0">
                              <v-layout row wrap>
                                <!--Activation Start Date-->
                                <v-flex xs5 sm5 md5 offset-md1>
                                  <v-menu
                                          ref="selectedDateTriggerStart"
                                          :close-on-content-click="true"
                                          v-model="selectedDateTriggerStart"
                                          :nudge-right="40"
                                          lazy
                                          transition="scale-transition"
                                          offset-y
                                          full-width
                                          max-width="290px"
                                          min-width="290px"
                                  >
                                    <v-text-field
                                            slot="activator"
                                            v-model="editMetaData.startDate"
                                            label="Activation Start Date"
                                            hint="Please add date precisely"
                                            persistent-hint
                                            prepend-icon="event"
                                            :clearable="true"
                                    ></v-text-field>
                                    <v-date-picker v-model="editMetaData.startDate" no-title @input="selectedDateTriggerStart = false"></v-date-picker>
                                  </v-menu>
                                </v-flex>
                                <!--Activation End Date-->
                                <v-flex xs5 sm5 md5>
                                  <v-menu
                                          ref="selectedDateTriggerEnd"
                                          :close-on-content-click="true"
                                          v-model="selectedDateTriggerEnd"
                                          :nudge-right="40"
                                          lazy
                                          transition="scale-transition"
                                          offset-y
                                          full-width
                                          max-width="290px"
                                          min-width="290px"
                                  >
                                    <v-text-field
                                            slot="activator"
                                            v-model="editMetaData.endDate"
                                            label="Activation End Date"
                                            hint="Please add date precisely"
                                            persistent-hint
                                            prepend-icon="event"
                                            :clearable="true"
                                    ></v-text-field>
                                    <v-date-picker v-model="editMetaData.endDate" no-title @input="selectedDateTriggerEnd = false"></v-date-picker>
                                  </v-menu>
                                </v-flex>
                              </v-layout>
                            </v-container>

                            <!--submission-->
                            <v-flex xs12>
                              <v-btn large :disabled="!metaFormValid" type="submit" class="green" > EDIT <v-icon right>create</v-icon></v-btn>
                            </v-flex>
                            </form>
                          </v-flex>

                          <!--Section halfA-->

                          <v-flex xs6 >

                            <!--title-->
                            <v-flex xs12 class="title"> Dashboard Widget Edit </v-flex>
                            <v-flex xs12> All dashboard parameters are controlled by here. </v-flex>

                            <!--Dashboard edit Dialogue Button-->
                            <v-flex xs10 offset-xs1>

                              <v-dialog v-model="dashboardEditDialog" width="900">
                                <v-btn slot="activator" color="blue" dark>
                                  Widget Controller
                                </v-btn>
                                <v-card>
                                  <v-card-title class="headline gradientDialog text--white" primary-title>
                                    Widget Control Area
                                  </v-card-title>

                                  <v-card-text>

                                    <form @submit.prevent="onMetaReg">

                                    <!--Widget 01 , Widget 02 , Widget 03-->
                                    <v-container grid-list-md text-xs-center class="ma-0 pa-0 gradientHead">
                                      <v-layout row wrap>

                                        <!--Section A -->
                                        <v-flex xs4 sm4 md4>

                                          <!--Widget-1 Pie Chart-->
                                          <v-flex xs10 offset-xs1>
                                            <v-flex xs12 class="text-lg-left subheading"> Widget 01 </v-flex>
                                            <v-text-field
                                                    name="widget01Title"
                                                    label="Title"
                                                    v-model="editDashboard.widget01.title"
                                                    :clearable="true"
                                            ></v-text-field>
                                            <v-text-field
                                                    name="widget01Description"
                                                    label="Description"
                                                    v-model="editDashboard.widget01.description"
                                                    :clearable="true"
                                            ></v-text-field>
                                          </v-flex>

                                        </v-flex>

                                        <!--Section B -->
                                        <v-flex xs4 sm4 md4>

                                          <!--Widget-1 Pie Chart-->
                                          <v-flex xs10 offset-xs1>
                                            <v-flex xs12 class="text-lg-left subheading"> Widget 02 </v-flex>
                                            <v-text-field
                                                    name="widget01Title"
                                                    label="Title"
                                                    v-model="editDashboard.widget01.title"
                                                    :clearable="true"
                                            ></v-text-field>
                                            <v-text-field
                                                    name="widget01Description"
                                                    label="Description"
                                                    v-model="editDashboard.widget01.description"
                                                    :clearable="true"
                                            ></v-text-field>
                                          </v-flex>

                                        </v-flex>

                                        <!--Section C -->
                                        <v-flex xs4 sm4 md4>

                                          <!--Widget-1 Pie Chart-->
                                          <v-flex xs10 offset-xs1>
                                            <v-flex xs12 class="text-lg-left subheading"> Widget 03 </v-flex>
                                            <v-text-field
                                                    name="widget01Title"
                                                    label="Title"
                                                    v-model="editDashboard.widget01.title"
                                                    :clearable="true"
                                            ></v-text-field>
                                            <v-text-field
                                                    name="widget01Description"
                                                    label="Description"
                                                    v-model="editDashboard.widget01.description"
                                                    :clearable="true"
                                            ></v-text-field>
                                          </v-flex>

                                        </v-flex>
                                      </v-layout>
                                    </v-container>

                                    <!--Widget 04 , Widget 05 , Widget 06-->
                                    <v-container grid-list-md text-xs-center class="ma-0 pa-0 gradientHead">
                                      <v-layout row wrap>

                                        <!--Section D -->
                                        <v-flex xs4 sm4 md4>

                                          <!--Widget-1 Pie Chart-->
                                          <v-flex xs10 offset-xs1>
                                            <v-flex xs12 class="text-lg-left subheading"> Widget 04 </v-flex>
                                            <v-text-field
                                                    name="widget01Title"
                                                    label="Title"
                                                    v-model="editDashboard.widget01.title"
                                                    :clearable="true"
                                            ></v-text-field>
                                            <v-text-field
                                                    name="widget01Description"
                                                    label="Description"
                                                    v-model="editDashboard.widget01.description"
                                                    :clearable="true"
                                            ></v-text-field>
                                          </v-flex>

                                        </v-flex>

                                        <!--Section E -->
                                        <v-flex xs4 sm4 md4>

                                          <!--Widget-1 Pie Chart-->
                                          <v-flex xs10 offset-xs1>
                                            <v-flex xs12 class="text-lg-left subheading"> Widget 05 </v-flex>
                                            <v-text-field
                                                    name="widget01Title"
                                                    label="Title"
                                                    v-model="editDashboard.widget01.title"
                                                    :clearable="true"
                                            ></v-text-field>
                                            <v-text-field
                                                    name="widget01Description"
                                                    label="Description"
                                                    v-model="editDashboard.widget01.description"
                                                    :clearable="true"
                                            ></v-text-field>
                                          </v-flex>

                                        </v-flex>

                                        <!--Section F -->
                                        <v-flex xs4 sm4 md4>

                                          <!--Widget-1 Pie Chart-->
                                          <v-flex xs10 offset-xs1>
                                            <v-flex xs12 class="text-lg-left subheading"> Widget 06 </v-flex>
                                            <v-text-field
                                                    name="widget01Title"
                                                    label="Title"
                                                    v-model="editDashboard.widget01.title"
                                                    :clearable="true"
                                            ></v-text-field>
                                            <v-text-field
                                                    name="widget01Description"
                                                    label="Description"
                                                    v-model="editDashboard.widget01.description"
                                                    :clearable="true"
                                            ></v-text-field>
                                          </v-flex>

                                        </v-flex>

                                      </v-layout>
                                    </v-container>

                                    <!--submission-->
                                    <v-container grid-list-md text-xs-center class="ma-0 pa-0 gradientHead">
                                      <v-layout row wrap>
                                        <!--Password-->
                                        <v-flex xs3 class="ma-5">
                                          <v-flex xs12 class="title"> Key Passcode Required </v-flex>
                                          <v-text-field
                                                  name="widgetDashboardPass"
                                                  label="Passcode"
                                                  v-model="editDashboardPass"
                                                  type="password"
                                                   :clearable="true"
                                          ></v-text-field>
                                          <v-btn large :disabled="!metaFormValid" type="submit" class="green" > EDIT <v-icon right>create</v-icon></v-btn>
                                        </v-flex>
                                        <!--Buttons-->
                                        <v-flex xs7 class="mt-5 ml-4">
                                          <v-flex xs12 class="title"> Important Note! </v-flex>
                                          <v-flex xs12> Widget are supposed to manage by Authorized personnel only. </v-flex>
                                          <v-flex xs12> This procedure is the most critical by all mean. If something went wrong please do not proceed and contact your I.T Support. </v-flex>
                                          <v-btn type="button" class="green" dark> Support <v-icon right>add_alert</v-icon></v-btn>
                                        </v-flex>
                                      </v-layout>
                                    </v-container>

                                    </form>

                                  </v-card-text>

                                  <v-divider></v-divider>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" flat @click="dashboardEditDialog = false">
                                      Done
                                    </v-btn>
                                  </v-card-actions>

                                </v-card>

                              </v-dialog>

                            </v-flex>


                          </v-flex>
                        </v-layout>
                      </v-container>
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
                        <v-btn large :disabled="!metaFormValid" type="submit" class="green" > SUBMIT <v-icon right>send</v-icon></v-btn>
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
//          Application basic information editing
        editMetaData: {
          appName: '',
          fullAppName: '',
          companyName: '',
          startDate: '',
          endDate: '',
          version: '',
          status: '',
          subscription: '',
          colorTheme: ''
        },
//          Editing Dashboard
        editDashboard: {
            widget01: {title: '', description: ''},
            widget02: {title: '', description: ''},
            widget03: {title: '', description: ''},
            widget04: {title: '', description: ''},
            widget05: {title: '', description: ''},
            widget06: {title: '', description: ''},
        },
//        GUI DATA
        selectLoading: true,
        tab: '',
        dashboardEditDialog: false,
        editDashboardPass: 1000000,
        unAssignedStores: [

        ],
        selectedDateTriggerStart: '',
        selectedDateTriggerEnd: '',
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
      onMetaReg() {
        let StartDate = this.editMetaData.startDate;
        let EndDate = this.editMetaData.endDate;
        let timestampStartDate = 0;
        let timestampEndDate = 0;

        //Converting Date to Timestamp
        function toTimeStamp(payload){
          let time = payload;
          time = time.split('-');
          let sortedDate = time[1]+','+time[2]+','+time[0]
          sortedDate = new Date(sortedDate).getTime();
          return sortedDate
        }

//        Conversion Date To Time
        timestampStartDate = toTimeStamp(StartDate);
        timestampEndDate = toTimeStamp(EndDate);

        // Pushing Data to State
        this.$store.dispatch('metaReg', {
            name: this.editMetaData.appName,
            fullname: this.editMetaData.fullAppName,
            company: this.editMetaData.companyName,
            startDate: timestampStartDate,
            endDate: timestampEndDate,
            version: this.editMetaData.version,
            status: this.editMetaData.status,
            subscription: this.editMetaData.subscription,
            theme: this.editMetaData.colorTheme,
        })
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
      metaFormValid(){
        return this.editMetaData.appName !== ''
          && this.editMetaData.fullAppName !== ''
          && this.editMetaData.companyName !== ''
          && this.editMetaData.startDate !== ''
          && this.editMetaData.endDate !== ''
          && this.editMetaData.version !== ''
          && this.editMetaData.mode !== ''
          && this.editMetaData.subscription !== ''
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
