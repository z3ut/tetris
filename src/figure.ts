import { Point } from './point';
import { Brick } from './brick';

export interface Figure {
  center: Point;
  color: string;
  bricks: Brick[];
}
