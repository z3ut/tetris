import { Figure } from './figure';
import { figurePoints } from './figure-points';

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
