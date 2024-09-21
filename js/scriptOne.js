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
}