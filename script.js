let checkBoxList = document.querySelectorAll('.custom-check-box');
let inputList = document.querySelectorAll('.goal-title');
const warningMsg = document.querySelector('#warning-msg');
let progressValue = document.querySelector('.progress-value');
let progressValueText = document.querySelector('.progress-value span');
 
const allQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill :D',
];

let allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};
let goalCompletedCount = allGoals.goalCount || 0;
console.log(goalCompletedCount);
updateProgressMsg(goalCompletedCount);

let initialProgressValue = `${(goalCompletedCount / inputList.length) * 100}%`;
updateProgressBar();

// *************   Handle Input   ***************

inputList.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;
  } else {
    allGoals[input.id] = {
      name: '',
      completed: false,
    };
  }

  if (allGoals[input.id].completed) {
    input.previousElementSibling.firstChild.nextSibling.classList.remove(
      'hide'
    );
    input.parentElement.classList.add('completed');
  }

  input.addEventListener('input', (e) => {
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
  });

  input.addEventListener('focus', (e) => {
    warningMsg.classList.add('hide');
  });

  input.addEventListener('change', (e) => {
    if (input.value === '') {
      progressValue.style.width = 0;

      inputList.forEach((input) => {
        allGoals[input.id].completed = false;
        input.parentElement.classList.remove('completed');
      });

      checkBoxList.forEach((checkBox) => {
        checkBox.firstElementChild.classList.add('hide');
      });
    }

    localStorage.setItem('allGoals', JSON.stringify(allGoals));
  });
});

// *****************   Handle CheckBox   ****************************

checkBoxList.forEach((checkBox) => {
  checkBox.addEventListener('click', (e) => {
    let allGoalsAdded = [...inputList].every((input) => {
      return input.value;
    });
    let inputId = checkBox.nextElementSibling.id;
    if (allGoalsAdded) {
      checkBox.firstElementChild.classList.toggle('hide');
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

  progressLabel.innerText = allQuotes[goalCompletedCount];
}

function updateProgressBar() {
  initialProgressValue = `${(goalCompletedCount / inputList.length) * 100}%`;
  progressValue.style.width = initialProgressValue;
  progressValueText.innerText = `${goalCompletedCount}/${inputList.length} Completed`;
  // console.log(initialProgressValue);
}




