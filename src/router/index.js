import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FormView from '../views/Form.vue';
import LoginView from '../views/Login.vue';
import DashboardView from '../views/MainDashboard.vue';
import PermissionGuard from '@/services/RouteGuard.js';
import SetPassword from '../views/SetPassword.vue';
import store from '@/store'; // Adjust the path to your store file
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/form',
    name: 'form',
    component: FormView,
    meta: { hideForAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { hideForAuth: true }
  },
  {

    path: '/set-password',
    name: 'setPassword',
    component: SetPassword,
    meta: { hideForAuth: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    children: [
      {
        path: 'student-requests',
        name: 'StudentRequests',
        component: () => import('@/views/StudentRequest.vue'),
        beforeEnter: PermissionGuard('canViewStudents'), 
      },
      {
        path: 'assign-quizzes',
        name: 'AssignQuizes',
        component: () => import('@/views/AssignQuizes.vue'),
        // beforeEnter: PermissionGuard('canViewStudents'), 
      },
      {
        path: 'create-quizzes',
        name: 'CreateQuizzes',
        component: () => import('@/views/CreateQuiz.vue'),
        // beforeEnter: PermissionGuard('canViewStudents'), 
      },
      { 
        path: 'student-assigned-quizzes',
        name: 'StudentAssignQuizes',
        component: () => import('@/views/StudentAssignQuizes.vue'),
        // beforeEnter: PermissionGuard('canViewStudents'), 
      },
      {
        path: 'view-assigned-quizzes',
        name: 'ViewStudentAssignQuizes',
        component: () => import('@/views/ViewAssignQuizes.vue'),
        // beforeEnter: PermissionGuard('canViewStudents'), 
      },
      {
        path: 'student-attempted-quizzes',
        name: 'StudentAttemptedQuize',
        component: () => import('@/views/StudentAttemptedQuizes.vue'),
        // beforeEnter: PermissionGuard('canViewStudents'), 
      },
      {
        path: 'student-pending-quizzes',
        name: 'StudentPendingQuizes',
        component: () => import('@/views/StudentPendingQuizes.vue'),
        // beforeEnter: PermissionGuard('canViewStudents'), 
      },
      {
        path: 'student-quiz-results',
        name: 'StudentQuizResults',
        component: () => import('@/views/StudentQuizResults.vue'),
        // beforeEnter: PermissionGuard('canViewStudents'), 
      },
      {
        path: 'add-manager',
        name: 'AddManager',
        component: () => import('@/views/AddManager.vue'),
      },
      {
        path: 'quiz-results',
        name: 'QuizResults',
        component: () => import('@/views/QuizResults.vue'),
      },
     
      {
        path: 'view-quizzes',
        name: 'ViewQuizes',
        component: () => import('@/views/ViewQuizes.vue'),
      },
      
    ]
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
