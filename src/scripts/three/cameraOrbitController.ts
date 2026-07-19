import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


/**
 * Real canvas on the main thread, or the worker-side ElementProxyReceiver —
 * OrbitControls only needs the element-ish surface both provide.
 */
export type OrbitInputElement = HTMLElement | (object & { clientHeight: number });

export interface OrbitControllerOptions {
	minPolarAngle: number;
	maxPolarAngle: number;
	idlePolarAngle: number;
	enableDamping: boolean;
	dampingFactor: number;
	rotateSpeed: number;
	enablePan: boolean;
	minDistance: number;
	maxDistance: number;
	cameraTarget: THREE.Vector3;
	/** When false the camera never auto-rotates (prefers-reduced-motion) */
	autoRotate: boolean;
}

export class CameraOrbitController {
	private readonly orbitControls: OrbitControls;

	private readonly minPolarAngle: number;
	private readonly maxPolarAngle: number;
	private readonly idlePolarAngle: number;
	private readonly allowAutoRotate: boolean;

	private currentMinPolarAngle: number;
	private currentMaxPolarAngle: number;
	private currentIdleTime = 0;
	private currentLerpTime = 0;
	private readonly idleDuration = 2.0;
	private readonly lerpDuration = 1.5;
	private isIdle = true;

	constructor(camera: THREE.PerspectiveCamera, inputElement: OrbitInputElement, options: OrbitControllerOptions) {
		this.orbitControls = new OrbitControls(camera, inputElement as HTMLElement);

		this.currentMinPolarAngle = this.minPolarAngle = options.minPolarAngle;
		this.currentMaxPolarAngle = this.maxPolarAngle = options.maxPolarAngle;
		this.idlePolarAngle = options.idlePolarAngle;
		this.allowAutoRotate = options.autoRotate;

		this.orbitControls.minPolarAngle = options.minPolarAngle;
		this.orbitControls.maxPolarAngle = options.maxPolarAngle;
		this.orbitControls.enableDamping = options.enableDamping;
		this.orbitControls.dampingFactor = options.dampingFactor;
		this.orbitControls.rotateSpeed = options.rotateSpeed;
		this.orbitControls.enablePan = options.enablePan;
		this.orbitControls.minDistance = options.minDistance;
		this.orbitControls.maxDistance = options.maxDistance;
		this.orbitControls.target = options.cameraTarget;

		camera.position.z = options.minDistance + (options.maxDistance - options.minDistance) / 2;

		this.orbitControls.addEventListener('start', () => {
			this.isIdle = false;
			this.currentIdleTime = 0;
			this.currentLerpTime = 0;
			this.orbitControls.autoRotate = false;

			this.orbitControls.minPolarAngle = this.minPolarAngle;
			this.orbitControls.maxPolarAngle = this.maxPolarAngle;
		});

		this.orbitControls.addEventListener('end', () => {
			this.isIdle = true;

			this.currentMinPolarAngle = this.orbitControls.minPolarAngle;
			this.currentMaxPolarAngle = this.orbitControls.maxPolarAngle;
		});
	}

	update(deltaTime: number): void {
		if (this.isIdle && this.allowAutoRotate) {
			this.currentIdleTime += deltaTime;

			if (this.currentIdleTime >= this.idleDuration) {
				this.currentIdleTime = this.idleDuration;
				this.orbitControls.autoRotate = true;

				// Lerp vertical rotation towards the idle angle
				this.currentLerpTime += deltaTime;
				const t = Math.min(this.currentLerpTime / this.lerpDuration, 1);

				this.orbitControls.minPolarAngle = THREE.MathUtils.lerp(this.currentMinPolarAngle, this.idlePolarAngle, t);
				this.orbitControls.maxPolarAngle = THREE.MathUtils.lerp(this.currentMaxPolarAngle, this.idlePolarAngle, t);
			}
		}

		this.orbitControls.update();
	}
}