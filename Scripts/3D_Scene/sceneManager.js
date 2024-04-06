import * as THREE from 'three';
import { CameraManager } from './cameraManager.js';


export class SceneManager 
{
	constructor(canvasContainer) 
	{
		this.sceneObjects = [];
		
		this.canvas = canvasContainer;
		
		this.scene = new THREE.Scene();
		
		this.renderer = new THREE.WebGLRenderer(
			{
				canvas: canvasContainer,
				antialias: true, 
				alpha: true
			}
		);
		this.renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight, false);
		this.renderer.setClearColor(0x1a2329, 1)

		this.cameraManager = new CameraManager(container); 
	}


	AddObjectToScene(obj) 
	{
		this.sceneObjects.add(obj);
		this.scene.add(obj);
	}

	update(deltaTime) 
	{
		for(var i = 0; i < this.sceneObjects.length; i++) 
		{
			this.sceneObjects[i].update(deltaTime);
		}

		this.renderer.render(this.scene, this.cameraManager.camera);
	}

	onSceneResize()
	{
		this.cameraManager.onSceneResize();
		this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);
	}
}
