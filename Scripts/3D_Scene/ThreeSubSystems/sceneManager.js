import * as THREE from 'three';


export class SceneManager 
{
	constructor() 
	{
		this.sceneObjects = [];
		
		this.scene = new THREE.Scene();
	}


	AddObjectToScene(obj) 
	{
		this.sceneObjects.push(obj);
		this.scene.add(obj.entity);
	}

	update(deltaTime) 
	{
		for(var i = 0; i < this.sceneObjects.length; i++) 
		{
			this.sceneObjects[i].update(deltaTime);
		}
	}
}
