<template>
  <div class="attempted-quizzes">
    <h1 class="heading">Attempted Quizzes</h1>
    <!-- Display quizzes that have been attempted -->
    <ul v-if="attemptedQuizzes.length" class="quiz-list">
      <li v-for="quiz in attemptedQuizzes" :key="quiz.id" class="quiz-item">
        <div class="quiz-info">
          <span class="quiz-title">{{ quiz.title }}</span>
          <span class="quiz-marks">Marks: {{ quiz.marksObtained }} / {{ quiz.totalMarks }}</span>
        </div>
        <div class="quiz-time">
          <span>Attempted On: {{ quiz.attemptedOn }}</span>
        </div>
      </li>
    </ul>
    <p v-else>No attempted quizzes available</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const attemptedQuizzes = ref([]);

    // Dummy data for testing (if localStorage is empty)
    const dummyData = [
      { id: 1, title: 'JavaScript Basics', totalMarks: 20, marksObtained: 18, attemptedOn: '2024-09-20' },
      { id: 2, title: 'HTML & CSS Fundamentals', totalMarks: 25, marksObtained: 22, attemptedOn: '2024-09-19' },
      { id: 3, title: 'Vue.js Essentials', totalMarks: 30, marksObtained: 28, attemptedOn: '2024-09-18' },
      { id: 4, title: 'Node.js API Development', totalMarks: 35, marksObtained: 30, attemptedOn: '2024-09-17' },
      { id: 5, title: 'MongoDB Basics', totalMarks: 40, marksObtained: 38, attemptedOn: '2024-09-16' },
      { id: 6, title: 'React.js Overview', totalMarks: 25, marksObtained: 20, attemptedOn: '2024-09-15' },
    ];

    // Fetch quizzes from localStorage or use dummy data
    const fetchAttemptedQuizzes = () => {
      attemptedQuizzes.value = dummyData;
    };

    onMounted(() => {
      fetchAttemptedQuizzes();
    });

    return {
      attemptedQuizzes,
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
.attempted-quizzes {
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
  padding: 15px 20px;
  margin: 10px 0;
  background-color: var(--deep-purple);
  color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quiz-info {
  display: flex;
  flex-direction: column;
}

.quiz-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--primary-color);
}

.quiz-marks {
  font-size: 16px;
  margin-top: 5px;
  color: var(--dark-gray);
}

.quiz-time {
  font-size: 14px;
  color: var(--gray);
}
</style>
