// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListners();

function loadEventListners() {
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

    // clear input field
    taskInput.value = '';

    console.log(li)
    e.preventDefault()
}

// remove task
function RemoveTask(e) {
    if(e.target.parentNode.classList.contains('delete-item')) {
        e.target.parentNode.parentNode.remove();

    }
    
}

// clear all tasks
function ClearTasks(e) {
    console.log(taskList.firstChild)
    // taskList.innerHTML = '';
    taskList.removeChild(taskList.firstChild)
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
