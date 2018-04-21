import Vue from 'vue'
import Router from 'vue-router'
// Components
import Welcome from '../components/AppMain/Welcome.vue'
import AddBrandAmbassador from '../components/AppMain/AddBrandAmbassador.vue'
import Dashboard from '../components/AppMain/Dashboard.vue'
import Create from '../components/AppMain/Create.vue'
import Edit from '../components/AppMain/Edit.vue'
import Registration from '../components/Auth/Registration.vue'
import Login from '../components/Auth/Login.vue'
import Broadcast from '../components/AppMain/Broadcast.vue'
import Reports from '../components/AppMain/Reports.vue'
import StockReports from '../components/AppMain/StockReports.vue'
import Monitor from '../components/AppMain/Monitor.vue'

Vue.use(Router);

export const routes = [
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Welcome',
      name: 'Home',
      component: Welcome
    },
    {
      path: '/addbrandAmbassador',
      name: 'AddBrandAmbassador',
      component: AddBrandAmbassador
    },
    {
      path: '/',
      name: 'DashBoard',
      component: Dashboard
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports
    },
    {
      path: '/stockreports',
      name: 'StockReports',
      component: StockReports
    },
    {
      path: '/monitor',
      name: 'Monitor',
      component: Monitor
    },
    {
      path: '/broadcast',
      name: 'Broadcast',
      component: Broadcast
    }
];
