<template>
  <div class="form-container">
    <div class="register-form">
      <h1>Register</h1>
      <form @submit.prevent="submit_form">
        <div class="form-row">
          <div class="form-group">
            <label for="name">Name:</label>
            <input v-model="name" type="text" id="name" class="form-control" placeholder="Name" required>
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" type="email" id="email" class="form-control" placeholder="Email" required>
        </div>

        <div class="form-group">
          <label for="phone">Phone Number:</label>
          <input v-model="phone" type="tel" id="phone" class="form-control" placeholder="Phone Number" required pattern="[0-9]*">
        </div>

        <div class="form-group">
          <label for="cv">Upload CV:</label>
          <input type="file" id="cv" class="form-control" @change="handleFileUpload" accept=".pdf,.doc,.docx" required />
        </div>

        <button type="submit" class="btn btn-signup">Register</button>
      </form>
      <p>Already have an account? <router-link to="/login" class="text-primary">Login</router-link></p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import ApiServices from '@/services/APIService'; // Adjust the path as needed
export default {
  setup() {
    const name = ref('');
    const email = ref('');
    const phone = ref('');
    const cv = ref(null);

    const handleFileUpload = (event) => {
    const file = event.target.files[0];
    cv.value = file;
    console.log('Uploaded CV:', file);
    };
    const validate_form = () => {
      if (!cv.value) {
        alert('Please upload your CV');
        return false;
      }
      return true;
    };
    const submit_form = async () => {
  if (validate_form()) {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('phone_no', phone.value);
    formData.append('cv', cv.value);

    // Log the FormData to verify
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await ApiServices.PostRequest('/submissions', formData, true);

      // Check if the response is successful (typically status 200 or 201 for created)
      name.value = '';
        email.value = '';
        phone.value = '';
        cv.value = null;  // Reset file input

      // if (response) {
      //   // Clear form fields after successful submission
      //   name.value = '';
      //   email.value = '';
      //   phone.value = '';
      //   cv.value = null;  // Reset file input

      //   console.log('Form cleared after successful submission.');
      //  } 
       //else {
      //   alert('Submission was not successful. Please try again.');
      // }

      console.log('Submission successful:', response);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error('Validation errors:', error.response.data);
        alert('Please correct the following errors: ' + JSON.stringify(error.response.data));
      } else {
        console.error('Submission error:', error);
        alert('There was an issue submitting your application. Please try again.');
      }
    }
  }
};



    return { name, email, phone, cv, handleFileUpload , submit_form };
  }
};
</script>

<style scoped>
  .form-container {
    background-image: url('../images/bg.jpg');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .register-form {
    max-width: 400px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  h1 {
    color: #481449;
    margin-bottom: 15px;
  }

  .form-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .form-group {
    margin-bottom: 10px;
    flex: 1 1 45%;
    text-align: left;
    padding-right: 10px;
  }

  .form-control {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .btn-signup {
    background-color: #481449;
    border: none;
    width: 100%;
    padding: 10px;
    color: white;
    transition: transform 0.2s, box-shadow 0.2s;
    transform-origin: center;
  }

  .btn-signup:hover {
    background-color: #481449 !important;
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    color: white;
  }

  .btn-signup:active {
    background-color: #3E1F35 !important;
    transform: scale(0.95);
    box-shadow: none;
  }
</style>
