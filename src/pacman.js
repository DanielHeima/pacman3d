import { scene, camera } from "../index.js";
import { keys,
        KEY_W,
        KEY_A,
        KEY_S,
        KEY_D,
       } from "./keys.js"

export class Pacman {
  constructor() {
    this.radius = 10;
    this.geometry = new THREE.SphereGeometry(this.radius, 100, 100, 0, 5.5);
    this.material = new THREE.MeshPhongMaterial({ color: "yellow", specular: "#111111", shininess: 30, combine: THREE.MultiplyOperation, reflectivity: 0.6 });
    this.pacShape = new THREE.Mesh(this.geometry, this.material);
    this.pacShape.matrixAutoUpdate = false;
    this.vel = 0.5;
    this.direction = -1; // default stop
    this.position = new THREE.Vector3(0, 0, 0);
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
    let cpos = new THREE.Vector3(this.position["x"]-10, this.position["y"]-10, this.position["z"] + 30  );
    // console.log(cpos)
    // console.log(this.position)
    
    switch(this.direction) {
      case 0:
        this.position["y"] += this.vel;
        this.pacShape.position.copy(this.position);
        this.pacShape.updateMatrix();
        // camera.position.copy(cpos); // finpussa
        break;
      case 2:
        this.position["y"] -= this.vel;
        this.pacShape.position.copy(this.position);
        this.pacShape.updateMatrix();
        camera.position.copy(cpos); // finpussa, gera lika vid 1 og 3
        break;
      case 1:
        this.position["x"] -= this.vel;
        this.pacShape.position.copy(this.position);
        this.pacShape.updateMatrix();
        break;
      case 3: 
        this.position["x"] += this.vel;
        this.pacShape.position.copy(this.position);
        this.pacShape.updateMatrix();
        break;
      default:
        break;      
    }
    camera.lookAt(this.position);

  }
}