/**
 För att toggla SVG:en
 document.querySelector('figure').classList.add('scaffold')
 document.querySelector('figure').classList.add('head')
 document.querySelector('figure').classList.add('body')
 document.querySelector('figure').classList.add('arms')
 document.querySelector('figure').classList.add('legs')


 x Ta fram ord ur listan med ord
 x Användaren trycker på en tangent
 x kolla så att det faktiskt är en bokstav
 x kolla så att bokstaven är ny

 x jämnför bokstaven med ordet
 x om fel bokstav visa den under 
    x fyll i ett del på gubben
 x om rätt fyll i bokstav i ordet
    x i rätt ordning

 x när man vinner visa "du vann"-skärmen + fråga om att spela igen
 x när man förlorar visa "du förlorade"-skärmen + fråga om att spela igen

 */

 let wordGuessElem = document.querySelector('.wordGuess');
 let guessedLettersElem = document.querySelector('.guessedLetters');
 let winGame = document.querySelector('.layout-win')
 let loseGame = document.querySelector('.layout-lose')
 
 let wordsToGuess = ['katt', 'hund', 'chinchilla', 'anka', 'Kanin'];
 let guessedLetters = [];
 let wordGuessByPlayer = [];
 let boxes =[];
 let isTrue;
 let wordToGuess;
 let timeLeft = 60;

 function generateWord(){
    wordToGuess = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)].toLowerCase();
    console.log(`wordToGuess: ${wordToGuess}`);
    for(let char of wordToGuess){
        wordGuessByPlayer.push('');
    }
    console.log('test: ', wordGuessByPlayer);
 }

generateWord();
displayLetterBox();
countDownTimer();

 document.addEventListener('keydown', (event) => {
    const char = event.key.toLowerCase();
    //console.log(char);
    if(!hasKeyBeenPressedBefore(char) && checkLetter(char)){
        compare(char, wordToGuess);
        displayLetter(isTrue, char);
        showHangMan();
        playerWin();
    }
 });
 

 function hasKeyBeenPressedBefore(char){
    //console.log('hasKeyBeenPressedBefore:');
    for(let letter of guessedLetters){
        if(char == letter) {
            return true;
        };
    }
 }
 

 function compare(char, wordToGuess) {
    isTrue = false;
    //console.log(`wordToGuess.length: ${wordToGuess.length}`);
    for(let i = 0; i < wordToGuess.length; i++){
        if (char == wordToGuess.charAt(i)){
            wordGuessByPlayer[i] = char;
            isTrue = true;
        }
    }
    //console.log('wordGuessBy: ', wordGuessByPlayer);
    guessedLetters.push(char);
 }
 
 
 function displayLetter(guessedLetter, char){
    if(isTrue) {
        /* Show in .wordGuess */
        wordGuessElem.innerHTML = ``;
        for(let char of wordGuessByPlayer){
            //console.log('wordGuess: ', wordGuessByPlayer);
                if(char != undefined){
                    wordGuessElem.innerHTML += `<span>` + char + `</span>`;
                    //console.log(wordGuessElem);
                }else{
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
    }
}
function playerLose(){  
   document.querySelector('.right-word').innerHTML = wordToGuess;
   loseGame.classList.add('show');
}

let playAgain = document.getElementsByTagName('a')
for(let link of playAgain){
    link.addEventListener('click', ()=>{
        window.location.reload();
    })
}

 function checkLetter(char){
    if(char == 'å' || char == 'ä' || char == 'ö') {
        return true;
    } else {
        // if it's empty it returns as 'false'
        // if it's not empty it returns a character that 
        // is recieved as true
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
    document.getElementById('countDown').innerHTML = "Du har " + (timeLeft < 10 ? "0" : "") + String(timeLeft + "s kvar");
    timeLeft--;
    if (timeLeft < 0) {
        playerLose();
    }
    else {
        setTimeout(countDownTimer, 1000);
    }
}