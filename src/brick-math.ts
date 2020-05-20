import { Brick } from './brick';
import { changePoints, isIntersected, rotatePoint } from './point-math';
import { Point } from './point';

export function removeHorizontalLines(points: Brick[], width: number, height: number): { changedPoints: Brick[], removedPoints: Brick[], numberOfRemovedLines: number } {
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
  return { changedPoints, removedPoints, numberOfRemovedLines };
}

export function isBricksInInvalidPosition(testingBricks: Brick[],
  boardBricks: Brick[], boardWidth: number): boolean {

  return testingBricks.some(b => b.x < 0 || b.x >= boardWidth || b.y < 0 ||
    isIntersected(testingBricks, boardBricks))
}

export function rotateBricks(bricks: Brick[], center: Point, angle: number): Brick[] {
  return bricks.map(b => {
    const { x, y } = rotatePoint(b, center, angle);
    b.x = x;
    b.y = y;
    return b;
  });
}
