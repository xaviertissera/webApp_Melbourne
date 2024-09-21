// Load tasks when the window loads
window.onload = function() {
    loadTasks();
};

// Function to load tasks from localStorage when the page loads
function loadTasks() {
    try {
        let savedTasks = JSON.parse(localStorage.getItem('tasks'));

        if (savedTasks && Array.isArray(savedTasks)) {
            let taskList = document.getElementById('taskList');
            taskList.innerHTML = "";  // Clear any existing tasks
        }

        savedTasks.forEach(task => {
            let taskItem = createTaskElement(task.text, task.priority, task.category, task.date, task.reminder, task.completed);
            taskList.appendChild(taskItem);
        });

    } catch (error) {
        console.error("Failed to load tasks:", error);
    }
}

// Function to create task element
function createTaskElement(taskText, priority, category, date, reminder, isCompleted = false) {
    let li = document.createElement('li');
    li.className = `${priority}-priority ${category}-category`;

    li.setAttribute('data-reminder', reminder);  // Add reminder attribute
    li.setAttribute('data-category', category);  // Add category attribute
    
    li.innerHTML = `
        <span style="text-decoration: ${isCompleted ? 'line-through' : 'none'};">${taskText}</span> - <small>Due: ${new Date(date).toLocaleDateString()}</small>
        <div>
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="complete-btn" onclick="completeTask(this)">Complete</button>
            <button class="remove-btn" onclick="removeTask(this)">Remove</button>
        </div>
    `;
    return li;
}

