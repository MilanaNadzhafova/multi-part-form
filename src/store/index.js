import Vue from "vue";
import Vuex from "vuex";
import formModule from "./formModule";
import popupsModule from "./popupsModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { formModule, popupsModule },
});
