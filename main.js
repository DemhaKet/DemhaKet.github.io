import {
  displayCard,
  displayCardInit,
  displayDealerandPlayerCards,
} from "./UI.js";
import { checkScore, scoreCount } from "./score.js";
import { totalBet, afterGameMoney } from "./money.js";

window.onload = () => {
  reset();
};

let allCards = [];
let deck = [];
generateDeck(deck);

for (let i = 0; i < 6; i++) {
  allCards = allCards.concat(deck);
}

const playerHandHtml = document.getElementById("player-cards");
const dealerHandHtml = document.getElementById("dealer-cards");
const playerScoreHtml = document.getElementById("player-score");
const dealerScoreHtml = document.getElementById("dealer-score");

let player = {
  hand: [],
  score: 0,
  money: 0,
};

let dealer = {
  hand: [],
  score: 0,
};

function generateDeck(deck) {
  const suits = ["H", "C", "D", "S"];
  const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];

  for (const suit of suits) {
    for (const card of cards) {
      deck.push({ card: card, suit: suit });
    }
  }
  shuffleArray(deck);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function decksReset() {
  deck.length = 0;
  generateDeck(deck);
}

function reset() {
  player.hand = [];
  dealer.hand = [];
  player.score = 0;
  dealer.score = 0;
  playerHandHtml.innerHTML = "";
  playerScoreHtml.innerHTML = 0;
  dealerHandHtml.innerHTML = "";
  dealerScoreHtml.innerHTML = 0;

  for (let i = 0; i < 4; i++) {
    let backCardImg = document.createElement("img");
    backCardImg.src = `cards/back.png`;
    if (i < 2) {
      dealerHandHtml.append(backCardImg);
    } else {
      playerHandHtml.append(backCardImg);
    }
  }
}

function drawCard(person) {
  allCards.length < 1 && decksReset();
  person.hand.push(allCards[allCards.length - 1]);
  allCards.pop();
  person.score = scoreCount(person);
}

function initGame() {
  reset();
  if (totalBet <= 0) {
    alert(`Place a Bet first.`);
  } else {
    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
        drawCard(player);
        drawCard(dealer);
      }
      displayCardInit();

      switch (player.score) {
        case 21:
          setTimeout(() => {
            switch (dealer.score) {
              case !21:
                // checkScore(dealer, player);
                checkScore();
              default:
                tie = true;
                afterGameMoney();
                alert("Dealer and Player have BlackJacks. It's a Tie.");
            }
          }, 1000);
          displayDealerandPlayerCards();
      }
    }, 500);
  }
}
let initButton = document
  .querySelector("#startGame")
  .addEventListener("click", () => initGame());

function hit() {
  if (player.hand.length == 0) {
    alert("Start a new game first");
  } else {
    drawCard(player);
    displayCard(player, playerHandHtml, playerScoreHtml);
    if (player.score >= 21) {
      // checkScore(dealer, player);
      checkScore();
    }
  }
}
let hitButton = document
  .querySelector("#hit")
  .addEventListener("click", () => hit());

function stand() {
  if (player.hand.length == 0) {
    alert("Start a new game first");
  } else {
    // checkScore(dealer, player);
    checkScore();
  }
}
let standButton = document
  .querySelector("#stand")
  .addEventListener("click", () => stand());

export {
  generateDeck,
  reset,
  decksReset,
  drawCard,
  player,
  playerHandHtml,
  playerScoreHtml,
  dealer,
  dealerHandHtml,
  dealerScoreHtml,
  initButton,
  hitButton,
  standButton,
};
