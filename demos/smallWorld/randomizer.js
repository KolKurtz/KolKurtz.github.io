const choices = ["g1","g2","g3","g4","desert"];

window.onload = function(){

  outputRandom();


  var outy = document.getElementById("gridMain");
  outy.innerHTML+=buildOdds();

}

function outputRandom()
{
  var outy = document.getElementById("gridMain");
  for(j=0;j<18;j++)
  {
      var outline = "[";
      for(i=0;i<16;i++)
      {
          outline = outline + "\"";
          //outline = outline + choices[Math.floor(Math.random()*choices.length)] + "\"";
          outline = outline + buildOdds() + "\"";
          outline = outline + ",";
      }
      outline = outline.substring(0, outline.length - 1);
      outline = outline + "]," + "</br>";
      outy.innerHTML+=outline;
    }
}



//detailed chance for tile types
function buildOdds()
{
  var landy = "";

  var odds = Math.floor(Math.random()*100);

  switch(true)
  {
    //grass
    case odds <= 80:
    landy = "g";
    break;
    //mud
    case odds > 80:
    landy = "m";
    //desert
    case odds > 87:
    landy = "d";
    //rock
    case odds > 90:
    landy = "r";
    //water
    case odds > 97:
    landy = "w";
  }

  return landy + (Math.floor(Math.random()*4) + 1);
}
