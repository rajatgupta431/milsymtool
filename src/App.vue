<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawerRight" fixed right clipped app>
      <saved-symbols />
    </v-navigation-drawer>
    <v-navigation-drawer v-model="drawer" fixed app class="mdrawer">
      <v-list dense>
        <v-toolbar prominent flat class="transparent">
          <v-toolbar-title>Military Symbol Tool</v-toolbar-title>
        </v-toolbar>
        <v-subheader>Navigation</v-subheader>
        <v-list-tile :to="homelocation">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Create</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/help/">
          <v-list-tile-action>
            <v-icon>help_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Help</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
       
     <v-list-tile @click="openWhatsAppChat">
      <v-list-tile-action>
        <v-icon>email</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Contact Developer</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
       
        <router-view name="drawer" />
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dense fixed app class="mtoolbar">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <router-view name="toolbar" />
      <v-spacer />
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight" />
    </v-toolbar>
    <v-content>
      <router-view :key="autocomplete" />
      <snack-message />
    </v-content>
  </v-app>
</template>

<script>
import SnackMessage from "@/components/SnackMessage.vue";
import { SettingsMixins } from "./views/mixins";
import SavedSymbols from "./components/SavedSymbols.vue";

export default {
  components: { SavedSymbols, SnackMessage },
  mixins: [SettingsMixins],
  data: () => ({
    drawer: null,
    drawerRight: null
  }),

  computed: {
    homelocation() {
      return { name: "home", params: { standard: this.$store.state.standard } };
    }
  },

  created() {
    this.$store.dispatch("changeStandard", this.$store.state.standard);
  },

  methods: {
    openWhatsAppChat() {
      const phoneNumber = '919620846900'; // Replace with your actual WhatsApp number
      const url = `https://wa.me/${phoneNumber}`;
      window.open(url, '_blank');
    }
  },

  mounted() {
    if (this.$vuetify.breakpoint.smAndDown) {
      this.autocomplete = false;
    }
  }
};
</script>

<style>
.v-toolbar--fixed.mtoolbar {
  z-index: 3;
}

.v-overlay--active {
  z-index: 4 !important;
}

.mdrawer {
  z-index: 5 !important;
}
</style>
