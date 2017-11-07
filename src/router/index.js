import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../components/AppMain/Dashboard.vue'
import Merchandiser from '../components/AppMain/Merchandiser.vue'

Vue.use(Router);

export const routes = [
    {
      path: '/',
      name: 'Home',
      component: Dashboard
    },
    {
      path: '/merc',
      name: 'Merchandiser',
      component: Merchandiser
    }
];
