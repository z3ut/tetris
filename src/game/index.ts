import { Brick } from './brick';
import { Figure } from './figure';

import { generateRandomFigure } from './figure-generator';

import { changePoints, isIntersected } from './point-math';
import { removeHorizontalLines, isBricksInInvalidPosition, rotateBricks } from './brick-math';
import { initMenu } from '../menu';
import { saveResult } from '../leaderboard/leaderboard';

const ROTATION_ANGLE_RAD = - 90 * Math.PI / 180;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const TICK_INTERVAL_MS = 200;
const NEXT_FIGURE_AREA_SIZE = 4;

let figure: Figure;
let nextFigure: Figure;
let tickInterval: number;
let score = 0;
let boardBricks: Brick[];

const main = document.querySelector('main');
const gameScreenTemplate = document.querySelector<HTMLTemplateElement>('#game-screen');

let boardElement: HTMLElement;
let nextFigureElement: HTMLElement;
let scoreElement: HTMLElement;

function drawBoardScreen() {
  const gameScreen = gameScreenTemplate.content.cloneNode(true);
  main.innerHTML = '';
  main.appendChild(gameScreen);
  boardElement = document.querySelector('[data-board]');
  nextFigureElement = document.querySelector('[data-next-figure]');
  scoreElement = document.querySelector('[data-score]');
}

function calculateBrickLeftPosition(x: number) {
  return x / BOARD_WIDTH * 100;
}

function calculateBrickBottomPosition(y: number) {
  return y / BOARD_HEIGHT * 100;
}

export function copyBricks(bricks: Brick[]) {
  return bricks.map(b => ({ ...b }));
}

function updateBrickElementPositions(bricks: Brick[]) {
  for (let b of bricks) {
    b.htmlElement.style.left = calculateBrickLeftPosition(b.x) + '%';
    b.htmlElement.style.bottom = calculateBrickBottomPosition(b.y) + '%';
  }
}

function addFigureToBoard(figure: Figure) {
  changePoints(figure.bricks, figure.center.x, figure.center.y);

  for (let brick of figure.bricks) {
    const left = calculateBrickLeftPosition(brick.x);
    const right = calculateBrickBottomPosition(brick.y);
    brick.htmlElement = createBrickElement(left, right, figure.color);
    boardElement.appendChild(brick.htmlElement);
  }
}

function drawNextFigure() {
  nextFigureElement.innerHTML = '';
  for (let b of nextFigure.bricks) {
    const left = (b.x + NEXT_FIGURE_AREA_SIZE / 2) / NEXT_FIGURE_AREA_SIZE * 100;
    const right =  (b.y + NEXT_FIGURE_AREA_SIZE / 2) / NEXT_FIGURE_AREA_SIZE * 100;
    const brickELement = createBrickElement(left, right, nextFigure.color);
    nextFigureElement.appendChild(brickELement);
  }
}

function createBrickElement(left: number, bottom: number, color: string) {
  const brickELement = document.createElement('div');
  brickELement.className = 'brick';
  brickELement.style.left = left + '%';
  brickELement.style.bottom = bottom + '%';
  brickELement.style.backgroundColor = color;
  return brickELement;
}


function linesToScore(lines: number) {
  switch (lines) {
    case 0:
      return 0;
    case 1:
      return 40;
    case 2:
      return 100;
    case 3:
      return 300;
    case 4:
      return 1200;
  }
}

function updateScoreElement() {
  scoreElement.innerText = score.toString();
}

function tick() {
  if (!figure) {
    return;
  }

  const figureNewBricks = copyBricks(figure.bricks);
  changePoints(figureNewBricks, 0, -1);

  if (isBricksInInvalidPosition(figureNewBricks, boardBricks, BOARD_WIDTH)) {
    boardBricks.push(...figure.bricks);

    const { changedPoints, removedPoints, numberOfRemovedLines } =
      removeHorizontalLines(boardBricks, BOARD_WIDTH, BOARD_HEIGHT);

    for (let b of removedPoints) {
      const brickIndex = boardBricks.indexOf(b);
      boardBricks.splice(brickIndex, 1);
      boardElement.removeChild(b.htmlElement);
    }

    figure = nextFigure;
    addFigureToBoard(figure);
    
    nextFigure = generateRandomFigure(BOARD_WIDTH, BOARD_HEIGHT);
    drawNextFigure();
    
    score += linesToScore(numberOfRemovedLines);
    updateScoreElement();

    if (isIntersected(boardBricks, figure.bricks)) {
      gameOver();
    }
  } else {
    figure.center.y -= 1;
    changePoints(figure.bricks, 0, -1);
  }

  updateBrickElementPositions(boardBricks);
  updateBrickElementPositions(figure.bricks);
}

function handleKeyDown(event) {
  if (!figure) {
    return;
  }

  if (event.key === 'a') {
    const figureNewBricks = copyBricks(figure.bricks);
    changePoints(figureNewBricks, -1, 0);
    if (isBricksInInvalidPosition(figureNewBricks, boardBricks, BOARD_WIDTH)) {
      return;
    }
    figure.center.x -= 1;
    changePoints(figure.bricks, -1, 0);
  }

  if (event.key === 'd') {
    const figureNewBricks = copyBricks(figure.bricks);
    changePoints(figureNewBricks, 1, 0);
    if (isBricksInInvalidPosition(figureNewBricks, boardBricks, BOARD_WIDTH)) {
      return;
    }
    figure.center.x += 1;
    changePoints(figure.bricks, 1, 0);
  }

  if (event.key === ' ') {
    const figureNewBricks = copyBricks(figure.bricks);
    rotateBricks(figureNewBricks, figure.center, ROTATION_ANGLE_RAD);
    if (isBricksInInvalidPosition(figureNewBricks, boardBricks, BOARD_WIDTH)) {
      return;
    }
    figure.bricks = figureNewBricks;
  }

  if (event.key === 's') {
    tick();
  }

  if (event.keyCode === 27) {
    if (confirm('Exit to main menu?')) {
      clearGame();
      initMenu();
    }
  }
}

function gameOver() {
  saveResult(score);
  clearInterval(tickInterval);
  alert(`Game over!\nScore: ${score}`);
  initMenu();
}

function initGame() {
  boardBricks = [];
  drawBoardScreen();

  score = 0;
  updateScoreElement();

  figure = generateRandomFigure(BOARD_WIDTH, BOARD_HEIGHT);
  addFigureToBoard(figure);

  nextFigure = generateRandomFigure(BOARD_WIDTH, BOARD_HEIGHT);
  drawNextFigure();
  
  tickInterval = setInterval(tick, TICK_INTERVAL_MS);

  document.addEventListener('keydown', handleKeyDown);
}

function clearGame() {
  document.removeEventListener('keydown', handleKeyDown);
  clearInterval(tickInterval);
}

export {
  initGame,
  clearGame
}
