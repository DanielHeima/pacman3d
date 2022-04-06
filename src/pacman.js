export class Pacman {
  constructor() {
    this.geometry = new THREE.SphereGeometry(10, 10, 10);
    this.material = new THREE.MeshBasicMaterial({ color: "yellow" });
    this.sphere = new THREE.Mesh(this.geometry, this.material);
  }
  update() {
    this.sphere.rotation.x += 0.01;
    this.sphere.rotation.y += 0.02;
    this.sphere.rotation.z += 0.01;
  }
}