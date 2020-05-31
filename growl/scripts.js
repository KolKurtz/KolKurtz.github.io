//article load script
//kolkurtz 30-05-20

const somebody = document.getElementById('cats');
const mainy = document.getElementById('main')

const categs = {
                "THEORY" : ["TH1_CHORDEXT1.html","ART2"],
                "GEAR": ["ART1","ART2","ART3"],
                "OPINION": ["OP1_WELCOME.html","OP2_20THANNIVERSARY.html","ART3","ART4"],
                "PRACTICE": ["PR1_MOSTUSEFULEXERCISE.html","ART2","ART3","ART4","ART5"],
                "COMPOSITION": ["ART1","ART2","ART3","ART4","ART5","ART6"]
              }


function showArts(catIn)
{
  //clear main content
  mainy.innerHTML = "";

  mainy.innerHTML = "<ul>";

  //fill list
  var listy = categs[catIn];

  for(i=0;i<listy.length;i++)
  {
    var cutString = listy[i].split("_")[1].split(".")[0];
    mainy.innerHTML += "<li><a href='post/" + listy[i] + "'>" + cutString + "</a></li>";
  }

  mainy.innerHTML += "</ul>";

}




window.onload = function(){

  var selCat;
  somebody.addEventListener("click", function(){
      selCat = event.target.id;
      showArts(selCat);
  });

}
