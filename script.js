let checkBoxList = document.querySelectorAll('.custom-check-box');
let inputList = document.querySelectorAll('.goal-title');
const warningMsg = document.querySelector('#warning-msg');
let progressValue= document.querySelector('.progress-value')



let userInput;
let userInputValue;
const emptyArr=[];
let initialProgressValue=1;
progressValue.style.width= initialProgressValue +'%';
updateProgressBarText()

checkBoxList.forEach((checkBox, i) => {

  

 
   
  checkBox.addEventListener('click', () => {
   
  
 
  emptyArr.length=0;
   
    inputList.forEach((el) => {
      if (el.value === '') {
        emptyArr.push('true') ;
      } 
      
      else{
        emptyArr.push('false') ;
      }

      
    });

    userInputValue = inputList[i].value;

    if (userInputValue !== '' && (emptyArr[0]==='false' && emptyArr[1]=== 'false' && emptyArr[2]==='false') ) {
      checkBox.parentElement.classList.toggle('completed');
      warningMsg.classList.add('hide');

      if(checkBox.parentElement.classList.contains('completed')) {
        
        initialProgressValue+= 33;
        progressValue.style.width=  initialProgressValue + '%' ;
        updateProgressBarText()

      }
      
         else{
        initialProgressValue-= 33;
        progressValue.style.width=  initialProgressValue + '%' ;
        updateProgressBarText()
      }
    } 
    
    
    else {
      warningMsg.classList.remove('hide');
      
       
    }
  });
});


 function updateProgressBarText() {

  let progressValue= document.querySelector('.progress-value')

  if(initialProgressValue===1) {

    
    progressValue.innerText= '0/3 Completed' ;
      
  }

  else if(initialProgressValue===34) {

    
    progressValue.innerText= '1/3 Completed' ;
      
  }

  else if(initialProgressValue===67) {

    
    progressValue.innerText= '2/3 Completed' ;
      
  }


  if(initialProgressValue===100) {

    
    progressValue.innerText= '3/3 Completed' ;
      
  }

 }
