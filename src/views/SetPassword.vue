<template>
    <div class="set-password-container">
      <div class="form-container">
        <h2>Set Your Password</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="Enter your password"
            />
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              required
              placeholder="Confirm your password"
            />
          </div>
          <button type="submit">Set Password</button>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import ApiServices from '@/services/APIService';
  import { ref, onMounted } from 'vue'; // Importing onMounted along with ref
  
  export default {
    data() {
      return {
        password: '',
        confirmPassword: '',
        errorMessage: '',
        email: '', // Email extracted from URL
        token: ''  // Token extracted from URL
      };
    },
    mounted() {
      // Extract token and email from the URL query parameters
      const queryParams = new URLSearchParams(window.location.search);
      this.token = queryParams.get('token'); // Extract token from ?token=<value>
      this.email = queryParams.get('email'); // Extract email from ?email=<value>
      
      console.log('Token:', this.token);
      console.log('Email:', this.email);
    },
    methods: {
      async submitForm() {
        if (this.password !== this.confirmPassword) {
          this.errorMessage = "Passwords do not match!";
          return;
        }
  
        const formData = new FormData();
        
        formData.append('token', this.token); // Include token in form data
        formData.append('email', this.email); // Include email in form data
        formData.append('password', this.password);
        formData.append('password_confirmation', this.confirmPassword);
  
        // Log FormData contents
        console.log("Form Data:");
        for (const [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
  
        try {
          const response = await ApiServices.setPassword(formData); // Send FormData to the API
          
          if (response && response.status === 200) {
            alert('Password has been set successfully!');
            this.clearForm(); // Clear form after successful submission
          } else {
            this.errorMessage = 'Failed to set password. Please try again.';
          }
        } catch (error) {
          this.errorMessage = 'An error occurred. Please try again later.';
          console.error('Submission error:', error);
        }
      },
      clearForm() {
        this.password = '';
        this.confirmPassword = '';
        this.errorMessage = '';
      }
    }
  };
  </script>
  
  <style scoped>
  /* Your existing styles */
  </style>
  
  
  <style scoped>
  .set-password-container {
    background-image: url('@/images/bg.jpg'); /* Ensure this path is correct */
    background-size: cover; /* Cover the entire area */
    background-position: center; /* Center the image */
    padding: 20px;
    min-height: 100vh; /* Ensures the container is tall enough to show the image */
    display: flex;
    align-items: center;
    justify-content: center; /* Center the form vertically and horizontally */
  }
  
  .form-container {
    background-color: rgba(255, 255, 255, 0.9); /* Optional: for better readability */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%; /* Ensure full width is utilized */
    max-width: 400px; /* Limit the maximum width of the form */
  }
  
  .form-group {
    display: flex;
    flex-direction: column; /* Stack label and input vertically */
    margin-bottom: 15px; /* Adds spacing between form groups */
  }
  
  .form-group label {
    margin-bottom: 5px; /* Space between label and input */
  }
  
  input {
    padding: 10px; /* Space inside the input field */
    border: 1px solid #ccc; /* Border styling */
    border-radius: 4px; /* Rounded corners */
  }
  
  button {
    width: 100%; /* Full width button */
    padding: 10px; /* Space inside the button */
    background-color:  var(--deep-purple);  /* Button color */
    color: white; /* Text color */
    border: none; /* No border */
    border-radius: 4px; /* Rounded corners */
    cursor: pointer; /* Pointer cursor */
  }
  
  button:hover {
    background-color: var(--deep-purple); /* Darken button on hover */
  }
  
  .error {
    color: red;
    text-align: center; /* Center the error message */
  }
  </style>
  