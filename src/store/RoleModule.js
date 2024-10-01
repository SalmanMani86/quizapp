const state = {
  userRole: localStorage.getItem('userRole') || null, // Load from localStorage
  permissions: JSON.parse(localStorage.getItem('userPermissions')) || [], // Load from localStorage
};

const getters = {
  userRole: (state) => state.userRole,
  hasPermission: (state) => (permission) => state.permissions.includes(permission),
  // canAddManagers: (state) => state.permissions.includes('User can add manager'),
  // canViewStudentRequests: (state) => state.permissions.includes('User can view/accept/reject student requests'),
  // canViewAssignedQuizzesToStudents: (state) => state.permissions.includes('User can view assigned quizzes to students'),
  // canAssignAssignedQuizzes: (state) => state.permissions.includes('User can assign assigned quizzes'),
  // canViewQuizResults: (state) => state.permissions.includes('User can view quiz results'),
  // canViewStudentDetails: (state) => state.permissions.includes('User can view student details'),
  // canViewAllQuizzes: (state) => state.permissions.includes('User can view all quizzes'),
  // canViewAssignedQuizzes: (state) => state.permissions.includes('User can view Assigned Quizzes'),
  // canViewAttemptedQuizzes: (state) => state.permissions.includes('User can view Attempted Quizzes'),
  // canViewPendingQuizzes: (state) => state.permissions.includes('User can view Pending Quizzes'),
  // canViewAssignedQuizResults: (state) => state.permissions.includes('User can view Assigned Quiz Results'),
};

const actions = {
  login({ commit }, { role, permissions }) {
    commit('setUserRole', role);
    commit('setPermissions', permissions);
    
    // Persist to localStorage
    localStorage.setItem('userRole', role);
    localStorage.setItem('userPermissions', JSON.stringify(permissions));
  },
};

const mutations = {
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
