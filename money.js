import { player } from "./main.js";
let totalBet = 0;
let resultState = {
  win: true,
  tie: false,
};
// let win = true;
// let tie = false;
const betHtml = document.getElementById("bet-total");
const currentBalanceText = document.getElementById("current-balance");

function addBet(value) {
  if (player.money >= value && value >= 5) {
    totalBet += value;
    player.money -= value;
  } else if (totalBet < 0) {
    alert(`Minimum Bet Value is $5...`);
  } else if (player.money < value) {
    alert(`You don't have enough money... Please deposit more money.`);
  }
  betHtml.innerHTML = `Bet: $${totalBet}`;
  currentBalanceText.innerText = `Current Balance: $${player.money}`;
}

let add5 = document
  .querySelector("#add5")
  .addEventListener("click", () => addBet(5));
let add20 = document
  .querySelector("#add20")
  .addEventListener("click", () => addBet(20));
let add50 = document
  .querySelector("#add50")
  .addEventListener("click", () => addBet(50));

function substractBet(value) {
  if (value <= totalBet && totalBet > 0) {
    totalBet -= value;
    player.money += value;
  } else if (value > totalBet) {
    player.money += totalBet;
    totalBet = 0;
  }
  betHtml.innerText = `Bet: $${totalBet}`;
  currentBalanceText.innerText = `Current Balance: $${player.money}`;
}

let sub5 = document
  .querySelector("#sub5")
  .addEventListener("click", () => substractBet(5));
let sub20 = document
  .querySelector("#sub20")
  .addEventListener("click", () => substractBet(20));
let sub50 = document
  .querySelector("#sub50")
  .addEventListener("click", () => substractBet(50));

function depositMoney() {
  const depositAmount = parseInt(
    document.getElementById("depositAmount").value
  );
  const depositAmountText = document.getElementById("depositAmount");
  if (depositAmount >= 0) {
    player.money += depositAmount;
  } else {
    alert("Please enter a valid deposit amount.");
  }
  depositAmountText.value = "";
  currentBalanceText.innerText = `Current Balance: $${player.money}`;
}

let depositButton = document
  .querySelector("#deposit-button")
  .addEventListener("click", () => depositMoney());

// This function retrieves the boolean value of win and tie and uses it to determine what the player's money should be
function afterGameMoney() {
  if (resultState.win) {
    // In case of Win
    player.money += totalBet * 2;
    totalBet = 0;
    betHtml.innerText = `Bet: $${totalBet}`;
    currentBalanceText.innerText = `Current Balance: $${player.money}`;
  } else if (!resultState.win && !resultState.tie) {
    // In case of Loss
    totalBet = 0;
    betHtml.innerText = `Bet: $${totalBet}`;
    currentBalanceText.innerText = `Current Balance: $${player.money}`;
  } else if (resultState.tie) {
    // In case of Tie
    player.money += totalBet;
    totalBet = 0;
    betHtml.innerText = `Bet: $${totalBet}`;
    currentBalanceText.innerText = `Current Balance: $${player.money}`;
  }
}

export {
  totalBet,
  resultState,
  add5,
  add20,
  add50,
  sub5,
  sub20,
  sub50,
  depositButton,
  afterGameMoney,
};
