import { createScene, type SceneCore } from './sceneCore';
import { ElementProxyReceiver, type ForwardedEvent } from './elementProxy';


/**
 * Scene worker entry point. The entire Three.js scene (loading, parsing,
 * shader compilation, rendering) runs here so the main thread — and with it
 * scrolling, clicks, and CSS animations — can never be blocked by it.
 */

type InitMessage = {
	type: 'init';
	canvas: OffscreenCanvas;
	width: number;
	height: number;
	pixelRatio: number;
	autoRotate: boolean;
	modelURL: string;
};

type WorkerMessage =
	| InitMessage
	| { type: 'event'; event: ForwardedEvent }
	| { type: 'resize'; width: number; height: number };

const post = (message: object) => (self as unknown as Worker).postMessage(message);

const proxy = new ElementProxyReceiver();
let core: SceneCore | undefined;

self.onmessage = (message: MessageEvent<WorkerMessage>) => {
	const data = message.data;

	if (data.type === 'init') {
		proxy.setSize(data.width, data.height);

		core = createScene({
			canvas: data.canvas,
			inputElement: proxy,
			width: data.width,
			height: data.height,
			pixelRatio: data.pixelRatio,
			autoRotate: data.autoRotate,
			modelURL: data.modelURL,
			onProgress: (loaded, total) => post({ type: 'progress', loaded, total }),
			onReady: () => post({ type: 'ready' }),
			onError: (url) => post({ type: 'error', url }),
		});
	} else if (data.type === 'event') {
		proxy.handleEvent(data.event);
	} else if (data.type === 'resize') {
		proxy.setSize(data.width, data.height);
		core?.resize(data.width, data.height);
	}
};