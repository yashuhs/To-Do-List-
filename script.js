document.addEventListener('DOMContentLoaded', function () {
  showClock();
  showTasks();
});

function showClock() {
  const clockElement = document.getElementById('clock');

  function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toDateString();
    clockElement.textContent = `${dateString} ${timeString}`;
  }

  setInterval(updateClock, 1000);
  updateClock();
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const taskList = document.getElementById('taskList');

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <span>${taskText}</span>
      <button onclick="completeTask(this)">Complete</button>
      <button onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(taskItem);
    taskInput.value = '';
    saveTasks();
  }
}

function completeTask(button) {
  const taskItem = button.parentElement;
  taskItem.classList.toggle('completed');
  saveTasks();
}

function deleteTask(button) {
  const taskItem = button.parentElement;
  taskItem.remove();
  saveTasks();
}

function saveTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = [];

  for (const taskItem of taskList.children) {
    const taskText = taskItem.querySelector('span').textContent;
    const isCompleted = taskItem.classList.contains('completed');
    tasks.push({ text: taskText, completed: isCompleted });
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  for (const task of tasks) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <span>${task.text}</span>
      <button onclick="completeTask(this)" ${task.completed ? 'disabled' : ''}>Complete</button>
      <button onclick="deleteTask(this)">Delete</button>
    `;

    if (task.completed) {
      taskItem.classList.add('completed');
    }

    taskList.appendChild(taskItem);
  }
}
