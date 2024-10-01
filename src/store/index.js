// import Vue from "vue";
// import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate";


// import Auth from "./Auth.module"

// Vue.use(Vuex);

// export default new Vuex.Store({
//   plugins: [createPersistedState()],
//   state: {},
//   mutations: {},
//   actions: {
   
//   },
//   modules: {
//     Auth,
//   },
// });
import { createStore } from 'vuex';
import authModule from './AuthModule';
import roleModule from './RoleModule';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authModule,
    roles: roleModule,
  },
});