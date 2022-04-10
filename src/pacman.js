import { scene, camera, entityManager } from "../index.js";
import { keys,
        KEY_W,
        KEY_A,
        KEY_S,
        KEY_D,
       } from "./keys.js"

const killerModeDuration = 10; // seconds
export class Pacman {
  constructor() {
    this.countdownTimers = [];
    this.modeKiller = false;
    this.origX = 0;
    this.origY = 0;
    this.radius = 10;
    this.geometry = new THREE.SphereGeometry(this.radius, 100, 100, 0, 5.5);
    this.material = new THREE.MeshPhongMaterial({ color: "yellow", specular: "#111111", shininess: 30, combine: THREE.MultiplyOperation, reflectivity: 0.6 });
    this.shape = new THREE.Mesh(this.geometry, this.material);
    this.shape.matrixAutoUpdate = false;
    this.vel = 0.5;
    this.direction = -1; // default stop
    this.position = new THREE.Vector3(this.origX, this.orygY, 0);
  }
  update() {
    console.log(this.modeKiller)
    if (keys[KEY_W]) {
      this.direction = 0;
    }
    if (keys[KEY_A]) {
      this.direction = 1;
    }
    if (keys[KEY_S]) {
      this.direction = 2;
    }
    if (keys[KEY_D]) {
      this.direction = 3;
    }
    let cpos = new THREE.Vector3(this.position["x"]-10, this.position["y"]-10, this.position["z"] + 30  );
    // console.log(cpos)
    // console.log(this.position)
    
    switch(this.direction) {
      case 0:
        this.position["y"] += this.vel;
        this.shape.position.copy(this.position);
        this.shape.updateMatrix();
        // camera.position.copy(cpos); // finpussa
        break;
      case 2:
        this.position["y"] -= this.vel;
        this.shape.position.copy(this.position);
        this.shape.updateMatrix();
        camera.position.copy(cpos); // finpussa, gera lika vid 1 og 3
        break;
      case 1:
        this.position["x"] -= this.vel;
        this.shape.position.copy(this.position);
        this.shape.updateMatrix();
        break;
      case 3: 
        this.position["x"] += this.vel;
        this.shape.position.copy(this.position);
        this.shape.updateMatrix();
        break;
      default:
        break;      
    }
    //camera.lookAt(this.position);
  }
  killModeActivate() {
    this.modeKiller = true;
    for (let ghost of entityManager.ghosts) {
      ghost.panik();
    }
    // cancelum gomlum timers
    for (let timeout of this.countdownTimers) {
      clearTimeout(timeout);
    }
    // geyma timer til ad geta cancelad ef vid finnum annan special boi
    this.countdownTimers.push(setTimeout(() => {
      this.modeKiller = false;
      for (let ghost of entityManager.ghosts) {
        ghost.kalm();
      }

    }, 1000 * killerModeDuration));
  }
}