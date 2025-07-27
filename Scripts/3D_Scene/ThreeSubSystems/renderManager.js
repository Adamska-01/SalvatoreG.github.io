import * as THREE from 'three';


export class RenderManager
{
	static CLEAR_COLOR = 0x191919;

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
		this.renderer.setClearColor(RenderManager.CLEAR_COLOR, 1)
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