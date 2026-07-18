import * as THREE from 'three';
import { EntityObject } from './entityObject';
import type { ModelLoader } from './modelLoader';
import type { SceneManager } from './sceneManager';


export class CodingSetup extends EntityObject {
	private animationMixer?: THREE.AnimationMixer;

	constructor(modelURL: string, loader: ModelLoader, sceneManager: SceneManager) {
		super();

		loader.loadGLTFModel(modelURL, (gltf) => {
			this.entity = gltf.scene;
			this.entity.position.set(0.0, -5.0, 0.0);

			sceneManager.addObjectToScene(this);

			if (gltf.animations.length > 0) {
				this.animationMixer = new THREE.AnimationMixer(this.entity);

				for (const clip of gltf.animations) {
					const action = this.animationMixer.clipAction(clip);
					action.loop = THREE.LoopRepeat;
					action.play();
				}
			}
		});
	}

	override update(deltaTime: number): void {
		this.animationMixer?.update(deltaTime);
	}
}