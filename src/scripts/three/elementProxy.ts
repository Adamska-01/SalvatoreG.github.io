import { EventDispatcher } from 'three';


/**
 * Bridges DOM input events to the scene worker.
 *
 * OrbitControls normally listens on the canvas. With the scene running in a
 * Web Worker there is no DOM, so the main thread serializes the relevant
 * events and posts them over; the worker-side `ElementProxyReceiver` mimics
 * just enough of an HTMLElement for OrbitControls to work with.
 */

const FORWARDED_POINTER_EVENTS = ['pointerdown', 'pointermove', 'pointerup', 'pointercancel'] as const;

export interface ForwardedEvent {
	type: string;
	pointerId?: number;
	pointerType?: string;
	button?: number;
	buttons?: number;
	clientX?: number;
	clientY?: number;
	/** OrbitControls' touch handlers read page coordinates, not client ones */
	pageX?: number;
	pageY?: number;
	deltaX?: number;
	deltaY?: number;
	deltaMode?: number;
	ctrlKey?: boolean;
	metaKey?: boolean;
	shiftKey?: boolean;
}

function serializePointerEvent(event: PointerEvent): ForwardedEvent {
	return {
		type: event.type,
		pointerId: event.pointerId,
		pointerType: event.pointerType,
		button: event.button,
		buttons: event.buttons,
		clientX: event.clientX,
		clientY: event.clientY,
		pageX: event.pageX,
		pageY: event.pageY,
		ctrlKey: event.ctrlKey,
		metaKey: event.metaKey,
		shiftKey: event.shiftKey,
	};
}

/** Main-thread side: forward the canvas's input events to the worker. */
export function forwardElementEvents(canvas: HTMLCanvasElement, post: (event: ForwardedEvent) => void): void {
	// Without this, mobile browsers turn drags into page scrolls instead of
	// pointer events (OrbitControls would normally set it on its element).
	canvas.style.touchAction = 'none';

	for (const type of FORWARDED_POINTER_EVENTS) {
		canvas.addEventListener(type, (event) => {
			if (type === 'pointerdown')
				canvas.setPointerCapture(event.pointerId);
			
			post(serializePointerEvent(event));
		});
	}

	canvas.addEventListener(
		'wheel',
		(event) => {
			event.preventDefault();
			post({
				type: 'wheel',
				deltaX: event.deltaX,
				deltaY: event.deltaY,
				deltaMode: event.deltaMode,
				ctrlKey: event.ctrlKey,
			});
		},
		{ passive: false }
	);

	canvas.addEventListener('contextmenu', (event) => {
		event.preventDefault();
		post({ type: 'contextmenu' });
	});
}

/** Worker side: pretends to be the DOM element OrbitControls listens on. */
export class ElementProxyReceiver extends EventDispatcher<Record<string, ForwardedEvent>> {
	width = 0;
	height = 0;

	/** OrbitControls sets style.touchAction on it — harmless sink. */
	readonly style: Record<string, string> = {};

	get clientWidth(): number {
		return this.width;
	}

	get clientHeight(): number {
		return this.height;
	}

	get ownerDocument(): this {
		return this;
	}

	getRootNode(): this {
		return this;
	}

	getBoundingClientRect() {
		return { x: 0, y: 0, left: 0, top: 0, width: this.width, height: this.height, right: this.width, bottom: this.height };
	}

	setPointerCapture(): void {}
	releasePointerCapture(): void {}
	focus(): void {}

	setSize(width: number, height: number): void {
		this.width = width;
		this.height = height;
	}

	handleEvent(data: ForwardedEvent): void {
		const event = data as ForwardedEvent & { preventDefault: () => void; stopPropagation: () => void };
		event.preventDefault = () => {};
		event.stopPropagation = () => {};
		this.dispatchEvent(event as never);
	}
}