<template>
  <div class="assign-quizzes">
    <h1 class="heading">Assign Quizzes</h1>

    <div class="form-group">
      <label for="student-select">Select Students:</label>
      <div class="multi-select">
        <input
          type="text"
          placeholder="Search students..."
          v-model="searchTerm"
          class="search-input"
        />
        <div class="checkbox-list">
          <label v-for="student in filteredStudents" :key="student.id">
            <input
              type="checkbox"
              :value="student.id"
              v-model="selectedStudents"
            />
            {{ student.name }}
          </label>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="quiz-select">Select Quiz:</label>
      <select id="quiz-select" v-model="selectedQuiz" class="select">
        <option value="" disabled>Select a quiz</option>
        <option v-for="quiz in quizzes" :key="quiz.id" :value="quiz.id">
          {{ quiz.title }}
        </option>
      </select>
    </div>

    <button @click="assignQuiz" class="assign-button">Assign Quiz</button>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import ApiServices from '@/services/APIService'; // Import your ApiServices

export default {
  setup() {
    const students = ref([]);
    const quizzes = ref([]);
    const selectedStudents = ref([]);
    const selectedQuiz = ref('');
    const searchTerm = ref('');
    const message = ref('');

    // Fetch students from API
    const fetchStudents = async () => {
      try {
        const response = await ApiServices.GetRequest('/showstudents'); // Call the API service
        students.value = response.data; // Assuming the API returns an array of students
      } catch (error) {
        console.error('Error fetching students:', error);
        message.value = 'Failed to fetch students. Please try again.';
      }
    };

    // Fetch quizzes from API
    const fetchQuizzes = async () => {
      try {
        const response = await ApiServices.GetRequest('/all-quizzes');
        quizzes.value = response.quizzes; // Assuming the API returns an object with quizzes
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        message.value = 'Failed to fetch quizzes. Please try again.';
      }
    };

    // Computed property to filter students based on the search term
    const filteredStudents = computed(() => {
      return students.value.filter(student =>
        student.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });

    // Assign the selected quiz to the selected students
    const assignQuiz = async () => {
      if (selectedStudents.value.length > 0 && selectedQuiz.value) {
        try {
          // Construct the request body
          const requestBody = {
            quiz_id: selectedQuiz.value,
            student_ids: selectedStudents.value,
          };

          // Log to console for debugging
          console.log('Request Body:', requestBody);

          // Make the API POST request
          await ApiServices.PostRequest('/quizzes/assign', requestBody, false);

          message.value = 'Quiz assigned to selected students successfully.';
          resetSelections();
        } catch (error) {
          console.error('Error assigning quiz:', error);
          message.value = 'Failed to assign quiz. Please try again.';
        }
      } else {
        message.value = 'Please select at least one student and a quiz.';
      }
    };

    // Reset selected students and quiz
    const resetSelections = () => {
      selectedStudents.value = [];
      selectedQuiz.value = '';
      searchTerm.value = '';
    };

    // Fetch data when the component is mounted
    onMounted(() => {
      fetchStudents();
      fetchQuizzes();
    });

    return {
      students,
      quizzes,
      selectedStudents,
      selectedQuiz,
      searchTerm,
      assignQuiz,
      filteredStudents,
      message,
    };
  },
};
</script>

<style scoped>
.assign-quizzes {
  width: 100%;
  padding: 20px;
  margin: 10px 0;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow-y: auto;
}
.heading {
  font-size: 28px;
  color: var(--deep-purple);
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.multi-select {
  position: relative;
  width: 80%;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--deep-purple);
  border-radius: 5px;
  font-size: 16px;
}

.checkbox-list {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid var(--deep-purple);
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
}

.checkbox-list label {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.checkbox-list input {
  margin-right: 10px;
}

.select {
  width: 80%;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid var(--deep-purple);
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  transition: border-color 0.3s;
}

.select:focus {
  border-color: var(--deep-purple);
  outline: none;
}

.assign-button {
  width: 80%;
  margin: 0 auto;
  padding: 10px;
  background-color: var(--deep-purple);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.assign-button:hover {
  background-color: var(--deep-purple);
}

.message {
  text-align: center;
  margin-top: 15px;
  color: #d32f2f;
}
</style>
