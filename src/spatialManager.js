import { entityManager } from "../index.js";
export class SpatialManager {
  constructor() {
    this.time = 0;
  }

  // assume objects have radius
  isSphereCollision(obj1, obj2) { 
    // hunsum z, fyrir utan það sem er (langt) undir map
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

  // check for wall collision against ghost or pacman
  // g.r.f. bounding box um sphere
  isWallCollision(entity) {
    // for all walls, check if colliding
    // return -1 if no collision
    // return 0 if x collision
    // return 1 if y collision
    for (let wall of entityManager.level.walls) {
      let coll = this.isSphereWallCollision(entity, wall);
      if (coll != -1) return coll;
    }  
  
    return -1;
  }

  isSphereWallCollision(entity, wall) {
    const { leftXwall, rightXwall, upYwall, downYwall } = wall.getDims();
    
    // position and nextPosition
    let x = entity.position.x;
    let y = entity.position.y;
    let nextX = entity.nextX;
    let nextY = entity.nextY;
    this.time+=1;
    

    // dims and nextDims
    const leftXent = x - entity.radius;
    const rightXent = x + entity.radius;
    const upYent = y + entity.radius;
    const downYent = y - entity.radius;
    const nextleftXent = nextX - entity.radius;
    const nextrightXent = nextX + entity.radius;
    const nextupYent = nextY + entity.radius;
    const nextdownYent = nextY - entity.radius;

    if (this.time % 10000 == 0) {
      console.log(downYwall, upYwall);
    }
  
    // nextY á milli downYwall og upYwall
    if (downYwall < nextY && nextY < upYwall) {
      // console.log("nextY a milli downYwall og upYwall")
      // left to right
      // && right vinstra megin vid leftXwall en nextright hægra megin
      if (rightXent < leftXwall && nextrightXent > leftXwall) {
        console.log("left to right");
        return 0;
      }      
      // right to left
    }


    // down to up

    // up to down;
    
    
    return -1;
  }
}