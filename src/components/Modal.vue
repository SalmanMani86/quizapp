<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <h3>{{ quiz.title }}</h3>
        <div v-for="(question, index) in quiz.questions" :key="index" class="question-item">
          <p>Question {{ index + 1 }}: {{ question.text }}</p>
          <ul>
            <li v-for="(option, oIndex) in question.options" :key="oIndex">
              {{ option.text }} <span v-if="oIndex === question.correctAnswer">(Correct)</span>
            </li>
          </ul>
        </div>
        <button @click="close">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      quiz: Object
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    max-width: 500px;
    width: 100%;
  }
  
  button {
    margin-top: 20px;
  }
  </style>
  