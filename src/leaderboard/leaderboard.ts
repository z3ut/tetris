const LEADERBOARD_KEY = 'leaderboard';
const SAVE_ITEMS = 10;

function saveResult(score: number) {
  const currentResult = getResults();
  currentResult.push(score);
  const resultForSave = currentResult.sort((a, b) => b - a).slice(0, SAVE_ITEMS);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(resultForSave));
}

function getResults(): number[] {
  return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || '[]').sort((a, b) => b - a);
}

export {
  saveResult,
  getResults
}
