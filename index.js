import { EntityManager } from "./src/entityManager.js";
import { keys } from "./src/keys.js"

window.onload = function init () {
   // Meðhöndlun lykla
   window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
  });

  window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
  });
}

export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const entityManager = new EntityManager();

scene.add(entityManager.pacman.sphere);
// entityManager.kill(entityManager.pacman.sphere);

camera.position.z = 30;

function render() {
  requestAnimationFrame(render);
  entityManager.update();
  renderer.render(scene, camera);
};

render();