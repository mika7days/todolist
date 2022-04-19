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

      input.addEventListener('blur',_=>{
        input.setAttribute("value",input.value)
      })

/* ------------------------------------------------------------------------------ */

// Add button hover effect
button.onmouseout = function(){
    add_button.style.backgroundColor = 'rgb(131 58 224)';
    plus_button.style.background = 'rgb(153 83 241)';};

button.onmouseover = function(){
    add_button.style.backgroundColor = 'rgb(153 83 241)';
    plus_button.style.background = 'rgb(170 104 254)';};

// Remove button hover effect

  remove_circle.addEventListener('mouseover', _ => {
    remove_circle.style.backgroundColor = '#833AE0';
    remove_circle.style.border = '1px solid #833AE0';
    remove_text.style.color = 'white';});

  remove_circle.addEventListener('mouseout', _ => {
    remove_circle.style.backgroundColor = 'white';
    remove_circle.style.border = '1px solid #C4C4C4';
    remove_text.style.color = '#C4C4C4';});

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

/* ------------------------------------------------------------------------------ */

// Add button function
button.addEventListener("click", addTask);

function addTask() {
    input_box.innerHTML += `<div id="div">
    <input class="input" type="text">
    <div id="none"><div class="remove" onclick="removeTask(this)"><p>+</p></div></div>
    </div>
    `;
    let inputs=document.querySelectorAll('.input');
    inputs.forEach(el=>{
      el.addEventListener('blur',_=>{
        el.setAttribute("value",el.value)
      })
    })
}

// Remove button function
function removeTask() {
    const current_tasks = document.querySelectorAll("#none");
    for(var i=0; i<current_tasks.length; i++) {
        current_tasks[i].onclick = function() {
            this.parentNode.remove();
        }
    }
}

// Sort button function
logo.addEventListener('click',sorter)
logo.addEventListener('click',sortnewinput)

function sortnewinput(){
  let inputs=document.querySelectorAll('.input');
    inputs.forEach(el=>{
      el.addEventListener('blur',_=>{
        el.setAttribute("value",el.value)
      })
    })
}
let arr=[];
let counter=0;
function sorter(){
  let inputs=document.querySelectorAll('.input');
  inputs.forEach(el=>{
   arr.push(el.value)
  })
console.log(arr)
input_box.innerHTML='';

  if(counter == 0) {
      domcreator(counter);
      counter++;
      logo.src = "upblack.svg";

  } else {
      domcreator(counter);
      counter--;
      logo.src = "upblack.svg";
  }
arr=[];
}

function domcreator(el){
  if(el==0){
      let element = ''
     
      arr.sort( function(a, b) {
          if(a>b){
              return 1;
          }
          else if(a<b){
              return -1;
          }
          else{
              return 0;
          }
      });
      
      arr.map(c=>{
          element+=`<div id="div">
          <input class="input" type="text" value="${c}">
          <div id="none"><div class="remove" onclick="removeTask(this)"><p>+</p></div></div>
          </div>
          `;
      });
       input_box.innerHTML=element
      
  }else{
      let element = ''
     
      arr.sort(function(a, b) {
          if(a>b){
              return -1;
          }
          else if(a<b){
              return 1;
          }
          else{
              return 0;
          }
      });
      arr.map(a=>{
        element+=`<div id="div">
        <input class="input" type="text" value="${a}">
        <div id="none"><div class="remove" onclick="removeTask(this)"><p>+</p></div></div>
        </div>
        `;
      });
       input_box.innerHTML=element
}};
