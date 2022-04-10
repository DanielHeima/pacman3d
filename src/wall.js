export class Wall {
  constructor(width, height, depth) {
    this.geometry = new THREE.BoxGeometry(width, height, depth);
    this.material = new THREE.MeshPhongMaterial({ color : "green"});
    this.shape = new THREE.Mesh(this.geometry, this.material);
    this.width = width;
    this.height = height;
    this.leftX = this.shape.position.x + this.width/2;
    this.rightX = this.shape.position.x - this.width/2;
    this.upY = this.shape.position.y + this.height/2;
    this.downY = this.shape.position.x - this.height/2;
  }

  // virdist ekki vera nodad?
  setPos(posX, posY, posZ) {
    this.shape.position.x = posX;
    this.shape.position.y = posY;
    this.shape.position.z = posZ;
  }

  getPos() {
    return this.shape.position;
  }

  getDims() {
    return {
      leftX: this.leftX,
      rightX: this.rightX,
      upY: this.upY,
      downY: this.downY
    }
  }

}