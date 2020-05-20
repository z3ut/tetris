import { Brick } from './brick';
import { Figure } from './figure';

import { generateRandomFigure } from './figure-generator';

import { changePoints, isIntersected } from './point-math';
import { removeHorizontalLines, isBricksInInvalidPosition, rotateBricks } from './brick-math';

const ROTATION_ANGLE_RAD = - 90 * Math.PI / 180;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const TICK_INTERVAL_MS = 200;
const NEXT_FIGURE_AREA_SIZE = 4;

let figure: Figure;
let nextFigure: Figure;
let tickInterval: number;
let score = 0;
const boardBricks: Brick[] = [];

const containerElement = document.createElement('div');
document.body.appendChild(containerElement);

const boardElement = document.createElement('div');
boardElement.className = 'board';
containerElement.appendChild(boardElement);

const nextFigureElement = document.createElement('div');
nextFigureElement.className = 'next-figure';
containerElement.appendChild(nextFigureElement);

const scoreElement = document.createElement('div');
scoreElement.className = 'score';
containerElement.appendChild(scoreElement);

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
    const left = (b.x + 1) / NEXT_FIGURE_AREA_SIZE * 100;
    const right =  (b.y + 1) / NEXT_FIGURE_AREA_SIZE * 100;
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
  scoreElement.innerText = `Score: ${score}`;
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
      alert(`Game over!\nScore: ${score}`);
      clearInterval(tickInterval);
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
}


function initGame() {
  score = 0;
  updateScoreElement();

  figure = generateRandomFigure(BOARD_WIDTH, BOARD_HEIGHT);
  addFigureToBoard(figure);

  nextFigure = generateRandomFigure(BOARD_WIDTH, BOARD_HEIGHT);
  drawNextFigure();
  
  tickInterval = setInterval(tick, TICK_INTERVAL_MS);

  document.addEventListener('keydown', handleKeyDown);
}

initGame();
