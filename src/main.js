import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Import the store
import ApiServices from '@/services/APIService';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/theme.css';

const app = createApp(App);

// Initialize API services here
ApiServices.init();
app.use(store);
app.use(router);
 // Use the store here

// Mount the app first
app.mount('#app');

// After mounting, retrieve the user role and permissions
// const token = localStorage.getItem('token'); // Check for token first
// if (token) {
//     const userRole = localStorage.getItem('userRole');
//     if (userRole) {
//         store.commit('roles/setUserRole', userRole);
//         store.dispatch('roles/fetchPermissions', userRole); // Fetch permissions if role exists
//     }
// }
