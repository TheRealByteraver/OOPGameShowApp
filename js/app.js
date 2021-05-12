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

window.addEventListener('keyup', (event) => {
    // handle the keyup event only if a game is running
    const overlayDiv = document.getElementById('overlay');
    if(overlayDiv.style.display === 'none') {
        game.handleInteraction(event.key);
    } 
    // start the game if the user pressed space or enter
    else {
        console.log(event.code);
        if( event.code === 'Enter' || 
            event.code === 'Space' || 
            event.code === 'NumpadEnter') {
            game.startGame();
        }
    }
});



