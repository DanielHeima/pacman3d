
import { spatialManager, entityManager } from "../index.js";

export class Ghost {
  constructor(x = 100, y = 10, color = "red") {
    this.c = color;
    this.panicColor = "blue";
    this.panic = false;
    this.radius = 10;
    this.geometry = new THREE.CapsuleGeometry(this.radius, 15, 16, 32); // cons: radius, length, capSegs, heightSegs
    this.material = new THREE.MeshPhongMaterial({ color: this.c, specular: "#111111", emissive: "#404040", shininess: 30, combine: THREE.MultiplyOperation, reflectivity: 0.6 });
    this.shape = new THREE.Mesh(this.geometry, this.material);
    this.vel = 0.5;
    this.direction = Math.floor(Math.random() * 5);
    this.position = new THREE.Vector3(x, y, 0);
    this.shape.rotation.x = Math.PI / 2;
    this.shape.position.copy(this.position);
    setInterval(() => {
      this.direction = Math.floor(Math.random() * 5);
  }, 3000);
  }

  update() {
    if (this.panic) {
      //... ekki vera ad scanna amk.. kannski reyna ad fordast pacman
    } else {
      // this.scan();mby reyna ad fara i attina ad pacman...
    }
    this.collide();
 
    switch(this.direction) {
      case 0:
        this.position["y"] += this.vel;
        this.shape.position.copy(this.position);
        this.shape.updateMatrix();
        break;
      case 2:
        this.position["y"] -= this.vel;
        this.shape.position.copy(this.position);
        this.shape.updateMatrix();
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
  }
  collide () {
    if (spatialManager.areSpheresColliding(this, entityManager.pacman)) {
      console.log("collision");
    }
  }
  panik () {
    this.panic = true;
    this.shape.material.color.set(this.panicColor);
  }

  kalm () {
    this.panic = false;
    this.shape.material.color.set(this.c);
  }
}