import App from './App.vue'
import PrimeVue from 'primevue/config';

import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";

import './style.css'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/md-dark-indigo/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import DialogService from 'primevue/dialogservice';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Checkbox from 'primevue/checkbox';

const routes = [{
  path: "/",
  name: "Home",
  component: App,
}];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(PrimeVue);
app.use(DialogService);
app.use(router)

app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Checkbox', Checkbox);

app.mount('#app')
