import { scene } from "../index.js";
import { keys,
        KEY_W,
        KEY_A,
        KEY_S,
        KEY_D,
       } from "./keys.js"

export class Pacman {
  constructor() {
    this.geometry = new THREE.SphereGeometry(10, 10, 10);
    this.material = new THREE.MeshBasicMaterial({ color: "yellow" });
    this.sphere = new THREE.Mesh(this.geometry, this.material);
    this.sphere.matrixAutoUpdate = false;
    this.position = new THREE.Vector3(0,0,0);
    this.vel = 0.5;
  }
  update() {
    // this.sphere.rotation.x += 0.01;
    // this.sphere.rotation.y += 0.02;
    // this.sphere.rotation.z += 0.01;
    if (keys[KEY_W]) {
      this.position["y"] += this.vel;
      console.log(this.position);
      this.sphere.position.copy(this.position);
      this.sphere.updateMatrix();
    }
    if (keys[KEY_A]) {
      this.position["x"] -= this.vel;
      console.log(this.position);
      this.sphere.position.copy(this.position);
      this.sphere.updateMatrix();
    }
    if (keys[KEY_S]) {
      this.position["y"] -= this.vel;
      console.log(this.position);
      this.sphere.position.copy(this.position);
      this.sphere.updateMatrix();
    }
    if (keys[KEY_D]) {
      this.position["x"] += this.vel;
      console.log(this.position);
      this.sphere.position.copy(this.position);
      this.sphere.updateMatrix();
    }

  }
}