import type * as THREE from 'three';


export abstract class EntityObject {
	entity?: THREE.Object3D;

	update(_deltaTime: number): void {}
}