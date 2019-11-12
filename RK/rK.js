//number spinner
//kolkurtz 11-02-19

const slowF = 2;
const iter = 10;
const startMS = 10;
const flashItems = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];


var updateElem = document.getElementById("wide");



function runMain()
{
	for(i=2;i<iter;i++)
	{
		doScaledTimeout(i);
	}
}


function doScaledTimeout(i)
{
  setTimeout(function()
  {
    console.log(i);
		updateElem.innerHTML = flashItems[Math.floor(Math.random() * flashItems.length)];
  }, 5000 / Math.pow(i,slowF));
}


window.onload = function()
{
	runMain();
}
