import * as THREE from 'three';
import type { EntityObject } from './entityObject';


export class SceneManager {
	readonly scene = new THREE.Scene();

	private readonly sceneObjects: EntityObject[] = [];

	addObjectToScene(obj: EntityObject): void {
		if (!obj.entity) return;

		this.sceneObjects.push(obj);
		this.scene.add(obj.entity);
	}

	update(deltaTime: number): void {
		for (const obj of this.sceneObjects) {
			obj.update(deltaTime);
		}
	}
}