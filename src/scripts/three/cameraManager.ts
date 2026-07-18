import * as THREE from 'three';
import { CameraOrbitController } from './cameraOrbitController';


export class CameraManager {
	readonly camera: THREE.PerspectiveCamera;

	private readonly orbitControls: CameraOrbitController;

	constructor(
		private readonly container: HTMLCanvasElement,
		renderer: THREE.WebGLRenderer,
		options: { autoRotate: boolean }
	) {
		this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
		this.camera.position.set(0, -1, 5);

		this.orbitControls = new CameraOrbitController(this.camera, renderer, {
			minPolarAngle: 0.2 * Math.PI,
			maxPolarAngle: 0.55 * Math.PI,
			idlePolarAngle: 0.35 * Math.PI,
			enableDamping: true,
			dampingFactor: 0.035,
			rotateSpeed: 0.65,
			enablePan: false,
			minDistance: 7.5,
			maxDistance: 15,
			cameraTarget: new THREE.Vector3(0, 0, 0),
			autoRotate: options.autoRotate,
		});
	}

	update(deltaTime: number): void {
		this.orbitControls.update(deltaTime);
	}

	onSceneResize(): void {
		this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
		this.camera.updateProjectionMatrix();
	}
}