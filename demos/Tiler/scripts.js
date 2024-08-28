var tiles = [
"octy2.png",
"octy.png",
"octy3.png",
"octy4.png",
"octy5.png",
"zag.png",
"zag2.png",
"zag3.png",
"zag4.png",
];

var backCols = [
"red",
"aquamarine",
"aliceblue",
"cornsilk",
"darkgray",
"purple",
"honeydew",
"MINTCREAM",
"STEELBLUE",

];

var colorCycle = 0;


function loadTiles()
{
	for(i=0;i<tiles.length;i++)
	{
		$("<div></div>").addClass("tile").html("<img src='" + tiles[i] + "'>").appendTo($("#tiles"));
	}
}


$(document).ready(function()
{

	loadTiles();
	
	$(".tile").on("click",function(){
		
		var imagey = $(this).children().attr('src');
		
		$("#wrappy").css('background-image',"url('" + imagey + "')");
		
	})
	
	$("#colorz").on("click",function()
	{
		colorCycle = ++colorCycle % backCols.length;
		$("body").css('background',backCols[colorCycle]);
	
		$(".info").remove();
	
		$("<div></div>").addClass("info").html(backCols[colorCycle]).appendTo($("#tiles"));
		
	})

})