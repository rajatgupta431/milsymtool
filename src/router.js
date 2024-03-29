import Vue from "vue";
import Router from "vue-router";
import PickerView from "./views/PickerView.vue";
import Help from "./views/Help.vue";
import HelpDialog from "./components/HelpDialog.vue";
import PickerViewToolbar from "./views/PickerViewToolbar.vue";
import AboutToolbar from "./views/AboutToolbar.vue";
import HelpToolbar from "./views/HelpToolbar.vue";
import PickerViewDrawer from "./views/PickerViewDrawer.vue";

import store from "./store";

Vue.use(Router);

export default new Router({
  routes: [

    {
      path: "/help",
      name: "help",
      components: {
        default: Help,
        toolbar: HelpToolbar
      }
    },
    {
      path: "/:standard/:sidc(\\d+)?",
      name: "home",
      components: {
        default: PickerView,
        toolbar: PickerViewToolbar,
        drawer: PickerViewDrawer
      },
      children: [
        {
          path: "help",
          name: "keyboardShortcuts",
          components: {
            dialogs: HelpDialog
          }
        }
      ]
    },
    {
      path: "/",
      redirect: { name: "home", params: { standard: store.state.standard } }
    }
  ]
});
