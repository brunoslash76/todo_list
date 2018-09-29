// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// CONSTANT FOR LOCALSTORAGE 
const TASKS = 'tasks';

// Load all event listeners

loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks)
    // add task event
    form.addEventListener('submit', addTask)
    // remove task event
    taskList.addEventListener('click', removeTask)
    // clear task event
    clearBtn.addEventListener('click', clearTasks)
    //Filter tasks event 
    filter.addEventListener('keyup', filterTask)
}
// Get Tasks from localstorage
function getTasks() {
    let tasks;
    if (localStorage.getItem(TASKS) === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem(TASKS));
    }
    tasks.forEach(function (task) {
        createLis(task);
    })
}


// add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task')
    }

    createLis(taskInput.value)

    // Store in localStorage
    storeTaskInLocalStorage(taskInput.value);

    // clear the input
    taskInput.value = '';
    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem(TASKS) === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem(TASKS));
    }

    tasks.push(task);
    localStorage.setItem(TASKS, JSON.stringify(tasks))
}

// Remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('are you sure?')) {
            e.target.parentElement.parentElement.remove();
            // remove task from ls 
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)

        }
    }
}

// Remove from localstorage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem(TASKS) === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem(TASKS, JSON.stringify(tasks))
}

// Clear tasks
function clearTasks() {
    if (confirm('Are you sure you want to delete all tasks?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild)
        }
    }

    clearTasksFromLocalStorage();
}

// Clear tasks from localstorage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// filter Tasks
function filterTask(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item')
        .forEach(function (task) {
            const item = task.firstChild.textContent;
            if (item.toLocaleLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none'
            }
        })
}

// create lis 
function createLis(task) {
    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement('a');
    // add class to link 
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
}
