import { EntityObject } from "../entityObject.js";


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
		});
	}

	update(deltaTime)
	{
		super.update(deltaTime);
	}
}