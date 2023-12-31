import {
  player,
  playerHandHtml,
  playerScoreHtml,
  dealer,
  dealerHandHtml,
  dealerScoreHtml,
} from "./main.js";

function createCardImg(card, back) {
  if (!back) {
    let cardImg = document.createElement("img");
    cardImg.src = `cards/${card.card}_of_${card.suit}.png`;
    return cardImg;
  }
  let cardImg = document.createElement("img");
  cardImg.src = `cards/back.png`;
  return cardImg;
}

function displayDealerandPlayerCards() {
  displayCard(dealer, dealerHandHtml, dealerScoreHtml);
  displayCard(player, playerHandHtml, playerScoreHtml);
}

function displayCard(person, personHandHtml, personScoreHtml) {
  personHandHtml.innerHTML = "";
  for (let i = 0; i < person.hand.length; i++) {
    let cardImg = createCardImg(person.hand[i]);
    personHandHtml.append(cardImg);
  }
  personScoreHtml.innerHTML = person.score;
}

function displayCardInit() {
  displayCard(player, playerHandHtml, playerScoreHtml);
  dealerHandHtml.innerHTML = "";
  let cardImg = createCardImg(dealer.hand[0]);
  let backCardImg = createCardImg(null, true);
  dealerHandHtml.append(cardImg, backCardImg);

  switch (dealer.hand[0].card) {
    case "King":
    case "Queen":
    case "Jack":
      dealerScoreHtml.innerHTML = 10;
      break;
    case "Ace":
      dealerScoreHtml.innerHTML = 11;
      break;
    default:
      dealerScoreHtml.innerHTML = dealer.hand[0].card;
      break;
  }
}

export { displayCard, displayCardInit, displayDealerandPlayerCards };
