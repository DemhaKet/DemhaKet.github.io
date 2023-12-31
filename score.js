import {
  player,
  dealer,
  dealerHandHtml,
  dealerScoreHtml,
  drawCard,
  reset,
} from "./main.js";
import { displayCard, displayDealerandPlayerCards } from "./UI.js";
import { resultState, afterGameMoney } from "./money.js";

function scoreCount(person) {
  let score = 0;
  let aceCount = 0;
  for (const card of person.hand) {
    if (card.card === "King" || card.card === "Queen" || card.card === "Jack") {
      score += 10;
    } else if (card.card === "Ace") {
      aceCount++;
      score += 11;
    } else {
      score += card.card;
    }
  }

  if (aceCount > 0 && score > 21) {
    score -= 10 * aceCount;
  }

  return score;
}

function checkScore() {
  while (dealer.score < 17) {
    drawCard(dealer);
    // dealerScore = scoreCount(dealerHand);
    displayCard(dealer, dealerHandHtml, dealerScoreHtml);
  }
  setTimeout(() => {
    if (
      player.score > 21 ||
      (player.score < dealer.score && dealer.score < 22)
    ) {
      // BUST OR LOSE
      lost();
    } else if (
      dealer.score > 21 ||
      (dealer.score < player.score && player.score < 22)
    ) {
      // DEALER BUST OR WIN
      won();
    } else if (player.score === dealer.score && player.score < 22) {
      tied();
    }
  }, 1500);

  setTimeout(() => {
    reset();
  }, 5000);
}

function displayResult(win, tie, message) {
  displayDealerandPlayerCards();
  resultState.win = win;
  resultState.tie = tie;
  afterGameMoney();
  alert(message);
}

function won() {
  let message = `Dealer: ${dealer.score} \nPlayer: ${player.score}\n`;
  //   displayDealerandPlayerCards();
  //   resultState.win = true;
  //   afterGameMoney();
  if (dealer.score > 21) {
    message += "Dealer Bust! You Win!";
    // alert(
    //   `Dealer: ${dealer.score} \nPlayer: ${player.score}\nDealer Bust! You Win!`
    // );
  } else if (player.score === 21) {
    message += "You have a BlackJack!\nYou Win!";
    // alert(
    //   `You have a BlackJack!\nDealer: ${dealer.score} \nPlayer: ${player.score}\nYou Win!`
    // );
  } else {
    message += "You Win!";
    // alert(`nDealer: ${dealer.score} \nPlayer: ${player.score}\nYou Win!`);
  }
  displayResult(true, false, message);
}

function lost() {
  //   displayDealerandPlayerCards();
  //   resultState.win = false;
  //   resultState.tie = false;
  //   afterGameMoney();
  //   if (dealer.score === 21) {
  //     alert(
  //       `Dealer has a BlackJack! You Lose:\n Dealer: ${dealer.score} \nPlayer: ${player.score}`
  //     );
  //   } else if (dealer.score !== 21 && player.score > 21) {
  //     alert(
  //       `Busted! You lose: \nDealer: ${dealerScore} \nPlayer:${player.score}`
  //     );
  //   } else {
  //     alert(`You lose: \nDealer: ${dealer.score} \nPlayer:${player.score}`);
  //   }
  let message = `Dealer: ${dealer.score} \nPlayer: ${player.score}\n`;
  if (dealer.score === 21) {
    message += "Dealer has a BlackJack! You Lose:";
  } else if (dealer.score !== 21 && player.score > 21) {
    message += "Busted! You lose:";
  } else {
    message += "You lose:";
  }
  displayResult(false, false, message);
}

function tied() {
  //   displayDealerandPlayerCards();
  //   resultState.win = false;
  //   resultState.tie = true;
  //   afterGameMoney();
  //   alert(`Dealer: ${dealer.score} \nPlayer: ${player.score}\nIt's a Tie!`);
  let message = `Dealer: ${dealer.score} \nPlayer: ${player.score}\nIt's a Tie!`;
  displayResult(false, true, message);
}

export { scoreCount, checkScore };
