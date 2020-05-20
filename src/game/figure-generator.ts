import { Figure } from './figure';
import { figurePoints } from './figure-points';
import { rotateBricks } from './brick-math';

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


export function generateRandomFigure(boardWidth: number, boardHeight: number): Figure {
  const bricks = getRandomFigurePoints();
  const color = getRandomColor();

  rotateBricks(bricks, { x: 0, y: 0 }, (90 * Math.round(Math.random() * 4) % 360) * Math.PI / 180);

  for (let b of bricks) {
    b.color = color;
  }

  return {
    center: {
      x: Math.round(boardWidth / 2),
      y: boardHeight
    },
    color,
    bricks
  };
}
