import { scene, camera, entityManager, cameraTP } from "../index.js";
import { ThirdPersonCamera } from "./camera.js";
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
    this.direction = -1; // default stop
    this.position = new THREE.Vector3(this.origX, this.origY, 0);
    this.shape.position.copy(this.position);
    this.vel = 3;
  }

  update() {
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
    let cpos = new THREE.Vector3(
      this.position["x"],
      this.position["y"],
      this.position["z"] + 70
    );

    const controlObject = this.shape;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();

    switch (this.direction) {
      case 0:
        //let testq = _Q.rotateTowards(_R, Math.PI / 2);

        //this.shape.quaternion.copy(testq);

        this.position["y"] += this.vel;
        this.shape.position.copy(this.position);
        this.shape.updateMatrix();

        cameraTP.update(); // finpussa
        break;
      case 2:
        //_A.set(0, 1, 0);
        //_Q.setFromAxisAngle(_A, (Math.PI / 2) * 3);
        ////_R.multiply(_Q);

        //this.shape.quaternion.copy(_R);

        this.position["y"] -= this.vel;
        this.shape.position.copy(this.position);
        this.shape.updateMatrix();
        cameraTP.update(); // finpussa, gera lika vid 1 og 3
        break;
      case 1:
        //_A.set(0, 1, 0);
        //_Q.setFromAxisAngle(_A, Math.PI);
        //_R.multiply(_Q);

        //this.shape.quaternion.copy(_R);

        this.position["x"] -= this.vel;
        this.shape.position.copy(this.position);
        this.shape.updateMatrix();

        cameraTP.update();
        break;
      case 3:
        //_A.set(0, 1, 0);
        //_Q.setFromAxisAngle(_A, 0);
        //_R.multiply(_Q);

        //this.shape.quaternion.copy(_R);

        this.position["x"] += this.vel;
        this.shape.position.copy(this.position);
        this.shape.updateMatrix();
        cameraTP.update();
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
    this.countdownTimers.push(
      setTimeout(() => {
        this.modeKiller = false;
        for (let ghost of entityManager.ghosts) {
          ghost.kalm();
        }
      }, 1000 * killerModeDuration)
    );
  }
}
