import { scene, camera } from "../index.js";
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
    this.direction = -1;
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
    let cpos = new THREE.Vector3(this.position["x"], this.position["y"], this.position["z"] + 30  );;
    console.log(cpos)
    console.log(this.position)
    
    switch(this.direction) {
      case 0:
        this.position["y"] += this.vel;
        this.sphere.position.copy(this.position);
        this.sphere.updateMatrix();
        camera.position.copy(cpos); // finpussa
        break;
      case 2:
        this.position["y"] -= this.vel;
        this.sphere.position.copy(this.position);
        this.sphere.updateMatrix();
        break;
      case 1:
        this.position["x"] -= this.vel;
        this.sphere.position.copy(this.position);
        this.sphere.updateMatrix();
        break;
      case 3: 
        this.position["x"] += this.vel;
        this.sphere.position.copy(this.position);
        this.sphere.updateMatrix();
        break;
      default:
        break;      
    }
  }
}