// import axios from 'axios';
//  //const baseURL = 'http://192.168.15.115:8000/api';
//  const baseURL = 'http://192.168.15.93:8000/api'
// axios.defaults.baseURL = baseURL;
// import { useStore } from 'vuex';
// const ApiServices = {

//   init() {
//     store: null,
//     axios.defaults.headers.common['Content-Type'] = 'application/json';
//     this.store = useStore();
//   },
//   getAuthHeader() {
//     const token = localStorage.getItem('token');
//     return token ? { Authorization: `Bearer ${token}` } : {};
//   },
//   async authenticate(userData) {
//     console.log('Here');
//     try {    
//       const response = await axios.post('/login', userData);
//       return response.data;
//     } catch (error) {
//       console.error('Authentication failed:', error);
//       throw error;
//     }
//   },
//   async PostRequest(url, data, isMultipart = false) {
//     try {
//         const headers = {
//             ...this.getAuthHeader(),
//             'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
//         };
//         const response = await axios.post(url, data, {
//             headers,
//         });
//         alert(response.data.message);
//         // // Check for success response (status 200 or 201)
//         // if (response.status === 200 || response.status === 201) {
//         //      // Success alert
//         //     return response.data; // Return response data for further processing
//         // } else {
//         //     alert('Submission was not successful. Please try again.'); // General error alert
//         //     return null; // Return null or handle as needed
//         // }
//     } catch (error) {
//         console.error('POST request failed:', error);
//          alert('An error occurred. Please try again later.'); // Alert on error
//         throw error; // Rethrow the error for further handling if needed
//     }
// },

// async PostRequestAPI(endpoint, data) {
//   try {
//     const response = await axios.post(endpoint, data);

//     console.log('Successfully added user:', response.data);
//     return response.data; // Return the response data for further use
//   } catch (error) {
//     console.error('Error in PostRequest:', error);
//     throw error; // Throw error to be caught in the component
//   }
// },
// async updateStudentApplication(submissionId, action) {
//   try {
//       // Determine the API endpoint based on the action (accept or reject)
//       const token = localStorage.getItem('token');
//       const headers = {
//         Authorization: `Bearer ${token}`, // Assuming Bearer token is used
//       };
//       const endpoint = action === 'accept' ? `/submissions/${submissionId}/accept` : `/submissions/${submissionId}/reject`;  
//       const response = await axios.post(endpoint, {}, { headers });
//       const updatedStudent = response.data.data;
//       // Update the student status in the component's local state
//       // this.updateStudentStatus(updatedStudent.id, updatedStudent.status);
//       alert(response.data.message);
//   } catch (error) {
//       console.error(`Error ${action}ing student application:`, error);
//       alert(`Failed to ${action} the application. Please try again.`);
//   }
// },
// async setPassword(formData) {
//   try {
//     // Make PUT request to the server with formData
//     // const response = await axios.put('/set-password', formData);
//     const response = await axios.put('/password/setup', formData);
    
//     // Log the success message and return the response data
//     console.log('Password set successfully:', response.data);
//     return response.data; // Returning the response for further use in the component
//   } catch (error) {
//     // Log and re-throw the error for handling in the component
//     console.error('Error setting password:', error);
//     throw error; // Ensure the error can be handled in the component
//   }
// },

// // A method to update the student's status in your component's state (or wherever you need)
// updateStudentStatus(id, newStatus) {
//   // Find the index of the student with the given ID
//   const studentIndex = this.students.findIndex(student => student.id === id);
//   if (studentIndex !== -1) {
//       // Update the status of the found student
//       this.students[studentIndex].status = newStatus;
//   } else {
//       console.warn(`Student with ID ${id} not found.`);
//   }
// }
// ,
//   async GetRequest(url) {
//     try {
//       const response = await axios.get(url, {
//         headers: this.getAuthHeader(),
//       });
//       return response.data;
//     } catch (error) {
//       console.error('GET request failed:', error);
//       throw error;
//     }
//   },

//   logout() {
//     localStorage.removeItem('token');
//   },
// };
// export default ApiServices;
import axios from 'axios';
import { useStore } from 'vuex';
// Set the base URL for Axios
const baseURL = 'http://192.168.15.93:8000/api';

//const baseURL = 'http://192.168.15.115:8000/api';

axios.defaults.baseURL = baseURL;

const ApiServices = {
  init() {
    this.store = useStore();
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    // Set the Authorization header if a token exists
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },
  
  getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
  
  async authenticate(userData) {
    try {
      const response = await axios.post('/login', userData);
      return response.data;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  },
  async PostRequest(url, data, isMultipart = false) {
    try {
      const headers = {
        ...this.getAuthHeader(),
        'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
      };
      const response = await axios.post(url, data, { headers });
      alert(response.data.message);
      return response.data; // Return response data for further processing
    } catch (error) {
      console.error('POST request failed:', error);
      alert('An error occurred. Please try again later.'); // Alert on error
      throw error; // Rethrow the error for further handling if needed
    }
  },

  async PostRequestAPI(endpoint, data) {
    try {
      const response = await axios.post(endpoint, data);
      console.log('Successfully added user:', response.data);
      return response.data; // Return the response data for further use
    } catch (error) {
      console.error('Error in PostRequest:', error);
      throw error; // Throw error to be caught in the component
    }
  },

  
  async updateStudentApplication(submissionId, action) {
    try {
      const endpoint = action === 'accept' ? `/submissions/${submissionId}/accept` : `/submissions/${submissionId}/reject`;
      const response = await axios.post(endpoint, {});
      const updatedStudent = response.data.data;
      alert(response.data.message);
      return updatedStudent; // Return updated student data if needed
    } catch (error) {
      console.error(`Error ${action}ing student application:`, error);
      alert(`Failed to ${action} the application. Please try again.`);
      throw error; // Rethrow the error for further handling if needed
    }
  },
  

  async setPassword(formData) {
    try {
      //sameer
      const response = await axios.put('/password/setup', formData);
     //ahmed
     //const response = await axios.put('/set-password', formData);
      
      console.log('Password set successfully:', response.data);
      return response.data; // Returning the response for further use in the component
    } catch (error) {
      console.error('Error setting password:', error);
      throw error; // Ensure the error can be handled in the component
    }
  },
  async GetRequest(url) {
    try {
      console.log("Making GET request to:", url);
      const response = await axios.get(url, {
        headers: { ...this.getAuthHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("GET request failed:", error);
      throw error;
    }
  },
  logout() {
    localStorage.removeItem('token');
    // Optionally remove the Authorization header as well
    delete axios.defaults.headers.common['Authorization'];
  },
};

export default ApiServices;

