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
     
}
