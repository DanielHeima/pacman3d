import { entityManager } from "../index.js";
export class SpatialManager {
  constructor() {

  }

  // assume objects have radius
  areSpheresColliding(obj1, obj2) { 
    // hunsum z, fyrir utan það sem er undir map
    if (obj1.z < -100 || obj2.z < -100) return false;
    // ef lengd á milli (x1, y1) og (x2,y2) < radius1+radius2 þá collision
    let x1 = obj1.position.x;
    let x2 = obj2.position.x;
    let y1 = obj1.position.y;
    let y2 = obj2.position.y;
    let radius1 = obj1.radius;
    let radius2 = obj2.radius;

    // length squared
    let lengthsq = Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2);

    return lengthsq < Math.pow(radius1 + radius2, 2);
  }

  isPacWallCollision(pac, wall) {

  }


}