import { AmbientLightEntity } from './ambientLight';
import { CameraManager } from './cameraManager';
import { CodingSetup } from './codingSetup';
import { LoadingProgress } from './loadingProgress';
import { ModelLoader } from './modelLoader';
import { RenderManager } from './renderManager';
import { SceneManager } from './sceneManager';
import { withBase } from '../paths';


let initialised = false;

export function initScene(): void {
	// The canvas persists across view transitions — never build the scene twice
	if (initialised)
		return;

	const canvas = document.getElementById('scene-canvas') as HTMLCanvasElement | null;
	if (!canvas)
		return;

	initialised = true;

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const renderManager = new RenderManager(canvas);
	const cameraManager = new CameraManager(canvas, renderManager.renderer, {
		autoRotate: !prefersReducedMotion,
	});
	const sceneManager = new SceneManager();

	renderManager.initialise(sceneManager.scene, cameraManager.camera);

	const loadingProgress = new LoadingProgress();
	const modelLoader = new ModelLoader(loadingProgress.manager);

	new AmbientLightEntity(0xa290fe, 0.15, sceneManager);
	new CodingSetup(withBase('/models/CodingSetup/scene.gltf'), modelLoader, sceneManager);

	let previousTime: number | undefined;

	renderManager.renderer.setAnimationLoop((time: number) => {
		const deltaTime = previousTime === undefined ? 0 : (time - previousTime) / 1000;
		previousTime = time;

		sceneManager.update(deltaTime);
		renderManager.update(deltaTime);
		cameraManager.update(deltaTime);
	});

	window.addEventListener('resize', () => {
		renderManager.onSceneResize();
		cameraManager.onSceneResize();
	});
}