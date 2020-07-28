var pics = ["odddcat.png",
            "HumanOutlines.png",
            "sizeGuide.png",
            "bearNec.jpg",
            "elvisSprite.gif",
            "gl1.jpg",
            "gl2.jpg",
            "proportions.png"
            ];
var cont = document.getElementById('cont');

for(i=0;i<pics.length;i++)
{
  var tag = document.createElement("li");
  tag.innerHTML = "<img src='" + pics[i] + "'>";
  cont.appendChild(tag);
}
