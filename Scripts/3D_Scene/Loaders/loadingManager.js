import * as THREE from 'three';


export class LoadingManager
{
	constructor()
	{
		this.manager = new THREE.LoadingManager();
		this.thereIsAnError = false;
		
		// Bind the loading function
		this.manager.onStart = (url, item, total) => {
			this.setProgress(0);
		}

		this.manager.onProgress = (url, loaded, total) => {
			console.log(`Loading: ${url}`);

			this.setProgress((loaded / total) * 100, url);
			this.reportInfo(url, false);
		}

		this.manager.onLoad = () => {
			this.setProgress(100);
		}

		this.manager.onError = (url) => {
			this.reportInfo(url, true);
		}
	}

	setProgress(percentage) 
	{
		if (this.thereIsAnError)
			return;

		$(`#${PROGRESS_BAR_ID}`).width(`${percentage}%`);
		$(`#${PROGRESS_PERCENTAGE_ID}`).text(`${percentage}%`);

		if (percentage >= 100)
		{
			setTimeout(function() { // Add some delay before fade out
				$(`#${PROGRESS_CONTAINER_ID}`).addClass('fade-out-anim-no-transform').on('animationend', function() {
					$(this).css("display", "none");
				});
			}, 500);
		}
		else if (percentage <= 0)
		{
			$(`#${PROGRESS_CONTAINER_ID}`).css("display", "block");
		}
	}

	reportInfo(loadingInfo, isError)
	{
		if (this.thereIsAnError)
			return;
		
		let messageColor = isError ? "red" : "green";
		let messageStart = isError ? "Error while loading" : "Loading";

		if (loadingInfo)
		{
			loadingInfo = loadingInfo.substring(loadingInfo.lastIndexOf('/') + 1);
			$(`#${PROGRESS_INFO_ID}`).css("color", messageColor).text(`${messageStart}: ${loadingInfo}`);
		}

		this.thereIsAnError = isError;
	}
}