import * as THREE from 'three';


export class CameraManager
{
	constructor(sceneContainer)
	{
		this.container = sceneContainer;

		this.camera = new THREE.PerspectiveCamera( 75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000 );
		this.camera.position.set(0, 1, 5);
	}
	

	update(deltaTime) {}

	onSceneResize() 
	{
		let width = this.container.clientWidth;
		let height = this.container.clientHeight;
		
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
	}

	getCameraObject()
	{
		return this.camera;
	}
}