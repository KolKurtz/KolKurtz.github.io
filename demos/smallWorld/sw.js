//MAIN SCRIPT SMALL WORLD 2

//grid constants
//produces a 64 by 36 grid
var vWid = 1600;
var vHigh = 900;
var hi = 25;
var wid = 25;



//get viewport dimensions and trim grid
var scaleFactor = 1;


//size grid for viewport

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//GLOBAL DOM ELEMENTS

var canvas = document.getElementById('mainC');
var context = canvas.getContext('2d');




//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


//build data grid of cells and their contents
var dataModel = {};

function buildModel()
{
		for(var i=0;i<vWid;i+=wid)
		{
			for(var j=0;j<vHigh;j+=hi)
			{
				var cellName = i + "_" + j;
				dataModel[cellName] = {};
			}
		}

}

//populate initial grid content
function allocateContent()
{
	for(item in dataModel)
	{
		//[tile,minerals,tileImage]
		dataModel[item] = ["grass",0,"g1"];
	}

		//add features
		loadLayouts();
}


//draw grid
function renderView()
{
	for(item in dataModel)
	{
			//canvas draw point from cell
			var drawX = parseInt(item.split("_")[0]);
			var drawY = parseInt(item.split("_")[1]);
			//sprite draw point from tile name
			var draws = spriteMap.getCord(dataModel[item][2]);
			var spX = parseInt(draws.split("_")[0]);
			var spY = parseInt(draws.split("_")[1]);

			context.drawImage(sprites,spX,spY,wid,hi,drawX,drawY,wid,hi);
	}

}


//fill world tiles
function shadeWorld()
{
	buildModel();
	allocateContent();
	renderView();
}


//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//update
function update()
{

}

//draw
function draw()
{
}


//ENGINE

function mainLoop()
{
	update();
	draw();
	requestAnimationFrame(mainLoop);
}


//ADD MORE EFFICIENT PRELOAD FOR SPRITESHEETS
//load sprites and start loop
//make ajax and add an onload
var sprites = new Image();   // Create new img element
sprites.addEventListener('load',function()
{
	console.log("loaded sprites");
})
sprites.src = 'sprites.png';

var patches = new Image();   // Create new img element
patches.addEventListener('load',function()
{
  console.log("loaded patches");
	shadeWorld();
	requestAnimationFrame(mainLoop);

})
patches.src = 'mudPatches.png';
