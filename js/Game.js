/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

// Game.js to create a Game class with methods for starting and ending the 
// game, handling interactions, getting a random phrase, checking for a 
// win, and removing a life from the scoreboard.
class Game {
    // The class should include a constructor that initializes the following 
    // properties:
    //     - missed: used to track the number of missed guesses by the player. 
    //     The initial value is 0, since no guesses have been made at the 
    //     start of the game.
    //     - phrases: an array of five Phrase objects to use with the game. 
    //     A phrase should only include letters and spaces— no numbers, 
    //     punctuation or other special characters.
    //     - activePhrase: This is the Phrase object that’s currently in play.
    //     The initial value is null. Within the startGame() method, this 
    //     property will be set to the Phrase object returned from a call to 
    //     the getRandomPhrase() method.    

    constructor() {
        // count the number of times the player choose a letter that is not 
        // present in the phrase. When missed reaches five, the player looses
        // the game.
        this.missed = 0;

        this.maxLives = document.querySelectorAll('.tries').length;

        // Some phrases the Game Show App will randomly choose from. Add as
        // many phrases as you want.
        this.phrases = [
            'If you automate a mess you get an automated mess',
            'If you have a procedure with ten parameters you probably missed some',
            'Simplicity carried to the extreme becomes elegance',
            'The best way to predict the future is to implement it',
            'The computer was born to solve problems that did not exist before'
        ]; 
        // 'activePhrase' holds an instantiated object of the 'Phrase' class.
        this.activePhrase = null;
    }

    // Hides the start screen overlay, calls the getRandomPhrase() method, 
    // and sets the activePhrase property with the chosen phrase. It also 
    // adds that phrase to the board by calling the addPhraseToDisplay() 
    // method on the active Phrase object.    
    startGame() { // OK
        const overlayDiv = document.getElementById('overlay');
        overlayDiv.style.display = 'none';

        this.activePhrase = new Phrase(this.getRandomPhrase()); 

        this.activePhrase.addPhraseToDisplay();
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
            if(button.innerText === letter) {
                button.disabled = true;  
                if(phraseHasLetter) {
                    button.classList.add('chosen');
                    this.activePhrase.showMatchedLetter(letter);
                    const playerHasWon = this.checkForWin();
                    if(playerHasWon) {
                        this.gameOver();
                    }
                } 
                else {
                    button.classList.add('wrong');
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
        const lis = document.getElementById('phrase').firstElementChild.children;
        for(let i = 0; i < lis.length; i++) {
            console.log(lis[i].classList);
            if(lis[i].classList.contains('hide')) {
                return false;
            }            
        }
        return true;
    }

    // This method displays the original start screen overlay, and depending
    // on the outcome of the game, updates the overlay h1 element with a 
    // friendly win or loss message.    
    gameOver() {
        const overlayDiv = document.getElementById('overlay');
        overlayDiv.style.display = '';
        const gameOverMessageH1 = document.getElementById('game-over-message');

        overlayDiv.classList.remove('start');
        const playerHasWon = this.missed < this.maxLives;
        if(playerHasWon) {
            gameOverMessageH1.innerText = 'You won the game!';
            overlayDiv.classList.add('win');
        }
        else {
            gameOverMessageH1.innerText = 'You lost, better luck next time!';
            overlayDiv.classList.add('lose');
        }
    }
}
