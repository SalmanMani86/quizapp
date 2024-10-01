<template>
  <div class="quiz-app">
    <!-- Show the quiz list if no quiz is selected -->
    <div v-if="!isQuizSelected && !quizSubmitted">
      <h1 class="heading">Available Quizzes</h1>
      <ul class="quiz-list">
        <li v-for="quiz in availableQuizzes" :key="quiz.id" class="quiz-item">
          {{ quiz.quiz.title }}
          <button @click="checkPermissions(quiz.quiz_id)" class="quiz-button">Attempt Quiz</button>
        </li>

      </ul>
    </div>

    <!-- Quiz Attempt Section -->
    <div v-if="isQuizSelected && !quizSubmitted" class="quiz-container">
      <div class="quiz-header">
        <h2>{{ currentQuiz.title }}</h2>
        <p>Total Questions: {{ currentQuiz.questions.length }}</p>
      </div>
      <div v-if="currentQuestion" class="question-container">
        <h3>{{ currentQuestion.question }}</h3>
        <div class="options-container">
          <div v-for="(option, index) in currentQuestion.options" :key="index" class="option">
            <label>
              <input
                type="radio"
                :name="'question' + currentQuestionIndex"
                :value="index"
                v-model="answers[currentQuestionIndex]"
              />
              {{ option }}
            </label>
          </div>
        </div>

        <div class="navigation-buttons">
          <button v-if="currentQuestionIndex > 0" @click="prevQuestion">Previous</button>
          <button v-if="!isLastQuestion" @click="nextQuestion" :disabled="answers[currentQuestionIndex] === undefined">Next</button>
          <button v-else @click="submitQuiz">Submit</button>
        </div>
      </div>
   <!-- <div class="video-container">
        <video ref="video" :srcObject="stream" autoplay playsinline></video>
      </div> -->
    </div>
    <!-- Quiz Result Section -->
    <div v-if="quizSubmitted" class="result-container">
      <h1 class="result-header">🎉 Quiz Completed! 🎉</h1>
      <!-- <p class="result-score">Your Score: {{ score }} / {{ currentQuiz.questions.length }}</p> -->
      <p class="result-message">Thank you for completing the quiz!</p>
      <button @click="restartQuiz" class="quiz-button">Go Back to Quizzes</button>
    </div>
  </div>
</template>
<script>
import { ref, computed, onMounted } from 'vue';
import quizService from '@/services/ApiServices';

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
    const stream = ref(null);
    const mediaRecorder = ref(null);
    const recordedChunks = ref([]);
    const currentQuizId=ref(1);
    const availableQuizzes = computed(() => quizzes.value);

    const fetchAssignedQuizzes = async () => {
      try {
        const response = await quizService.GetRequest('/quizzes/assigned');
        quizzes.value = response;
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    const checkPermissions = async (quizId) => {
      currentQuizId.value=quizId;
      console.log(quizId,"QUiz ID");
      try {
        const response = await quizService.GetRequest(`/quizzes/${quizId}/attempt`);
        currentQuiz.value = {
          title: response.title,
          questions: response.questions.map((q) => ({
            id: q.id,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer
          })),
        };
        isQuizSelected.value = true;

        // Request permissions to record audio and video in the background
        await requestPermissions();
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    const requestPermissions = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        stream.value = mediaStream;

        // Initialize MediaRecorder
        mediaRecorder.value = new MediaRecorder(mediaStream);
        mediaRecorder.value.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunks.value.push(event.data);
          }
        };
        mediaRecorder.value.start();
      } catch (error) {
        console.error('Error accessing media devices:', error);
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
    const submitQuiz = async () => {
  try {
    quizSubmitted.value = true;
    score.value = answers.value.reduce((acc, answer, index) => {
      if (currentQuiz.value.questions[index].correctAnswer === parseInt(answer)) {
        return acc + 1;
      }
      return acc;
    }, 0);

    // Format answers to match the required structure using question IDs
    const formattedAnswers = {};
    answers.value.forEach((answer, index) => {
      const questionId = currentQuiz.value.questions[index].id; // Get the question id
      formattedAnswers[questionId] = currentQuiz.value.questions[index].options[answer]; // Get the selected option text
    });

    // Stop recording
    if (mediaRecorder.value) {
      mediaRecorder.value.stop();
    }

    // Create a Blob from the recorded video chunks
    const videoBlob = new Blob(recordedChunks.value, { type: 'video/webm' });

    
    const formData = new FormData();
    console.log(JSON.stringify(formattedAnswers), "Formatted Answers"); 
    formData.append('answers', JSON.stringify(formattedAnswers)); 
    //  formData.append('video', videoBlob);


    await quizService.PostRequest(`/quizzes/${currentQuizId.value}/submit`, formData);
  } catch (error) {
    console.error('Error submitting quiz:', error);
  }
};

    const restartQuiz = () => {
      quizSubmitted.value = false;
      currentQuestionIndex.value = 0;
      isQuizSelected.value = false;
      answers.value = [];
      recordedChunks.value = [];
      if (stream.value) {
        stream.value.getTracks().forEach(track => track.stop());
        stream.value = null;
      }
    };

    onMounted(() => {
      fetchAssignedQuizzes();
    });

    return {
      quizzes,
      availableQuizzes,
      currentQuiz,
      currentQuestionIndex,
      currentQuestion,
      isLastQuestion,
      isQuizSelected,
      quizSubmitted,
      score,
      answers,
      stream,
      fetchAssignedQuizzes,
      checkPermissions,
      requestPermissions,
      nextQuestion,
      prevQuestion,
      submitQuiz,
      restartQuiz,
    };
  },
};
</script>


  <style scoped>
  .quiz-app {
    width: 100%;
  margin: 8px 0;
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
  
 
  
  .quiz-container {
    background-color: var(--white);
    padding: 20px;
    border-radius: 10px;
    min-width: 200px;
    max-width: 700px;
    width: 80%;
    margin-top: 2px;
    margin-left: 120px;
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
  /* margin: 20px auto; */
  position: relative;
  overflow: hidden;
  margin-left: 200px;
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
  