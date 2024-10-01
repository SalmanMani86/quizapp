<!-- <template>
    <div class="container-fluid dashboard-container">
        <div class="row no-gutters">
            <aside class="col-12 col-md-3 col-lg-2 sidebar">
                <ul>
                    <li><button @click="goToAddManager">Add Managers</button></li>
                    <li><button @click="goToViewStudents">Student Requests</button></li>
                    <li><button @click="goToAssignQuizzes">Assign Quizzes</button></li>
                    <li><button @click="goToViewQuizzes">View All Quizzes</button></li>
                    <li><button @click="goToQuizResults">View Quiz Results</button></li>
                    <li><button @click="goToStudentDetails">View Student Details</button></li>
                    <li><button @click="goToStudentQuizzes">Assigned Quizzes</button></li>
                    <li><button @click="goToPendingQuizzes">Pending Quizzes</button></li>
                    <li><button @click="goToAttemptedQuizzes">Attempted Quizzes</button></li>
                </ul>
            </aside>

            <main class="col-12 col-md-9 col-lg-10 main-content">
                <h1>Greetings! What would you like to do today?</h1>
                <div v-if="!selectedComponent" class="placeholder">
                    <p>Please select an option from the sidebar to get started.</p>
                </div>
                <component v-else :is="selectedComponent" />
            </main>
        </div>
    </div>
</template>

<style scoped>
html, body {
    height: 100%;
    margin: 0;
}

.dashboard-container {
    height: 100vh; 
}

.sidebar {
    background-color: var(--black);
    padding: 15px;
    position: sticky; 
    top: 0; 
    height: 100vh; 
}

.sidebar ul {
    padding: 0; 
    margin: 0;
}

.main-content {
    padding: 15px;
    display: flex; 
    flex-direction: column; 
    height: 100vh; /* Ensure main content takes full height */
}

.placeholder {
    flex: 1; 
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0; 
    color: #333; 
    text-align: center;
    border: 1px dashed #ccc; 
}

ul li {
    list-style: none;
}

button {
    width: 100%;
    margin: 5px 0;
    padding: 10px;
    background-color: var(--black);
    color: white; 
    border: none;
    cursor: pointer;
    transition: background-color 0.3s; 
}

button:hover {
    background-color: var(--deep-purple);
}

@media (max-width: 768px) {
    .sidebar {
        width: 100%; /* Full width for sidebar on smaller screens */
        height: 100vh; /* Ensure sidebar is full height */
    }
    .main-content {
        display: none; /* Hide main content on smaller screens */
    }
}
</style> -->
