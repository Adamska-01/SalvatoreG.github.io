import * as THREE from 'three';
import { CameraOrbitController, type OrbitInputElement } from './cameraOrbitController';


export class CameraManager {
	readonly camera: THREE.PerspectiveCamera;

	private readonly orbitControls: CameraOrbitController;

	constructor(
		inputElement: OrbitInputElement,
		options: { autoRotate: boolean; width: number; height: number }
	) {
		this.camera = new THREE.PerspectiveCamera(75, options.width / options.height, 0.1, 1000);
		this.camera.position.set(0, -1, 5);

		this.orbitControls = new CameraOrbitController(this.camera, inputElement, {
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

	onSceneResize(width: number, height: number): void {
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
	}
}