/**
 * Drives the minimal in-scene loader (see Scene3D.astro for the markup).
 * Non-blocking: the loader is a small overlay behind the UI that fades out
 * when the scene is ready.
 *
 * Progress is byte-based (fed by the model download stream) so the bar moves
 * smoothly. After the download hits 100% the model still needs to be parsed
 * and uploaded to the GPU, so the label switches to "preparing scene" until
 * `finish()` is called.
 */
export class LoadingProgress {
	private hasError = false;

	trackDownload(loaded: number, total: number): void {
		if (this.hasError || !total) return;

		const percentage = Math.min((loaded / total) * 100, 100);

		const bar = document.getElementById('scene-loader-bar');
		const label = document.getElementById('scene-loader-percentage');

		if (bar) bar.style.width = `${percentage}%`;
		if (label) label.textContent = `${Math.round(percentage)}%`;

		if (percentage >= 100) {
			const labelContainer = document.getElementById('scene-loader-label');
			if (labelContainer) labelContainer.textContent = 'preparing scene';
		}
	}

	/** Scene is fully ready — fade the loader out and remove it. */
	finish(): void {
		if (this.hasError) return;

		const loader = document.getElementById('scene-loader');
		if (!loader) return;

		loader.classList.add('done');
		loader.addEventListener('transitionend', () => loader.remove(), { once: true });
	}

	fail(url: string): void {
		if (this.hasError) return;
		this.hasError = true;

		const loader = document.getElementById('scene-loader');
		const labelContainer = document.getElementById('scene-loader-label');

		if (loader) loader.classList.add('error');
		if (labelContainer && url) {
			const fileName = url.substring(url.lastIndexOf('/') + 1);
			labelContainer.textContent = `failed to load: ${fileName}`;
		}
	}
}