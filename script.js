let checkBoxList = document.getElementsByClassName('custom-check-box');
let inputList = document.getElementsByClassName('goal-title');
const warningMsg = document.querySelector('#warning-msg');
let progressValue = document.querySelector('.progress-value');
let progressValueText = document.querySelector('.progress-value span');

let userInput;
let prevValue = '';
let userLength;
let prevLength;

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
  resetCheckBox();

  const taskContainer = document.querySelector('.task-container');
  const newTaskBox = createTaskBox();
  taskContainer.appendChild(newTaskBox);
  saveTasks();
  reUpdate();

  localStorage.setItem('allGoals', JSON.stringify(allGoals));

  setTimeout(() => {
    location.reload();
  }, 1);
}

// Add event listener to the button
const addGoalBtn = document.getElementById('add-goal-button');
addGoalBtn.addEventListener('click', addNewTask);

document.addEventListener('DOMContentLoaded', loadTasks);

// const allQuotes = [
//   'Raise the bar by completing your goals!',
//   'Well begun is half done!',
//   'Just a step away, keep going!',
//   'Whoa! You just completed all the goals, time for chill :D',
// ];

let allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};
let goalCompletedCount = allGoals.goalCount || 0;
let task = allGoals.task || 0;
let taskRemaining;
updateProgressMsg();
let initialProgressValue = `${(goalCompletedCount / inputList.length) * 100}%`;
updateProgressBar();

// *************   Handle Input   ***************

[...inputList].forEach((input) => {
  console.log(input);

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
    userInput = e.target.value;
    userLength = userInput.length;
    prevLength = prevValue.length;

    if (input.parentElement.classList.contains('completed')) {
      let inputText = allGoals[input.id].name;
      console.log(inputText);
      input.value = inputText;
      return;
    } else {
      input.value = e.target.value;
      allGoals[input.id].name = input.value;
      localStorage.setItem('allGoals', JSON.stringify(allGoals));
    }
    prevValue = userInput;
  });

  input.addEventListener('change', () => {
    updateTask(input);
  });

  input.addEventListener('focus', (e) => {
    warningMsg.classList.add('hide');
  });

  localStorage.setItem('allGoals', JSON.stringify(allGoals));
});

// *****************   Handle CheckBox   ****************************

[...checkBoxList].forEach((checkBox) => {
  checkBox.addEventListener('click', (e) => {
    let allGoalsAdded = [...inputList].every((input) => {
      return input.value;
    });
    let inputId = checkBox.nextElementSibling.id;
    if (allGoalsAdded) {
      // checkBox.firstElementChild.classList.toggle('hide');
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

function updateProgressMsg() {
  let progressLabel = document.querySelector('.progress-label');
  taskRemaining = task - goalCompletedCount;
  progressLabel.innerText = `You have ${taskRemaining} task to complete`;
}

function updateProgressBar() {
  initialProgressValue = `${(goalCompletedCount / inputList.length) * 100}%`;
  progressValue.style.width = initialProgressValue;
  progressValueText.innerText = `${goalCompletedCount}/${inputList.length} Completed`;
}

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

function reUpdate() {
  // *************   Handle Input   ***************

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
      // debugger
      console.log(input.previousElementSibling.firstChild);

      // input.previousElementSibling.firstChild.classList.remove('hide');
      input.parentElement.classList.add('completed');
    }

    input.addEventListener('input', (e) => {
      userInput = e.target.value;
      userLength = userInput.length;
      prevLength = prevValue.length;

      if (input.parentElement.classList.contains('completed')) {
        let inputText = allGoals[input.id].name;

        input.value = inputText;
        return;
      } else {
        input.value = e.target.value;
        allGoals[input.id].name = input.value;
        localStorage.setItem('allGoals', JSON.stringify(allGoals));
      }

      prevValue = userInput;
    });

    input.addEventListener('focus', (e) => {
      warningMsg.classList.add('hide');
    });

    input.addEventListener('change', () => {
      updateTask(input);
    });
  });

  // *****************   Handle CheckBox   ****************************

  [...checkBoxList].forEach((checkBox) => {
    checkBox.addEventListener('click', (e) => {
      let allGoalsAdded = [...inputList].every((input) => {
        return input.value;
      });
      let inputId = checkBox.nextElementSibling.id;
      if (allGoalsAdded) {
        // checkBox.firstElementChild.classList.toggle('hide');
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

  function updateProgressMsg() {
    let progressLabel = document.querySelector('.progress-label');
    taskRemaining = task - goalCompletedCount;
    // progressLabel.innerText = allQuotes[goalCompletedCount];
    progressLabel.innerText = `You have ${taskRemaining} task to complete`;
  }

  function updateProgressBar() {
    initialProgressValue = `${(goalCompletedCount / inputList.length) * 100}%`;
    progressValue.style.width = initialProgressValue;
    progressValueText.innerText = `${goalCompletedCount}/${inputList.length} Completed`;
  }
}

function updateTask(inp) {
  console.log(userLength, prevLength);
  if (prevLength < userLength) {
    task++;
    allGoals.task = task;
    localStorage.setItem('allGoals', JSON.stringify(allGoals));
    updateProgressMsg();
  } else {
    task--;
    allGoals.goalCount = 0;
    goalCompletedCount = 0;
    allGoals.task = task;
    localStorage.setItem('allGoals', JSON.stringify(allGoals));
    progressValue.style.width = 0;
    updateProgressMsg();
    updateProgressBar();
    [...inputList].forEach((input) => {
      allGoals[input.id].completed = false;
      input.parentElement.classList.remove('completed');
    });
    localStorage.setItem('allGoals', JSON.stringify(allGoals));
  }
}

function resetCheckBox() {
  allGoals.goalCount = 0;
  [...inputList].forEach((input) => {
    allGoals[input.id].completed = false;
    input.parentElement.classList.remove('completed');
  });
  localStorage.setItem('allGoals', JSON.stringify(allGoals));
}
