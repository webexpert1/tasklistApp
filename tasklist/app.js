// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListners();

function loadEventListners() {
    // load from ls
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', AddTask);
    // Remove task event
    taskList.addEventListener('click', RemoveTask)
    // Clear all tasks
    clearBtn.addEventListener('click', ClearTasks)
    // Filter tasks
    filter.addEventListener('keyup', FilterTasks);
}

function AddTask(e) {
    if(taskInput.value === '') {
        alert('Empty items')
    }
    // create li
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // create a text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create  new link element
    const link = document.createElement('a');
    // add class
    link.className = "delete-item secondary-content";
    // add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);

    taskList.appendChild(li);

    // store in ls
    StoreTaskInLocalStorage(taskInput.value);
    // clear input field
    taskInput.value = '';

    e.preventDefault()
}


// store task in Local storage
function StoreTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// get tasks from ls
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task) {
        // create li
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // create a text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create  new link element
        const link = document.createElement('a');
        // add class
        link.className = "delete-item secondary-content";
        // add icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append the link to li
        li.appendChild(link);

        taskList.appendChild(li);
    })

}
// remove task
function RemoveTask(e) {
    if(e.target.parentNode.classList.contains('delete-item')) {
        e.target.parentNode.parentNode.remove();

        // remove from ls
        removeTaskFromLocalStorage(e.target.parentNode.parentNode);
    }
    
}

// remove from ls
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
// clear all tasks
function ClearTasks(e) {
    console.log(taskList.firstChild)
    // taskList.innerHTML = '';
    taskList.removeChild(taskList.firstChild);

    // clear from LS
    clearTasksFromLocalStorage();
}

// clear tasks from ls
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter tasks
function FilterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent.toLowerCase();
        if(item.indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    
    })
   
}
