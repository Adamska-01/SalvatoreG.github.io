import * as THREE from 'three';


/**
 * THREE.LoadingManager wired to the fullscreen progress overlay
 * (see Scene3D.astro for the markup).
 */
export class LoadingProgress {
	readonly manager = new THREE.LoadingManager();

	private hasError = false;

	constructor() {
		this.manager.onStart = (url) => {
			this.setProgress(0);
			this.reportInfo(url, false);
		};

		this.manager.onProgress = (url, loaded, total) => {
			this.setProgress((loaded / total) * 100);
			this.reportInfo(url, false);
		};

		this.manager.onLoad = () => {
			this.setProgress(100);
		};

		this.manager.onError = (url) => {
			this.reportInfo(url, true);
		};
	}

	private setProgress(percentage: number): void {
		if (this.hasError) return;

		const bar = document.getElementById('progress-bar');
		const label = document.getElementById('progress-percentage');
		const container = document.getElementById('progress-container');

		if (bar) bar.style.width = `${percentage}%`;
		if (label) label.textContent = `${Math.round(percentage)}%`;

		if (percentage >= 100 && container) {
			setTimeout(() => {
				container.style.transition = 'opacity 0.25s';
				container.style.opacity = '0';
				container.addEventListener('transitionend', () => (container.style.display = 'none'), { once: true });
			}, 500);
		}
	}

	private reportInfo(loadingInfo: string, isError: boolean): void {
		if (this.hasError) return;

		const info = document.getElementById('progress-info');
		if (info && loadingInfo) {
			const fileName = loadingInfo.substring(loadingInfo.lastIndexOf('/') + 1);
			info.style.color = isError ? 'red' : 'green';
			info.textContent = `${isError ? 'Error while loading' : 'Loading'}: ${fileName}`;
		}

		this.hasError = isError;
	}
}