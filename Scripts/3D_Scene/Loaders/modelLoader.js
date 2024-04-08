import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


export class ModelLoader
{
	constructor(loadingManager)
	{
		this.loader = new GLTFLoader(loadingManager);
	}
	

	loadGLTFModel(modelURL, objCallback)
	{
		this.loader.load(modelURL, (gltf) => {
			objCallback(gltf);
		}, 
		undefined, // progress
		function(error) {
			console.error(error);
		});
	}
}