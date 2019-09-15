/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const startButton = document.getElementById("btn__reset");
const keyBoardKeys = document.getElementsByClassName('key');

startButton.addEventListener('click', function () {
    game = new Game();
    game.reset();
    game.startGame();
})

for (let key of keyBoardKeys) {
    key.addEventListener('click', function () {
        game.handleInteraction(key);
    })
}


document.onkeypress = function (evt) {
    evt = evt || window.event;
    const charCode = evt.keyCode || evt.which;
    const charStr = String.fromCharCode(charCode);
    console.log(charStr);
    game.handleKeyBoardInteraction(charStr, keyBoardKeys)

};