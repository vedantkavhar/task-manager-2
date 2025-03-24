// Select elements
const taskNameInput = document.getElementById("taskName");
const taskDescInput = document.getElementById("taskDescription");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter button");

// Get tasks from local storage or set an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks(filter = "all") {
    taskList.innerHTML = "";
    
    let filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task" + (task.completed ? " completed" : "");
        li.innerHTML = `
            <span>${task.name}: ${task.description}</span>
            <button onclick="toggleTask(${index})">✔</button>
            <button onclick="editTask(${index})">✏</button>
            <button onclick="deleteTask(${index})">❌</button>
        `;
        taskList.appendChild(li);
    });
}

// Function to add a task
function addTask() {
    const name = taskNameInput.value.trim();
    const description = taskDescInput.value.trim();
    if (!name) return alert("Task name cannot be empty!");

    tasks.push({
        name: name,
        description: description,
        completed: false
    });

    saveTasks();
    renderTasks();
    taskNameInput.value = "";
    taskDescInput.value = "";
}

// Function to toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Function to edit a task
function editTask(index) {
    taskNameInput.value = tasks[index].name;
    taskDescInput.value = tasks[index].description;
    deleteTask(index);
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Event listeners for adding tasks and filtering
addTaskBtn.addEventListener("click", addTask);

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        renderTasks(btn.id.replace("filter", "").toLowerCase());
    });
});

// Initial render
renderTasks();