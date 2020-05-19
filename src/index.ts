interface Point {
  x: number;
  y: number;
}

interface Brick extends Point {
  color: string;
  htmlElement?: HTMLElement;
}

interface Figure {
  center: Point;
  color: string;
  bricks: Brick[];
}

const ROTATION_ANGLE_RAD = - 90 * Math.PI / 180;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const TICK_INTERVAL_MS = 200;

function rotatePoint(point: Point, rotationCenter: Point, angle: number) {
  const translatedPoint: Point = {
    x: point.x - rotationCenter.x,
    y: point.y - rotationCenter.y
  };

  return {
    x: Math.round(Math.cos(angle) * translatedPoint.x - Math.sin(angle) * translatedPoint.y + rotationCenter.x),
    y: Math.round(Math.sin(angle) * translatedPoint.x + Math.cos(angle) * translatedPoint.y + rotationCenter.y)
  }
}

let figure: Figure;
let nextFigure: Figure;
let tickInterval: number;
let linesDestroyed = 0;
let score = 0;
const bricks: Brick[] = [];

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

function updateBrickPositions(bricks: Brick[]) {
  for (let b of bricks) {
    b.htmlElement.style.left = calculateBrickLeftPosition(b.x) + '%';
    b.htmlElement.style.bottom = calculateBrickBottomPosition(b.y) + '%';
  }
}

function setFigureAbsolutePositionsOnBoard(figure: Figure) {
  for (let b of figure.bricks) {
    b.x += figure.center.x;
    b.y += figure.center.y;
    b.color = figure.color;
  }
}

function addFigureToBoard(figure: Figure) {
  for (let brick of figure.bricks) {
    const htmlElement = createBrickElement(calculateBrickLeftPosition(brick.x),
      calculateBrickBottomPosition(brick.y), figure.color);
    brick.htmlElement = htmlElement;
    boardElement.appendChild(htmlElement);
  }
}

function clearBoard() {
  boardElement.innerHTML = '';
}

function drawNextFigure() {
  nextFigureElement.innerHTML = '';
  for (let b of nextFigure.bricks) {
    const brickELement = createBrickElement((b.x + 1) / 4 * 100, (b.y + 1) / 4 * 100, nextFigure.color);
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

function removeHorizontalLines(points: Brick[], width: number, height: number): { points: Brick[], removedPoints: Brick[], numberOfRemovedLines: number } {
  let currentRowIndex = 0;
  let removedPoints: Brick[] = [];
  let numberOfRemovedLines = 0;
  let changedPoints = points;
  while (currentRowIndex <= height) {
    const currentRowPoints = changedPoints.filter(p => p.y == currentRowIndex);
    if (currentRowPoints.length === width) {
      changedPoints = changedPoints.filter(p => p.y !== currentRowIndex);
      const pointsAboveCurrentRow = changedPoints.filter(p => p.y > currentRowIndex);
      changePoints(pointsAboveCurrentRow, 0, -1);
      removedPoints.push(...currentRowPoints);
      numberOfRemovedLines++;
    } else {
      currentRowIndex++;
    }
  }
  return { points: changedPoints, removedPoints: removedPoints, numberOfRemovedLines };
}

function changePoints(points: Point[], dx: number, dy: number) {
  for (let p of points) {
    p.x += dx;
    p.y += dy;
  }
}


function isIntersected(points1: Point[], points2: Point[]) {
  return points1.some(p1 => points2.some(p2 => p1.x === p2.x && p1.y === p2.y));
}


const figurePoints = [
  [
    // square
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 0, y: 0 },
    { x: 1, y: 0 }
  ],
  [
    // line
    { x: 0, y: 2 },
    { x: 0, y: 1 },
    { x: 0, y: 0 },
    { x: 0, y: -1 }
  ],
  [
    // z
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 0, y: 0 },
    { x: 1, y: 0 }
  ],
  [
    // T
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 0, y: 0 }
  ],
  [
    // L
    { x: 0, y: -1 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: -1 }
  ]
];

function getRandomArrayElement(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomFigurePoints() {
  return getRandomArrayElement(figurePoints).map(b => ({ ...b }));
}


const colors = [
  'red',
  'green',
  'blue',
  'yellow'
]

function getRandomColor() {
  return getRandomArrayElement(colors);
}


function generateRandomFigure(): Figure {
  return {
    center: {
      x: Math.round(BOARD_WIDTH / 2),
      y: BOARD_HEIGHT
    },
    color: getRandomColor(),
    bricks: getRandomFigurePoints()
  };
}

function getPointsAbsolutePositions(points: Point[], center: Point) {
  return points.map(f => ({
    x: center.x + f.x,
    y: center.y + f.y
  }));
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

  const newFigureBricksPosition = copyBricks(figure.bricks);
  changePoints(newFigureBricksPosition, 0, -1);
  if (isIntersected(newFigureBricksPosition, bricks) || newFigureBricksPosition.some(b => b.y < 0)) {
    bricks.push(...figure.bricks);

    const { points, removedPoints, numberOfRemovedLines } = removeHorizontalLines(bricks, BOARD_WIDTH, BOARD_HEIGHT);
    for (let b of removedPoints) {
      const brickIndex = bricks.indexOf(b);
      bricks.splice(brickIndex, 1);
      boardElement.removeChild(b.htmlElement);
    }
    
    
    figure = nextFigure;
    setFigureAbsolutePositionsOnBoard(figure);
    addFigureToBoard(figure);
    
    nextFigure = generateRandomFigure();
    drawNextFigure();
    
    score += linesToScore(numberOfRemovedLines);
    updateScoreElement();

    if (isIntersected(bricks, figure.bricks)) {
      alert(`Game over!\nScore: ${score}`);
      clearInterval(tickInterval);
    }
  } else {
    figure.center.y -= 1;
    changePoints(figure.bricks, 0, -1);
  }

  updateBrickPositions(bricks);
  updateBrickPositions(figure.bricks);
}

function copyBricks(bricks: Brick[]) {
  return bricks.map(b => ({ ...b }));
}

function handleKeyDown(event) {
  if (!figure) {
    return;
  }
  if (event.key === 'a') {
    const figureNewBricks = copyBricks(figure.bricks);
    changePoints(figureNewBricks, -1, 0);
    if (figureNewBricks.some(b => b.x < 0) || isIntersected(figureNewBricks, bricks)) {
      return;
    }
    figure.center.x -= 1;
    changePoints(figure.bricks, -1, 0);
  }
  if (event.key === 'd') {
    const figureNewBricks = copyBricks(figure.bricks);
    changePoints(figureNewBricks, 1, 0);
    if (figureNewBricks.some(b => b.x >= BOARD_WIDTH) || isIntersected(figureNewBricks, bricks)) {
      return;
    }
    figure.center.x += 1;
    changePoints(figure.bricks, 1, 0);
  }
  if (event.key === ' ') {
    let figureBricksAfterRotation = copyBricks(figure.bricks).map(b => {
      const { x, y } = rotatePoint(b, figure.center, ROTATION_ANGLE_RAD);
      return { x, y, color: b.color, htmlElement: b.htmlElement };
    });

    if (figureBricksAfterRotation
      .some(b => b.x < 0 || b.x >= BOARD_WIDTH || b.y < 0 ||
        isIntersected(figureBricksAfterRotation, bricks))) {
      return;
    }
    figure.bricks = figureBricksAfterRotation;
  }
  if (event.key === 's') {
    tick();
  }
}


function initGame() {
  linesDestroyed = 0;
  score = 0;
  updateScoreElement();
  figure = generateRandomFigure();
  setFigureAbsolutePositionsOnBoard(figure);
  nextFigure = generateRandomFigure();
  drawNextFigure();
  addFigureToBoard(figure);
  tickInterval = setInterval(() => {
    tick();
  }, TICK_INTERVAL_MS);
  document.addEventListener('keydown', handleKeyDown);
}

initGame();
