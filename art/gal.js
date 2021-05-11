var pics = ["bearNec.jpg",
"didymus.png",
"elvisSprite.gif",
"fingerman.jpg",
"gl1.jpg",
"gl2.jpg",
"hanger.png",
"HumanOutlines.png",
"IMG_20190317_183538.jpg",
"IMG_20190331_144500.jpg",
"IMG_20200119_141030.jpg",
"IMG_20200126_191737.jpg",
"IMG_20200312_190704.jpg",
"IMG_20200312_190715.jpg",
"IMG_20200316_180425.jpg",
"IMG_20200413_141750.jpg",
"IMG_20200621_130735.jpg",
"IMG_20200622_171800.jpg",
"IMG_20200622_171811.jpg",
"IMG_20200622_183846.jpg",
"IMG_20200712_190505-01.jpeg",
"kkBanner.png",
"kkBannerC.png",
"Motion6.png",
"odddcat.png",
"proportions.png",
"sizeGuide.png"];
var cont = document.getElementById('cont');

for(i=0;i<pics.length;i++)
{
  var tag = document.createElement("li");
  tag.innerHTML = "<img src='" + pics[i] + "'>";
  cont.appendChild(tag);
}
