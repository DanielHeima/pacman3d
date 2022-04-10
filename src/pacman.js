import { ThirdPersonCamera } from "./camera.js";
import {
  scene,
  camera,
  entityManager,
  spatialManager,
  cameraTP,
} from "../index.js";
import { keys, KEY_W, KEY_A, KEY_S, KEY_D } from "./keys.js";

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
    this.material = new THREE.MeshPhongMaterial({
      color: "yellow",
      specular: "#111111",
      shininess: 30,
      combine: THREE.MultiplyOperation,
      reflectivity: 0.6,
    });
    this.shape = new THREE.Mesh(this.geometry, this.material);
    // this.direction = -1; // default stop
    this.position = new THREE.Vector3(this.origX, this.origY, 0);
    this.shape.position.copy(this.position);
    this.defaultVel = 2;
    this.killModeVel = 3;
    this.vel = this.defaultVel; // pacmans velocity
    this.velX = 0;
    this.velY = 0;
    this.direction = 0;
  }

  update() {
    const controlObject = this.shape;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();
    console.log(_R);

    if (keys[KEY_W]) {
      this.velX = 0;
      this.velY = this.vel;

      //this.shape.rotation.z = Math.PI / 2;
      this.shape.quaternion.setFromAxisAngle(
        new THREE.Vector3(0, 0, 1),
        Math.PI / 2
      );
    }
    if (keys[KEY_A]) {
      this.velX = -this.vel;
      this.velY = 0;
      //this.shape.rotation.z = Math.PI;
      this.shape.quaternion.setFromAxisAngle(
        new THREE.Vector3(0, 0, 1),
        Math.PI
      );
    }
    if (keys[KEY_S]) {
      this.velX = 0;
      this.velY = -this.vel;
      //this.shape.rotation.z = 0;
      this.shape.quaternion.setFromAxisAngle(
        new THREE.Vector3(0, 0, 1),
        (Math.PI * 3) / 2
      );
    }
    if (keys[KEY_D]) {
      this.velX = this.vel;
      this.velY = 0;
      //this.shape.rotation.z = (Math.PI * 3) / 2;
      this.shape.quaternion.setFromAxisAngle(
        new THREE.Vector3(0, 0, 1),
        2 * Math.PI
      );
      cameraTP.camera.quaternion.setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        (Math.PI * 3) / 2
      );
    }

    controlObject.quaternion.clone(_R); // her ef vid viljum smooth seinna

    this.position["x"] += this.velX;
    this.position["y"] += this.velY;

    this.shape.position.copy(this.position);
    this.shape.updateMatrix();

    cameraTP.update();
  }

  collide() {
    this.nextX = this.position["x"] + this.velX;
    this.nextY = this.position["y"] + this.velY;

    switch (spatialManager.isWallCollision(this)) {
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
    this.countdownTimers.push(
      setTimeout(() => {
        this.modeKiller = false;
        this.vel = this.defaultVel;
        this.updateVel();

        for (let ghost of entityManager.ghosts) {
          ghost.kalm();
        }
      }, 1000 * killerModeDuration)
    );
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

function eatKey(keyCode) {
  if (keys[keyCode]) {
    keys[keyCode] = false;
    return true;
  } else return false;
}
