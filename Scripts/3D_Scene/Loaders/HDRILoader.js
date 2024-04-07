import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'


export class HDRILoader
{
	constructor(scene, renderer, loadingManager)
	{
		this.scene = scene;
		this.renderer = renderer;

		this.hdriLoader = new RGBELoader(loadingManager);

		this.isHDRILoaded = false;
	}
	

	loadHDRI(imageURL, lightOptions)
	{
		if (this.isHDRILoaded) 
		{
			throw new Error(`Another HDRI is already loaded. Please unload the current one before loading a new HDRI.`);
		}
		if (!imageURL) 
		{
			throw new Error(`Invalid HDRI URL. Please provide a valid URL.`);
		}
		if (!lightOptions || typeof lightOptions !== 'object') 
		{
			throw new Error(`Invalid light options. Please provide valid light options.`);
		}

		this.hdriLoader.load(imageURL, (texture) => {
			texture.mapping = lightOptions.mapping;

			if (lightOptions.setHDRAsBackground)
			{
				this.scene.background = texture;
			}
			
			this.scene.environment = texture;
		})

		this.renderer.outputEncoding = lightOptions.outputEncoding;
		this.renderer.toneMapping = lightOptions.toneMapping;
		this.renderer.toneMappingExposure = lightOptions.toneMappingExposure;

		this.isHDRILoaded = true;
	}
}