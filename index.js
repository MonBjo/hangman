/* defining data */
let wordGuessElem = document.querySelector('.wordGuess');
let guessedLettersElem = document.querySelector('.guessedLetters');
let winGame = document.querySelector('.layout-win');
let loseGame = document.querySelector('.layout-lose');
let playAgain = document.getElementsByTagName('a');
 
let wordsToGuess = ['katt', 'hund', 'chinchilla', 'anka', 'Kanin'];
let guessedLetters = [];
let wordGuessByPlayer = [];
let boxes =[];
let toDisplayLetter;
let wordToGuess;
let timeLeft = 60;
let stopTimer = false;


/* game setup */

function generateWord(){
    wordToGuess = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)].toLowerCase();
    //console.log(`wordToGuess: ${wordToGuess}`);
    
    for(let char of wordToGuess){
        wordGuessByPlayer.push('');
    }
}

generateWord();
displayLetterBox();
countDownTimer(true);



/* add eventListers */

document.addEventListener('keydown', (event) => {
    const char = event.key.toLowerCase();
    //console.log(char);
    if(!hasKeyBeenPressedBefore(char) && checkLetter(char)){
        compare(char, wordToGuess);
        displayLetter(toDisplayLetter, char);
        showHangMan();
        playerWin();
    }
});

for(let link of playAgain){
    link.addEventListener('click', ()=>{
        window.location.reload();
    })
}



/* functions */

function hasKeyBeenPressedBefore(char){
    //console.log('hasKeyBeenPressedBefore:');
    for(let letter of guessedLetters){
        if(char == letter) {
            return true;
        };
    }
}
 

function compare(char, wordToGuess) {
    toDisplayLetter = false;
    //console.log(`wordToGuess.length: ${wordToGuess.length}`);
    for(let i = 0; i < wordToGuess.length; i++){
        if (char == wordToGuess.charAt(i)){
            wordGuessByPlayer[i] = char;
            toDisplayLetter = true;
        }
    }
    //console.log('wordGuessBy: ', wordGuessByPlayer);
    guessedLetters.push(char);
}
 
 
function displayLetter(guessedLetter, char){
    if(toDisplayLetter) {
        /* Show in .wordGuess */
        wordGuessElem.innerHTML = ``;
        for(let char of wordGuessByPlayer){
            //console.log('wordGuess: ', wordGuessByPlayer);
                if(char != undefined){
                    wordGuessElem.innerHTML += `<span>` + char + `</span>`;
                } else{
                    wordGuessElem.innerHTML+=`<span></span>`;
                }
            
        }
    } else {
        /* Show in .guessedLetters */
        guessedLettersElem.innerHTML += char;
    }
}


function showHangMan (){
     switch(guessedLettersElem.innerHTML.length){
        case 0:
            break;
        case 1:
            document.querySelector('figure').classList.add('scaffold');
            break;
        case 2:
            document.querySelector('figure').classList.add('head');
            break;
        case 3:
            document.querySelector('figure').classList.add('body');
            break;
        case 4:
            document.querySelector('figure').classList.add('arms');
            break;
        case 5:
            document.querySelector('figure').classList.add('legs');
            break;
        case 6:
            playerLose();
            break;
        default:
            console.log('What are you doing?');
    }
}
  
 
function playerWin(){
    let word = '';
    for(let letter of wordGuessByPlayer){
        word += letter;
    }
    if(word == wordToGuess){
        winGame.classList.add('show');
        stopTimer = true;
    }

}

function playerLose(){  
   document.querySelector('.right-word').innerHTML = wordToGuess;
   loseGame.classList.add('show');
}


function checkLetter(char){
    if(char == 'å' || char == 'ä' || char == 'ö') {
        return true;
    } else {
        // if char empty it returns as 'false'
        // if char is not empty it returns the character 
        // and it is recieved as true
        return char.length === 1 && char.match(/[a-z]/i);
    }
}


function displayLetterBox(){  
    for(let letter in wordToGuess){
        let letterBox = document.createElement('span');
        wordGuessElem.appendChild(letterBox);
    }
}


function countDownTimer() {
    document.getElementById('countDown').innerHTML = 
    `Du har ${timeLeft < 10 ? "0" : ""}${timeLeft}s kvar`;
    timeLeft--;
    //console.log(stopTimer);
    if (timeLeft < 0) {
        playerLose();
    } else if(!stopTimer) {
        setTimeout(countDownTimer, 1000);
    }
}