<template>
    <div class="quiz-creator-container">
      <div class="columns">
        <div class="quiz-creator">
          <h1>Create a Quiz</h1>
          <form @submit.prevent="submitQuiz">
            <div class="form-group">
              <label for="quizTitle">Quiz Title</label>
              <input v-model="quizTitle" type="text" id="quizTitle" required />
            </div>
            <div v-for="(question, index) in questions" :key="index" class="question">
              <div class="form-group">
                <label :for="'question' + index">Question {{ index + 1 }}</label>
                <input v-model="question.text" type="text" :id="'question' + index" required />
              </div>
              <div v-for="(option, optIndex) in question.options" :key="optIndex" class="form-group option">
                <label :for="'option' + index + optIndex">Option {{ optIndex + 1 }}</label>
                <input v-model="option.text" type="text" :id="'option' + index + optIndex" required />
                <input
                  type="radio"
                  :value="optIndex"
                  v-model="question.correctAnswer"
                  :name="'question' + index"
                  required
                />
                <span>Correct Answer</span>
              </div>
            </div>
            <div class="form-buttons">
              <button type="button" @click="addQuestion">Add Question</button>
              <button type="submit">Submit Quiz</button>
            </div>
          </form>
        </div>
  
        <div class="quiz-list">
          <h2>Your Quizzes</h2>
          <div v-for="quiz in quizzes" :key="quiz.id" class="quiz-card" @click="openModal(quiz)">
            <h3>{{ quiz.title }}</h3>
          </div>
        </div>
      </div>
  
      <modal v-if="selectedQuiz" :quiz="selectedQuiz" @close="selectedQuiz = null"></modal>
    </div>
  </template>
  
  <script>
    import { ref, onMounted } from 'vue';
    import ApiServices from '@/services/ApiServices';
    import Modal from '@/components/Modal.vue';
  
    export default {
      components: {
        Modal
      },
      setup() {
        const quizTitle = ref('');
        const questions = ref([
          {
            text: '',
            options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
            correctAnswer: null,
          }
        ]);
        const quizzes = ref([]);
        const selectedQuiz = ref(null);
        const fetchQuizzes = async () => {
          try {
            const response = await ApiServices.GetRequest('/quizzes');
            quizzes.value = response;
          } catch (error) {
            console.error('Error fetching quizzes:', error);
          }
        };
  
        onMounted(() => {
          fetchQuizzes();
        });
  
        const addQuestion = () => {
          questions.value.push({
            text: '',
            options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
            correctAnswer: null,
          });
        };
  
        const submitQuiz = async () => {
          const quizData = {
            title: quizTitle.value,
            questions: questions.value,
          };
  
          try {
            const response = await ApiServices.PostRequest('/quizzes', quizData);
            console.log('Quiz saved:', response);
            resetForm();
            await fetchQuizzes();
          } catch (error) {
            console.error('Error saving quiz:', error);
          }
        };
  
        const resetForm = () => {
          quizTitle.value = '';
          questions.value = [
            {
              text: '',
              options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
              correctAnswer: null,
            }
          ];
        };
  
        const openModal = (quiz) => {
          selectedQuiz.value = quiz;
        };
  
        return {
          quizTitle,
          questions,
          quizzes,
          selectedQuiz,
          addQuestion,
          submitQuiz,
          openModal
        };
      }
    };
  </script>
  
  <style scoped>
  :root {
    --black: #000000;
    --deep-purple: #481449;
    --light-grey: #E9E9E9;
    --white: #ffffff;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--light-grey);
    color: var(--black);
  }
  
  .quiz-creator-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    max-width: 1300px;
    margin: 20px auto;
  }
  
  .columns {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .quiz-creator,
  .quiz-list {
    background: var(--white);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    flex-basis: 48%;
    margin-right: 10px;
  }
  
  .quiz-list {
    position: sticky;
    top: 20px; /* Keeps it sticky as you scroll */
    max-height: 80vh; /* Limit the height to avoid excessive space */
    overflow-y: auto; /* Scrollable when necessary */
  }
  
  h1, h2 {
    color: var(--deep-purple);
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--light-grey);
    border-radius: 4px;
  }
  
  button {
    background-color: var(--deep-purple);
    color: var(--white);
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
  }
  
  button:hover {
    background-color: #3d0f3a;
  }
  
  .quiz-card {
    padding: 15px;
    border: 1px solid var(--light-grey);
    border-radius: 5px;
    margin: 10px 0;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .quiz-card:hover {
    background: var(--light-grey);
  }
  
  .form-buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  /* Add responsive behavior */
  @media (max-width: 768px) {
    .quiz-creator,
    .quiz-list {
      flex-basis: 100%; /* Full width on small screens */
      margin: 10px 0;
    }
  }
  </style>
  