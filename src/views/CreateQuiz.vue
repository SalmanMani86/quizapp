<template>
    <div class="quiz-container">
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
              <span class="correct-label">Correct Answer</span>
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
        <div v-for="quiz in quizzes" :key="quiz.id" class="quiz-card" @click="toggleQuizDetails(quiz)">
          <h3>{{ quiz.title }}</h3>
          <p>{{ quiz.description || 'No description available.' }}</p>
          <div v-if="quiz.showDetails" class="quiz-details">
            <div v-for="(question, index) in quiz.questions" :key="index" class="question-item">
              <p><strong>Question {{ index + 1 }}:</strong> {{ question.question_text }}</p>
              <ul>
                <li v-for="(option, oIndex) in question.options" :key="oIndex">
                  {{ option.text }} <span v-if="oIndex === question.correctAnswer">(Correct)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import ApiServices from '@/services/ApiServices';
  
  export default {
    setup() {
      const quizTitle = ref('');
      const questions = ref([{ text: '', options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }], correctAnswer: null }]);
      const quizzes = ref([]);
  
      const fetchQuizzes = async () => {
  try {
    const response = await ApiServices.GetRequest('/all-quizzes');
    quizzes.value = response.quizzes.map(quiz => ({
      ...quiz,
      questions: quiz.questions.map(question => ({
        ...question,
        options: JSON.parse(question.options) // Parse the options string to an array
      })),
      showDetails: false,
    }));
  } catch (error) {
    console.error('Error fetching quizzes:', error);
  }
};
  
      onMounted(() => {
        fetchQuizzes();
      });
  
      const toggleQuizDetails = (quiz) => {
        quiz.showDetails = !quiz.showDetails;
      };
  
      const addQuestion = () => {
        questions.value.push({ text: '', options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }], correctAnswer: null });
      };
  
      const submitQuiz = async () => {
        const quizData = {
          title: quizTitle.value,
          description: "salman",
          questions: questions.value.map((q) => ({
            question: q.text,
            options: q.options.map((o) => o.text),
            correct_answer: q.options[q.correctAnswer].text,
          })),
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
        questions.value = [{ text: '', options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }], correctAnswer: null }];
      };
  
      return {
        quizTitle,
        questions,
        quizzes,
        addQuestion,
        submitQuiz,
        toggleQuizDetails,
      };
    },
  };
  </script>
  
  <style scoped>
  .quiz-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    /* margin: 20px auto; */
  }
  
  .quiz-creator,
  .quiz-list {
    background: #ffffff;
    padding: 20px;
    margin-right: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 50%; /* Increased width for quiz creator and list */
  }
  
  h1,
  h2 {
    color: #3d0f3a;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type='text'] {
    width: 100%;
    padding: 8px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
  }
  
  .correct-label {
    margin-left: 10px;
    font-size: 0.9em;
    color: #28a745;
  }
  
  button {
    background-color: #3d0f3a;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
  }
  
  button:hover {
    background-color: #6a0f3a;
  }
  
  .quiz-card {
    padding: 15px;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    margin: 10px 0;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .quiz-card:hover {
    background: #f5f5f5;
  }
  
  .quiz-details {
    margin-top: 10px;
  }
  
  .question-item {
    margin-bottom: 10px;
  }
  
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  @media (max-width: 768px) {
    .quiz-creator,
    .quiz-list {
      width: 100%; /* Full width on small screens */
      margin: 10px 0;
    }
  }
  </style>
  