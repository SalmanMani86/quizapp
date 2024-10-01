<template>
    <div class="assigned-quizzes">
      <h1>Assigned Quizzes</h1>
      <div class="quiz-list-container">
        <ul v-if="assignedQuizzes.length" class="quiz-list">
          <li v-for="assignment in assignedQuizzes" :key="assignment.id" class="quiz-item">
            <span class="student-name">{{ assignment.student.name }}</span>
            <span class="quiz-title">{{ assignment.quiz.title }}</span>
            <span class="quiz-date">Assigned On: {{ assignment.assignedOn }}</span>
          </li>
        </ul>
        <p v-else>No quizzes assigned yet</p>
      </div>
    </div>
  </template>
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const assignedQuizzes = ref([
        { id: 1, student: { name: 'John Doe' }, quiz: { title: 'JavaScript Basics' }, assignedOn: '2024-09-25' },
        { id: 2, student: { name: 'Jane Smith' }, quiz: { title: 'HTML & CSS Fundamentals' }, assignedOn: '2024-09-24' },
        { id: 3, student: { name: 'Alice Johnson' }, quiz: { title: 'Vue.js Essentials' }, assignedOn: '2024-09-23' },
        { id: 4, student: { name: 'Bob Brown' }, quiz: { title: 'Node.js API Development' }, assignedOn: '2024-09-22' },
      ]);
  
      return {
        assignedQuizzes,
      };
    },
  };
  </script>
  
  <style scoped>
  .assigned-quizzes {
    width: 100%;
    padding: 20px;
    background-color: var(--white);
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: var(--deep-purple);
  }
  
  .quiz-list-container {
    margin-top: 20px;
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
    color: white;
    border-radius: 5px;
  }
  
  .student-name {
    font-weight: bold;
  }
  
  .quiz-title {
    font-weight: normal;
    flex-grow: 1;
    margin: 0 15px;
  }
  
  .quiz-date {
    color: white;
  }
  </style>
  