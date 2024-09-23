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

// Function to edit a task
function editTask(button) {
    let taskItem = button.parentElement.parentElement;
    let taskSpan = taskItem.querySelector('span');
    let taskText = taskSpan.textContent;

    let newTaskText = prompt("Edit task:", taskText);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        taskSpan.textContent = newTaskText.trim();
        saveTasks();  // Save after editing
    }
}



// Function to mark a task as complete/incomplete
function completeTask(button) {
    let taskItem = button.parentElement.parentElement;
    let taskSpan = taskItem.querySelector('span');

    if (taskSpan.style.textDecoration === "line-through") {
        taskSpan.style.textDecoration = "none";
    } else {
        taskSpan.style.textDecoration = "line-through";
    }
    saveTasks();  // Save after marking complete/incomplete
}

// Function to remove a task
function removeTask(button) {
    let taskItem = button.parentElement.parentElement;
    taskItem.style.opacity = 0;
    setTimeout(() => {
        taskItem.remove();
        saveTasks();
        updateProgressBar();
    }, 300);  // Wait 300ms before removing the task
}

// Function to update the progress bar
function updateProgressBar() {
    let taskListItems = document.querySelectorAll('#taskList li');
    let totalTasks = taskListItems.length;
    let completedTasks = Array.from(taskListItems).filter(item => 
        item.querySelector('span').style.textDecoration === 'line-through'
    ).length;
    let progress = (completedTasks / totalTasks) * 100;
    document.querySelector('.progress-bar').style.width = progress + '%';
}

window.onload = function() {
    loadTasks();
    document.getElementById('categoryFilter').addEventListener('change', filterTasks);
    document.getElementById('taskInput').addEventListener('input', updateAddButtonState);
};
