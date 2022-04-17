// Add button declaration variables
const button = document.querySelector('.button');
const add_button = document.querySelector('.add_button');
const plus_button = document.querySelector('.plus_button');

// Remove button declaration variables
const remove_circle = document.querySelector('.remove');
const remove_text = document.querySelector('.remove p')

// Sorting icon declaration variables
const logo = document.querySelector('.logo');

// Input box declaration variables
const input_box = document.querySelector('.input_box');
const input = document.querySelector('.input');

/* ------------------------------------------------------------------------------ */

// Add button hover effect
button.onmouseout = function(){
    add_button.style.backgroundColor = 'rgb(131 58 224)';
    plus_button.style.background = 'rgb(153 83 241)';};

button.onmouseover = function(){
    add_button.style.backgroundColor = 'rgb(153 83 241)';
    plus_button.style.background = 'rgb(170 104 254)';};

// Remove button hover effect
function mouseOut(){
    remove_circle.style.backgroundColor = 'white';
    remove_circle.style.border = '1px solid #C4C4C4';
    remove_text.style.color = '#C4C4C4';};

function mouseOver(){
    remove_circle.style.backgroundColor = '#833AE0';
    remove_circle.style.border = '1px solid #833AE0';
    remove_text.style.color = 'white';};

// Sort button hover effect

logo.addEventListener('mouseover', _ => {
  var img = document.getElementById('pic').getAttribute('src');
  if (img == "upwhite.svg") {
    logo.src = "upblack.svg";}
  else if (img == "downwhite.svg") {
    logo.src = "downblack.svg";}});

logo.addEventListener('mouseout', _ => {
  var img = document.getElementById('pic').getAttribute('src');
  if (img == "upblack.svg") {
    logo.src = "upwhite.svg";}
  else if (img == "downblack.svg") {
    logo.src = "downwhite.svg";}});


  remove_circle.addEventListener('mouseover', _ => {
    remove_circle.style.backgroundColor = '#833AE0';
    remove_circle.style.border = '1px solid #833AE0';
    remove_text.style.color = 'white';});

  remove_circle.addEventListener('mouseout', _ => {
    remove_circle.style.backgroundColor = 'white';
    remove_circle.style.border = '1px solid #C4C4C4';
    remove_text.style.color = '#C4C4C4';});
/* ------------------------------------------------------------------------------ */

// Add button function

// On app load, get all tasks from localStorage
window.onload = loadTasks;

// On form submit add task
document.querySelector("form").addEventListener("submit", fun => {
  fun.preventDefault();
  addTask();
});

function loadTasks() {
  // check if localStorage has any tasks
  // if not then return
  if (localStorage.getItem("tasks") == null) return;

  // Get the tasks from localStorage and convert it to an array
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  // Loop through the tasks and add them to the list
  tasks.forEach(task => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `<div id="div"><input class="none">
      <input class="input" type="text" value="${task.task}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <div class="remove" onclick="removeTask(this)"><p>+</p></div>
      </div>
      `;
    list.insertBefore(li, list.children[-1]);
  });
}

function addTask() {
  const task = document.querySelector("form input");
  const list = document.querySelector("ul");

  // return if task is empty
  // if (task.value === "") {
  //   alert("Please add some task!");
  //   return false;
  // }
  // // check is task already exist
  // if (document.querySelector(`input[value="${task.value}"]`)) {
  //   alert("Task already exist!");
  //   return false;
  // }

  // add task to local storage
  localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));

  // create list item, add innerHTML and append to ul
  const li = document.createElement("li");
  li.innerHTML = `<div id="div"><input class="none">
  <input class="input" type="text" value="${task.value}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
  <div class="remove" onclick="removeTask(this)"><p>+</p></div>
  </div>
  `;
  list.insertBefore(li, list.children[-1]);
  // clear input
  task.value = "";
};

function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.parentNode.children[1].value) {
      // delete task
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
}

// store current task to track changes
var currentTask = null;

// get current task
function getCurrentTask(event) {
  currentTask = event.value;
}

// edit the task and update local storage
function editTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  // check if task is empty
  // if (event.value === "") {
  //   alert("Task is empty!");
  //   event.value = currentTask;
  //   return;
  // }
  // task already exist
  // tasks.forEach(task => {
  //   if (task.task === event.value) {
  //     // alert("Task already exist!");
  //     event.value = currentTask;
  //     return;
  //   }
  // });

  // update task
  tasks.forEach(task => {
    if (task.task === currentTask) {
      task.task = event.value;
    }
  });
  // update local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ------------------------------------------------------------------------------------------------

// Sort by letters

function sortListDir() {
  var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
  list = document.querySelector("ul");
  switching = true;
  dir = "asc"; 

  while (switching) {
    switching = false;
    b = list.getElementsByTagName("li");
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;

      if (dir == "asc") {
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
          logo.src = "downwhite.svg";
          break;
        }
      } else if (dir == "desc") {
        if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
          shouldSwitch= true;
          logo.src = "upwhite.svg";
          break;
        }
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;

      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
