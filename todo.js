


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
      subtasks.push({title:value.value,completed:false});
      // Output the value to the console
      console.log(value.value);
    }
    console.log(subtasks,
      'subtsfsfa');
    if (!task.trim()) {
        alert("Cannot add an empty task!");
        return;
    }
    var dates=document.getElementById('datetime')
    var dueDate = dates.value;
    dates.value='';
    var priority=document.getElementById('priorityList');
    
    tasks.push({title:task,completed:false,subtasks,dueDate,priority:priority.value});
    subTaskList.innerHTML=''
    // priority='lowPriority';
    var subLI=document.createElement('li');
    
    
 var subIn = document.createElement('input');
 subIn.type = "subTasks";
 subIn.className = "subTasks";
       
        subLI.appendChild(subIn);
        subTaskList.appendChild(subLI);

    localStorage.setItem('myList',JSON.stringify(tasks));
    // displayTasks();
    location.reload();

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
        li.className=
        'taskLI';
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
        // li.appendChild(subtask);
        for (var i = 0; i < task.subtasks.length; i++) {
          console.log(task.subtasks[i],'sss');
              var subtask = document.createElement('span');
          
          
              subtask.textContent = task.subtasks[i].title;
              console.log(task.subtasks[i],'si');
              subtask.className = "subtask";
      
      //         let checkbox = document.createElement('input');
      //         checkbox.type = "checkbox";
      //         checkbox.className = "checkbox";
      //        checkbox.checked= task.subtasks[i].completed==true?true:false;
      //        text.style.textDecoration = task.subtasks[i].completed==true ?  'line-through':'none' ;
      // var a=i;
      //         checkbox.onclick = 
      //         function(event) {
      //           toggleSubTask(event, task,a);
      //           console.log(a,'ss');
      //         };
              li.appendChild(subtask);
              // li.appendChild(checkbox);
        
            }
          
            var priority=document.createElement('span');
            priority.className='priority';
            priority.textContent=task.priority;
            var dueDate=document.createElement('span');
             dueDate.className='dueDate';
             
             dueDate.textContent=task.dueDate;
          li.appendChild(priority);
          li.appendChild(dueDate);   
         li.appendChild(editBtn);
        li.appendChild(removeBtn);
  li.style.backgroundColor=(task.priority=='lowPriority'?'rgb(106 221 222)':task.priority=='mediumPriority'?'#48acae':'#417074');
         taskList.appendChild(li);
    });

  
    // sortTasks();

}

function toggleTask(e,myTask) {
    var task = e.target.previousSibling;
    console.log(myTask,'sfasdsf');
    myTask.completed=(myTask.completed==true?false: true);
    task.style.textDecoration = task.style.textDecoration === 'line-through' ? 'none' : 'line-through';
    localStorage.setItem('myList',JSON.stringify(tasks));
    // displayTasks();
}
// function toggleSubTask(e,myTask,i) {
//   var task = e.target.previousSibling;
//   console.log(e.target,'sfasdsf');
//   for(let i=0;i<myTask.subtasks.length;i++)
//   {
//     myTask.subtasks[i].completed=(myTask.subtasks[i].completed==true?false: true);
//     task.subtasks[i].style.textDecoration = task.subtasks[i].style.textDecoration === 'line-through' ? 'none' : 'line-through';
      
//   }
//   // myTasks.completed=(myTask.completed==true?false: true);
//   // task.style.textDecoration = task.style.textDecoration === 'line-through' ? 'none' : 'line-through';
//   localStorage.setItem('myList',JSON.stringify(tasks));
//   // displayTasks();
// }
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
var subTaskList = document.getElementById('subTaskList');
// var subtasks=[];
subTaskList.style.display='none';
    // Get all <li> children
    // var items = subTaskList.children;
  
    // Loop through each <li>
    // for (var i = 0; i < items.length; i++) {
    //   // Get the content of the <li>
    //   var value = items[i].querySelector('input');
    //   subtasks.push({title:value.value,completed:false});
    //   // Output the value to the console
    //   console.log(value.value);
    // }
    // console.log(subtasks,
    //   'subtsfsfa');
    // if (!task.trim()) {
    //     alert("Cannot add an empty task!");
    //     return;
    // }
    var dates=document.getElementById('datetime')
    dates.value=task.dueDate;

    var priority=document.getElementById('priorityList');
      priority.value=task.priority;
      var moreSubTaskButton=document.getElementById('addMoreSubTask');
      moreSubTaskButton.style.display='none'
    // tasks.push({title:task,completed:false,subtasks,dueDate,priority});
    // subTaskList.innerHTML=''
    // var subLI=document.createElement('li');
    
    
//  var subIn = document.createElement('input');
//  subIn.type = "subTasks";
//  subIn.className = "subTasks";
       
//         subLI.appendChild(subIn);
//         subTaskList.appendChild(subLI);

   
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
  var due = document.getElementById('datetime');
  task.dueDate=due.value;
  var priorityList = document.getElementById('priorityList');
  task.priority=priorityList.value;
  input.value = '';
  due.value='';
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

function sortTasks() {
  var sortSelect = document.getElementById("sortSelect");
  var sortOption = sortSelect.value;

  switch (sortOption) {
      case "dueDate":
          tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
          break;
      case "priority":
          tasks.sort((a, b) => priorityToValueFunc(b.priority) - priorityToValueFunc(a.priority));
          break;
      default:
          break;
  }

  displayTasks();
}

function priorityToValueFunc(priority) {
  switch (priority) {
      case "lowPriority":
          return 1;
      case "mediumPriority":
          return 2;
      case "highPriority":
          return 3;
      default:
          return 0;
  }
}

