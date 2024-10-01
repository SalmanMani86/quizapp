<template>
  <div class="pending-quizzes">
    <h1 class="heading">Pending Quizzes</h1>
    <!-- Only display quizzes that have not been attempted -->
    <ul v-if="pendingQuizzes.length" class="quiz-list">
      <li v-for="quiz in pendingQuizzes" :key="quiz.id" class="quiz-item">
        <span class="quiz-title">{{ quiz.title }}</span>
        <span class="quiz-marks">Total Marks: {{ quiz.totalMarks }}</span>
        <span class="quiz-time">Total Time: {{ quiz.totalTime }} mins</span>
      </li>
    </ul>
    <p v-else>No pending quizzes available</p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const quizzes = ref([
      { id: 1, title: 'JavaScript Basics', totalMarks: 20, totalTime: 30 },
      { id: 2, title: 'HTML & CSS Fundamentals', totalMarks: 25, totalTime: 40 },
      { id: 3, title: 'Vue.js Essentials', totalMarks: 30, totalTime: 45 },
      { id: 4, title: 'React Introduction', totalMarks: 28, totalTime: 35 },
      { id: 5, title: 'Node.js Backend', totalMarks: 40, totalTime: 60 },
      { id: 6, title: 'Database Basics', totalMarks: 35, totalTime: 50 },
      { id: 6, title: 'Database Basics', totalMarks: 35, totalTime: 50 },
      { id: 6, title: 'Database Basics', totalMarks: 35, totalTime: 50 },
      
    ]);
    
    // Fetch attempted quizzes from localStorage
    const attemptedQuizzes = ref(JSON.parse(localStorage.getItem('attemptedQuizzes') || '[]'));

    // Compute pending (not yet attempted) quizzes
    const pendingQuizzes = computed(() => {
      return quizzes.value.filter(quiz => !attemptedQuizzes.value.includes(quiz.id));
    });

    // Fetch quizzes if necessary (dummy data used here)
    const fetchQuizzes = () => {
      // Logic to fetch quizzes (if needed) could go here
    };

    onMounted(() => {
      fetchQuizzes();
    });

    return {
      pendingQuizzes,
    };
  },
};
</script>

<style scoped>
.heading{
  text-align: center;
  margin-bottom: 20px;
  color: var(--deep-purple);
}
.pending-quizzes {
  width: 100%;
  padding: 20px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.quiz-list {
  list-style-type: none;
  padding: 0;
}

.quiz-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  background-color: var(--deep-purple);
  color: var(--white);
  border-radius: 5px;
}

.quiz-title {
  font-weight: bold;
}

.quiz-marks, .quiz-time {
  margin-left: 15px;
}
</style>
