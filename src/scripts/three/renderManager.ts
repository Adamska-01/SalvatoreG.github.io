import * as THREE from 'three';


export class RenderManager {
	static readonly CLEAR_COLOR = 0x191919;

	readonly renderer: THREE.WebGLRenderer;

	private scene?: THREE.Scene;
	private camera?: THREE.PerspectiveCamera;

	/**
	 * Sizes are passed in explicitly (instead of reading canvas.clientWidth)
	 * so the same code runs on the main thread and in a worker, where the
	 * OffscreenCanvas has no layout box.
	 */
	constructor(canvas: HTMLCanvasElement | OffscreenCanvas, width: number, height: number, pixelRatio: number) {
		this.renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
			alpha: true,
		});

		this.renderer.setPixelRatio(pixelRatio);
		this.renderer.setSize(width, height, false);
		this.renderer.setClearColor(RenderManager.CLEAR_COLOR, 1);
	}

	initialise(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
		this.scene = scene;
		this.camera = camera;
	}

	update(_deltaTime: number): void {
		if (!this.scene || !this.camera) return;

		this.renderer.render(this.scene, this.camera);
	}

	onSceneResize(width: number, height: number): void {
		this.renderer.setSize(width, height, false);
	}
}