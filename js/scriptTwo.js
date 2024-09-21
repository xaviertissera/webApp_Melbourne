// Load tasks when the window loads
window.onload = function() {
    loadTasks();
};

function loadTasks() {
    try {
        let savedTasks = JSON.parse(localStorage.getItem('tasks'));

        if (savedTasks && Array.isArray(savedTasks)) {
            let taskList = document.getElementById('taskList');
            taskList.innerHTML = "";  // Clear any existing tasks
        }
    } catch (error) {
        console.error("Failed to load tasks:", error);
    }
}
