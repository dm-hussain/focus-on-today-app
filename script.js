let checkBoxList = document.getElementsByClassName('custom-check-box');
let inputList = document.getElementsByClassName('goal-title');
const warningMsg = document.querySelector('#warning-msg');
let progressValue = document.querySelector('.progress-value');
let progressValueText = document.querySelector('.progress-value span');
let warningMsgSpan= document.querySelector('#warning-msg span')
const resetBtn= document.querySelector('#reset-btn');
// Add event listener to the button
const addGoalBtn = document.getElementById('add-goal-button');
addGoalBtn.addEventListener('click', addNewTask);
document.addEventListener('DOMContentLoaded', loadTasks);

let allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};
let goalCompletedCount = allGoals.goalCount || 0;
let task = allGoals.task || 0;

let taskRemaining;
updateProgressMsg();
let initialProgressValue = `${(goalCompletedCount / inputList.length) * 100}%`;
updateProgressBar();

// ***********Handle Button*****************

let inputCounter = 1;

// Function to create a new task box
function createTaskBox(id, value) {
  const taskBox = document.createElement('div');
  taskBox.className = 'task-box';
  const checkBox = document.createElement('div');
  checkBox.className = 'custom-check-box';
  const tickImg = document.createElement('img');
  tickImg.className = 'hide';
  tickImg.src = 'images/tickmark.svg';
  tickImg.alt = 'tickmark';
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'goal-title';
  input.placeholder = 'Add new goal...';
  input.id = `input${inputCounter}`;
  checkBox.appendChild(tickImg);
  taskBox.appendChild(checkBox);
  taskBox.appendChild(input);
  inputCounter++;
  return taskBox;
}
 
// Function to append a new task box to the task container
function addNewTask() {

  
  
  progressValue.style.width =0;
  goalCompletedCount= 0;
  updateProgressMsg()
  resetCheckBox();
  const taskContainer = document.querySelector('.task-container');
  const newTaskBox = createTaskBox();
  taskContainer.appendChild(newTaskBox);
  saveTasks();
  reUpdate();
  localStorage.setItem('allGoals', JSON.stringify(allGoals));
   
  setTimeout(()=> {
    location.reload()
  }, 100)

  updateProgressBar();
}


function updateProgressMsg() {

  let progressLabel = document.querySelector('.progress-label');
  if(task/goalCompletedCount === 1) {
    progressLabel.innerText = `Whoa! You just completed all the goals, time for chill :D`;
    
  }
  else{
    taskRemaining = task - goalCompletedCount;
    progressLabel.innerText = `You have ${taskRemaining} goal to complete`;
  }
 
}

function updateProgressBar() {
  initialProgressValue = `${(goalCompletedCount / inputList.length) * 100}%`;
  progressValue.style.width = initialProgressValue;
  progressValueText.innerText = `${goalCompletedCount}/${inputList.length} Completed`;
}

// const allQuotes = [
//   'Raise the bar by completing your goals!',
//   // 'Well begun is half done!',
//   // 'Just a step away, keep going!',
//   'Whoa! You just completed all the goals, time for chill :D',
// ];
 
 

// ***********Save task to local Storage*************

function saveTasks() {
  const tasks = [];
  
  const taskBoxes = document.querySelectorAll('.task-box');

  taskBoxes.forEach((taskBox) => {
    const input = taskBox.querySelector('.goal-title');
    tasks.push({ id: input.id });
  });
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach((task) => {
    const taskBox = createTaskBox(task.id, allGoals[task.id].name);
    document.querySelector('.task-container').appendChild(taskBox);
  });

  reUpdate();
  updateProgressBar();
}






// **************************************************************************************************************************************
// function to Re-Update all the values and functions after retrieving all the data from LocalStorage

function reUpdate() {
  // *************   Handle Input   ***************

  console.log(inputList.length);

if(inputList.length>4){
  addGoalBtn.setAttribute('disabled', 'true')
  addGoalBtn.classList.add('hide')
  resetBtn.classList.remove('hide')

}
else{
  addGoalBtn.removeAttribute('disabled');
  addGoalBtn.classList.remove('hide')
  
}

  [...inputList].forEach((input) => {
    if (allGoals[input.id]) {
      input.value = allGoals[input.id].name;
    } else {
      allGoals[input.id] = {
        name: '',
        completed: false,
      };
    }

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add('completed');
    }


    input.addEventListener('input', (e) => {
      if (input.parentElement.classList.contains('completed')) {
        let inputText = allGoals[input.id].name;
        input.value = inputText;
        return;
      } else {
        input.value = e.target.value;
        allGoals[input.id].name = input.value;
        localStorage.setItem('allGoals', JSON.stringify(allGoals));
      }
    });

    input.addEventListener('focus', (e) => {
      warningMsg.classList.add('hide');
    });

     let previousUserInput='';
    input.addEventListener('change', (e) => {
 
      let userInput;
      let prevValue = '';
      let userLength;
      let prevLength;
      userInput = e.target.value;
      userLength = userInput.length;
      prevLength = prevValue.length;
      if (e.target.value.length===0) {
        task--;
    allGoals.task = task;
    localStorage.setItem('allGoals', JSON.stringify(allGoals));
    goalCompletedCount=0;
    resetCheckBox()
      } 
      else   {
        updateTask(e.target, prevLength, userLength, prevValue, previousUserInput);
        
      }
        // console.log(prevValue);
      prevValue = userInput;
      previousUserInput= prevValue;
      // console.log(prevValue);
      
    });

  });


  // *****************   Handle CheckBox   ****************************

 
  [...checkBoxList].forEach((checkBox) => {
    warningMsgSpan.innerText  =  inputList.length;
    checkBox.addEventListener('click', (e) => {

      // debugger
      let allGoalsAdded = [...inputList].every((input) => {
        return input.value;
      });
      let inputId = checkBox.nextElementSibling.id;
      if (allGoalsAdded) {
        // console.log(checkBox.parentElement);`
        checkBox.parentElement.classList.toggle('completed');
        allGoals[inputId].completed = !allGoals[inputId].completed;
        goalCompletedCount = Object.values(allGoals).filter(
          (goal) => goal.completed
        ).length;
        allGoals.goalCount = goalCompletedCount;
        updateProgressMsg();
        updateProgressBar();
      } else {
        warningMsg.classList.remove('hide');
      }
      localStorage.setItem('allGoals', JSON.stringify(allGoals));
    });
  });
}

function updateTask(inp, prevLength, userLength, prevValue, previousUserInput) {

  

  if (prevLength < userLength && inp.value !== "" && previousUserInput=== '') {
    task++;
    allGoals.task = task;
    localStorage.setItem('allGoals', JSON.stringify(allGoals));
    updateProgressMsg();
  } 
}

function resetCheckBox() {
  allGoals.goalCount = 0;
  [...inputList].forEach((input) => {
    allGoals[input.id].completed = false;
    input.parentElement.classList.remove('completed');
  });
  updateProgressMsg();
  updateProgressBar()
  localStorage.setItem('allGoals', JSON.stringify(allGoals));
}


resetBtn.addEventListener('click', resetAll)

function resetAll() {

 tasks = [];
  localStorage.setItem('tasks', JSON.stringify(tasks));

allGoals= {}
localStorage.setItem('allGoals', JSON.stringify(allGoals));
location.reload()
}


 