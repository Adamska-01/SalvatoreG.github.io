import * as THREE from 'three';


export class RenderManager
{
	constructor(canvasContainer)
	{
		this.canvas = canvasContainer;

		this.renderer = new THREE.WebGLRenderer(
			{
				canvas: canvasContainer,
				antialias: true, 
				alpha: true
			}
		);

		this.renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight, false);
		this.renderer.setClearColor(0x090909, 1)
	}
	

	initialise(scene, camera)
	{
		if (!scene || !camera)
		{
			throw new Error(`Renderer initialisation failed`);
		}

		this.scene = scene;
		this.camera = camera;
	}

	update(deltaTime) 
	{
		this.renderer.render(this.scene, this.camera);
	}

	onSceneResize()
	{
		let canvas = this.canvas;
		this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
	}
}