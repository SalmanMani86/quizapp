<template>
    <div class="quiz-app">
      <!-- Show the quiz list if no quiz is selected -->
      <div v-if="!isQuizSelected && !quizSubmitted">
        <h1>Available Quizzes</h1>
        <ul class="quiz-list">
          <!-- Only display quizzes that have not been attempted -->
          <li v-for="quiz in availableQuizzes" :key="quiz.id" class="quiz-item">
            {{ quiz.title }}
            <button @click="attemptQuiz(quiz.id)" class="quiz-button">Attempt Quiz</button>
          </li>
        </ul>
      </div>
      <!-- Quiz Attempt Section -->
      <div v-if="isQuizSelected && !quizSubmitted" class="quiz-container">
        <!-- Quiz Video and Mic Recording Section -->
        <div v-if="stream && isVideoOn" class="video-container">
          <video ref="videoElement" autoplay></video>
        </div>
        <div class="quiz-header">
          <h2>{{ currentQuiz.title }}</h2>
          <p>Total Questions: {{ currentQuiz.questions.length }}</p>
        </div>
        <div v-if="currentQuestion" class="question-container">
          <h3>{{ currentQuestion.text }}</h3>
          <div class="options-container">
            <div v-for="(option, index) in currentQuestion.options" :key="index" class="option">
              <label>
                <input
                  type="radio"
                  :name="'question' + currentQuestionIndex"
                  :value="index"
                  v-model="answers[currentQuestionIndex]"
                />
                {{ option.text }}
              </label>
            </div>
          </div>
  
          <div class="navigation-buttons">
            <button v-if="store.permissions.includes('user can delete users')" @click="prevQuestion" :disabled="currentQuestionIndex === 0">
              Previous
            </button>
            <button
              v-if="!isLastQuestion"
              @click="nextQuestion"
              :disabled="answers[currentQuestionIndex] === null"
            >
              Next
            </button>
            <button v-else @click="submitQuiz">
              Submit
            </button>
          </div>
        </div>
      </div>
  
      <!-- Quiz Result Section -->
      <div v-if="quizSubmitted" class="result-container">
        <div class="confetti"></div> <!-- Confetti effect -->
        <h1 class="result-header">🎉 Quiz Completed! 🎉</h1>
        <p class="result-score">Your Score: {{ score }} / {{ currentQuiz.questions.length }}</p>
        <p class="result-message">Thank you for completing the quiz!</p>
        <button @click="restartQuiz" class="quiz-button">Go Back to Quizzes</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import ApiServices from '@/services/ApiServices';
import store from '@/store';
  
  export default {
    setup() {
      const quizzes = ref([]);
      const currentQuiz = ref({ title: '', questions: [] });
      const currentQuestionIndex = ref(0);
      const answers = ref([]);
      const currentQuestion = computed(() => currentQuiz.value.questions[currentQuestionIndex.value]);
      const isLastQuestion = computed(() => currentQuestionIndex.value === currentQuiz.value.questions.length - 1);
      const isQuizSelected = ref(false);
      const quizSubmitted = ref(false);
      const score = ref(0);
      const isVideoOn = ref(false); // Track if the video is enabled
  
      // Track attempted quizzes (can use localStorage for persistence)
      const attemptedQuizzes = ref(JSON.parse(localStorage.getItem('attemptedQuizzes') || '[]'));
  
      // Stream variables
      const stream = ref(null);
      const videoElement = ref(null);
  
      // Fetch all quizzes from the API
      const fetchQuizzes = async () => {
        try {
          const data = await ApiServices.GetRequest('/quizzes');
          quizzes.value = Array.isArray(data) ? data : Object.values(data);
          console.log(typeof(quizzes));
        } catch (error) {
          console.error('Failed to fetch quizzes:', error);
        }
      };
  
      // Filter quizzes that haven't been attempted yet
      const availableQuizzes = computed(() => {
        return quizzes.value.filter(quiz => !attemptedQuizzes.value.includes(quiz.id));
      });
      // Fetch a specific quiz and start attempting it
      const attemptQuiz = async (quizId) => {
        try {
          const data = await ApiServices.GetRequest(`/quizzes/${quizId}`);
          currentQuiz.value = data;
          answers.value = new Array(data.questions.length).fill(null);
          isQuizSelected.value = true;
          startVideoRecording(); // Start video and mic recording
        } catch (error) {
          console.error('Failed to fetch quiz data:', error);
        }
      };
      const nextQuestion = () => {
        if (currentQuestionIndex.value < currentQuiz.value.questions.length - 1) {
          currentQuestionIndex.value++;
        }
      };
      const prevQuestion = () => {
        if (currentQuestionIndex.value > 0) {
          currentQuestionIndex.value--;
        }
      };
      const submitQuiz = () => {
        let calculatedScore = 0;
        currentQuiz.value.questions.forEach((question, index) => {
          if (answers.value[index] === question.correctAnswer) {
            calculatedScore++;
          }
        });
        score.value = calculatedScore;
        quizSubmitted.value = true;
        stopVideoRecording(); // Stop recording on quiz submission
  
        // Save this quiz to attempted quizzes
        if (!attemptedQuizzes.value.includes(currentQuiz.value.id)) {
          attemptedQuizzes.value.push(currentQuiz.value.id);
          localStorage.setItem('attemptedQuizzes', JSON.stringify(attemptedQuizzes.value));
        }
      };
  
      const restartQuiz = () => {
        isQuizSelected.value = false;
        quizSubmitted.value = false;
        currentQuestionIndex.value = 0;
      };
      // Start video recording function
      const startVideoRecording = async () => {
        try {
          stream.value = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          videoElement.value.srcObject = stream.value;
          isVideoOn.value = true;
        } catch (error) {
          console.error('Failed to access camera and mic:', error);
          isVideoOn.value = false; // Set video off if there is an error
        }
      };
      // Stop video recording function
      const stopVideoRecording = () => {
        if (stream.value) {
          const tracks = stream.value.getTracks();
          tracks.forEach(track => track.stop());
          stream.value = null;
          isVideoOn.value = false; // Hide video when stopped
        }
      };
      onMounted(() => {
        fetchQuizzes();
      });
  
      return {
        quizzes,
        currentQuiz,
        currentQuestion,
        currentQuestionIndex,
        answers,
        isQuizSelected,
        nextQuestion,
        prevQuestion,
        isLastQuestion,
        attemptQuiz,
        submitQuiz,
        quizSubmitted,
        score,
        restartQuiz,
        videoElement,
        stream,
        isVideoOn,
        availableQuizzes, // Use computed value to filter available quizzes
      };
    },
  };
  </script>
  
  
  <style scoped>
  
  .quiz-app {
    background-color: var(--light-grey);
    color: var(--black);
    padding: 20px;
    border-radius: 10px;
    max-width: 700px;
    margin: auto;
   
    
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
    background-color: var(--white);
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .quiz-button {
    background-color: var(--black);
    color: var(--white);
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .quiz-button:hover {
    background-color: var(--deep-purple);
  }
  
  .quiz-container {
    background-color: var(--white);
    padding: 20px;
    border-radius: 10px;
    min-width: 500px;
    max-width: 700px;
    width: 100%;
    margin-top: -50px;
    margin-left: 50px;
  }
  
  .video-container {
    margin-bottom: 20px;
    text-align: center;
  }
  
  video {
    width: 100%;
    max-width: 600px;
    border-radius: 10px;
  }
  
  .quiz-header {
    background-color: var(--deep-purple);
    color: var(--white);
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 20px;
    
  }
  
  .question-container {
    padding: 20px;
    background-color: var(--light-grey);
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
  }
  
  h3 {
    color: var(--deep-purple);
  }
  
  .options-container {
    margin-top: 15px;
  }
  
  .option {
    padding: 10px;
    background-color: #f0f0f0;
    margin: 10px 0;
    border-radius: 5px;
  }
  
  .navigation-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  button {
    background-color: var(--deep-purple);
    color: var(--white);
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: var(--black);
    cursor: not-allowed;
  }
.result-container {
  background-color: var(--white);
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  position: relative;
  overflow: hidden;
  margin-left: 100px;
}
.result-header {
  font-size: 2.2em;
  font-weight: bold;
  color: var(--deep-purple);
  animation: pop-in 0.8s ease-in-out;
}

.result-score {
  font-size: 1.5em;
  margin: 10px 0;
  font-weight: bold;
  color: #2d2d2d;
  animation: fade-in 1s ease-in-out;
}

.result-message {
  font-size: 1.2em;
  margin-bottom: 20px;
  animation: fade-in 1.2s ease-in-out;
}

.confetti {
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  height: 100%;
  background: url('https://cdn.pixabay.com/photo/2013/07/13/12/07/confetti-159879_960_720.png') no-repeat center;
  background-size: cover;
  opacity: 0.5;
  animation: confetti-animation 1.5s ease-in-out;
}

@keyframes pop-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes confetti-animation {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 0.7;
  }
}

  </style>
  