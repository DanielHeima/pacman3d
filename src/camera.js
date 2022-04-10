export class ThirdPersonCamera {
  constructor(target, camera) {
    this._target = target;
    this._camera = camera;

    this._currentPosition = new THREE.Vector3();
    this._currentLookat = new THREE.Vector3();
  }

  calculateIdealOffset() {
    const idealOffset = new THREE.Vector3(-20, 0, 30);
    idealOffset.applyQuaternion(this._target.quaternion);
    idealOffset.add(this._target.position);
    return idealOffset;
  }

  calculateIdealLookat() {
    const idealLookat = new THREE.Vector3(20, 0, 0);
    idealLookat.applyQuaternion(this._target.quaternion);
    idealLookat.add(this._target.position);
    return idealLookat;
  }

  update() {
    const idealOffset = this.calculateIdealOffset();
    const idealLookat = this.calculateIdealLookat();

    this._currentPosition.copy(idealOffset);
    this._currentLookat.copy(idealLookat);

    this._camera.position.copy(this._currentPosition);
    this._camera.lookAt(this._currentLookat);
  }
}
