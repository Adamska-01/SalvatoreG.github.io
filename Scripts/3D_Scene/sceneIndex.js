import * as THREE from 'three';
import { SceneManager } from './ThreeSubSystems/sceneManager.js';
import { RenderManager } from './ThreeSubSystems/renderManager.js';
import { CameraManager } from './ThreeSubSystems/cameraManager.js';
import { LoadingManager } from './Loaders/loadingManager.js';
import { ModelLoader } from './Loaders/modelLoader.js';
import { CodingSetup } from './Models/codingSetup.js';
import { AmbientLight } from './Lights/AmbientLight.js';


const container = document.getElementById(THREE_CONTAINER_ID);

// THREE.JS sub-systems
const renderManager = new RenderManager(container);
const cameraManager = new CameraManager(container, renderManager.renderer);
const sceneManager = new SceneManager();

const scene = sceneManager.scene;
const camera = cameraManager.camera;

renderManager.initialise(scene, camera);

// Content Loaders
const loadingManager = new LoadingManager();
const modelLoader = new ModelLoader(loadingManager.manager);

new AmbientLight(0xa290fe, 0.15, sceneManager);

// Load Models
new CodingSetup(modelLoader, sceneManager);


let clock = new THREE.Clock();
function animate() 
{
	requestAnimationFrame( animate );

	let deltaTime = clock.getDelta();
	
	sceneManager.update(deltaTime);

	renderManager.update(deltaTime);
	cameraManager.update(deltaTime);
}
animate();


window.addEventListener('resize', function() {
	renderManager.onSceneResize();
	cameraManager.onSceneResize();
});
