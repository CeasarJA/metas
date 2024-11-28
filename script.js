// DOM Elements
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add a new task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value; // Get date in YYYY-MM-DD format

  if (!taskText || !taskDate) {
    alert("Por favor, preencha a meta e a data!");
    return;
  }

  const task = { text: taskText, date: taskDate };

  addTaskToDOM(task);
  saveTaskToLocalStorage(task);

  taskInput.value = ""; // Clear inputs
  dateInput.value = "";
});

// Add task to DOM
function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";

  li.innerHTML = `
    <div>
      <strong>${task.text}</strong>
      <small class="text-muted"> - ${formatDate(task.date)}</small>
    </div>
    <button class="btn btn-danger btn-sm">Remover</button>
  `;

  // Add event listener for removal
  li.querySelector("button").addEventListener("click", () => {
    removeTaskFromDOM(li);
    removeTaskFromLocalStorage(task);
  });

  taskList.appendChild(li);
}

// Format date to a readable format
function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  const date = new Date(year, month - 1, day);

  const options = { day: "2-digit", month: "long", year: "numeric" };
  return date.toLocaleDateString("pt-BR", options);
}

// Remove task from DOM
function removeTaskFromDOM(taskElement) {
  taskList.removeChild(taskElement);
}

// Save task to LocalStorage
function saveTaskToLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task from LocalStorage
function removeTaskFromLocalStorage(task) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(
    (t) => t.text !== task.text || t.date !== task.date
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get all tasks from LocalStorage
function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Load tasks into DOM from LocalStorage
function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => addTaskToDOM(task));
}
