export class Wall {
  constructor(width, height, depth) {
    this.geometry = new THREE.BoxGeometry(width, height, depth);
    this.material = new THREE.MeshPhongMaterial({ color : "green"});
    this.shape = new THREE.Mesh(this.geometry, this.material);
  }

  setPos(posX, posY, posZ) {
    this.shape.position.x = posX;
    this.shape.position.y = posY;
    this.shape.position.z = posZ;
  }

}