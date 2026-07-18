import * as THREE from 'three';
import { EntityObject } from './entityObject';
import type { SceneManager } from './sceneManager';


export class AmbientLightEntity extends EntityObject {
	constructor(color: THREE.ColorRepresentation, intensity: number, sceneManager: SceneManager) {
		super();

		this.entity = new THREE.AmbientLight(color, intensity);

		sceneManager.addObjectToScene(this);
	}
}