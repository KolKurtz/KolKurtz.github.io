//article load script
//kolkurtz 30-05-20

const somebody = document.getElementById('cats');
const mainy = document.getElementById('main')

const categs = {
                "THEORY" : ["TH1_CHORD^EXTENSION.html","TH2_UNCAGED.html","TH3_INVERSION101.html","TH4_INVERSIONS.html","TH5_NEAPOLITAN^CHORDS.html","TH6_KEYS^MODES^BISCUITS.html","TH7_NUMERIC^NOTATION.html","TH8_CHORD^ANATOMY^1.html","TH9_CHORD^ANATOMY^2.html",
                "TH10_FIRST^GUITAR^CHORDS.html","TH11_FUNCTION.html","TH12_ARP^WHAT^ARE^YOU.html","TH13_SEVENTH^CHORDS.html"],
                "RECORD": ["RE1_CARCASSI^CAPRICE^OP26^NO3.html"],
                "OPINION": ["OP1_WELCOME.html","OP2_20TH^ANNIVERSARY.html"],
                "PRACTICE": ["PR1_MOST^USEFUL^EXERCISE.html","PR2_ARPEGGIO^SYNCHRONOUS.html","PR3_MODAL^MELANGE.html","PR4_BREAK^INTO^COMPING.html","PR5_DOWNWARDS^DOG.html","PR6_ARPEGGIO^SNAKES.html","PR7_HANON^FOR^GUITAR.html","PR8_INVERSION^EXCURSION.html","PR9_A^CHORD^MODE^EXERCISE.html"],
                "COMPOSITION": ["CO1_SIMPLIFY^PROGRESSIONS.html"],
                "TAB": ["TB1_BACH^GAVOTTE^GR3.pdf"]
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
    mainy.innerHTML += "<li><a href='post/" + listy[i] + "'>" + charep(cutString) + "</a></li>";
  }

  mainy.innerHTML += "</ul>";

}


function charep(stringy)
{
  var inString = stringy.replace(/\^/g," ");
  return inString;
}




window.onload = function(){

  var selCat;
  somebody.addEventListener("click", function(){
      selCat = event.target.id;
      showArts(selCat);
  });

}
