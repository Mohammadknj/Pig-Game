let turn = 0;
let players = document.querySelectorAll(".player");
let rolled = false;
let playing = true;
const newGameBtn = document.querySelector(".new-game-btn");
const rollDiceBtn = document.querySelector(".roll-dice-btn");
const holdBtn = document.querySelector(".hold-btn");
const dice = document.getElementById("dice");
function init() {
   dice.classList.add("hidden");
   players[0].classList.add("Turn-background");
   players[0].querySelector(".name").classList.add("Turn-name");
   players[0].querySelector(".current-score-show").classList.add("Turn-current");
}
init();
function deleting() {
   if (turn == 1) {
      players[1].classList.remove("Turn-background");
      players[1].querySelector(".name").classList.remove("Turn-name");
      players[1].querySelector(".current-score-show").classList.remove("Turn-current");
      turn = 0;
   }
   for (let i = 0; i < 2; i++) {
      players[i].querySelector(".holded-score").innerHTML = "0";
      players[i].querySelector(".current-score").innerHTML = "0";
   }
}
function changeTurn() {
   rolled = false;
   players[turn].classList.remove("Turn-background");
   players[turn].querySelector(".name").classList.remove("Turn-name");
   players[turn].querySelector(".current-score-show").classList.remove("Turn-current");
   players[turn].querySelector(".current-score").innerHTML = "0";
   turn = 1 - turn;
   players[turn].classList.add("Turn-background");
   players[turn].querySelector(".name").classList.add("Turn-name");
   players[turn].querySelector(".current-score-show").classList.add("Turn-current");
}
function Victory() {
   players[turn].classList.add("victory");
   playing = false;
   rolled = false;
}
rollDiceBtn.addEventListener("click", () => {
   if (playing) {
      rolled = true;
      dice.classList.remove("hidden");
      let random = Math.floor(Math.random() * 6) + 1;
      dice.src = `Pictures/dice-${random}.png`;
      if (random == 1) changeTurn();
      else {
         let score = players[turn].querySelector(".current-score");
         let num = Number(score.textContent);
         score.textContent = num + random;
      }
   }
});
holdBtn.addEventListener("click", () => {
   if (playing && rolled) {
      let score = Number(players[turn].querySelector(".holded-score").innerHTML);
      players[turn].querySelector(".holded-score").innerHTML =
         score + Number(players[turn].querySelector(".current-score").innerHTML);
      if (players[turn].querySelector(".holded-score").innerHTML >= 100) {
         Victory();
      } else changeTurn();
   }
});
newGameBtn.addEventListener("click", () => {
   rolled = false;
   playing = true;
   players[turn].classList.remove("victory");
   deleting();
   init();
});
