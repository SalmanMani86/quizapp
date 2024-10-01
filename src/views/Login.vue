<template>
    <div class="login-container">
      <div class="login-form">
        <h1>Login</h1>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="email" type="email" id="email" class="form-control" placeholder="Enter your email" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input v-model="password" type="password" id="password" class="form-control" placeholder="Enter your password" required>
          </div>
          <button type="submit" class="btn btn-signin">Login</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p>Don't have an account? <router-link to="/form" class="text-primary">Register</router-link></p>
      </div>
    </div>
  </template>
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import ApiServices from '@/services/APIService';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const store = useStore();
    const router = useRouter();
    
    const login = async () => {
  const userData = { email: email.value, password: password.value };
  try {
    const response = await store.dispatch('auth/login', userData); // Dispatch the login action
    
    // The response contains `data` directly, not `response.user`
    store.commit('auth/setUser', response); // Store the whole response data, adjust if necessary
    // Commit the user role and permissions to the RoleModule
    store.commit('roles/setUserRole', response.role);
    store.commit('roles/setPermissions', response.permissions);
    

    console.log("permissions",response.permissions);
    // Check if role and permissions are set
    const userRole = store.getters['roles/userRole'];
    if (userRole) {
      router.push('/dashboard'); // Redirect to dashboard
    } else {
      console.error('User role is undefined. Unable to redirect.');
      errorMessage.value = 'Unable to redirect. User role is not defined.';
    }
  } catch (error) {
    console.error('Login error:', error);
    errorMessage.value = error.message || 'Login failed';
  }
};





        return { email, password, login, errorMessage };
      },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  
  
  <style scoped>
  .login-container {
    background-image: url('../images/bg.jpg');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-form {
    max-width: 400px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  h1 {
    color: #481449;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left; 
  }
  
  .form-control {
    width: calc(100% - 20px); 
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .btn-signin {
    background-color: #481449; 
    border: none;
    width: 100%; 
    padding: 10px; 
    color: white; 
    transition: transform 0.2s, box-shadow 0.2s; 
    transform-origin: center; 
  }
  
  .btn-signin:hover {
    background-color: #481449 !important; 
    transform: scale(1.05); 
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); 
    color:white;
  }
  
  .btn-signin:active {
    background-color: #481449 !important; 
    transform: scale(0.95); 
    box-shadow: none; 
    color: white;
  }
  
  p {
    margin-top: 15px;
  }
  </style>
  