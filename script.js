let checkBoxList = document.querySelectorAll('.custom-check-box');
let inputList = document.querySelectorAll('.goal-title');
const warningMsg = document.querySelector('#warning-msg');
let progressValue = document.querySelector('.progress-value');
let progressValueText= document.querySelector('.progress-value span');




const allQuotes= [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill :D'
  ]
  
let progressLabel =document.querySelector('.progress-label');
progressLabel.innerText=  allQuotes[0];

let userInput;
let userInputValue;
const emptyArr = [];
let initialProgressValue = 0;
progressValue.style.width = initialProgressValue + '%';
updateProgressBarText();

checkBoxList.forEach((checkBox, i) => {




  checkBox.addEventListener('click', () => {
    emptyArr.length = 0;

    inputList.forEach((el) => {
      if (el.value === '') {
      
        emptyArr.push('true');
      } else {
        emptyArr.push('false');
      }
    });

    userInputValue = inputList[i].value;

    if (
      userInputValue !== '' &&
      emptyArr[0] === 'false' &&
      emptyArr[1] === 'false' &&
      emptyArr[2] === 'false'
    ) {
      checkBox.parentElement.classList.toggle('completed');
      warningMsg.classList.add('hide');

      if (checkBox.parentElement.classList.contains('completed')) {
        initialProgressValue += 33.33;
        progressValue.style.width = initialProgressValue + '%';
        progressValue.style.visibility = 'visible';
        updateProgressBarText();
      } else {
        initialProgressValue -= 33.33;
        progressValue.style.width = initialProgressValue + '%';
        updateProgressBarText();
      }
    } else {
      warningMsg.classList.remove('hide');
      inputList.forEach((input) => {
      

        input.addEventListener('focus', () => {
          warningMsg.classList.add('hide');
        });
      });
    }



    inputList.forEach((input)=> {

      let inputText= input.value

      input.addEventListener('input', ()=>{
        if(input.parentElement.classList.contains('completed')) {
          input.value= inputText
        }
  
      })

    
      input.addEventListener('change', () => {
    
        
        if(input.value==='') {
    
          initialProgressValue = 0
          updateProgressBarText()

      checkBox.parentElement.classList.remove('completed');
      
       
        }
      })

    })

  });
});





function updateProgressBarText() {
  let progressValue = document.querySelector('.progress-value');

  if (initialProgressValue === 0) {
    progressValue.style.width = 0;
    progressLabel.innerText=  allQuotes[0];
    // progressValueText.innerText = '0/3 Completed';

  } 
  
  else if (initialProgressValue === 33.33) {
    progressValueText.innerText = '1/3 Completed';
    progressLabel.innerText=  allQuotes[1];



  } else if (initialProgressValue === 66.66) {
    progressValueText.innerText = '2/3 Completed';
    progressLabel.innerText=  allQuotes[2];
    
  }

  else if (initialProgressValue === 99.99) {
    progressValueText.innerText = '3/3 Completed';
    progressLabel.innerText=  allQuotes[3];
  }
}

 


