/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const startButton = document.getElementById("btn__reset");
const keyBoardKeys = document.getElementsByClassName('key');

startButton.addEventListener('click', function () {
    game = new Game(); // creates a new instance of the Game class.
    game.reset(); //resets the "Game" screen, i.e. to bring the game board to the default setting. 
    game.startGame(); // starts a new game.
})

for (let key of keyBoardKeys) { // to all the keyboard keys on the screen
    key.addEventListener('click', function (event) {
        game.handleInteraction(event, key, null); //a 'click' event listener is attached on all the onscreen keyboard keys, to manage player interactions on click
    });
}
document.addEventListener('keydown', function (event) { // a 'keydown' event listener to handle input from player's computer keyboard.
    const charCode = event.keyCode; // to find what was the unicode of the keystroke input.
    const charStr = String.fromCharCode(charCode).toLowerCase(); // converting the charCode to string, i.e getting the letter of the keystroke input.
    game.handleInteraction(event, keyBoardKeys, charStr) // to manage and handle user input keyboard interactions.
})