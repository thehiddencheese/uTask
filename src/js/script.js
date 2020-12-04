// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const newListButton = document.querySelector('.new-list-button');
const taskLists = document.getElementById('task-lists');
const listInput = document.querySelector('.list-input');
const deleteButton = document.querySelector('.delete-button');
const hamburgerMenu = document.querySelector('#hamburger');

// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
newListButton.addEventListener('click', createNewList);
deleteButton.addEventListener('click', deleteList);
taskLists.addEventListener('change', () => {
  clearTodos('todo');
  getTodos();
  showListTitle();
});
hamburgerMenu.addEventListener('click', openCloseMobileMenu);
window.addEventListener('DOMContentLoaded', getTodos);

// Global Variables

let result;

// Functions

// Todo functions

function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();
  // Todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // Add Todo to localStorage
  saveLocalTodo(todoInput.value);
  // Check Mark Button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="lar la-check-square"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  // Trash  Button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="las la-minus-square"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
  // Append To List
  todoList.appendChild(todoDiv);
  // Clear Todo Input Value
  todoInput.value = '';
}

function saveLocalTodo(todo) {
  // Check if thing is already in storage
  let list;
  if (localStorage.getItem(taskLists.value) === null) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem(taskLists.value));
  }
  list.push(todo);
  localStorage.setItem(taskLists.value, JSON.stringify(list));
}

function deleteCheck(event) {
  const item = event.target;
  // Delete Todo
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }

  //Check Mark
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function clearTodos(className) {
  var elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function getTodos() {
  let todos;
  if (localStorage.getItem(taskLists.value) === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(taskLists.value));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="lar la-check-square"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // Trash  Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="las la-minus-square"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // Append To List
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem(taskLists.value) === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(taskLists.value));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem(taskLists.value, JSON.stringify(todos));
}

// List functions

// Creates option in UI
function createNewList(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Creates option element
  const newList = document.createElement('option');
  newList.innerText = listInput.value;
  taskLists.appendChild(newList);
  // Saves to local storage using form input
  saveLocalList(listInput.value);

  // Clear Todo Input Value
  listInput.value = '';
}

function saveLocalList(list) {
  localStorage.setItem(list, JSON.stringify([]));
}

function deleteList(event) {
  localStorage.removeItem(taskLists.value);
  // Refreshes page to remove from drop down menu
  location.reload();
}

function openCloseMobileMenu() {
  let sideBar = document.getElementById('side-bar');
  let mainContent = document.getElementById('main-content');

  if (sideBar.classList.contains('side-bar-closed')) {
    sideBar.classList.remove('fade-out');
    sideBar.classList.add('fade-in');
    mainContent.classList.remove('fade-out');
    mainContent.classList.add('fade-in');
    sideBar.classList.remove('side-bar-closed');
    sideBar.classList.add('side-bar-opened');
    mainContent.classList.remove('grid2');
    mainContent.classList.add('grid2-mobile');
  } else {
    sideBar.classList.remove('fade-in');
    sideBar.classList.add('fade-out');
    mainContent.classList.remove('fade-in');
    mainContent.classList.add('fade-out');
    sideBar.classList.add('side-bar-closed');
    sideBar.classList.remove('side-bar-opened');
    mainContent.classList.remove('grid2-mobile');
    mainContent.classList.add('grid2');
  }
}

function showListTitle() {
  const title = document.getElementById('title');

  if (taskLists.value != 'Select a list') {
    title.innerText = taskLists.value;
  } else {
    title.innerText = String.fromCharCode(160);
  }
}

// Pulls lists from local storage on page load
(function () {
  for (i = 0; i < localStorage.length; i++) {
    x = localStorage.key(i);
    pulledList = document.createElement('option');
    pulledList.innerText = x;
    taskLists.appendChild(pulledList);
  }
})();
