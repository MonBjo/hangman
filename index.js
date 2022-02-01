/**
 För att toggla SVG:en
 document.querySelector('figure').classList.add('scaffold')
 document.querySelector('figure').classList.add('head')
 document.querySelector('figure').classList.add('body')
 document.querySelector('figure').classList.add('arms')
 document.querySelector('figure').classList.add('legs')


 x Ta fram ord ur listan med ord
 x Användaren trycker på en tangent
 xkolla så att det faktiskt är en bokstav
 x kolla så att bokstaven är ny

 x jämnför bokstaven med ordet
 x om fel bokstav visa den under 
    xfyll i ett del på gubben
 x om rätt fyll i bokstav i ordet
    x i rätt ordning

 xnär man vinner visa "du vann"-skärmen + fråga om att spela igen
 xnär man förlorar visa "du förlorade"-skärmen + fråga om att spela igen

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

 function generateWord(){
    wordToGuess = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)].toLowerCase();
    console.log(`wordToGuess: ${wordToGuess}`);
 }
 generateWord();
displayLetterBox()
 document.addEventListener('keydown', (event) => {
    const char = event.key.toLowerCase();
     
    console.log(char);
    console.log('char.length === 1 && char.match(/[a-z]/i) ', char.length === 1 && char.match(/[a-z]/i));

    if(!hasKeyBeenPressedBefore(char) && checkLetter(char)){
        compare(char, wordToGuess);
        //console.log('isTrue: ', isTrue);
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
        }
        //console.log('char', char);
        //console.log('letter', letter);
    }
 }
 
 
 function compare(char, wordToGuess) {
    isTrue = false;
    //console.log(`wordToGuess.length: ${wordToGuess.length}`);
    for(let i = 0; i < wordToGuess.length; i++){
        if (char == wordToGuess.charAt(i)){
            console.log("rätt!");
            //wordGuessByPlayer.slice(char, i);
            wordGuessByPlayer[i] = char;
            //console.log(wordGuessByPlayer);
            isTrue = true;
            
        } else {
            console.log("fel!");
            //console.log(i + ' char ' + char);
            //console.log(i + ' word ' + wordToGuess.charAt(i));
            //console.log(i + wordToGuess);
            
        }
    }
    guessedLetters.push(char);
     
 }
 
 
 function displayLetter(guessedLetter, char){
    if(isTrue) {
        /* visa i .wordGuess */
        //wordGuessElem.innerHTML = "Rätt: ";
        for(let char of wordGuessByPlayer){
            for(let letterBox of boxes){
                if(char != undefined){
                    letterBox.innerHTML = char;
                    console.log(letterBox)
                    console.log(wordGuessElem)
                    break;
                }
            }
        }
    } else {
        /* visa i .guessedLetters */
        guessedLettersElem.innerHTML += char;
    }
 }
 function showHangMan (){
     //Starts at 5 becauce guessedLettersElem already contains 'Fel: '
     switch(guessedLettersElem.innerHTML.length){
        case 5:
            break;
        case 6:
            document.querySelector('figure').classList.add('scaffold')
            break;
        case 7:
            document.querySelector('figure').classList.add('head')
            break;
        case 8:
            document.querySelector('figure').classList.add('body')
            break;
        case 9:
            document.querySelector('figure').classList.add('arms')
            break;
        case 10:
            document.querySelector('figure').classList.add('legs')
            break;
        case 11:
            playerLose();
            break;
        default:
            console.log('What are you doing?')
     }
     console.log('Funka', guessedLettersElem.innerHTML.length)
 }
 
 
 
 function playerWin(){
    let word = '';
    for(let letter of wordGuessByPlayer){
        word += letter;
        //console.log('gusseWord: ', word)
        //console.log('Letter: ', letter)
    }
    if(word == wordToGuess){
        console.log('You win');
        winGame.classList.add('show');
    }
 }
 function playerLose(){  
    console.log('you lose');
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
        // if it's false it returns as 'false'
        // if it's not empty it returns as true
        return char.length === 1 && char.match(/[a-z]/i);
    }
}

function displayLetterBox(){
    
    for(let letter in wordToGuess){
        let letterBox = document.createElement('div')
        boxes.push(letterBox)
        wordGuessElem.appendChild(letterBox)
    }
    console.log(boxes)
}