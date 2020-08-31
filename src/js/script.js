// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
window.addEventListener('DOMContentLoaded', getTodos);

// Functions

function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();
  // Todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  //Create LI
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
