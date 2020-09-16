document.querySelector('#startGame').addEventListener('click', startGame);

//Initiliaze game
function startGame(){
  let answer = getCorrectAns();
  gameProcess(answer, 2);
}

//Maintain the game rule
function gameProcess(ans, attemp){
  let input = prompt('Guess a number between the range of 1-10:');
  let continueGame= attemp>0 ? true : false;

  if(!isNaN(input)){
    let number = attemp>1 ? 'chances' : 'chance';
    if(ans>input && continueGame){
      alert(`Correct answer is greater! ${attemp} ${number} left`);
      attemp--;
      gameProcess(ans, attemp);

    }else if(ans<input && continueGame){
      alert(`Correct answer is smaller! ${attemp} ${number} left`);
      attemp--;
      gameProcess(ans, attemp);

    }else if(ans==input){
      alert('You win.');
    }else{
      alert(`You lost! the correct answer is ${ans}`);
    }

  }else{
    alert('Invalid Input');
  }
}

//To get the random correct answer from a range
function getCorrectAns(){
    let min = 1;
    let max = 10;
    let rand = Math.floor(Math.random() * (max - min) + min);
    let ca = Math.ceil(Math.random() * rand);
    return ca;
}