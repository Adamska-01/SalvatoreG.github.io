import * as THREE from 'three';
import { EntityObject } from './entityObject';
import type { ModelLoader } from './modelLoader';
import type { SceneManager } from './sceneManager';


export interface CodingSetupHooks {
	onProgress?: (loaded: number, total: number) => void;
	/**
	 * Runs before the object enters the scene. Used to pre-compile shaders and
	 * upload textures asynchronously — otherwise the first rendered frame does
	 * it synchronously and freezes the page for seconds on some GPUs/drivers.
	 */
	prepare?: (obj: THREE.Object3D) => Promise<unknown>;
	onReady?: () => void;
	onError?: (url: string) => void;
}

export class CodingSetup extends EntityObject {
	private animationMixer?: THREE.AnimationMixer;

	constructor(modelURL: string, loader: ModelLoader, sceneManager: SceneManager, hooks: CodingSetupHooks = {}) {
		super();

		loader.loadGLTFModel(
			modelURL,
			async (gltf) => {
				this.entity = gltf.scene;
				this.entity.position.set(0.0, -5.0, 0.0);

				await hooks.prepare?.(this.entity);

				sceneManager.addObjectToScene(this);

				if (gltf.animations.length > 0) {
					this.animationMixer = new THREE.AnimationMixer(this.entity);

					for (const clip of gltf.animations) {
						const action = this.animationMixer.clipAction(clip);
						action.loop = THREE.LoopRepeat;
						action.play();
					}
				}

				hooks.onReady?.();
			},
			hooks.onProgress,
			hooks.onError
		);
	}

	override update(deltaTime: number): void {
		this.animationMixer?.update(deltaTime);
	}
}