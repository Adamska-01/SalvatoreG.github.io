import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';


export class ModelLoader {
	private readonly loader = new GLTFLoader();

	/**
	 * Downloads with `priority: 'low'` so page navigations never queue behind
	 * the model on slow connections, streaming byte progress along the way,
	 * then parses the buffer with GLTFLoader.
	 */
	async loadGLTFModel(
		modelURL: string,
		objCallback: (gltf: GLTF) => void,
		onProgress?: (loaded: number, total: number) => void,
		onError?: (url: string) => void
	): Promise<void> {
		try {
			const response = await fetch(modelURL, { priority: 'low' });
			if (!response.ok || !response.body) throw new Error(`HTTP ${response.status}`);

			const total = Number(response.headers.get('content-length')) || 0;
			const reader = response.body.getReader();
			const chunks: Uint8Array[] = [];
			let loaded = 0;

			for (;;) {
				const { done, value } = await reader.read();
				if (done) break;

				chunks.push(value);
				loaded += value.length;
				onProgress?.(loaded, total);
			}

			const buffer = await new Blob(chunks as BlobPart[]).arrayBuffer();

			this.loader.parse(buffer, '', objCallback, (error) => {
				console.error(error);
				onError?.(modelURL);
			});
		} catch (error) {
			console.error(error);
			onError?.(modelURL);
		}
	}
}