import { scene, camera, entityManager, spatialManager } from "../index.js";
import { keys,
        KEY_W,
        KEY_A,
        KEY_S,
        KEY_D,
       } from "./keys.js"

const killerModeDuration = 10; // seconds
export class Pacman {
  constructor(pos) {
    if (!pos) {
      pos = [450, 200];
    }
    this.countdownTimers = [];
    this.modeKiller = false;
    this.origX = pos[0];
    this.origY = pos[1];
    this.radius = 10;
    this.geometry = new THREE.SphereGeometry(this.radius, 100, 100, 0, 5.5);
    this.material = new THREE.MeshPhongMaterial({ color: "yellow", specular: "#111111", shininess: 30, combine: THREE.MultiplyOperation, reflectivity: 0.6 });
    this.shape = new THREE.Mesh(this.geometry, this.material);
    // this.direction = -1; // default stop
    this.position = new THREE.Vector3(this.origX, this.origY, 0);
    this.shape.position.copy(this.position);
    this.defaultVel = 1;
    this.killModeVel = 2;
    this.vel = this.defaultVel; // pacmans velocity
    this.velX = 0;
    this.velY = 0;
  }
  update() {
    if (keys[KEY_W]) {
      this.velX = 0;
      this.velY = this.vel;
    }
    if (keys[KEY_A]) {
      this.velX = -this.vel;
      this.velY = 0;
    }
    if (keys[KEY_S]) {
      this.velX = 0;
      this.velY = -this.vel;
    }
    if (keys[KEY_D]) {
      this.velX = this.vel;
      this.velY = 0;
    }
    // temp camera
    let cpos = new THREE.Vector3(this.position["x"]-10, this.position["y"]-10, this.position["z"] + 60  );

    // this.collide()

    // finally update position;
    this.position["x"] += this.velX;
    this.position["y"] += this.velY;
    this.shape.position.copy(this.position);
    this.shape.updateMatrix();
    
    // dummy camera
    // camera.position.copy(cpos);
    // camera.lookAt(this.position);
  }

  collide() {
    this.nextX = this.position["x"] + this.velX;
    this.nextY = this.position["y"] + this.velY;

    switch(spatialManager.isWallCollision(this)) {
      case 0:
        this.velX = 0;
        break;
      case 1:
        this.velY = 0;
        break;
      default: 
        break;
    }
    

  }

  killModeActivate() {
    this.modeKiller = true;
    this.updateVel();
    for (let ghost of entityManager.ghosts) {
      ghost.panik();
    }
    // cancelum gomlum timers
    for (let timeout of this.countdownTimers) {
      clearTimeout(timeout);
    }
    // geyma timer til ad geta cancelad ef vid finnum annan special boi food
    this.countdownTimers.push(setTimeout(() => {
      this.modeKiller = false;
      this.vel = this.defaultVel;
      this.updateVel();
      
      for (let ghost of entityManager.ghosts) {
        ghost.kalm();
      }

    }, 1000 * killerModeDuration));
  }

  updateVel() {
    this.vel = this.modeKiller ? this.killModeVel : this.defaultVel;
    
    // also.... need this so we don't wait until next keypress to update
    if (this.velX != 0) {
      this.velX = this.velX > 0 ? this.vel : -this.vel;
    }
    if (this.velY != 0) {
      this.velY = this.velY > 0 ? this.vel : -this.vel;
    }

  }


}