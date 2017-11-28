import Vue from 'vue'
import Router from 'vue-router'
// Components
import Welcome from '../components/AppMain/Welcome.vue'
import AddMerchandiser from '../components/AppMain/AddMerchandiser.vue'
import Dashboard from '../components/AppMain/Dashboard.vue'
import Merchandiser from '../components/AppMain/Merchandiser.vue'
import Registration from '../components/Auth/Registration.vue'
import Login from '../components/Auth/Login.vue'
import Broadcast from '../components/AppMain/Broadcast.vue'
import Reports from '../components/AppMain/Reports.vue'
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
      path: '/addMerchandiser',
      name: 'AddMerchandiser',
      component: AddMerchandiser
    },
    {
      path: '/',
      name: 'DashBoard',
      component: Dashboard
    },
    {
      path: '/merc',
      name: 'Merchandiser',
      component: Merchandiser
    },
    {
      path: '/reports',
      name: 'Reportd',
      component: Reports
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
