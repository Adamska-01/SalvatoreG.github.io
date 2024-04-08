import * as THREE from 'three';
import { CameraOrbitController } from "./cameraOrbitController.js"


export class CameraManager
{
	constructor(sceneContainer, renderer)
	{
		this.container = sceneContainer;

		this.camera = new THREE.PerspectiveCamera( 75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000 );
		this.camera.position.set(0, -1, 5);

		var controllerOptions = {
			minPolarAngle: 0.2 * Math.PI,
			maxPolarAngle: 0.55 * Math.PI,
			idlePolarAngle: 0.35 * Math.PI,
			enableDamping: true,
			dampingFactor: 0.035,
			rotateSpeed: 0.65,
			enablePan: false,
			minDistance: 7.5,
			maxDistance: 15,
			cameraTarget: new THREE.Vector3(0, 0, 0),
		};
		this.orbitControls = new CameraOrbitController(this.camera, renderer, controllerOptions);
	}
	

	update(deltaTime) 
	{
		this.orbitControls.update(deltaTime);
	}

	onSceneResize() 
	{
		let width = this.container.clientWidth;
		let height = this.container.clientHeight;
		
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
	}
}