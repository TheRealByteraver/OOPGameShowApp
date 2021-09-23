/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

// The Game class has methods for starting and ending the game, handling 
// interactions, getting a random phrase, checking for a win, and removing
// a life from the scoreboard.
class Game {
    constructor() {
        // count the number of times the player choose a letter that is not 
        // present in the phrase. When 'missed' reaches five, the player 
        // looses the game.
        this.missed = 0;

        // We count the initial amount of lives by counting the li elements
        // in the #scoreboard id <div> in the html file. This way the amount 
        // of lives can be changed in the html file without requiring a 
        // change in the javascript code.
        this.maxLives = document.querySelectorAll('.tries').length;

        // Some phrases the Game Show App will randomly choose from. Add as
        // many phrases as you want. The theme this time is Tarantino
        // movie titles :)
        this.phrases = [
            new Phrase('Reservoir dogs'),
            new Phrase('Pulp fiction'),
            new Phrase('The hateful eight'),
            new Phrase('Once Upon a Time In Hollywood'),
            new Phrase('Django Unchained')
        ]; 
        // 'activePhrase' holds an instantiated object of the 'Phrase' class.
        this.activePhrase = null;
    }

    // This method cleans up the class' variables and resets the html to its
    // initial state. Then it chooses randomly a new sentence from the array 
    // of available phrases and puts it on the screen.
    startGame() { 
        // Remove all li elements from the Phrase ul element.
        document.getElementById('phrase').firstElementChild.innerHTML = '';

        // Enable all of the onscreen keyboard buttons again
        const keyrowButtons = document.querySelectorAll('#qwerty button');
        for(let i = 0; i < keyrowButtons.length; i++) {
            const button = keyrowButtons[i];
            button.disabled = false; 
            button.className = 'key';
        }

        // reset the number of player misses to zero
        this.missed = 0;

        // Reset all of the heart images (i.e. the player's lives) in the scoreboard 
        // at the bottom of the gameboard to display the liveHeart.png image.
        const lis = document.getElementsByClassName('tries');
        for(let i = 0; i < this.maxLives; i++) {
            lis[i].firstElementChild.setAttribute('src', 'images/liveHeart.png');
        }

        // choose a new phrase and put it on the screen
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();

        // remove the overlay with the "Start Game" button
        const overlayDiv = document.getElementById('overlay');
        overlayDiv.style.display = 'none';
}

    // This method randomly retrieves one of the phrases stored in the 
    // 'phrases' array and returns it.
    getRandomPhrase() { 
        const index = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[index];
    }

    // This method controls most of the game logic. It checks to see if the 
    // button clicked by the player matches a letter in the phrase, and then 
    // directs the game based on a correct or incorrect guess. 
    // It does the following:
    //      - Disable the selected letter's onscreen keyboard button.
    //      - Call the removeLife() method if the phrase does not include the
    //      guessed letter, or showMatchedLetter() if it does.
    //      - Check if the player won or lost the game
    handleInteraction(letter) {
        const phraseHasLetter = this.activePhrase.checkLetter(letter);
        const keyrowButtons = document.querySelectorAll('#qwerty button');
        for(let i = 0; i < keyrowButtons.length; i++) {
            const button = keyrowButtons[i];

            // We use the button enabled/ disabled state to check if the 
            // letter was played before. This way a player can't accidentally
            // play the same letter twice using the keyboard
            if(button.innerText === letter && !button.disabled) {
                button.disabled = true;  
                if(phraseHasLetter) {
                    button.className = 'chosen';
                    this.activePhrase.showMatchedLetter(letter);
                    const playerHasWon = this.checkForWin();
                    if(playerHasWon) {
                        this.gameOver();
                    }
                } 
                else {
                    button.className = 'wrong';
                    this.removeLife();
                }                
                break;  
            }
        }
    }
    // This method removes a life from the scoreboard and ends
    // the game by calling the gameOver() method.       
    removeLife() {
        this.missed++;

        const scoreboardDiv = document.getElementById('scoreboard');
        const lis = scoreboardDiv.firstElementChild.children;

        const livesLeft = this.maxLives - this.missed;

        // show all the lives the player is left with
        for(let i = 0; i < livesLeft; i++) {
            lis[i].firstElementChild.setAttribute('src', 'images/liveHeart.png');
        }
        // show all the lives the player lost
        for(let i = livesLeft; i < lis.length; i++) {
            lis[i].firstElementChild.setAttribute('src', 'images/lostHeart.png');
        }
        
        // End the game if all lives are consumed
        if(this.missed >= this.maxLives) {
            this.gameOver();
        }
    }

    // This method checks to see if the player has revealed all of the 
    // letters in the phrase that the player needs to guess.
    checkForWin() {
        const lis = document.getElementById('phrase').querySelectorAll('li');
        for(let i = 0; i < lis.length; i++) {
            if(lis[i].classList.contains('hide')) {
                return false;
            }            
        }
        return true;
    }

    // This method displays the original start screen overlay, and depending
    // on the outcome of the game, updates the overlay h1 element with a 
    // win or loss message.    
    gameOver() {
        const overlayDiv = document.getElementById('overlay');
        overlayDiv.style.display = '';
        const gameOverMessageH1 = document.getElementById('game-over-message');

        overlayDiv.className = '';
        // console.log('overlay classlist: ', overlayDiv.classList);
        const playerHasWon = this.missed < this.maxLives;
        if(playerHasWon) {
            gameOverMessageH1.innerText = 'You won the game!';
            overlayDiv.className = 'win';
        }
        else {
            gameOverMessageH1.innerText = 'You lost, better luck next time!';
            overlayDiv.className = 'lose';
        }
    }
}
