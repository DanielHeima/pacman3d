import { Pacman } from "./pacman.js";
import { scene } from "../index.js"
import { Floor } from "./floor.js";
import { Wall } from "./wall.js";

let noGhosts = 4;

export class EntityManager {
  ghosts = [];
  foods = [];
  constructor() {
    this.pacman = new Pacman();
    this.plane = new Floor();
    this.wall = new Wall(100, 10, 1);
    this.wall.setPos(30,30,30);

  }

  update() {
    this.pacman.update();
 
    for (food of this.foods) {
      food.update();
    }

    for (ghost of this.ghosts) {
      ghost.update();
    }
  }

  kill(obj) {
    scene.remove(obj);
  }
}
