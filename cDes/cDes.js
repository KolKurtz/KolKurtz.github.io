// cDes - chord designer
// build chords on a fretboard by dragging and dropping

//TODO:
//add registers to notes for staff drawing using stringID see addroot method

var fretShow = 15;
var flat = 0;
var noteCycle = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
var noteCycleF = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];

const scalarS = 
{
  "C": 0,
  "C#": 1,
  "D": 2,
  "D#": 3,
  "E": 4,
  "F": 5,
  "F#": 6,
  "G": 7,
  "G#": 8,
  "A": 9,
  "A#": 10,
  "B": 11
}

const scalarF = 
{
  "C": 0,
  "Db": 1,
  "D": 2,
  "Eb": 3,
  "E": 4,
  "F": 5,
  "Gb": 6,
  "G": 7,
  "Ab": 8,
  "A": 9,
  "Bb": 10,
  "B": 11
}


var wid = window.innerWidth  - 25;
var hi = window.innerHeight;

var control = document.getElementById('control');
var selected;

var fretMap = {};

var selections = [];

//map noteID to pixel locations over the stave
var stavePixelMap = {
"G#": ["70px","85px"],
"G": ["100px","93px"],
"Gb": ["70px","86px"],
"F#": ["70px","38px"],
"F": ["100px","46px"],
"E": ["100px","54px"],
"Eb": ["70px","45px"],
"D#": ["70px","52px"],
"D": ["100px","61px"],
"Db": ["70px","52px"],
"C#": ["70px","61px"],
"C": ["100px","70px"],
"B": ["100px","79px"],
"Bb": ["70px","72px"],
"A#": ["70px","77px"],
"A": ["100px","86px"],
"Ab": ["70px","77px"]
}


//utility ---------------------------
//find and remove from array - qwertymk stackoverflow
function remove(arr, what) {
    var found = arr.indexOf(what);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);
    }
}
//remove(array, 'B');



//get note from scalar number
function getNote(scal)
{
  var noteName;

  var scaleSet = scalarS;

  flat == 0? scaleSet = scalarS : scaleSet = scalarF;  

  for(var noteValue in scaleSet)
  {
    if (scal == scaleSet[noteValue])
    {noteName = noteValue};
  }

  return noteName;
}






//process functions ------------------


//scale to width and fill notes
//takes string container and start notes as arg, added flag for flats
function sizeFrets(cont,note)
{
  //empty first
  $(cont).empty();

  var useThese = noteCycle;
  flat == 0 ? useThese = noteCycle : useThese = noteCycleF;
  var newWid = wid / fretShow;
  for(i=1;i<=fretShow;i++)
  {
    var named = "fret" + i;
    fretMap[named] = useThese[((i - 1) + note) % 12];
    $("<div></div>").addClass("fretBlock").attr("id",named).css("width",wid/fretShow).html(fretMap[named]).appendTo(cont);
  }

}


window.onload = function()
{
  sizeFrets("#containe",4);
  sizeFrets("#containB",11);
  sizeFrets("#containG",7);
  sizeFrets("#containD",2);
  sizeFrets("#containA",9);
  sizeFrets("#containE",4);
}


function handleSelect(noteName)
{
  //prevent duplication
  remove(selections,noteName);
  selections.push(noteName);
  console.log(selections);

  showStave();
  drawNotes();

  if(selections.length>=2)
  {
    //trigger analysis into chords
    doAnalysis();

  }
}

//give a layout of the stave with selected notes
function showStave()
{
  if ($("#staveBox").length){
    //do nothing, already a stave
  }
  else{
    $("<div></div>").addClass("stave").attr("id","staveBox").html("<img src='stave.png'>").appendTo("body");
  }
}


//draw selected notes on the stave
function drawNotes()
{
  //clear all current notes
  $(".noteHead").remove();

  var staveyRayVaughn = $("#staveBox");
  var xcoord = 0;
  var ycoord = 0;

  for(i=0;i<selections.length;i++)
  {
    //get pixel coordinates
    xcoord = stavePixelMap[selections[i]][0];
    ycoord = stavePixelMap[selections[i]][1];
    //draw note
    if(selections[i].indexOf("#")>0){
        $("<div></div>").addClass("noteHead").attr("id","poop").css("left",xcoord).css("top",ycoord).html("<img src='sharphead.png'>").appendTo(staveyRayVaughn);
      }
    else if (selections[i].indexOf("b")>0) {
        $("<div></div>").addClass("noteHead").attr("id","poop").css("left",xcoord).css("top",ycoord).html("<img src='flathead.png'>").appendTo(staveyRayVaughn);
      }
    else {
      $("<div></div>").addClass("noteHead").attr("id","poop").css("left",xcoord).css("top",ycoord).html("<img src='notehead.png'>").appendTo(staveyRayVaughn);
      console.log("Drawn at " + ycoord);
        }
  }
}


//process note additions into note ids in the selection array
function addSel()
{
  //var stringID = $(selected).parent().attr("id").substr(-1);
  var fretID = $(selected).text();
  //handleSelect("" + stringID + "_" + fretID);
  handleSelect("" + fretID);
}


//perform analysis
function doAnalysis()
{
  console.log("Analysing");

  var intervalic = "";
  var chordal = "<br>nothing found";

  //find minor thirds
  intervalic +=  "<br>minor third: " + findInterval(3);
  intervalic +=  "<br>major third: " + findInterval(4);
  intervalic +=  "<br>flat 7th: " + findInterval(10);
  intervalic +=  "<br>major 7th: " + findInterval(11);


  //find sevenths
  //intervalic += findInterval(7);

  showAnalysis(intervalic,chordal);
}

//check selections for intervals specified by passed argument
function findInterval(interval)
{
  var outputText = "";

  var analysisSet = scalarS;

  //set a switch between scalar flat and scalar sharp analysis
  flat == 0? analysisSet = scalarS : analysisSet = scalarF;

  console.log("SEARCH INTERVAL: " + interval);

  for(i=0;i<selections.length;i++)
  {
    console.log("From origin: " + selections[i]);
    var rootNum = (analysisSet[selections[i]]);
    console.log("Which has scalar: " + rootNum);
    var searchIntvl = (rootNum + interval) % 12;
    console.log("New note at: " + searchIntvl);

    var notey = getNote(searchIntvl);
    console.log("Search selections for: " + notey);

    if(selections.indexOf(notey) > -1)
    {
      outputText += "<span class='hlght2'>" + selections[i] + "-" + notey + "</span> ";
    }
  }

  return outputText;
}



//display the  analysis results
function showAnalysis(intvL,chD)
{
  var attach = $("#analysis ul");
  $("#analysis ul li").remove();
  $("<li></li>").html("<span class='hlght'>note content</span><br> " + selections).appendTo(attach);
  $("<li></li>").html("<span class='hlght'>intervals</span> " + intvL).appendTo(attach);
  $("<li></li>").html("<span class='hlght'>chord interpretation</span> " + chD).appendTo(attach);
  $("#analysis").show();
}





//interact-------------------------------------------

$(document).on("click",".fretBlock",function(){
  selected = this;
  $("#control").show();
  $(this).css("color","black");
});

//add root
$(document).on("click","#root",function(){
  $(selected).css('background-image','url(root.png)');
  $("#control").hide();
  addSel();
});

//add fifth
$(document).on("click","#fifth",function(){
  $(selected).css('background-image','url(fifth.png)');
  $("#control").hide();
  addSel();
});


//add third
$(document).on("click","#third",function(){
  $(selected).css('background-image','url(third.png)');
  $("#control").hide();
  addSel();
});


//add seventh
$(document).on("click","#seventh",function(){
  $(selected).css('background-image','url(seventh.png)');
  $("#control").hide();
  addSel();
});

//add tension
$(document).on("click","#tension",function(){
  $(selected).css('background-image','url(tension.png)');
  $("#control").hide();
  addSel();
});



//flats
$(document).on("click","#flats",function(){
  flat = 1;
  sizeFrets("#containe",4);
  sizeFrets("#containB",11);
  sizeFrets("#containG",7);
  sizeFrets("#containD",2);
  sizeFrets("#containA",9);
  sizeFrets("#containE",4);
});

//sharps
$(document).on("click","#sharps",function(){
  flat = 0;
  sizeFrets("#containe",4);
  sizeFrets("#containB",11);
  sizeFrets("#containG",7);
  sizeFrets("#containD",2);
  sizeFrets("#containA",9);
  sizeFrets("#containE",4);
});


//clear
$(document).on("click","#clear",function(){
  $(selected).css("color","#777777");
  $(selected).css("background-image",'url(string.png)');
  $("#control").hide();
  remove(selections,$(selected).text());
  drawNotes();
});


//clear all
$(document).on("click","#clearall",function(){
  selections = [];
  location.reload();
});


window.onresize = function(){ location.reload(); }
