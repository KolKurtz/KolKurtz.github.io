//colour transforms



function set2d(colour)
{
	if(colour.length == 6 && colour.indexOf("/") < 0)
	{
		console.log("Found hex");
		
		//process hex
		var hexVal = "#" + colour;
		$("#face").css('background',hexVal);
		
		//convert rgb
		var rgb = hexToRGB(colour);
		
		//do other colours
		paintFaces(rgb);
	}
	
	if(colour.split("/").length > 2)
	{
		console.log("Found rgb");

		var red = colour.split("/")[0];
		var green = colour.split("/")[1];
		var blue = colour.split("/")[2];
		
		//process rgb
		var rgbChar = "rgb(" + red + "," + green + "," + blue + ")" ;
		console.log("changing to: " + rgbChar);
		$("#face").css('background',rgbChar);
		
		//array
		var rgb = [red,green,blue];
		
		//do other colours
		paintFaces(rgb);
	}	
}



function paintFaces(colour)
{
	$("#hi").html("");
	$("#mid").html("");
	$("#base").html("");
	
	console.log(colour);
	//output tidy prime
	var niceR = colour[0];
	var niceG = colour[1];
	var niceB = colour[2];
	$("#primarySel").html("rgb(" + niceR + "," + niceG + "," + niceB + ")");	
	
	
	//shade normal face
	$(".left").css('background',"rgb(" + niceR + "," + niceG + "," + niceB + ")");
	
	//make topHi
	var hi = [];
	for(i=0;i<3;i++)
	{
		var diff = 255 - colour[i];
		console.log(diff);
		hi[i] = Math.floor(parseInt(colour[i]) + parseInt((diff * 0.25)));
	}
	var colourTop = "rgb(" + hi[0] + "," + hi[1] + "," + hi[2] + ")";
	console.log(colourTop);
	$("#face").css('border-top','solid 3px ' + colourTop );
	$(".top").css('background',colourTop );
	$("#hi").html(colourTop);
	$("#topprime").html(colourTop);
	
	//make sideShade
	var side = [];
	for(i=0;i<3;i++)
	{
		side[i] = Math.floor(colour[i] * 0.85);
	}
	var colourSide = "rgb(" + side[0] + "," + side[1] + "," + side[2] + ")";
	$("#face").css('border-left','solid 3px ' + colourSide);
	$("#face").css('border-right','solid 3px ' + colourSide);

	$("#mid").html(colourSide);
	$("#leftprime").html(colourSide);
	
	//make baseShade
	var lo = [];
	for(i=0;i<3;i++)
	{
		lo[i] = Math.floor(colour[i] * 0.7);
	}
	var colourBase = "rgb(" + lo[0] + "," + lo[1] + "," + lo[2] + ")";
	$("#face").css('border-bottom','solid 3px ' + colourBase);
	$("#base").html(colourBase);
	$(".front").css('background',colourBase );
	
	$("#frontprime").html(colourBase);

	//XXXXXXXXXXXXXXXXXXXXXXX
	//XXXXX 3D XXXXXXXXXXXXXX
	//XXXXXXXXXXXXXXXXXXXXXXX
	
	//XXXXXXX TOP
	var hihi = [];
	for(i=0;i<3;i++)
	{
		var diff = 255 - hi[i];
		console.log(diff);
		hihi[i] = Math.floor(parseInt(hi[i]) + parseInt((diff * 0.25)));
	}
	var hihiC = "rgb(" + hihi[0] + "," + hihi[1] + "," + hihi[2] + ")";
	$(".top").css("border-top",'solid 3px ' + hihiC);
	$(".left").css("border-left",'solid 3px ' + hihiC);
	$("#tophi").html(hihiC);
	

	var hiMid = [];
	for(i=0;i<3;i++)
	{
		hiMid[i] = Math.floor(hi[i] * 0.85);
	}
	var hiMidC = "rgb(" + hiMid[0] + "," + hiMid[1] + "," + hiMid[2] + ")";	
	$(".top").css("border-left",'solid 3px ' + hiMidC);
	$(".top").css("border-right",'solid 3px ' + hiMidC);
	$("#topmid").html(hiMidC);	

	var hiBase = [];
	for(i=0;i<3;i++)
	{
		hiBase[i] = Math.floor(hi[i] * 0.7);
	}
	var hiBaseC = "rgb(" + hiBase[0] + "," + hiBase[1] + "," + hiBase[2] + ")";	
	$(".top").css("border-bottom",'solid 3px ' + hiBaseC);
	$("#topbase").html(hiBaseC);	


	//XXXX LEFT FACE
	var midhi = [];
	for(i=0;i<3;i++)
	{
		var diff = 255 - hi[i];
		console.log(diff);
		midhi[i] = Math.floor(parseInt(side[i]) + parseInt((diff * 0.25)));
	}
	var midhiC = "rgb(" + midhi[0] + "," + midhi[1] + "," + midhi[2] + ")";
	$(".left").css("border-top",'solid 3px ' + midhiC);
	$("#lefthi").html(midhiC);
	

	var midmid = [];
	for(i=0;i<3;i++)
	{
		midmid[i] = Math.floor(side[i] * 0.85);
	}
	var midMidC = "rgb(" + midmid[0] + "," + midmid[1] + "," + midmid[2] + ")";	
	$(".left").css("border-right",'solid 3px ' + midMidC);
	$("#leftmid").html(midMidC);	

	var midBase = [];
	for(i=0;i<3;i++)
	{
		midBase[i] = Math.floor(side[i] * 0.75);
	}
	var midBaseC = "rgb(" + midBase[0] + "," + midBase[1] + "," + midBase[2] + ")";	
	$(".left").css("border-bottom",'solid 3px ' + midBaseC);
	$("#leftbase").html(midBaseC);

	
	//XXXXXXX FRONT FACE
	var lowhi = [];
	for(i=0;i<3;i++)
	{
		var diff = 255 - hi[i];
		lowhi[i] = Math.floor(parseInt(lo[i]) + parseInt((diff * 0.25)));
	}
	var lowhiC = "rgb(" + lowhi[0] + "," + lowhi[1] + "," + lowhi[2] + ")";
	$(".front").css("border-top",'solid 3px ' + lowhiC);
	$("#fronthi").html(lowhiC);


	var lowmid = [];
	for(i=0;i<3;i++)
	{
		lowmid[i] = Math.floor(lo[i] * 0.8);
	}
	var lowmidC = "rgb(" + lowmid[0] + "," + lowmid[1] + "," + lowmid[2] + ")";
	$(".front").css("border-left",'solid 3px ' + lowmidC);
	$(".front").css("border-right",'solid 3px ' + lowmidC);
	$("#frontmid").html(lowmidC);
	
	var lowLow = [];
	for(i=0;i<3;i++)
	{
		lowLow[i] = Math.floor(lo[i] * 0.7);
	}
	var lowLowC = "rgb(" + lowLow[0] + "," + lowLow[1] + "," + lowLow[2] + ")";
	$(".front").css("border-bottom",'solid 3px ' + lowLowC);
	$("#frontbase").html(lowLowC);
}



//XXXXXXXXXX UTILITY

function hexToRGB(hex)
{
		var red = parseInt(hex.toString().substring(0,2),16);
		var green = parseInt(hex.toString().substring(2,4),16);
		var blue = parseInt(hex.toString().substring(4,6),16);
		
		return [red,green,blue];
}

//XXXXXXXXXXXX END UTILITY




$(document).ready(function(){
	
	$('#primary').on("input",function() {
		var rgbInput = this.value;
		$("#primarySel").html(rgbInput);
		set2d(rgbInput);
	});
	$('#primaryH').on("input",function() {
		var hexInput = this.value;
		$("#primarySel").html(hexInput);
		set2d(hexInput);
	});
	
	
});


