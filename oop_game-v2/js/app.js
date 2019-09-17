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
    key.addEventListener('click', function (event) {
        game.handleInteraction(event, key, null);
    });
}
document.addEventListener('keydown', function (e) {
    const charCode = event.keyCode;
    const charStr = String.fromCharCode(charCode).toLowerCase();
    game.handleInteraction(event, keyBoardKeys, charStr)
})