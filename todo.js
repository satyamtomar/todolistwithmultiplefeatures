


document.getElementById('addTask').addEventListener('click', addTask);
document.getElementById('addMoreSubTask').addEventListener('click', moreSubTask);

let data = [];
var tasks = [];
tasks= JSON.parse(localStorage.getItem('myList'))==null?[]:JSON.parse(localStorage.getItem('myList'));
console.log(tasks,'taskssss')
displayTasks();
// if(tasks.length==0)  
// {


// fetch('https://jsonplaceholder.typicode.com/todos?limit=5') // replace with your API endpoint
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(json => {
//     data = json.slice(0,10);
//     console.log(data,'dddd');
//     // localStorage.setItem('myList',JSON.stringify(...data));
//     tasks.push(...data);
//     console.log(tasks,'ttt');
//     displayTasks();
//   })
//   .catch(error => {
//     console.error('There has been a problem with your fetch operation:', error);
//   });

// }

// else{
//   displayTasks();
// }
function moreSubTask()
{
  var ul=document.getElementById('subTaskList');

 var li=document.createElement('li');

 var checkbox = document.createElement('input');
        checkbox.type = "subTasks";
        checkbox.className = "subTasks";
       
li.appendChild(checkbox);
ul.appendChild(li);
}
function addTask() {
    var input = document.getElementById('inputTask');
    var task = input.value;

    input.value = "";
    
    // var subtask=document.getElementById('subtasks').value;
    var subTaskList = document.getElementById('subTaskList');
var subtasks=[];
    // Get all <li> children
    var items = subTaskList.children;
  
    // Loop through each <li>
    for (var i = 0; i < items.length; i++) {
      // Get the content of the <li>
      var value = items[i].querySelector('input');
      subtasks.push(value.value);
      // Output the value to the console
      console.log(value.value);
    }
    console.log(subtasks,
      'subtsfsfa');
    if (!task.trim()) {
        alert("Cannot add an empty task!");
        return;
    }

    tasks.push({title:task,completed:false,subtasks});
    subTaskList.innerHTML=''
    var subLI=document.createElement('li');

 var subIn = document.createElement('input');
 subIn.type = "subTasks";
 subIn.className = "subTasks";
       
        subLI.appendChild(subIn);
        subTaskList.appendChild(subLI);

    localStorage.setItem('myList',JSON.stringify(tasks));
    displayTasks();
}


function displayTasks() {
    var taskList = document.getElementById('taskList');
    // Clear the existing task display
    taskList.innerHTML = "";
    
var addBtn=document.getElementById('addTask');
addBtn.style.display='block';

var editBtn=document.getElementById('editTask');
editBtn.style.display='none';

    // Reconstruct the task display
    tasks.forEach((task, index) => {
        var li = document.createElement('li');
        var text = document.createElement('span');
    
    
        text.textContent = task.title;
        text.className = "task";
        
        var editBtn = document.createElement('button');

        editBtn.textContent = "Edit";
        editBtn.className = "edit";
        editBtn.onclick = function(event) { editTask(event,index,task); };


        var removeBtn = document.createElement('button');

        removeBtn.textContent = "X";
        removeBtn.className = "remove";
        removeBtn.onclick = function() { removeTask(index); };



        li.appendChild(text);
  
        // li.appendChild(subtask);
        for (var i = 0; i < task.subtasks.length; i++) {
          console.log(task.subtasks[i],'sss');
              var subtask = document.createElement('span');
          
          
              subtask.textContent = task.subtasks[i];
              subtask.className = "subtask";
      
              let checkbox = document.createElement('input');
              checkbox.type = "checkbox";
              checkbox.className = "checkbox";
             checkbox.checked= task.completed==true?true:false;
             text.style.textDecoration = task.completed==true ?  'line-through':'none' ;
      
              checkbox.onclick = 
              function(event) {
                toggleTask(event, task);
              };
              li.appendChild(subtask);
              li.appendChild(checkbox);
        
            }
            let checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.className = "checkbox";
           checkbox.checked= task.completed==true?true:false;
           text.style.textDecoration = task.completed==true ?  'line-through':'none' ;
    
            checkbox.onclick = 
            function(event) {
              toggleTask(event, task);
            };
           li.appendChild(checkbox);
         li.appendChild(editBtn);
        li.appendChild(removeBtn);
  
         taskList.appendChild(li);
    });
}

function toggleTask(e,myTask) {
    var task = e.target.previousSibling;
    console.log(e.target,'sfasdsf');
    myTask.completed=(myTask.completed==true?false: true);
    task.style.textDecoration = task.style.textDecoration === 'line-through' ? 'none' : 'line-through';
    localStorage.setItem('myList',JSON.stringify(tasks));
    // displayTasks();
}

function editTask(event,index,task)
{
  var input = document.getElementById('inputTask');
    // var task = input.value;

    input.value = task.title;
    
var addBtn=document.getElementById('addTask');
addBtn.style.display='none';

var editBtn=document.getElementById('editTask');
editBtn.style.display='block';

// var editBtn=document.createElement('button');
// editBtn.textContent = "Edit";
// editBtn.id = "editTask";

editBtn.onclick = function(e) { finalEditTask(e,task,index); };

  
    // if (!task.trim()) {
    //     alert("Cannot add an empty task!");
    //     return;
    // }

    // tasks.push({title:task,completed:false});
    // localStorage.setItem('myList',JSON.stringify(tasks));
    // displayTasks();
}
function finalEditTask(e,task,index)
{
  var input = document.getElementById('inputTask');
  task.title=input.value;
  
  input.value = '';
  var addBtn=document.getElementById('addTask');
  addBtn.style.display='block';
  var editBtn=document.getElementById('editTask');
  editBtn.style.display='none';
  localStorage.setItem('myList',JSON.stringify(tasks));
  displayTasks();    
}
function removeTask(index) {
    // Remove the task from the array and update the display
    tasks.splice(index, 1);
    localStorage.setItem('myList',JSON.stringify(tasks));
    displayTasks();
}
