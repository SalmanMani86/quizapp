<template>
  <div class="add-manager-container">
    <h1>ADD NEW USER</h1>
    <!-- Add Manager Form -->
    <form @submit.prevent="submitForm" class="add-manager-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" placeholder="Enter name" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Enter email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="Enter password" required />
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" v-model="role" required>
          <option value="" disabled>Select Role</option>
          <option value="manager">Manager</option>
          <option value="supervisor">Supervisor</option>
        </select>
      </div>

      <button type="submit" class="submit-button">Add {{ role || 'User' }}</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import ApiServices from '@/services/APIService';

export default {
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const role = ref('');

    const resetForm = () => {
      name.value = '';
      email.value = '';
      password.value = '';
      role.value = '';
    };

    const submitForm = async () => {
      // Validate the form inputs
      if (!name.value || !email.value || !password.value || !role.value) {
        alert('Please fill in all fields');
        return;
      }

      const formData = new FormData();
  
  // Append form fields to FormData
  formData.append('name', name.value);
  formData.append('email', email.value);
  formData.append('password', password.value);
  formData.append('role', role.value);

      try {
        // Call the API service to add the user
        const response = await ApiServices.PostRequestAPI('/register', formData);
        alert(`Successfully added ${role.value}`);
        resetForm(); // Clear the form after successful submission
      } catch (error) {
        console.error('Error adding user:', error);
        alert('An error occurred while adding the user.');
      }
    };

    return {
      name,
      email,
      password,
      role,
      submitForm,
    };
  },
};
</script>

<style scoped>
.add-manager-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  padding: 10px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 85%;
}

h1 {
  color: var(--deep-purple);
  margin-bottom: 10px;
}

.add-manager-form {
  display: flex;
  flex-direction: column;
  width: 70%;
  max-width: 400px;
  background-color: var(--deep-purple);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  font-weight: bold;
  color: #ffffff;
  display: block;
  margin-bottom: 5px;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #555;
  border-radius: 5px;
  font-size: 14px;
  color: var(--deep-purple);
  background-color: white;
}

.submit-button {
  background-color: var(--black);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin: 0 auto;
  display: block;
  width: 50%;
}

.submit-button:hover {
  background-color: #555;
}
</style>
