import App from "./App.vue";
import PrimeVue from "primevue/config";

import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

import "./style.css";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/viva-light/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import Button from "primevue/button";
import DialogService from "primevue/dialogservice";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import Checkbox from "primevue/checkbox";
import TriStateCheckbox from "primevue/tristatecheckbox";
import InputText from "primevue/inputtext";
import VirtualScroller from "primevue/virtualscroller";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Knob from "primevue/knob";
import SelectButton from "primevue/selectbutton";
import Menubar from 'primevue/menubar';
import Breadcrumb from 'primevue/breadcrumb';

const routes = [
  {
    path: "/",
    name: "Home",
    component: App,
  },
];

(Element.prototype as any).originalAddEventListener =
  Element.prototype.addEventListener;
Element.prototype.addEventListener = function (
  type: any,
  listener: any,
  options: any
) {
  if (type == "keydown" || type == "keyup") {
    // Prevent PrimeVue from using key events when jog panel is up.
    let patchEventListener = (event: any) => {
      if ((Element.prototype as any).shadowKeyEvents) {
        return;
      }
      listener(event);
    };
    (this as any).originalAddEventListener(type, patchEventListener, options);
    return;
  }
  (this as any).originalAddEventListener(type, listener, options);
};

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(PrimeVue);
app.use(DialogService);
app.use(router);

app.component("Button", Button);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("Checkbox", Checkbox);
app.component("TriStateCheckbox", TriStateCheckbox);
app.component("InputText", InputText);
app.component("VirtualScroller", VirtualScroller);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("Knob", Knob);
app.component("SelectButton", SelectButton);
app.component("Menubar", Menubar);
app.component("Breadcrumb", Breadcrumb);

app.mount("#app");
