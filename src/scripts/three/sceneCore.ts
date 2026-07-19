import { AmbientLightEntity } from './ambientLight';
import { CameraManager } from './cameraManager';
import { CodingSetup } from './codingSetup';
import { ModelLoader } from './modelLoader';
import { RenderManager } from './renderManager';
import { SceneManager } from './sceneManager';
import type { OrbitInputElement } from './cameraOrbitController';


export interface SceneCoreOptions {
	canvas: HTMLCanvasElement | OffscreenCanvas;
	/** Element (or worker-side proxy) OrbitControls listens on */
	inputElement: OrbitInputElement;
	width: number;
	height: number;
	pixelRatio: number;
	autoRotate: boolean;
	modelURL: string;
	onProgress: (loaded: number, total: number) => void;
	onReady: () => void;
	onError: (url: string) => void;
}

export interface SceneCore {
	resize(width: number, height: number): void;
}

/**
 * Builds and runs the full scene. Environment-agnostic: runs identically on
 * the main thread (fallback) and inside the scene worker.
 */
export function createScene(options: SceneCoreOptions): SceneCore {
	const renderManager = new RenderManager(options.canvas, options.width, options.height, options.pixelRatio);
	const cameraManager = new CameraManager(options.inputElement, {
		autoRotate: options.autoRotate,
		width: options.width,
		height: options.height,
	});
	const sceneManager = new SceneManager();

	renderManager.initialise(sceneManager.scene, cameraManager.camera);

	const modelLoader = new ModelLoader();

	new AmbientLightEntity(0xa290fe, 0.15, sceneManager);
	new CodingSetup(options.modelURL, modelLoader, sceneManager, {
		onProgress: options.onProgress,
		prepare: (obj) => renderManager.renderer.compileAsync(obj, cameraManager.camera, sceneManager.scene),
		onReady: options.onReady,
		onError: options.onError,
	});

	let previousTime: number | undefined;

	renderManager.renderer.setAnimationLoop((time: number) => {
		const deltaTime = previousTime === undefined ? 0 : (time - previousTime) / 1000;
		previousTime = time;

		sceneManager.update(deltaTime);
		renderManager.update(deltaTime);
		cameraManager.update(deltaTime);
	});

	return {
		resize(width: number, height: number): void {
			renderManager.onSceneResize(width, height);
			cameraManager.onSceneResize(width, height);
		},
	};
}