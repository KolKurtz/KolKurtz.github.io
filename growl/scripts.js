//article load script
//kolkurtz 30-05-20

const somebody = document.getElementById('cats');
const mainy = document.getElementById('main')

const categs = {
                "THEORY" : ["ART1","ART2"],
                "GEAR": ["ART1","ART2","ART3"],
                "OPINION": ["ART1","ART2","ART3","ART4"],
                "PRACTICE": ["ART1","ART2","ART3","ART4","ART5"],
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
    mainy.innerHTML += "<li><a href='https://kolkurtz.github.io/'>" + listy[i] + "</a></li>";
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
