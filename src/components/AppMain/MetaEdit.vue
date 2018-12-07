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
            <v-tabs-slider color="blue"></v-tabs-slider>

            <v-tab class="gradientHead" href="#c1" v-on:click="fetchStoreList">
              <v-icon>people</v-icon>
               Edit Meta Data
            </v-tab>
            <v-tab class="gradientHead" href="#c2">
              <v-icon>person</v-icon>
               Edit PWA
            </v-tab>
            <v-tab class="gradientHead" href="#c3">
              <v-icon>store</v-icon>
               Add Stores
            </v-tab>
          </v-tabs>
        </v-toolbar>

        <v-tabs-items v-model="tab">

          <!--Edit Application base Information-->
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

                            <!--Themes & Brand Name-->
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
                              <v-btn large :disabled="!metaFormValid" type="submit" class="greenBleed" > EDIT <v-icon right>create</v-icon></v-btn>
                            </v-flex>
                            </form>
                          </v-flex>

                          <!--Section halfA-->

                          <v-flex xs6 >

                            <!--title-->
                            <v-flex xs12 class="title"> Dashboard Widget Edit </v-flex>
                            <v-flex xs12> All dashboard Text can be edit from here. </v-flex>

                            <!--Dashboard edit Dialogue Button-->
                            <v-flex xs10 offset-xs1>

                              <v-dialog v-model="dashboardEditDialog" width="900">
                                <v-btn slot="activator" :ripple="{ class: 'blue--text' }" color="white" class="blueBleed">
                                  Widget Controller
                                </v-btn>
                                <v-card>
                                  <v-card-title class="headline gradientDialog text--white" primary-title>
                                    Widgets Text Controls
                                  </v-card-title>

                                  <v-card-text>

                                    <form @submit.prevent="onDashboardGUIReg">

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
                                                    v-model="editDashboard.widget02.title"
                                                    :clearable="true"
                                            ></v-text-field>
                                            <v-text-field
                                                    name="widget01Description"
                                                    label="Description"
                                                    v-model="editDashboard.widget02.description"
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
                                                    v-model="editDashboard.widget03.title"
                                                    :clearable="true"
                                            ></v-text-field>
                                            <v-text-field
                                                    name="widget01Description"
                                                    label="Description"
                                                    v-model="editDashboard.widget03.description"
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
                                                    v-model="editDashboard.widget04.title"
                                                    :clearable="true"
                                            ></v-text-field>
                                            <v-text-field
                                                    name="widget01Description"
                                                    label="Description"
                                                    v-model="editDashboard.widget04.description"
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
                                                    v-model="editDashboard.widget05.title"
                                                    :clearable="true"
                                            ></v-text-field>
                                            <v-text-field
                                                    name="widget01Description"
                                                    label="Description"
                                                    v-model="editDashboard.widget05.description"
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
                                                    v-model="editDashboard.widget06.title"
                                                    :clearable="true"
                                            ></v-text-field>
                                            <v-text-field
                                                    name="widget01Description"
                                                    label="Description"
                                                    v-model="editDashboard.widget06.description"
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
                                        <v-flex xs3 class="ma-4 ml-0 mr-0">
                                          <v-flex xs12 class="title"> Key Passcode Required </v-flex>
                                          <v-text-field
                                                  name="widgetDashboardPass"
                                                  label="Passcode"
                                                  v-model="editDashboardPass"
                                                  type="password"
                                                   :clearable="true"
                                          ></v-text-field>
                                          <v-btn large :disabled="!dashboardFormValid" type="submit" class="greenBleed" > EDIT <v-icon right>create</v-icon></v-btn>
                                        </v-flex>
                                        <!--Buttons-->
                                        <v-flex xs5 class="mt-4 ml-0">
                                          <v-flex xs12 class="title"> Important Note! </v-flex>
                                          <v-flex xs12> Widget are supposed to manage by <strong>Authorized</strong> personnel only. </v-flex>
                                          <v-flex xs12> This procedure is the most critical by all mean. If something went wrong please do not proceed and contact your I.T Support. </v-flex>
                                          <v-btn type="button" class="greenBleed" dark> Support <v-icon right>add_alert</v-icon></v-btn>
                                        </v-flex>
                                        <!--Instructions-->
                                        <v-flex xs3 class="mt-4 ml-0">
                                          <v-flex xs12 class="title"> Reference Image </v-flex>
                                        </v-flex>
                                      </v-layout>
                                    </v-container>

                                    </form>

                                  </v-card-text>

                                  <v-divider></v-divider>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn class="blueBleed" @click="dashboardEditDialog = false">
                                      Done
                                    </v-btn>
                                  </v-card-actions>

                                </v-card>

                              </v-dialog>

                            </v-flex>

                            <!--title-->
                            <v-flex xs12 class="title"> Manage Products </v-flex>
                            <v-flex xs12> SKUs can be managed from here. </v-flex>

                            <!--Dashboard Parameter edit Dialogue Button-->
                            <v-flex xs10 offset-xs1>

                              <v-dialog v-model="productEditDialog" width="980">
                                <v-btn slot="activator" class="blueBleed">
                                 Manage SKUs
                                </v-btn>
                                <v-card>
                                  <v-card-title class="headline gradientDialog text--white" primary-title>
                                    SKUs Manager
                                  </v-card-title>

                                  <v-card-text>

                                    <form @submit.prevent="onProductsReg">

                                      <!--Products and pre existed list-->
                                      <v-container grid-list-md text-xs-center class="ma-0 pa-0 gradientHead">
                                        <v-layout row wrap>

                                          <!--Section A -->
                                          <v-flex xs4 sm4 md4>

                                              <!-- Add/Remove Products-->
                                              <v-flex xs10 offset-xs1>
                                                <v-flex xs12 class="text-lg-left headline "> Add/Remove Products </v-flex>
                                                  <!--ID-->
                                                  <v-text-field
                                                          name="productID"
                                                          hint="ID # for Each product must be unique or previous item will be replaced"
                                                          persistent-hint
                                                          type="number"
                                                          label="ID"
                                                          v-model="productSkus.id"
                                                          :clearable="true"
                                                  ></v-text-field>
                                                  <!--Name-->
                                                  <v-text-field
                                                          name="productName"
                                                          hint="Whatever you wish to commit"
                                                          persistent-hint
                                                          label="Product Name"
                                                          v-model="productSkus.name"
                                                          :clearable="true"
                                                  ></v-text-field>
                                                  <!--Category-->
                                                  <v-text-field
                                                          name="productCategory"
                                                          hint="Category must be identical"
                                                          persistent-hint
                                                          label="Category"
                                                          v-model="productSkus.category"
                                                          :clearable="true"
                                                  ></v-text-field>
                                                  <!--Price-->
                                                  <v-text-field
                                                          name="productprice"
                                                          hint="Actual Price of product in PKR"
                                                          persistent-hint
                                                          label="Price"
                                                          type="number"
                                                          v-model="productSkus.price"
                                                          :clearable="true"
                                                  ></v-text-field>
                                                </v-flex>
                                            <v-flex xs4 offset-xs2>
                                              <v-btn :disabled="productSkus.id === '' || productSkus.name === '' " type="button" class="blueBleed" @click="onProductAdd" > + Product <v-icon right>add</v-icon></v-btn>
                                            </v-flex>
                                          </v-flex>

                                          <!--Section B -->
                                          <v-flex xs8 sm8 md8>

                                            <!--Existing SKUs List-->
                                            <v-flex xs10 offset-xs1>
                                              <v-flex xs12 class="text-lg-left headline"> SKUs List </v-flex>
                                                <v-data-table
                                                  :headers="[{ text: 'ID', value: 'id' },
                                                  { text: 'Name', value: 'name' },
                                                  { text: 'Category', value: 'category' },
                                                  { text: 'Price', value: 'price' },
                                                  { text: 'Actions', value: 'actions' }
                                                  ]"
                                                  :items="productList"
                                                >
                                                  <template slot="items"  slot-scope="props">
                                                    <td>{{ props.item.id }}</td>
                                                    <td class="text-xs-right">{{ props.item.name }}</td>
                                                    <td class="text-xs-right">{{ props.item.category }}</td>
                                                    <td class="text-xs-right">{{ props.item.price }}</td>
                                                    <td class="text-xs-right"><v-btn flat icon @click="deleteProduct(props.item)" class='redSmallBleed'><v-icon>delete</v-icon></v-btn></td>
                                                  </template>
                                                </v-data-table>
                                              </v-flex>
                                            </v-flex>

                                          <!--Submission-->
                                          <v-flex xs4 offset-xs4>
                                            <v-flex xs12 class="title"> Key Passcode Required for Submission</v-flex>
                                            <v-text-field
                                                    name="widgetDashboardPass"
                                                    label="Passcode"
                                                    v-model="editDashboardPass"
                                                    type="password"
                                                    :clearable="true"
                                            ></v-text-field>
                                            <v-btn large :disabled="!dashboardFormValid" type="submit" class="darkBlueBleed" > CONFIRM <v-icon right>create</v-icon></v-btn>
                                          </v-flex>

                                        </v-layout>
                                      </v-container>

                                    </form>

                                  </v-card-text>

                                  <v-divider></v-divider>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" flat @click="productEditDialog = false">
                                      Done
                                    </v-btn>
                                  </v-card-actions>

                                </v-card>

                              </v-dialog>

                            </v-flex>

                            <!--title-->
                            <v-flex xs12 class="title"> Manage Optional Parameter </v-flex>
                            <v-flex xs12> Optional Question in PWA and Dashboard Charts can be Managed from Here. </v-flex>

                            <!--Optional Parameter Editing-->
                            <v-flex xs10 offset-xs1>

                              <v-dialog v-model="optionalParameterDialog" width="600">
                                <v-btn slot="activator" class="blueBleed">
                                  Manage Parameter
                                </v-btn>
                                <v-card>
                                  <v-card-title class="headline gradientDialog text--white" primary-title>
                                    OPTIONAL PARAMETER MANAGER
                                  </v-card-title>

                                  <v-card-text>

                                    <form @submit.prevent="onOptionalParameterReg">

                                      <!--Parameter Editing -->
                                      <v-container grid-list-md text-xs-center class="ma-0 pa-0 gradientHead">
                                        <v-flex xs12 class="text-lg-left subheading"> You can add/remove radio button parameters. </v-flex>
                                        <v-layout row wrap>
                                          <!-- Optional Parameters -->
                                          <v-flex xs2 sm2 md2 offset-xs1>
                                            <v-text-field
                                                    name="optionalParameterID"
                                                    label="ID"
                                                    hint="QVar must a string"
                                                    persistent-hint
                                                    v-model="editOptionalParameter.id"
                                                    :clearable="true"
                                            ></v-text-field>
                                          </v-flex>
                                          <v-flex xs4 sm4 md4>
                                              <v-text-field
                                                      name="optionalParameterTitle"
                                                      label="Title"
                                                      hint="Title must be String"
                                                      persistent-hint
                                                      v-model="editOptionalParameter.title"
                                                      :clearable="true"
                                              ></v-text-field>
                                          </v-flex>
                                          <!--<v-flex xs3 sm3 md3 >-->
                                            <!--<v-select-->
                                                    <!--:items="['boolean', 'text']"-->
                                                    <!--name="optionalParameterType"-->
                                                    <!--label="Type"-->
                                                    <!--v-model="editOptionalParameter.type"-->
                                                    <!--:clearable="true"-->
                                            <!--&gt;</v-select>-->
                                          <!--</v-flex>-->
                                          <v-flex xs4 sm4 md4 >
                                            <v-text-field
                                                    name="widget01Title"
                                                    label="Description"
                                                    hint="Write something related to question"
                                                    persistent-hint
                                                    v-model="editOptionalParameter.description"
                                                    :clearable="true"
                                            ></v-text-field>
                                          </v-flex>

                                          <!--Add Parameter-->
                                          <v-btn type="button" @click="addParameter" class="blueBleed ml-5 mb-5" ><v-icon left>add</v-icon> Add </v-btn>

                                        </v-layout>
                                      </v-container>

                                      <v-data-table
                                              :headers="[{ text: 'ID', value: 'id' },
                                                { text: 'Title', value: 'title' },
                                                { text: 'Description', value: 'description' },
                                                { text: 'Action', value: 'action' }
                                                ]"
                                              :items="optionalParameter"
                                              hide-actions
                                              class="elevation-16"
                                      >
                                        <template slot="items"  slot-scope="props">
                                          <td>{{ props.item.id }}</td>
                                          <td>{{ props.item.title }}</td>
                                          <td>{{ props.item.description }}</td>
                                          <td class="text-xs-right"><v-btn outline small fab @click="deleteParameter(props.item)" class='redSmallBleed'><v-icon>delete</v-icon></v-btn></td>
                                        </template>
                                      </v-data-table>

                                      <!--submission-->
                                      <v-container grid-list-md text-xs-center class="ma-0 pa-0 gradientHead">
                                        <v-layout row wrap>
                                          <!--Password-->
                                          <v-flex xs5 class="ma-4 ml-0 mr-0">
                                            <v-flex xs12 class="title"> Submission </v-flex>
                                            <v-flex xs12 class="caption"> Key Passcode Required </v-flex>
                                            <v-text-field
                                                    name="widgetDashboardPass"
                                                    label="Passcode"
                                                    v-model="editDashboardPass"
                                                    type="password"
                                                    :clearable="true"
                                            ></v-text-field>
                                            <v-btn :disabled="!dashboardFormValid" type="submit" class="greenBleed" ><v-icon left>create</v-icon> CONFIRM CHANGES </v-btn>
                                          </v-flex>
                                          <!--Buttons-->
                                          <v-flex xs5 class="mt-4 ml-0">
                                            <v-flex xs12 class="title"> Important Note! </v-flex>
                                            <v-flex xs12> This section is supposed to be used by an <strong>Authorized</strong> personnel only. </v-flex>
                                            <v-flex xs12> Misuse of this section may lead to software malfunction, If something went wrong please stop editing BAMS further and contact your I.T Support. </v-flex>
                                            <v-btn type="button" class="greenBleed" ><v-icon left>add_alert</v-icon> Support </v-btn>
                                          </v-flex>
                                        </v-layout>
                                      </v-container>

                                    </form>

                                  </v-card-text>

                                  <v-divider></v-divider>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="greenBleed" flat @click="optionalParameterDialog = false">
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



          <!--edit PWA Preferences-->
          <v-tab-item id="c2">
            <v-card flat class="gradientHead">
              <v-card-text>
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs12 class="title">MANAGE PWA APPLICATION</v-flex>
                    <v-flex xs12 class="body-2"> You can manage various parameters of PWA.</v-flex>
                    <v-flex xs12 class="body-1"> Please fill all required fields and then click on Edit/Create.</v-flex>
                    <v-flex xs12 >
                      Please make sure you are aware of this section this can cause <strong>massive DB errors</strong>  and BAMS™ can break.
                      <br>
                      Misuse of this section can take a minimum duration of <strong>six working days</strong>/<strong>Additional Cost</strong> to fix.
                    </v-flex>
                    <v-container>
                      <v-layout row wrap>
                        <!--Section halfA-->
                        <v-flex xs6>
                          <form @submit.prevent="onNodeMetaReg">
                            <!--title-->
                            <v-flex xs12 class="title"> BAMS™ NODE Meta Edit </v-flex>
                            <v-flex xs12> All initial PWA meta can be managed from below </v-flex>
                            <!--Application Name-->
                            <v-flex xs10 offset-xs1>
                              <v-text-field
                                      required
                                      hint="Application name that will appear on main title bar"
                                      persistent-hint
                                      name="appName"
                                      label="Application Name"
                                      v-model="editMetaDataNode.appName"
                                      :clearable="true"
                              ></v-text-field>
                            </v-flex>

                            <!--Brand Name and Slogan-->
                            <v-container grid-list-md text-xs-center class="ma-0 pa-0">
                              <v-layout row wrap>
                                <!-- Brand Name -->
                                <v-flex xs5 sm5 md5 offset-xs1>
                                  <v-text-field
                                          required
                                          hint="Should be String Only"
                                          persistent-hint
                                          name="brandName"
                                          label="Brand Name"
                                          v-model="editMetaDataNode.brandName"
                                  ></v-text-field>
                                </v-flex>

                                <!-- Brand Slogan  -->
                                <v-flex xs5 sm5 md5>
                                  <v-text-field
                                          required
                                          hint="Should be String Only"
                                          persistent-hint
                                          name="brandSlogan"
                                          label="Brand Slogan"
                                          v-model="editMetaDataNode.brandSlogan"
                                  ></v-text-field>
                                </v-flex>
                              </v-layout>
                            </v-container>

                            <!--Company & Version-->
                            <v-container grid-list-md text-xs-center class="ma-0 pa-0">
                              <v-layout row wrap>
                                <!--Theme-->
                                <v-flex xs5 sm5 md5 offset-md1>
                                  <v-text-field
                                          required
                                          hint="Theme this should be annotation"
                                          persistent-hint
                                          name="appTheme"
                                          label="Color Theme"
                                          v-model="editMetaDataNode.theme"
                                  ></v-text-field>
                                </v-flex>

                                <!--Version-->
                                <v-flex xs5 sm5 md5 >
                                  <v-text-field
                                          required
                                          hint="Should be 1.0.0 [Any three digit according to build Number]"
                                          persistent-hint
                                          name="appVersion"
                                          label="Version"
                                          v-model="editMetaDataNode.version"
                                  ></v-text-field>
                                </v-flex>
                              </v-layout>
                            </v-container>

                            <!--submission-->
                            <v-flex xs12>
                              <v-btn large :disabled="!nodeMetaFormValid" type="submit" class="greenBleed" > EDIT <v-icon right>create</v-icon></v-btn>
                            </v-flex>
                          </form>
                        </v-flex>

                        <!--Section halfA-->

                        <v-flex xs6 >

                          <!--title-->
                          <v-flex xs12 class="title"> General Questions </v-flex>
                          <v-flex xs12> Add your questions here that will be asked by B.A to customers. </v-flex>

                          <!--Additional Controls-->
                          <v-flex xs12>
                            <!--Questions-->
                            <v-flex xs10 offset-xs1>

                              <v-dialog v-model="nodeQuestionsDialog" width="800">
                                <v-btn slot="activator" class="blueBleed">
                                  Manage Parameter
                                </v-btn>
                                <v-card>
                                  <v-card-title class="headline gradientDialog text--white" primary-title>
                                    QUESTION FOR CUSTOMERS
                                  </v-card-title>

                                  <v-card-text>

                                    <form @submit.prevent="onApplicationQuestionReg">

                                      <!--Question Editing -->
                                      <v-container grid-list-md text-xs-center class="ma-0 pa-0 gradientHead">
                                        <v-flex xs12 class="text-lg-left subheading"> Please add/remove Application Questions from here.  </v-flex>
                                        <v-layout row wrap>
                                          <!-- Optional Parameters -->
                                          <!--Identification -->
                                          <v-flex xs1 sm1 md1 offset-xs1>
                                            <v-text-field
                                                    name="IDnode"
                                                    label="ID"
                                                    v-model="editquestionNode.id"
                                                    :clearable="true"
                                            ></v-text-field>
                                          </v-flex>
                                          <!--Main Question-->
                                          <v-flex xs5 sm5 md5>
                                            <v-text-field
                                                    name="questionNode"
                                                    label="Question"
                                                    v-model="editquestionNode.question"
                                                    :clearable="true"
                                            ></v-text-field>
                                          </v-flex>
                                          <!--Description-->
                                          <v-flex xs4 sm4 md4 >
                                            <v-text-field
                                                    name="descriptionNode"
                                                    label="Description"
                                                    v-model="editquestionNode.description"
                                                    :clearable="true"
                                            ></v-text-field>
                                          </v-flex>

                                          <!--Answers-->
                                          <v-flex xs10 sm10 md10 offset-xs1>

                                            <template>
                                              <v-combobox
                                                      v-model="editquestionNode.answers"
                                                      name="answerNode"
                                                      :items="nodeQuestionsAnswerPreset"
                                                      label="Possible Answers of this Question"
                                                      chips
                                                      clearable
                                                      prepend-icon="filter_list"
                                                      solo
                                                      multiple
                                              >
                                                <template slot="selection" slot-scope="data">
                                                  <v-chip
                                                          :selected="data.selected"
                                                          close
                                                          @input="removeAnswerChip(data.item)"
                                                  >
                                                    <strong>{{ data.item }}</strong>&nbsp;
                                                    <span>(Possible)</span>
                                                  </v-chip>
                                                </template>
                                              </v-combobox>
                                            </template>

                                            <!--<v-text-field-->
                                                    <!--name="answerNode"-->
                                                    <!--label="Answers"-->
                                                    <!--v-model="editquestionNode.answer"-->
                                                    <!--:clearable="true"-->
                                            <!--&gt;</v-text-field>-->
                                            <!--Add Answer-->
                                            <!--<v-btn fab small type="button" @click="addQuestionAnswerNode" class="darkBlueBleed ml-5" ><v-icon>add</v-icon></v-btn>-->
                                          </v-flex>

                                          <!--Add Parameter-->
                                          <v-btn type="button" @click="addquestionNode" class="blueBleed ml-5 mb-5" ><v-icon left>add</v-icon> Add </v-btn>

                                        </v-layout>
                                      </v-container>

                                      <v-data-table
                                              :headers="[{ text: 'ID', value: 'id' },
                                                { text: 'Question', value: 'question' },
                                                { text: 'Possible Answers', value: 'possibleAnswers' },
                                                { text: 'Description', value: 'description' },
                                                { text: 'Action', value: 'action' }
                                                ]"
                                              :items="questionNode"
                                              hide-actions
                                              class="elevation-16"
                                      >
                                        <template slot="items"  slot-scope="props">
                                          <td>{{ props.item.id }}</td>
                                          <td>{{ props.item.question }}</td>
                                          <td>
                                              <!--Adding array to chips-->
                                              <v-chip v-for="item in props.item.answers" :key="item" color="greenBleed">{{item}}</v-chip>
                                          </td>
                                          <td>{{ props.item.description }}</td>
                                          <td><v-btn outline small fab  @click="deleteQuestionParameter(props.item)" class='redSmallBleed'><v-icon>delete</v-icon></v-btn></td>
                                        </template>
                                      </v-data-table>

                                      <!--submission-->
                                      <v-container grid-list-md text-xs-center class="ma-0 pa-0 gradientHead">
                                        <v-layout row wrap>
                                          <!--Password-->
                                          <v-flex xs5 class="ma-4 ml-0 mr-0">
                                            <v-flex xs12 class="title"> Submission </v-flex>
                                            <v-flex xs12 class="caption"> Key Passcode Required </v-flex>
                                            <v-text-field
                                                    name="widgetDashboardPass"
                                                    label="Passcode"
                                                    v-model="editDashboardPass"
                                                    type="password"
                                                    :clearable="true"
                                            ></v-text-field>
                                            <v-btn  :disabled="!dashboardFormValid"  type="submit" class="greenBleed" ><v-icon left>create</v-icon> CONFIRM CHANGES </v-btn>
                                          </v-flex>
                                          <!--Buttons-->
                                          <v-flex xs5 class="mt-4 ml-0">
                                            <v-flex xs12 class="title"> Important Note! </v-flex>
                                            <v-flex xs12> This section is supposed to be used by an <strong>Authorized</strong> personnel only. </v-flex>
                                            <v-flex xs12> Misuse of this section may lead to software malfunction, If something went wrong please stop editing BAMS further and contact your I.T Support. </v-flex>
                                            <v-btn type="button" class="greenBleed" ><v-icon left>add_alert</v-icon> Support </v-btn>
                                          </v-flex>
                                        </v-layout>
                                      </v-container>

                                    </form>

                                  </v-card-text>

                                  <v-divider></v-divider>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" flat @click="nodeQuestionsDialog = false">
                                      Done
                                    </v-btn>
                                  </v-card-actions>

                                </v-card>

                              </v-dialog>

                            </v-flex>
                          </v-flex>

                          <!--title-->
                          <v-flex xs12 class="title"> PWA Background Image </v-flex>
                          <v-flex xs12> Manage you Node's Background Image </v-flex>
                          <!--Additional Controls-->
                          <v-flex xs12>
                            <!--Questions-->
                            <v-flex xs10 offset-xs1>
                              <form @submit.prevent="onImgChangeNodeReg">

                              <!--Application Background Image-->
                              <upload-btn
                                      :fileChangedCallback="nodeBGImage"
                                      title="BG Image"
                                      color="darkBlueBleed pl-5 pr-5"
                                      large
                                      :loading="this.uploading"
                              >
                              </upload-btn>
                              file Name : {{ this.editMetaDataNode.imgTheme }}
                              <!--Password-->
                              <v-flex xs5 offset-xs1 class="ma-4 ml-0 mr-0">
                                <v-btn type="submit" :disabled="this.editMetaDataNode.imgTheme === ''" class="greenBleed" large ><v-icon left>create</v-icon> CONFIRM BG CHANGE </v-btn>
                              </v-flex>
                              </form>
                            </v-flex>
                          </v-flex>


                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!--Manage Stores-->



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
  import UploadButton from 'vuetify-upload-button';

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
//        Application basic information editing
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
//        Application basic information editing
        editMetaDataNode: {
              appName: '',
              version: '',
              imgTheme: '',
              img: null
      },
//        Editing Dashboard
        editDashboard: {
            widget01: {title: '', description: ''},
            widget02: {title: '', description: ''},
            widget03: {title: '', description: ''},
            widget04: {title: '', description: ''},
            widget05: {title: '', description: ''},
            widget06: {title: '', description: ''},
        },
//        Editing Optional Parameters
        editOptionalParameter: {

        },
        optionalParameter: [

//            para01: {title: '', type:'', description: ''},
        ],
//      Questions in PWA
        optionalQuestions: [

//            para01: {question: '', answers:'', description: ''},
        ],
//      Question for B.A to Ask\
        editquestionNode: {
          answers: []
        },
        nodeQuestionsAnswerPreset: ['Do not Know ', 'Do not want to tell'],
        questionNode: [

//            question: {question: '', type:'', description: ''},
        ],
        productSkus: {
            id: null,
            name: '',
            category: '',
            price: null
        },
        productList:[],
//        GUI DATA
        uploading: false,
        selectLoading: true,
        tab: '',
        dashboardEditDialog: false,
        productEditDialog: false,
        nodeQuestionsDialog: false,
        optionalParameterDialog: false,
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
//    UI
      nodeBGImage (bgImg) {
        console.log('File Name :', bgImg);
        this.editMetaDataNode.imgTheme = bgImg.name;
        this.editMetaDataNode.img = bgImg;
      },
//    Application
      onBAReg() {
        this.$store.dispatch('brandAmbassadorReg', {email: this.addBA.email, password: this.addBA.password, ba: this.addBA}).then(() => {
            setTimeout(() => {
                document.location.reload();
            },6000)
        })
      },
      addParameter() {
//          adding in optional Parameter Object
            this.optionalParameter.push(this.editOptionalParameter);
            this.editOptionalParameter = {};
        },
      addquestionNode() {
//          adding in optional Parameter Object
          this.questionNode.push(this.editquestionNode);
//          Reseting Questions
          this.editquestionNode = {
              answers:[],
          };
      },
      addQuestionAnswerNode(){
//          Adding Values to arrays in an object
          let currentAnswers = this.editquestionNode.answers;
          currentAnswers.push(this.editquestionNode.answer);
          this.editquestionNode.answer = '';
      },
      removeAnswerChip (item) {
          this.editquestionNode.answers.splice(this.editquestionNode.answers.indexOf(item), 1)
          this.editquestionNode.answers = [...this.editquestionNode.answers]
      },
      deleteParameter(index) {
//          Assiging local Variable
          let deleteItem = this.optionalParameter.indexOf(index);
          this.optionalParameter.splice(index, 1)
      },
      deleteQuestionParameter(index){
//          Deleting index
          this.questionNode.splice(index, 1)
      },
      onProductAdd(){
//          scoping Variable
          let product = this.productSkus;
//          Concating with Table/Array
          this.productList.push(product);
//          Reseting Products
          this.productSkus = {
              id: null,
              name: '',
              category: '',
              price: null
          };
          console.log('Product Added');
      },
      deleteProduct(index) {
//          Assiging local Variable
          let deleteItem = this.productList.indexOf(index);
          this.productList.splice(index, 1)
      },

//        STORE
      onDashboardGUIReg() {
          this.$store.dispatch('dashboardReg', this.editDashboard).then(() => {
//            setTimeout(() => {
//                document.location.reload();
//            },6000)
          })
      },
      onProductsReg() {
//          converting array to object
        let payload = this.productList;

        let objectList = Object.assign({}, payload);
//          posting
        this.$store.dispatch('productsReg', objectList).then(() => {
            setTimeout(() => {
                console.log('data sent to $store', objectList)
//                document.location.reload();
            },6000)
        })
      },
      onImgChangeNodeReg(){
        let img = this.editMetaDataNode.img;
//        Sending to Store
        this.$store.dispatch('appBgImgReg', img).then(() => {
            console.log('Sent to $Store')
        })
      },
      onOptionalParameterReg() {
//          convertin array to object
        let arrayList = this.optionalParameter;
        let objectList = Object.assign({}, arrayList)
//          posting
        this.$store.dispatch('optionalParameterReg', objectList).then(() => {
            setTimeout(() => {
            document.location.reload();
          },6000)
        })
      },
      onApplicationQuestionReg() {
//          convertin array to object
        let arrayList = this.questionNode;
        let objectList = Object.assign({}, arrayList);
        console.log("Define Coglanted Measures", objectList);
//          posting
        this.$store.dispatch('optionalQuestionReg', objectList).then(() => {
            setTimeout(() => {
                this.nodeQuestionsDialog = false;
                this.editDashboardPass = null;
            },1500)
        })
      },
      onNodeMetaReg(){
        let payload = this.editMetaDataNode;

//        Sending Payload to store
          this.$store.dispatch('nodeMetaDataReg', payload).then(() => {
              setTimeout(() => {
                console.log('Node metadata sent to $store');
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
        }).then(() => {
            setTimeout(() => {
                document.location.reload();
            },8000)
        })
      },
      onStoreReg() {
        this.$store.dispatch('storeReg', this.addStore);
//        After sending to store

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
      nodeMetaFormValid(){
            return this.editMetaDataNode.appName !== ''
                && this.editMetaDataNode.version !== ''
                && this.editMetaDataNode.theme !== ''
      },
      dashboardFormValid(){
          return this.editDashboardPass === '100258'
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
//    getting SKUS LIST
      let skusListArray = this.$store.getters.skusLists;
//      Setting product list
      this.productList = skusListArray;

//    getting Widger Controller
      let widgetdoc = this.$store.getters.appinfo;
      this.editDashboard = widgetdoc.widgets


//    getting Optional Questions
      let optionalQuestions = this.$store.getters.optionalQuestions;
      let optionalQuestionArray = [];
//    Seperating objects
      for(let key in optionalQuestions) {
          optionalQuestionArray.push({
              question: optionalQuestions[key].question,
              id: optionalQuestions[key].id,
              answers: optionalQuestions[key].answers,
              description: optionalQuestions[key].description,
          })
      }

      this.questionNode = this.questionNode.concat(optionalQuestionArray);
      console.log(optionalQuestionArray);


//    getting optional parameters
      let optionalParameter = this.$store.getters.optionalParameter;
      let optionalParameterArray = [];
//    Seperating objects
      for(let key in optionalParameter) {
          optionalParameterArray.push({
              title: optionalParameter[key].title,
              id: optionalParameter[key].id,
              description: optionalParameter[key].description,
          })
      }

      this.optionalParameter = this.optionalParameter.concat(optionalParameterArray);
//        this.$store.getters.successMsg
//    getting Random store Details
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
    },
    components: {
        'upload-btn': UploadButton
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
