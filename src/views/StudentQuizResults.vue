<template>
  <div class="quiz-results">
    <h1 class="heading">Quiz Results</h1>
    <!-- Display the quiz results -->
    <ul v-if="quizResults.length" class="results-list">
      <li v-for="result in quizResults" :key="result.quiz_id" class="result-item">
        <div class="result-info">
          <span class="quiz-title">{{ result.quiz_title }}</span>
          <div class="quiz-details">
            <span class="quiz-marks">Score: {{ result.score !== null ? result.score : 'Not available' }}</span>
            <span class="quiz-date">Attempted At: {{ result.attempted_at }}</span>
          </div>
        </div>
      </li>
    </ul>
    <p v-else>No quiz results available</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ApiServices from '@/services/ApiServices';

export default {
  setup() {
    const quizResults = ref([]);

    // Fetch quiz results from the API
    const fetchQuizResults = async () => {
      try {
        const data = await ApiServices.GetRequest('/student/quizzes/results');
        quizResults.value = data.quizzes || []; // Assign the API data to quizResults
      } catch (error) {
        console.error('Error fetching quiz results:', error);
      }
    };

    onMounted(() => {
      fetchQuizResults(); // Fetch the data when the component is mounted
    });

    return {
      quizResults,
    };
  },
};
</script>

<style scoped>
.heading {
  text-align: center;
  margin-bottom: 20px;
  color: var(--deep-purple);
}

.quiz-results {
  width: 100%;
  max-height: 550px; /* Set a max height for scrolling */
  padding: 20px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* Enable vertical scrolling */
}

.results-list {
  list-style-type: none;
  padding: 0;
}

.result-item {
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  margin: 10px 0;
  background-color: var(--deep-purple);
  color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.result-info {
  margin-bottom: 10px;
}

.quiz-title {
  font-size: 18px;
  font-weight: bold;
}

.quiz-details {
  display: flex;
  justify-content: space-between; /* Space the marks and date */
  align-items: center;
  margin-top: 10px;
}

.quiz-marks {
  font-size: 16px;
}

.quiz-date {
  font-size: 14px;
  text-align: right; /* Align date text to the right */
}
</style>
