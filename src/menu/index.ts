import { initGame } from '../game';
import { initLeaderboard } from '../leaderboard';

const main = document.querySelector('main');
const menuScreenTemplate = document.querySelector<HTMLTemplateElement>('#menu-screen');

let startNewGameELement: HTMLElement;
let leaderboardELement: HTMLElement;

function initMenu() {
  const menuScreen = menuScreenTemplate.content.cloneNode(true);
  main.innerHTML = '';
  main.appendChild(menuScreen);
  startNewGameELement = document.querySelector('[data-start-new-game]');
  leaderboardELement = document.querySelector('[data-open-leaderboard]');

  startNewGameELement.addEventListener('click', startNewGame);
  leaderboardELement.addEventListener('click', openLeaderboard);
}

function clearMenu() {
  startNewGameELement.removeEventListener('click', startNewGame);
  leaderboardELement.removeEventListener('click', openLeaderboard);
}

function startNewGame() {
  clearMenu();
  initGame();
}

function openLeaderboard() {
  clearMenu();
  initLeaderboard();
}

export {
  initMenu,
  clearMenu
}
