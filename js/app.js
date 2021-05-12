/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

// Create a new game by instantiating the Game class
const game = new Game();

// Listen for a click on the "Start game" button
const btn__resetButton = document.getElementById('btn__reset');
btn__resetButton.addEventListener('click', () => { 
    game.startGame();
});

// Listen for clicks on the onscreen keyboard buttons
const qwertyDiv = document.getElementById('qwerty');
qwertyDiv.addEventListener('click', event => { 
    if(event.target.tagName === 'BUTTON') {
        game.handleInteraction(event.target.innerText);
    }    
});




