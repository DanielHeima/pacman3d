import { EntityManager } from "./src/entityManager.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const entityManager = new EntityManager();

scene.add(entityManager.pacman.sphere);

camera.position.z = 30;

function render() {
  requestAnimationFrame(render);
  entityManager.update();
  renderer.render(scene, camera);
};

render();