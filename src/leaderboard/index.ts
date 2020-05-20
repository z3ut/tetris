import { initMenu } from '../menu';
import { getResults } from './leaderboard';

const main = document.querySelector('main');
const menuScreenTemplate = document.querySelector<HTMLTemplateElement>('#leaderboard-screen');

let leaderboardListELement: HTMLElement;
let backButtonELement: HTMLElement;

function initLeaderboard() {
  const menuScreen = menuScreenTemplate.content.cloneNode(true);
  main.innerHTML = '';
  main.appendChild(menuScreen);
  leaderboardListELement = document.querySelector('[data-leaderboard-list]');
  backButtonELement = document.querySelector('[data-back]');

  backButtonELement.addEventListener('click', back);

  fillLeaderboard();
}

function fillLeaderboard() {
  const result = getResults();
  for (let r of result) {
    const resultElement = document.createElement('div');
    resultElement.innerText = r.toString();
    leaderboardListELement.appendChild(resultElement);
  }
}

function clearLeaderboard() {
  backButtonELement.removeEventListener('click', back);
}

function back() {
  clearLeaderboard();
  initMenu();
}


export {
  initLeaderboard,
  clearLeaderboard
}
