<template>
  <div class="requests-container">
    <h1>Student Requests</h1>
    <!-- Main Table for only pending student requests -->
    <div class="table-wrapper">
      <table class="requests-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>CV</th>
            <th>Status</th>
            <th class="actions-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in pendingRequests" :key="request.id">
            <td>{{ request.id }}</td>
            <td>{{ request.name }}</td>
            <td>{{ request.email }}</td>
            <td>{{ request.phone || 'N/A' }}</td>
            <td><a :href="request.cv_path" target="_blank">View CV</a></td>
            <td>{{ request.status }}</td>
            <td>
              <div class="button-group">
                <button class="mb-1" @click="acceptRequest(request.id)">Accept</button>
                <button class="mb-1" @click="rejectRequest(request.id)">Reject</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Filtered Table based on selected status -->
    <h2 class="filter-status">Filter by Status</h2>
    <div class="filter-options">
      <button @click="filterRequests('accepted')">Accepted</button>
      <button @click="filterRequests('rejected')">Rejected</button>
      <button @click="filterRequests('pending')">Pending</button>
    </div>
    <div class="table-wrapper">
      <table class="requests-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>CV</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="filteredRequest in filteredRequests" :key="filteredRequest.id">
            <td>{{ filteredRequest.id }}</td>
            <td>{{ filteredRequest.name }}</td>
            <td>{{ filteredRequest.email }}</td>
            <td>{{ filteredRequest.phone || 'N/A' }}</td>
            <td><a :href="filteredRequest.cv_path" target="_blank">View CV</a></td>
            <td>{{ filteredRequest.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import ApiServices from '@/services/APIService';

export default {
  data() {
    return {
      studentRequests: [],
      filteredRequests: [],
      selectedStatus: '',
    };
  },
  computed: {
    // Filtered requests to only include pending requests
    pendingRequests() {
      return this.studentRequests.filter(request => request.status === 'pending');
    },
  },
  created() {
    this.fetchStudentRequests(); // Fetch student requests when component is created
  },
  methods: {
    async fetchStudentRequests() {
      try {
        const response = await ApiServices.GetRequest('/students');
        this.studentRequests = response.data; // Store student requests in data
      } catch (error) {
        console.error('Error fetching student requests:', error);
      }
    },
    filterRequests(status) {
      this.filteredRequests = this.studentRequests.filter(
        (request) => request.status === status
      );
    },
    async acceptRequest(id) {
    try {
      await ApiServices.updateStudentApplication(id, 'accept'); // Pass id and action to the service
      this.updateStudentStatus(id, 'accepted'); // Update the local status
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  },

  async rejectRequest(id) {
    try {
      await ApiServices.updateStudentApplication(id, 'reject'); // Pass id and action to the service
      this.updateStudentStatus(id, 'rejected'); // Update the local status
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  },
    updateStudentStatus(id, newStatus) {
      const requestIndex = this.studentRequests.findIndex(
        (request) => request.id === id
      );
      if (requestIndex !== -1) {
        this.studentRequests[requestIndex].status = newStatus;
      }
      if (this.selectedStatus) {
        this.filterRequests(this.selectedStatus);
      }
    },
  },
};
</script>
<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
  color: var(--deep-purple);
}
.filter-status{
  margin-top: 40px;
}
.requests-container {
  width: 100%;
  margin: 10px 0;
  padding: 20px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.table-wrapper {
  max-height: 400px;
  overflow-y: auto;
}

.requests-table {
  width: 100%;
  border-collapse: collapse;
}

.requests-table th,
.requests-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid var(--light-grey);
}

.requests-table th {
  background-color: var(--deep-purple);
  color: white;
}

.button-group {
  display: flex;
  gap: 10px;
}

.requests-table button {
  padding: 8px 12px;
  background-color: var(--deep-purple);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
}

.filter-options {
  margin: 20px ;
}

.filter-options button {
  margin-right: 10px;
  padding: 10px 20px;
  background-color: var(--deep-purple);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
