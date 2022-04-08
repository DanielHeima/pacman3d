import { Pacman } from "./pacman.js";
import { scene } from "../index.js"
import { Ghost } from "./ghost.js";
import { Food } from "./food.js";

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
    scene.add(this.pacman.shape);

    // make ghosts
    for (let i = 0; i < noGhosts; i +=1) {
      let x = Math.floor(Math.random() * 200) +50;
      let y = Math.floor(Math.random() * 100);
      let ghost = new Ghost(x, y, this.colors[i % this.colors.length]);
      scene.add(ghost.shape);
      this.ghosts.push(ghost);
    }

    // make food

    // dummy forloop, nota gagnagrind fra odur
    let noFood = 10;
    for (let i = 0 ; i < noFood; i+=1) {
      let food = new Food(Math.floor(Math.random()*300), Math.floor(Math.random() * 300), false);
      scene.add(food.shape);
      this.foods.push(food);
    }

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

  killFood(obj) {
    obj.setPosition(new THREE.Vector3(1000, 1000, -200));
    scene.remove(obj.shape);
  }
  
}
