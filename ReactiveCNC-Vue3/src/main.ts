import App from './App.vue'
import PrimeVue from 'primevue/config';

import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";

import './style.css'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/viva-light/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import Button from 'primevue/button';
import DialogService from 'primevue/dialogservice';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Checkbox from 'primevue/checkbox';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import InputText from 'primevue/inputtext';
import VirtualScroller from 'primevue/virtualscroller';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Knob from 'primevue/knob';
import SelectButton from 'primevue/selectbutton';

const routes = [{
  path: "/",
  name: "Home",
  component: App,
}];

(HTMLAnchorElement.prototype as any).originalAddEventListener = HTMLAnchorElement.prototype.addEventListener;
HTMLAnchorElement.prototype.addEventListener = function(a:any,b:any,c:any){
  if (a == "keydown" ||
      a == "keyup") {
    // Prevent PrimeVue from using key events.
    return;
  }
  (this as any).originalAddEventListener(a,b,c); 
};

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(PrimeVue);
app.use(DialogService);
app.use(router)

app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Checkbox', Checkbox);
app.component('TriStateCheckbox', TriStateCheckbox);
app.component('InputText', InputText);
app.component('VirtualScroller', VirtualScroller);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Knob', Knob);
app.component('SelectButton', SelectButton);

app.mount('#app')
