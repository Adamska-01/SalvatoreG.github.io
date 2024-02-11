class Token 
{
	constructor()
	{
		this.isCancellationRequested = false; 
	}
	cancel()
	{
		this.isCancellationRequested = true; 
	}
}