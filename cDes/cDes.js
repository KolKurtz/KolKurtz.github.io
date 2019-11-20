// cDes - chord designer
// build chords on a fretboard by dragging and dropping

var fretShow = 15;
var noteCycle = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

var wid = window.innerWidth  - 25;
var hi = window.innerHeight;

var control = document.getElementById('control');
var selected;

var fretMap = {};


//scale to width and fill notes
//takes string container and start notes as arg
function sizeFrets(cont,note)
{
  console.log(wid);

  var newWid = wid / fretShow;
  for(i=1;i<=fretShow;i++)
  {
    var named = "fret" + i;
    fretMap[named] = noteCycle[((i - 1) + note) % 12];
    $("<div></div>").addClass("fretBlock").attr("id",named).css("width",wid/fretShow).html(fretMap[named]).appendTo(cont);
  }

  console.log(fretMap);
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

//interact

$(document).on("click",".fretBlock",function(){
  selected = this;
  $("#control").show();
  $(this).css("color","black");
});

//add root
$(document).on("click","#root",function(){
  $(selected).css('background-image','url(root.png)');
  $("#control").hide();
});

//add fifth
$(document).on("click","#fifth",function(){
  $(selected).css('background-image','url(fifth.png)');
  $("#control").hide();
});


//add third
$(document).on("click","#third",function(){
  $(selected).css('background-image','url(third.png)');
  $("#control").hide();
});


//add seventh
$(document).on("click","#seventh",function(){
  $(selected).css('background-image','url(seventh.png)');
  $("#control").hide();
});

//clear
$(document).on("click","#clear",function(){
  $(selected).css("color","#777777");
  $(selected).css("background-image",'url(string.png)');
  $("#control").hide();
});


//clear all
$(document).on("click","#clearall",function(){
  location.reload();
});


window.onresize = function(){ location.reload(); }
