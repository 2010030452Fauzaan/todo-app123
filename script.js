const API_URL = 'http://localhost:3000/tasks';

// Select elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Load tasks from the server on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event listener
addTaskBtn.addEventListener('click', addTask);

// Function to load tasks from the server
async function loadTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    taskList.innerHTML = ''; // Clear existing tasks
    tasks.forEach(task => renderTask(task.text, task.completed));
}

// Function to add a task
async function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const newTask = { text: taskText, completed: false };
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
    });

    renderTask(taskText, false);
    taskInput.value = '';
}

// Function to render a task
function renderTask(taskText, isCompleted) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    if (isCompleted) {
        taskItem.classList.add('completed');
    }

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;

    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions';

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.className = 'complete-btn';
    completeBtn.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
    });

    taskActions.appendChild(completeBtn);

    taskItem.appendChild(taskContent);
    taskItem.appendChild(taskActions);

    taskList.appendChild(taskItem);
}

// Function to clear all tasks
async function clearTasks() {
    await fetch(API_URL, { method: 'DELETE' });
    taskList.innerHTML = '';
}
