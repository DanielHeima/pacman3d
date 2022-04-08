import { Pacman } from "./pacman.js";
import { scene } from "../index.js"
import { Ghost } from "./ghost.js";

let noGhosts = 4;

export class EntityManager {
  ghosts = [];
  foods = [];
  colors = [
    "red",
    "cyan",
    "pink",
    "orange"
  ]
  constructor() {
    // make mr man
    this.pacman = new Pacman();
    scene.add(this.pacman.pacShape);

    // make ghosts
    for (let i = 0; i < noGhosts; i +=1) {
      let x = Math.floor(Math.random() * 200) +50;
      let y = Math.floor(Math.random() * 100);
      let ghost = new Ghost(x, y, this.colors[i % this.colors.length]);
      scene.add(ghost.ghostShape);
      this.ghosts.push(ghost);
    }

    // make food
  }

  update() {
    this.pacman.update();
 
    for (let food of this.foods) {
      food.update();
    }

    for (let ghost of this.ghosts) {
      ghost.update();
    }
  }

  kill(obj) {
    scene.remove(obj);
  }
}
