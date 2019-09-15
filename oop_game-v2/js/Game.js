/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    };

    /**
     * Creates phrases for use in game
     * @return {array} An array of phrases that could be used in the game
     */
    createPhrases() {
        return [

            {
                phrase: 'Good morning Vietnam'
            },

            {
                phrase: 'We will rock you'
            },

            {
                phrase: 'Huston we have a problem'
            },

            {
                phrase: 'YOU SHALL NOT PASS'
            },

            {
                phrase: 'Live long and prosper'
            },

        ]
    };

    /**
     * Selects random phrase from phrases property
     * @return {Object} Phrase object chosen to be used
     */
    getRandomPhrase() {
        let index = Math.floor(Math.random() * this.createPhrases().length);
        return this.phrases[index];
    };

    startGame() {
        document.querySelector('#overlay').style.display = 'none';
        const randomPhrase = this.getRandomPhrase();
        const phrase = new Phrase(randomPhrase.phrase);
        phrase.addPhraseToDisplay();
        this.activePhrase = phrase;
    };

    /**
     * Checks for winning move
     * @return {boolean} True if game has been won, false if game wasn't
       won
    */

    checkForWin() {
        const allListItems = document.querySelectorAll('.letter').length;
        const correctAnswers = document.querySelectorAll('.show').length;
        if (correctAnswers === allListItems) {
            return true
        } else {
            return false
        }
    }

    // allListItems.length === correctAnswers.length && hiddenItems.length === allListItems.length

    /**
     * Increases the value of the missed property
     * Removes a life from the scoreboard
     * Checks if player has remaining lives and ends game if player is out
     */
    removeLife() {
        const liveHeart = document.querySelectorAll('.tries img');
        liveHeart[this.missed].src = "images/lostHeart.png";
        liveHeart[this.missed].alt = "Lost Icon";
        this.missed += 1;
        if (this.missed === 5) {
            this.gameOver(false);
            this.reset();
        }
    };

    /**
     * Displays game over message
     * @param {boolean} gameWon - Whether or not the user won the game
     */
    gameOver(gameWon) {
        const overlay = document.querySelector('#overlay');
        const resultMessage = document.querySelector('#game-over-message');
        overlay.style.display = 'flex';
        if (gameWon === true) {
            resultMessage.textContent = 'Great Job!!!';
            // overlay.classList.remove('start');
            overlay.classList.add('win');
        } else {
            resultMessage.textContent = 'Sorry, Better Luck Next Time';
            // overlay.classList.remove('start');
            overlay.classList.add('lose');
        }
    };


    /**
     * Handles onscreen keyboard button clicks
     * @param (HTMLButtonElement) button - The clicked button element
     */
    handleClickInteraction(button) {
        button.disabled = true;
        const phrase = new Phrase(this.activePhrase.phrase);
        if (phrase.checkLetter(button.textContent) === false) {
            button.classList.add('wrong');
            this.removeLife();
        } else {
            button.classList.add('chosen');
            phrase.showMatchedLetter(button.textContent);
            if (this.checkForWin()) {
                this.gameOver(true);
                this.reset();
            }
        }
    };

    /**
     * Handles onscreen keyboard button keydown
     * @param 
     * (string) letter - The letter key pressed on the keyboard
     * (HTMLButtonElement) keys - The onscreen button elements
     */
    handleKeyBoardInteraction(letter, keys) {
        const phrase = new Phrase(this.activePhrase.phrase);
        for (let key of keys) {
            if (key.textContent === letter) {
                key.disabled = true;
                if (phrase.checkLetter(letter) === false) {
                    key.classList.add('wrong');
                    this.removeLife();
                } else {
                    key.classList.add('chosen');
                    phrase.showMatchedLetter(letter);
                    if (this.checkForWin()) {
                        this.gameOver(true);
                        this.reset();
                    }
                }

            }
        }
    };

    /**
     * resets the game
     * @param (HTMLButtonElement) button - The clicked button element
     */

    reset() {
        const overlay = document.querySelector('#overlay');
        const keyBoardKeys = document.getElementsByClassName('key');
        const phraseDisplayDiv = document.querySelector('#phrase ul');
        const Heart = document.querySelectorAll('.tries img');
        if (overlay.classList.contains('win') || overlay.classList.contains('lose')) {
            for (let i = 0; i < Heart.length; i++) {
                Heart[i].src = "images/liveHeart.png";
                Heart[i].alt = "Heart Icon";
            }
            while (phraseDisplayDiv.firstChild) {
                phraseDisplayDiv.removeChild(phraseDisplayDiv.firstChild);
            }
            for (let key of keyBoardKeys) {
                key.disabled = false;
                key.classList.remove('wrong', 'chosen');
            }

            this.missed = 0;

        }
    }

}