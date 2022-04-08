import { EntityManager } from "./src/entityManager.js";
import { keys } from "./src/keys.js"
import { SpatialManager } from "./src/spatialManager.js";

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
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const ambLight = new THREE.AmbientLight( 0x404040 ); // soft white light
ambLight.position.z = 50;

const dirLight = new THREE.DirectionalLight( 0xffffff);
dirLight.position.set(10,10,10);
scene.add( ambLight );
scene.add( dirLight );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export const entityManager = new EntityManager(); //singleton
export const spatialManager = new SpatialManager(); // singleton


// dummy floor
const dummyfloorGeometry = new THREE.PlaneGeometry( 800, 1000 );
const dummyMat = new THREE.MeshPhongMaterial({ color: "grey"});
const dummyFloor = new THREE.Mesh(dummyfloorGeometry, dummyMat)
dummyFloor.position.z = -10;
scene.add(dummyFloor);


// entityManager.kill(entityManager.pacman.sphere);

camera.position.z = 30;

function render() {
  requestAnimationFrame(render);
  entityManager.update();
  renderer.render(scene, camera);
};

render();