import { Pacman } from "./pacman.js";
import { scene, level } from "../index.js"
import { Ghost } from "./ghost.js";
import { Food } from "./food.js";
import { Level } from "./level.js";


let noGhosts = 4;

export class EntityManager {
  ghosts = [];
  foods = [];
  colors = ["red", "cyan", "pink", "orange"];
  constructor() {
    // make mr man
    this.pacman = new Pacman();
    scene.add(this.pacman.shape);

    // make ghosts
    for (let i = 0; i < noGhosts; i +=1) {
      let x = level.middle + Math.floor(Math.random() * 40);
      let y = level.middle + Math.floor(Math.random() * 40);
      let ghost = new Ghost(x, y, this.colors[i % this.colors.length]);
      scene.add(ghost.shape);
      this.ghosts.push(ghost);
    }

    this.level = new Level();

    const testWalls = this.level.walls;
    const testFoodsCoord = this.level.foodsCoord;

    testWalls.forEach((item) => {
      if (item == null) return; // dont push null;
      scene.add(item.shape);
    });

    testFoodsCoord.forEach((item) => {
      if (item == null) return;
      let xCoord = item[0];
      let yCoord = item[1];
      this.addFood(xCoord, yCoord);
    });

    // make food
    // dummy forloop, nota gagnagrind fra odur
    //let noFood = 10;
    //for (let i = 0 ; i < noFood; i+=1) {
    //  let special = Math.random() < 0.1 ? true : false;
    //  let x = Math.floor(Math.random() * 300);
    //  let y = Math.floor(Math.random() * 300);
    //  let food = new Food(x, y, special);
    //  scene.add(food.shape);
    //  this.foods.push(food);
    //}
  }

  addFood(x, y) {
    let special = Math.random() < 0.1 ? true : false;
    let food = new Food(x, y, special);
    scene.add(food.shape);
    this.foods.push(food);
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
