<template>
    <header class="header">
      <div class="header-left">
        <h1>Dashboard</h1>
      </div>
      <!-- Right section for Profile Settings and Logout buttons -->
      <div class="header-right">
        <button class="profile-settings-btn" @click="goToProfileSettings">
          <i class="fas fa-user-circle"></i> Profile
        </button>
        <button class="logout-btn" @click="logout">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </header>
  </template>
  <script>
  export default {
    methods: {
      logout() {
        localStorage.removeItem("token");
        this.$router.push("/login");
      },

      goToProfileSettings() {
        this.$router.push("/profile-settings"); 
      }
    }
  };
  </script>
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: var(--black); 
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: sticky; 
    z-index: 1000;
    top: 0; 
  }
  .header-left h1 {
    margin: 0;
    font-size: 24px;
    color: var(--white); 
  }
  .header-right {
    display: flex;
    align-items: center;
  }
  .profile-settings-btn, .logout-btn {
    background-color: transparent;
    border: none;
    color: var(--white); 
    font-size: 16px;
    margin-left: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  
  .profile-settings-btn i, .logout-btn i {
    margin-right: 8px;
    font-size: 18px;
  }
  .profile-settings-btn:hover, .logout-btn:hover {
    color: var(--light-grey); 
  }
  /* .logout-btn:hover {
    color: var(--black); 
  } */
  </style>
  