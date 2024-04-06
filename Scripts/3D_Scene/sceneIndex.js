import * as THREE from 'three';
import { SceneManager } from './ThreeSubSystems/sceneManager.js';
import { RenderManager } from './ThreeSubSystems/renderManager.js';
import { CameraManager } from './ThreeSubSystems/cameraManager.js';


const container = document.getElementById(THREE_CONTAINER_ID);

// Create THREE.JS sub-systems
const renderManager = new RenderManager(container);
const cameraManager = new CameraManager(container, renderManager.renderer);
const sceneManager = new SceneManager();

const scene = sceneManager.scene;
const camera = cameraManager.camera;

renderManager.initialise(scene, camera);

// Create cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffaf00 } );
const cube = new THREE.Mesh( geometry, material );

sceneManager.scene.add(cube);

let clock = new THREE.Clock();


function animate() 
{
	requestAnimationFrame( animate );

	cube.rotation.x += 0.005;
	cube.rotation.y += 0.005;

	sceneManager.update(clock.getDelta());

	renderManager.update(clock.getDelta())
}
animate();


window.addEventListener('resize', function() {
	renderManager.onSceneResize();
	cameraManager.onSceneResize();
});
