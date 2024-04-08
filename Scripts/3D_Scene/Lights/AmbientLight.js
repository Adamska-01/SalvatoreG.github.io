import * as THREE from 'three';
import { EntityObject } from "../entityObject.js";


export class AmbientLight extends EntityObject
{
	constructor(color, intensity, sceneManager)
	{
		super();
		
		this.entity = new THREE.AmbientLight(color, intensity);

		sceneManager.AddObjectToScene(this);
	}
}