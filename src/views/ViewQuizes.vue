<template>
    <div class="all-quizzes">
      <h1>All Quizzes</h1>
      <ul class="quiz-list">
        <li v-for="quiz in quizzes" :key="quiz.id" class="quiz-item" @click="openModal(quiz)">
          <span class="quiz-title">{{ quiz.title }}</span>
          <span class="quiz-date">Published On: {{ quiz.publishedOn }}</span>
        </li>
      </ul>
  
      <!-- Modal Component for viewing Quiz Details -->
      <quiz-modal v-if="showModal" :quiz="selectedQuiz" @close="closeModal" />
    </div>
  </template>
  
  <script>
  import QuizModal from '@/components/Modal.vue';
  import { ref } from 'vue';
  
  export default {
    components: {
      QuizModal,
    },
    setup() {
      const quizzes = ref([
        {
          id: 1,
          title: 'JavaScript Basics',
          publishedOn: '2024-09-20',
          questions: [
            {
              text: 'What is a closure?',
              options: [
                { text: 'A function with preserved data' },
                { text: 'An HTML element' },
                { text: 'A CSS property' },
                { text: 'None of the above' },
              ],
              correctAnswer: 0,
            },
            {
              text: 'What is "this" in JavaScript?',
              options: [
                { text: 'A keyword' },
                { text: 'A variable' },
                { text: 'A function' },
                { text: 'An object' },
              ],
              correctAnswer: 0,
            },
          ],
        },
        {
          id: 2,
          title: 'Vue.js Essentials',
          publishedOn: '2024-09-22',
          questions: [
            {
              text: 'What is a Vue directive?',
              options: [
                { text: 'A special token for binding' },
                { text: 'A data property' },
                { text: 'A CSS class' },
                { text: 'An event listener' },
              ],
              correctAnswer: 0,
            },
          ],
        },
        // Add more quizzes as needed
      ]);
  
      const showModal = ref(false);
      const selectedQuiz = ref(null);
  
      const openModal = (quiz) => {
        selectedQuiz.value = quiz;
        showModal.value = true;
      };
  
      const closeModal = () => {
        showModal.value = false;
      };
  
      return {
        quizzes,
        showModal,
        selectedQuiz,
        openModal,
        closeModal,
      };
    },
  };
  </script>
  
  <style scoped>
  .all-quizzes {
    background-color: var(--white);
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    color: var(--deep-purple);
  }
  
  .quiz-list {
    list-style-type: none;
    padding: 0;
  }
  
  .quiz-item {
    padding: 15px;
    margin: 10px 0;
    background-color: var(--light-grey);
    color: var(--black);
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  
  .quiz-item:hover {
    background-color: var(--deep-purple);
    color: var(--white);
  }
  
  .quiz-title {
    font-weight: bold;
  }
  
  .quiz-date {
    color: var(--deep-purple);
  }
  </style>
  