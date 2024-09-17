// global namespace
var smallWorld = smallWorld || {};

smallWorld.liveActors = [];
smallWorld.idCounter = 0;

//data structures
//chunked world, 20 by 20
var chunkedWorld = {};




//global canvas and context
var canvB = document.getElementById('canvasB');
var contextB = canvB.getContext('2d');
var canv = document.getElementById('canvasL');
var context = canv.getContext('2d');
var time;
var randomiser = 0;

var cWi = 1600;
var cHi = 960;

var landscapeTile = "landTile.png";
var tileDim = 20;
var lands;
var cutPointsLand =
{
  bottomleft: [0,180],
  bottommid: [20,180],
  bottommid2: [40,180],
  bottomright: [60,180],
  midleft: [0,160],
  mid: [20,160],
  mid2: [40,160],
  midright: [60,160],
  topleft: [0,140],
  topmid: [20,140],
  topmid2: [40,140],
  topright: [60,140]
}



//SEXY UTILITY thanks to stackexchange BGerrissen
function removeByAttr(arr, attr, value)
{
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}





function build()
{
    //edges
    contextB.drawImage(lands,0,140,tileDim,tileDim,0,0,tileDim,tileDim);
    for(i=20;i<(1600 - 20);i+=20)
    {
      contextB.drawImage(lands,20,140,tileDim,tileDim,i,0,tileDim,tileDim);
    }
    contextB.drawImage(lands,60,140,tileDim,tileDim,1580,0,tileDim,tileDim);
    for(i=20;i<(960 - 20);i+=20)
    {
      contextB.drawImage(lands,0,160,tileDim,tileDim,0,i,tileDim,tileDim);
    }
    for(i=20;i<(960 - 20);i+=20)
    {
      contextB.drawImage(lands,60,160,tileDim,tileDim,1580,i,tileDim,tileDim);
    }
    contextB.drawImage(lands,0,180,tileDim,tileDim,0,940,tileDim,tileDim);
    for(i=20;i<(1600 - 20);i+=20)
    {
      contextB.drawImage(lands,20,180,tileDim,tileDim,i,940,tileDim,tileDim);
    }
    contextB.drawImage(lands,60,180,tileDim,tileDim,1580,940,tileDim,tileDim);

    //centre
    for(j=20;j<(960-20);j+=20)
    {
      for(i=20;i<(1600-20);i+=20)
      {
		//add a cell to the datarep for the world - array with [minerals]
		chunkedWorld[i+","+j] = [0];
		  
        if(Math.floor(Math.random()*100) > 50)
        {
          contextB.drawImage(lands,20,160,tileDim,tileDim,i,j,tileDim,tileDim);
        }
        else
        {
          contextB.drawImage(lands,40,160,tileDim,tileDim,i,j,tileDim,tileDim);
        }
      }
    }
}


//decompose a sprite and add its minerals to the cell
function decompose(aSprite)
{
	console.log(chunkedWorld);

	//remove from liveActors
	removeByAttr(smallWorld.liveActors,"id",aSprite.id);
	
	//add minerals to cell in which it died
	var deathSiteX = aSprite.posX;
	var deathSiteY = aSprite.posY;
	console.log(aSprite.id + " died at " + deathSiteX + "," + deathSiteY);
	//fuzzy match deathSite to a cell
	deathSiteX = deathSiteX / 20;
	deathSiteY = deathSiteY /20;
	var cellName = deathSiteX + "," + deathSiteY;
	chunkedWorld[cellName] = chunkedWorld[cellName] + 1000;
	console.log(chunkedWorld);
}






//ANIM

//increment a sprite sheet sequence and run lifecycle
function spriteInc(spr,passed)
{

  var county = spr.sprCt + passed;

  //adjust sprite age
  spr.age += passed;


  //move frame
  if(county >= spr.sprMax)
  {
    //set count to remainder since changing frame
    spr.sprCt = spr.sprCt - spr.sprMax;

    //increment index
    if(spr.sprInd < spr.frames)
    {
      spr.sprInd++;
    }
    else if(spr.sprInd >= spr.frames & spr.sprLoop == true)
    {
      spr.sprCt = 0;
      spr.sprInd = 0;
    }
    else
    {
        //exceeded frame length and doesn't loop - all old trees live here and that's fine
    }
  }
  else
  {      //sprite not yet on new frame
    spr.sprCt += passed;
  }


  //run lifecycle as a tick or decompose if dead
  if(spr.dead == false)
  {
    spr.tick();
  }
  else if(spr.dead == true && spr.age > 5000)
  {
	decompose(spr);
  }
}



//draw sprite at correct sprite point
function spriteDraw(spr)
{
  //dead sprites go to sprite line 2
  if(spr.dead == true)
  {
    drawY = 20;
  }
  else
  {
    drawY = 0;
  }

  context.drawImage(spr.loadedImage,spr.sprInd * 20,drawY,20,20,spr.posX,spr.posY,20,20);
}



//main anim/draw lopp
function loop()
{
    window.requestAnimationFrame(loop);
    var now = new Date().getTime(),
        dt = now - (time || now);

        time = now;

        //fire randomiser every ten draws
        if (randomiser >= 100)
        {
          randomWorld();
          randomiser = 0;
        }
        else
        {
            randomiser++;
        }

        //console.log("Tick with random: " + randomiser)

        // Drawing code goes here... for example updating an 'x' position:
        //this.x += 10 * dt; // Increase 'x' by 10 units per milliseconds

        context.clearRect(0, 0, cWi, cHi);

        for(i=0;i<smallWorld.liveActors.length;i++)
        {
          spriteInc(smallWorld.liveActors[i],dt);
          spriteDraw(smallWorld.liveActors[i]);
        }
}



// END ANIM




//WORLD RANDOMISATION

function randomWorld()
{
  var randy = Math.floor(Math.random() * 100)

  if(randy > 50)
  {
    //spawn a tree
    if(Math.floor(Math.random() * 100) > 50)
    {smallWorld.newTree = new Smwo(10,10,10,true,5,"tree.png",smallWorld.idCounter)}
    else
    {smallWorld.newTree = new Smwo(10,10,10,true,5,"tree2.png",smallWorld.idCounter)}

    var spr = smallWorld.newTree.spawn(cWi - 60,cHi - 60);

    //register as live actor
    smallWorld.liveActors.push(spr);
    smallWorld.idCounter = smallWorld.idCounter + 1;
	
	console.log(smallWorld.liveActors);
  }

  if(randy > 85)
  {
    //spawn a squirrel
    console.log("Built a squirrel");
    smallWorld.newSqui = new Smwo(10,10,10,true,5,"squirrel.png",smallWorld.idCounter,20000,500,true);

    var spr = smallWorld.newSqui.spawn(cWi - 40,cHi - 40);

    //register as live actor
    smallWorld.liveActors.push(spr);
    smallWorld.idCounter = smallWorld.idCounter + 1;
	
	console.log(smallWorld.liveActors);
  }
}


//END WORLD RANDOMISATION




window.onload = function()
{

  //landscape
  lands = new Image();
  lands.onload = function()
  {

    build();

  }
  lands.src = landscapeTile;

  loop();
}
