// store/modules/auth.js
import ApiServices from '@/services/APIService';

const state = {
  user: null,
  token: localStorage.getItem('token') || null, // Load token from localStorage
  tokenExpiration: localStorage.getItem('tokenExpiration') || null, // Load token expiration
  userRole: localStorage.getItem('userRole') || null, // Load role from localStorage
  permissions: JSON.parse(localStorage.getItem('userPermissions')) || [], // Load permissions from localStorage
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  userRole: (state) => state.userRole,
  getToken: (state) => state.token,
  userPermissions: (state) => state.permissions,
  hasPermission: (state) => (permission) => state.permissions.includes(permission),
};

const actions = {
  async login({ commit }, userData) {
    try {
      const response = await ApiServices.authenticate(userData);
      const { data } = response;
      const { permissions, token, role, expires_in } = data;

      commit('setUser', data);

      console.log("TOkennnnnnn",token);
      commit('setToken', token);
      commit('setTokenExpiration', expires_in);
      commit('setUserRole', role);
      commit('setPermissions', permissions);

      // Persist to localStorage
      localStorage.setItem('userRole', role);
      localStorage.setItem('userPermissions', JSON.stringify(permissions));
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiration', expires_in);

      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  logout({ commit }) {
    commit('clearAuthData');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('userRole');
    localStorage.removeItem('permissions');
  },
  tryAutoLogin({ commit }) {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('tokenExpiration');
    
    if (new Date() >= new Date(expirationDate)) {
      commit('clearAuthData');
      return;
    }
    const userRole = localStorage.getItem('userRole');
    const permissions = JSON.parse(localStorage.getItem('permissions'));
    
    if (token) {
      commit('setUserRole', userRole);
      commit('setPermissions', permissions);
      commit('setToken', { token, tokenExpiration: expirationDate });
    }
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  },
  setTokenExpiration(state, expiration) {
    state.tokenExpiration = expiration;
  },
  setUserRole(state, role) {
    state.userRole = role;
  },
  setPermissions(state, permissions) {
    state.permissions = permissions;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
