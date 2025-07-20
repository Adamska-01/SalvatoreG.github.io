import { EntityObject } from "../entityObject.js";
import * as THREE from 'three';


export class CodingSetup extends EntityObject
{
	constructor(loader, sceneManager)
	{
		super();
		
		let modelURL = new URL(CODING_SETUP_MODEL_PATH, baseUrl);

		loader.loadGLTFModel(modelURL.href, (gltf) => {
			this.entity = gltf.scene;
			this.entity.position.set(0.0, -5.0, 0.0);
			
			sceneManager.AddObjectToScene(this);

			// Setup animations
			if (gltf.animations && gltf.animations.length > 0) {
				this.animationMixer = new THREE.AnimationMixer(this.entity);

				for (let clip of gltf.animations) {
					const action = this.animationMixer.clipAction(clip);
					action.loop = THREE.LoopRepeat;
					action.play();
				}
			}
		});
	}

	update(deltaTime)
	{
		super.update(deltaTime);

		if (this.animationMixer) 
		{
			this.animationMixer.update(deltaTime);
		}
	}
}