// Function to add a task
function addTask() {
    const taskInputElement = document.getElementById('taskInput');
    const taskInput = taskInputElement.value.trim();
    const taskDate = document.getElementById('taskDate').value;
    const taskPriority = document.getElementById('taskPriority').value;
    const taskReminder = document.getElementById('taskReminder').value;
    const taskCategory = document.getElementById('taskCategory').value;

    // Validation: Ensure task and date are provided
    if (!taskInput || !taskDate) {
        alert("Please enter a task and a due date.");
        return;
    }

    // Create task element
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = `${taskPriority}-priority ${taskCategory}-category`; // Set class based on priority and category
    li.setAttribute('data-category', taskCategory); // Store category in data attribute
    li.setAttribute('data-reminder', taskReminder); // Store reminder in data attribute
    li.innerHTML = `
        <span>${taskInput}</span> - <small>Due: ${new Date(taskDate).toLocaleDateString()}</small>
        <div> 
            <button class="edit-btn" aria-label="Edit task" onclick="editTask(this)">Edit</button>
            <button class="complete-btn" aria-label="Mark task as complete" onclick="completeTask(this)">Complete</button>
            <button class="remove-btn" aria-label="Remove task" onclick="removeTask(this)">Remove</button>
        </div>
    `;
    li.style.opacity = 0; // Add fade-in animation
    taskList.appendChild(li);
    setTimeout(() => { li.style.opacity = 1; }, 100);

    // Set a reminder for the task if due date is in the future
    const taskDueDate = new Date(taskDate);
    const now = new Date();
    const timeDiff = taskDueDate - now;

    const reminderTime = getReminderTime(taskReminder);
    if (reminderTime > 0 && timeDiff > reminderTime) {
        setTimeout(() => {
            alert(`Reminder: Task "${taskInput}" is due soon!`);
        }, timeDiff - reminderTime);
    }

    // Clear input fields after adding task
    resetTaskInputFields(taskInputElement);

    // Save tasks to localStorage and update the progress bar
    saveTasks();
    updateProgressBar();
    updateAddButtonState();
}

// Function to reset input fields after adding a task
function resetTaskInputFields(taskInputElement) {
    taskInputElement.value = "";
    document.getElementById('taskDate').value = "";
    document.getElementById('taskPriority').value = "low"; // Reset priority
    document.getElementById('taskReminder').value = "none"; // Reset reminder
    document.getElementById('taskCategory').value = "work"; // Reset category
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    const taskListItems = document.getElementById('taskList').children;

    // Collect task data for saving
    Array.from(taskListItems).forEach(taskItem => {
        const taskText = taskItem.querySelector('span').textContent;
        const taskPriority = taskItem.className.split(' ')[0]; // Extract priority class
        const taskReminder = taskItem.getAttribute('data-reminder'); // Get reminder
        const taskCategory = taskItem.getAttribute('data-category'); // Get category
        const isCompleted = taskItem.querySelector('span').style.textDecoration === "line-through";
        const taskDate = taskItem.querySelector('small').textContent.replace('Due: ', '');
        tasks.push({ 
            text: taskText, 
            priority: taskPriority, 
            reminder: taskReminder, 
            category: taskCategory, 
            completed: isCompleted, 
            date: new Date(taskDate).toISOString().split('T')[0] 
        });
    });

    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to get reminder time in milliseconds
function getReminderTime(reminder) {
    const reminderTimes = {
        '15m': 15 * 60 * 1000,
        '30m': 30 * 60 * 1000,
        '1h': 60 * 60 * 1000,
        '2h': 2 * 60 * 60 * 1000,
        '1d': 24 * 60 * 60 * 1000,
        'none': 0
    };

    return reminderTimes[reminder] || 0;
}
