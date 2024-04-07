import * as THREE from 'three';
import { SceneManager } from './ThreeSubSystems/sceneManager.js';
import { RenderManager } from './ThreeSubSystems/renderManager.js';
import { CameraManager } from './ThreeSubSystems/cameraManager.js';
import { HDRILoader } from './Loaders/HDRILoader.js';
import { LoadingManager } from './Loaders/loadingManager.js';


const container = document.getElementById(THREE_CONTAINER_ID);

// THREE.JS sub-systems
const renderManager = new RenderManager(container);
const cameraManager = new CameraManager(container, renderManager.renderer);
const sceneManager = new SceneManager();

const scene = sceneManager.scene;
const camera = cameraManager.camera;

renderManager.initialise(scene, camera);

// Content Loaders
const loadingManager = new LoadingManager()

var lightOptions = {
    mapping: THREE.EquirectangularReflectionMapping,
    outputEncoding: THREE.sRGBEncoding,
    toneMapping: true,
	setHDRAsBackground: true,
    toneMappingExposure: 2
};
const hdriLightLoader = new HDRILoader(scene, renderManager.renderer, loadingManager.manager);
hdriLightLoader.loadHDRI(new URL(HDRI_PATH, baseUrl), lightOptions);

// Create cube
const cube = new THREE.Mesh( 
	new THREE.BoxGeometry( 1, 1, 1 ), 
	new THREE.MeshStandardMaterial({
		roughness: 1,
		color: 0xffaf00
	}) 
);

sceneManager.scene.add(cube);

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
