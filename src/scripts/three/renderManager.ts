import * as THREE from 'three';


export class RenderManager {
	static readonly CLEAR_COLOR = 0x191919;

	readonly renderer: THREE.WebGLRenderer;

	private scene?: THREE.Scene;
	private camera?: THREE.PerspectiveCamera;

	constructor(private readonly canvas: HTMLCanvasElement) {
		this.renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
			alpha: true,
		});

		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
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

	onSceneResize(): void {
		this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);
	}
}