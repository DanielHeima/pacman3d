// prettier-ignore
import {Wall} from './wall.js';
import { Floor } from "./floor.js";
import { Food } from "./food.js";

export class Level {
  // prettier-ignore
  levelLayout = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
      [0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0],
      [0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0],
      [0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
      [0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0],
      [0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0],
      [0,0,0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0],
      [0,0,0,0,0,0,0,0,1,0,0,0,0,0,2,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,1,0,0,0,0,0,2,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,1,0,0,2,2,2,2,2,2,2,2,2,2,0,0,1,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,3,3,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,1,0,0,2,0,3,3,3,3,3,3,0,2,0,0,1,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,1,0,0,2,0,3,3,3,3,3,3,0,2,0,0,1,0,0,0,0,0,0,0,0],
      [4,4,4,2,2,2,2,2,1,2,2,2,0,3,3,3,3,3,3,0,2,2,2,1,2,2,2,2,2,4,4,4],
      [0,0,0,0,0,0,0,0,1,0,0,2,0,3,3,3,3,3,3,0,2,0,0,1,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,1,0,0,2,2,2,2,2,2,2,2,2,2,0,0,1,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
      [0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0],
      [0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0],
      [0,0,0,1,1,1,0,0,1,1,1,1,1,1,1,9,9,1,1,1,1,1,1,1,0,0,1,1,1,0,0,0],
      [0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0],
      [0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0],
      [0,0,0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0],
      [0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
      [0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ];

  walls = [];
  foodsCoord = [];
  ghostSpawnCoord = [];
  //kannski ekki flott ad hafa fylki hér
  pacmanSpawnCoord = [];
  baseLength = 30;
  middle = 15 * this.baseLength;
  constructor() {
    this.floor = new Floor(this.baseLength * 32, this.baseLength * 32);
    this.init();
  }

  init() {
    for (let i = 0; i < 32; i++) {
      for (let j = 0; j < 32; j++) {
        //let temp = this.parseChunck(this.levelLayout[i][j], i, j);
        //this.walls.push(temp);

        switch (this.levelLayout[i][j]) {
          case 0:
            // wall block
            let newWall = new Wall(
              this.baseLength,
              this.baseLength,
              this.baseLength * 2
            );
            newWall.shape.position.x = i * this.baseLength; //hmm oo hell
            newWall.shape.position.y = j * this.baseLength; // hmmm
            this.walls.push(newWall);
            break;
          case 1:
            // food spawn
            let xfoodCoord = i * this.baseLength;
            let yfoodCoord = j * this.baseLength;
            let foodCoord = [xfoodCoord, yfoodCoord];
            this.foodsCoord.push(foodCoord);
            break;
          case 3:
            let xGhostCoord = i * this.baseLength;
            let yGhostCoord = j * this.baseLength;
            let ghostCoord = [xGhostCoord, yGhostCoord];
            this.ghostSpawnCoord.push(ghostCoord);
            break;
          case 4:
            // teleport
            break;
          case 9:
            let xPacmanCoord = i * this.baseLength;
            let yPacmanCoord = j * this.baseLength;
            let pacmanCoord = [xPacmanCoord, yPacmanCoord];
            this.pacmanSpawnCoord.push(pacmanCoord);
            break;
          default:
        }
      }
    }
  }

  /*
    parseChunck(cunckVal, xiCord, yjCord) {
      let out;
      switch (cunckVal) {
        case 0:
          // wall block
          let newWall = new Wall(this.baseLength,this.baseLength, this.baseLength * 2);
          newWall.shape.position.x = xiCord*this.baseLength; //hmm oo hell
          newWall.shape.position.y = yjCord*this.baseLength; // hmmm
          out = newWall;
          break;
        case 1:
          // food spawn
          let food = new Food(xiCord + this.baseLength / 2 , yjCord + this.baseLength / 2); // mid
          //testing purpose set eg i walls
          console.log(food);
          out = food;
          break;
        case 3:
          // ghosts spawn
          break;
        case 4: 
          // teleport 
          break;
        case 9: 
          // pacman spawn
          break;
        default:
          out = null;
      }
      return out;
    }
    */
}
