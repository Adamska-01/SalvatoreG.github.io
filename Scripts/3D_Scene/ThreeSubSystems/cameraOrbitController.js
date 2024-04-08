import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export class CameraOrbitController
{
	constructor(camera, renderer, controllerOptions)
	{
		this.orbitControls = new OrbitControls(camera, renderer.domElement);

		// Cache values
		this.currentIdleTime = 0.0;
		this.currentLerpTime = 0.0;
		this.idleDuration = 3.5;
		this.lerpDuration = 1.5;
		this.isIdle = true;
		this.currentMinPolarAngle = this.minPolarAngle = controllerOptions.minPolarAngle;
		this.currentMaxPolarAngle = this.maxPolarAngle = controllerOptions.maxPolarAngle;
		this.idlePolarAngle = controllerOptions.idlePolarAngle;
		
		// Controller settings 
		this.orbitControls.minPolarAngle = controllerOptions.minPolarAngle;
		this.orbitControls.maxPolarAngle = controllerOptions.maxPolarAngle;
		this.orbitControls.enableDamping = controllerOptions.enableDamping;
		this.orbitControls.dampingFactor = controllerOptions.dampingFactor;
		this.orbitControls.rotateSpeed = controllerOptions.rotateSpeed;
		this.orbitControls.enablePan = controllerOptions.enablePan;
		this.orbitControls.minDistance = controllerOptions.minDistance;
		this.orbitControls.maxDistance = controllerOptions.maxDistance;
		this.orbitControls.distance = controllerOptions.maxDistance;
		this.orbitControls.target = controllerOptions.cameraTarget
		
		// Set initail camera position
		camera.position.z = controllerOptions.minDistance + ((controllerOptions.maxDistance - controllerOptions.minDistance) / 2);

		// Control callbacks
		this.orbitControls.addEventListener('start', () => {
			this.isIdle = false;
			this.currentIdleTime = 0.0;
			this.currentLerpTime = 0.0;
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
	

	update(deltaTime) 
	{
		if (this.isIdle)
		{
			this.currentIdleTime += deltaTime;
			if (this.currentIdleTime >= this.idleDuration)
			{
				this.currentIdleTime = this.idleDuration;
				this.orbitControls.autoRotate = true;

				// Lerp vertical rotation
				this.currentLerpTime += deltaTime;
				let t = Math.min(this.currentLerpTime / this.lerpDuration, 1); // Clamp to 1
				
				let minPolarAngle = THREE.MathUtils.lerp(this.currentMinPolarAngle, this.idlePolarAngle, t);
				let maxPolarAngle = THREE.MathUtils.lerp(this.currentMaxPolarAngle, this.idlePolarAngle, t);

				this.orbitControls.minPolarAngle = minPolarAngle;
            	this.orbitControls.maxPolarAngle = maxPolarAngle;
			}
		}

		this.orbitControls.update();
	}
}