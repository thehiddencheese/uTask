// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const newListButton = document.querySelector('.new-list-button');
const taskLists = document.getElementById('task-lists');
const listInput = document.querySelector('.list-input');
const deleteButton = document.querySelector('.delete-button');

// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
window.addEventListener('DOMContentLoaded', getTodos);
newListButton.addEventListener('click', createNewList);
deleteButton.addEventListener('click', deleteList);
taskLists.addEventListener('change', updateOption);

// Functions

let result;

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
  saveLocalTodos(todoInput.value);
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

function saveLocalTodos(todo) {
  // Check if thing is already in storage
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
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
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Lists

function createNewList(event) {
  // Prevent form from submitting
  event.preventDefault();

  const newList = document.createElement('option');
  newList.innerText = listInput.value;
  taskLists.appendChild(newList);
  saveLocalLists(listInput.value);

  // Clear Todo Input Value
  listInput.value = '';
}

function saveLocalLists(list) {
  // Check if thing is already in storage
  let lists;
  if (localStorage.getItem('lists') === null) {
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem('lists'));
  }
  lists.push(list);
  localStorage.setItem('lists', JSON.stringify(lists));
}

function deleteList(list) {
  let lists;
  lists = JSON.parse(localStorage.getItem('lists'));
  lists.splice(lists.indexOf(result), 1);
  localStorage.setItem('lists', JSON.stringify(lists));
  window.location.reload();
  console.log(lists);
}

function updateOption() {
  result = document.getElementById('task-lists').value;
  console.log(result);
}

// Pulls lists from local storage on page load
(function () {
  let lists;
  if (localStorage.getItem('todos') === null) {
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem('lists'));
  }
  lists.forEach(function (list) {
    pulledList = document.createElement('option');
    pulledList.innerText = list;
    taskLists.appendChild(pulledList);
  });
})();
