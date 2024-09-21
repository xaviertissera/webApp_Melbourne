// Load tasks when the window loads
window.onload = function() {
    loadTasks();
};

// Function to load tasks from localStorage when the page loads
function loadTasks() {
    try {
        let savedTasks = JSON.parse(localStorage.getItem('tasks'));
        console.log("Tasks loaded successfully.");
    } catch (error) {
        console.error("Failed to load tasks:", error);
    }
}


// Function to load tasks from localStorage when the page loads
function loadTasks() {
    console.log("Loading tasks...");
}