import { initGame } from '../game';

const main = document.querySelector('main');
const menuScreenTemplate = document.querySelector<HTMLTemplateElement>('#menu-screen');

let startNewGameELement: HTMLElement;

function initMenu() {
  const menuScreen = menuScreenTemplate.content.cloneNode(true);
  main.innerHTML = '';
  main.appendChild(menuScreen);
  startNewGameELement = document.querySelector('[data-start-new-game]');

  startNewGameELement.addEventListener('click', startNewGame);
}

function clearMenu() {
  startNewGameELement.removeEventListener('click', startNewGame);
}

function startNewGame() {
  clearMenu();
  initGame();
}

export {
  initMenu,
  clearMenu
}
