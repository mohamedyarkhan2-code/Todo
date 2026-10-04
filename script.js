const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearButton = document.getElementById("clearButton");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        const taskContent = document.createElement("div");

        taskContent.className = "task-content";

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            toggleTask(task.id);
        });

        const text = document.createElement("span");

        text.className = "task-text";
        text.textContent = task.text;

        taskContent.appendChild(checkbox);
        taskContent.appendChild(text);

        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });

        li.appendChild(taskContent);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateCount();
}

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    displayTasks();

    taskInput.value = "";

    taskInput.focus();
}

function toggleTask(id) {

    tasks.forEach(function(task) {

        if (task.id === id) {
            task.completed = !task.completed;
        }

    });

    saveTasks();

    displayTasks();
}

function deleteTask(id) {

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    saveTasks();

    displayTasks();
}

function clearTasks() {

    if (tasks.length === 0) {
        return;
    }

    tasks = [];

    saveTasks();

    displayTasks();
}

function updateCount() {

    const remaining = tasks.filter(function(task) {
        return !task.completed;
    }).length;

    taskCount.textContent =
        remaining + (remaining === 1 ? " task remaining" : " tasks remaining");
}

addButton.addEventListener("click", addTask);

clearButton.addEventListener("click", clearTasks);

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

displayTasks();