import { createScene } from './sceneCore';
import { forwardElementEvents } from './elementProxy';
import { LoadingProgress } from './loadingProgress';
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

	const loadingProgress = new LoadingProgress();
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const sceneOptions = {
		width: canvas.clientWidth,
		height: canvas.clientHeight,
		pixelRatio: Math.min(window.devicePixelRatio, 2),
		autoRotate: !prefersReducedMotion,
		modelURL: new URL(withBase('/models/CodingSetup/scene.gltf'), window.location.origin).href,
	};

	// Preferred path: run the whole scene in a worker via OffscreenCanvas so
	// model parsing/shader compilation can never block the page.
	if (typeof canvas.transferControlToOffscreen === 'function') {
		const worker = new Worker(new URL('./sceneWorker.ts', import.meta.url), { type: 'module' });
		const offscreen = canvas.transferControlToOffscreen();

		worker.postMessage({ type: 'init', canvas: offscreen, ...sceneOptions }, [offscreen]);

		worker.onmessage = (message) => {
			const data = message.data;

			if (data.type === 'progress')
				loadingProgress.trackDownload(data.loaded, data.total);
			else if (data.type === 'ready')
				loadingProgress.finish();
			else if (data.type === 'error')
				loadingProgress.fail(data.url);
		};

		forwardElementEvents(canvas, (event) => worker.postMessage({ type: 'event', event }));

		window.addEventListener('resize', () => {
			worker.postMessage({ type: 'resize', width: canvas.clientWidth, height: canvas.clientHeight });
		});

		return;
	}

	// Fallback (no OffscreenCanvas support): run on the main thread as before.
	const core = createScene({
		canvas,
		inputElement: canvas,
		...sceneOptions,
		onProgress: (loaded, total) => loadingProgress.trackDownload(loaded, total),
		onReady: () => loadingProgress.finish(),
		onError: (url) => loadingProgress.fail(url),
	});

	window.addEventListener('resize', () => {
		core.resize(canvas.clientWidth, canvas.clientHeight);
	});
}