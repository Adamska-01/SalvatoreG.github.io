import type * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';


export class ModelLoader {
	private readonly loader: GLTFLoader;

	constructor(loadingManager: THREE.LoadingManager) {
		this.loader = new GLTFLoader(loadingManager);
	}

	loadGLTFModel(modelURL: string, objCallback: (gltf: GLTF) => void): void {
		this.loader.load(modelURL, objCallback, undefined, (error) => {
			console.error(error);
		});
	}
}