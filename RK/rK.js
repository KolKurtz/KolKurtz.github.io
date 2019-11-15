//number spinner
//kolkurtz 11-02-19

const slowF = 2;
const iter = 10;
const startMS = 10;
const flashItemsK = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const flashItemsR = ["E","A","D","G","B","e"];
const flashItemsP = ["C","A","G","E","D"];
const option = ["K","S","P"];

var updateElemK = document.getElementById("wideK");
var updateElemR = document.getElementById("wideR");
var updateElemP = document.getElementById("wideP");



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
		updateElemK.innerHTML = flashItemsK[Math.floor(Math.random() * flashItemsK.length)];
		updateElemR.innerHTML = flashItemsR[Math.floor(Math.random() * flashItemsR.length)];
		updateElemP.innerHTML = flashItemsP[Math.floor(Math.random() * flashItemsP.length)];
  }, 5000 / Math.pow(i,slowF));
}


window.onload = function()
{
	runMain();
}
