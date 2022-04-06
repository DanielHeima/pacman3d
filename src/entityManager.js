import { Pacman } from "./pacman.js";

let noGhosts = 4;

export class EntityManager {
  ghosts = [];
  foods = [];
  constructor() {
    this.pacman = new Pacman();

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
}
