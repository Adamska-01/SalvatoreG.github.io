import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export class CameraOrbitController
{
	constructor(camera, renderer)
	{
		this.orbitControls = new OrbitControls(camera, renderer.domElement);
	}
	

	update(deltaTime) 
	{
		// TODO: add automatic pan around when on idle for some time

		this.orbitControls.update();
	}
}