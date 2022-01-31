/**
 För att toggla SVG:en
 document.querySelector('figure').classList.add('scaffold')
 document.querySelector('figure').classList.add('head')
 document.querySelector('figure').classList.add('body')
 document.querySelector('figure').classList.add('arms')
 document.querySelector('figure').classList.add('legs')


 x Ta fram ord ur listan med ord
 x Användaren trycker på en tangent
 kolla så att det faktiskt är en bokstav
 x kolla så att bokstaven är ny

 x jämnför bokstaven med ordet
 x om fel bokstav visa den under 
    fyll i ett del på gubben
 x om rätt fyll i bokstav i ordet
    x i rätt ordning

 när man vinner visa "du vann"-skärmen + fråga om att spela igen
 när man förlorar visa "du förlorade"-skärmen + fråga om att spela igen

 */

let wordGuessElem = document.querySelector('.wordGuess');
let guessedLettersElem = document.querySelector('.guessedLetters');

let wordsToGuess = ['katt', 'hund', 'chinchilla', 'anka', 'Kanin'];
let guessedLetters = [];
let wordGuessByPlayer = [];
let isTrue;

let wordToGuess = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)].toLowerCase();
console.log(`wordToGuess: ${wordToGuess}`);


document.addEventListener('keydown', (event) => {
    console.log(event.key);
    const char = event.key;
    /* TODO: Kolla så att det är en bokstav */
    if(!hasKeyBeenPressedBefore(char)){
        compare(char, wordToGuess);
        console.log('isTrue: ', isTrue);
        displayLetter(isTrue, char);
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
    console.log(`wordToGuess.length: ${wordToGuess.length}`);
    for(let i = 0; i < wordToGuess.length; i++){
        if (char == wordToGuess.charAt(i)){
            console.log("rätt!");
            //wordGuessByPlayer.slice(char, i);
            wordGuessByPlayer[i] = char;
            console.log(wordGuessByPlayer);
            isTrue = true;
        } else {
            console.log("fel!");
            //console.log(i + ' char ' + char);
            //console.log(i + ' word ' + wordToGuess.charAt(i));
            console.log(i + wordToGuess);
        }
    }
    guessedLetters.push(char);
}


function displayLetter(guessedLetter, char){
    if(isTrue) {
        /* visa i .wordGuess */
        wordGuessElem.innerHTML = "Rätt: ";
        for(let char of wordGuessByPlayer){
            if(char != undefined){
                wordGuessElem.innerHTML += char;
            }
        }
    } else {
        /* visa i .guessedLetters */
        guessedLettersElem.innerHTML += char;
        /* TODO: Lägg in funktion för att visa gubben */
    }
}


/* TODO: Lägg in funktion för du vann/du förlora skärmen */