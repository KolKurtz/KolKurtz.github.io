var timeOutDisplay = document.getElementById('timer');

var running;
var elapsed;
var lastTime;
var expire = 5;
var timeAlert = false;

function startTimer()
{

	console.log("Starting timer with " + expire + " seconds left.");

	var start = new Date().getTime();
	elapsed = '0.0';

	running = setInterval(function()
	{
		var time = new Date().getTime() - start;

		elapsed = Math.floor(time / 100) / 10;
		if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }
		
		timeOutDisplay.innerHTML = elapsed;
		
		if(elapsed >= expire)
		{
			stopTimer();
			timeAlert = true;
			timeOut();
		}

	}, 100);


}

function stopTimer()
{
	console.log("Timer stopping");
	
	clearInterval(running);
	lastTime = Math.round(elapsed * 100) / 100;
	timeOut.innerHTML = "0.0";
}