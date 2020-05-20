import { Point } from './point';

export function rotatePoint(point: Point, rotationCenter: Point, angle: number) {
  const translatedPoint: Point = {
    x: point.x - rotationCenter.x,
    y: point.y - rotationCenter.y
  };

  return {
    x: Math.round(Math.cos(angle) * translatedPoint.x - Math.sin(angle) * translatedPoint.y + rotationCenter.x),
    y: Math.round(Math.sin(angle) * translatedPoint.x + Math.cos(angle) * translatedPoint.y + rotationCenter.y)
  }
}

export function changePoints(points: Point[], dx: number, dy: number) {
  for (let p of points) {
    p.x += dx;
    p.y += dy;
  }
}

export function isIntersected(points1: Point[], points2: Point[]) {
  return points1.some(p1 => points2.some(p2 => p1.x === p2.x && p1.y === p2.y));
}
