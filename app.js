// Defines UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Loads all event listeners
loadEventListeners();

// Loads all event Listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)
    // Adds task event
    form.addEventListener('submit', addTask);
    // Removes task event
    taskList.addEventListener('click', removeTask);
    // Clears task event
    clearBtn.addEventListener('click', clearTasks);
    // Filters tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Gets Tasks from Local Storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        taskList.appendChild(li);

    })
}

// Adds Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }

    // Creates li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    taskList.appendChild(li);

    // Stores in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clears input
    taskInput.value = '';
    e.preventDefault();
}

// Stores Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Removes Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
            e.target.parentElement.parentElement.remove();
            
            // Removes from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Removes from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clears Task
function clearTasks() {
    taskList.innerHTML = '';

    clearTasksFromLocalStorage();
}

// Clears Tasks from Local Storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filters Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}