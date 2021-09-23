/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor (phrase) {
        this.phrase = phrase.toLowerCase();
    }
    // This adds letter placeholders to the display when the game starts. 
    // Each letter is presented by an empty box, one li element for each 
    // letter. 
    addPhraseToDisplay() {
        const ul = document.getElementById('phrase').firstElementChild;
        let lis = '<span style="display:inline-block">';
        for(let i = 0; i < this.phrase.length; i++) {
            const letter = this.phrase[i];
            lis += (letter === ' ') ?
                `<li class="space"> </li></span><span style="display:inline-block">` :
                `<li class="hide letter ${letter}">${letter}</li>`;  
        };
        lis += '</span>';
        ul.innerHTML = lis;
    }

    // Check if the selected letter is present in the phrase
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

    // Reveal the letter(s) on the board that matches the player's selection
    showMatchedLetter(letter) {
        const ul = document.getElementById('phrase').firstElementChild;
        const lis = ul.children;
        for(let i = 0; i < lis.length; i++) {
            const li = lis[i];
            if(li.classList.contains(letter)) {
                li.classList.remove('hide');
                li.classList.add('show');
            }
        }
    }
}
