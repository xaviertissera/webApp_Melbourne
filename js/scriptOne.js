// Function to add a task
function addTask() {
    let taskInputElement = document.getElementById('taskInput');
    let taskInput = taskInputElement.value.trim();
    let taskDate = document.getElementById('taskDate').value;
    let taskPriority = document.getElementById('taskPriority').value;
    let taskReminder = document.getElementById('taskReminder').value;
    let taskCategory = document.getElementById('taskCategory').value;

    // Validation: Ensure task and date are provided
    if (taskInput === "" || taskDate === "") {
        alert("Please enter a task and a due date.");
        return;
    }

    // Add task to list
    let taskList = document.getElementById('taskList');
    let li = document.createElement('li');
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
    let taskDueDate = new Date(taskDate);
    let now = new Date();
    let timeDiff = taskDueDate - now;

    // Convert reminder value to milliseconds
    let reminderTime = getReminderTime(taskReminder);
    if (reminderTime > 0) {
        let reminderTimeDiff = timeDiff - reminderTime;
        if (reminderTimeDiff > 0) {
            setTimeout(() => {
                alert(`Reminder: Task "${taskInput}" is due soon!`);
            }, reminderTimeDiff);
        }
    }
    
     // Clear input fields after adding task
     taskInputElement.value = "";
     document.getElementById('taskDate').value = "";
     document.getElementById('taskPriority').value = "low"; // Reset priority
     document.getElementById('taskReminder').value = "none"; // Reset reminder
     document.getElementById('taskCategory').value = "work"; // Reset category
     
}

// Function to save tasks to localStorage
function saveTasks() {
    let tasks = [];
    let taskListItems = document.getElementById('taskList').children;

    // Collect task data for saving
    for (let taskItem of taskListItems) {
        let taskText = taskItem.querySelector('span').textContent;
        let taskPriority = taskItem.className.split(' ')[0]; // Extract priority class
        let taskReminder = taskItem.getAttribute('data-reminder'); // Get reminder
        let taskCategory = taskItem.getAttribute('data-category'); // Get category
        let isCompleted = taskItem.querySelector('span').style.textDecoration === "line-through";
        let taskDate = taskItem.querySelector('small').textContent.replace('Due: ', '');
        tasks.push({ text: taskText, priority: taskPriority, reminder: taskReminder, category: taskCategory, completed: isCompleted, date: new Date(taskDate).toISOString().split('T')[0] });
    }

    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}