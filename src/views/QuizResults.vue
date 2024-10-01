<template>
  <div class="quiz-results-container">
    <h1>Quiz Results <i class="fas fa-clipboard-list"></i></h1>

    <h2>Student Information <i class="fas fa-user-graduate"></i></h2>

    <div class="search-filter-container">
      <!-- Search Input -->
      <div class="search-wrapper">
        <i class="fas fa-search search-icon"></i>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search by name or email..." 
          class="search-input"
        />
      </div>

      <!-- Sort By Options -->
      <div class="sort-wrapper">
        <i class="fas fa-sort sort-icon"></i>
        <select v-model="sortOption" class="sort-dropdown">
          <option value="student">Order by Students</option>
          <option value="quiz">Order by Quiz Title</option>
        </select>
      </div>
    </div>

    <!-- Student Cards -->
    <div class="students-wrapper">
      <div 
        v-for="student in filteredStudents" 
        :key="student.student_id" 
        class="student-card"
      >
        <h3><i class="fas fa-user"></i> {{ student.student_name }}</h3>
        <p><i class="fas fa-envelope"></i> Email: {{ student.student_email }}</p>
        <div class="results-wrapper">
          <h4>Results <i class="fas fa-file-alt"></i></h4>
          <div 
            v-for="result in student.quizResults" 
            :key="result.quiz_id" 
            class="result-card"
          >
            <h5><i class="fas fa-book"></i> Quiz Title: {{ result.quizTitle }}</h5>
            <p>Score: {{ result.score }}</p>
            <p><i class="fas fa-calendar-alt"></i> Date Taken: {{ formatDate(result.dateTaken) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading">Loading... <i class="fas fa-spinner fa-spin"></i></div>
    <div v-if="error" class="error">{{ error }} <i class="fas fa-exclamation-triangle"></i></div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import ApiServices from '@/services/ApiServices'; // Ensure this is the correct path

export default {
  setup() {
    const students = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const searchQuery = ref('');
    const sortOption = ref('student'); // Default sorting by student

    const fetchData = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await ApiServices.GetRequest('/quizzes/results-all');
        // Map API response to the structure you need
        const formattedData = response.quiz_results.map(result => ({
          student_id: result.student.student_id,
          student_name: result.student.student_name,
          student_email: result.student.student_email,
          quizResults: [
            {
              quiz_id: result.quiz.quiz_id,
              quizTitle: result.quiz.title,
              score: result.score,
              dateTaken: result.attempted_at,
            },
          ],
        }));
        students.value = formattedData;
      } catch (err) {
        error.value = 'Failed to load data.';
      } finally {
        loading.value = false;
      }
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Computed property for filtering and sorting students
    const filteredStudents = computed(() => {
      let filtered = students.value;

      // Filter by search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(student =>
          student.student_name.toLowerCase().includes(query) || 
          student.student_email.toLowerCase().includes(query)
        );
      }

      // Sort by selected option
      if (sortOption.value === 'student') {
        // Sort by student name
        filtered = filtered.sort((a, b) => a.student_name.localeCompare(b.student_name));
      } else if (sortOption.value === 'quiz') {
        // Sort by quiz title
        filtered = filtered.sort((a, b) => a.quizResults[0].quizTitle.localeCompare(b.quizResults[0].quizTitle));
      }

      return filtered;
    });

    onMounted(fetchData);

    return {
      students,
      loading,
      error,
      searchQuery,
      sortOption,
      filteredStudents,
      formatDate,
    };
  },
};
</script>




<style scoped>
.quiz-results-container {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #6A1B9A;
  margin-bottom: 20px;
  text-align: center;
}

.search-filter-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-wrapper, .filter-wrapper {
  position: relative;
}

.search-input {
  padding: 10px;
  padding-left: 35px;
  border: 1px solid #6A1B9A;
  border-radius: 5px;
}

.sort-dropdown {
  padding: 10px;
  border: 1px solid #6A1B9A;
  border-radius: 5px;
}

.search-icon, .sort-icon {
  position: absolute;
  left: 10px;
  top: 10px;
  color: #6A1B9A;
}

.students-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.student-card {
  background-color: #e1bee7;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.results-wrapper {
  margin-top: 10px;
}

.result-card {
  background-color: #f3e5f5;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #6A1B9A;
}

.error {
  color: red;
  text-align: center;
}

.fas {
  margin-right: 5px;
}
</style>
