//spritemap
var spriteMap = new Map();
spriteMap.set("grass","0_0");
spriteMap.set("mud","25_0");
spriteMap.set("water","50_0");
spriteMap.set("rock","75_0");
spriteMap.set("desert","100_0");
console.log(spriteMap);

//grass tiles
spriteMap.set("g1","0_0");
spriteMap.set("g2","0_25");
spriteMap.set("g3","0_50");
spriteMap.set("g4","0_75");

//mud tiles
spriteMap.set("m1","25_0");
spriteMap.set("m2","25_250");
spriteMap.set("m3","25_275");
spriteMap.set("m4","25_300");

//desert tiles
spriteMap.set("d1","50_0");
spriteMap.set("d2","50_250");
spriteMap.set("d3","50_275");
spriteMap.set("d4","50_300");

//rock tiles
spriteMap.set("r1","75_0");
spriteMap.set("r2","75_250");
spriteMap.set("r3","75_275");
spriteMap.set("r4","75_300");

//water tiles
spriteMap.set("w1","100_0");
spriteMap.set("w2","100_250");
spriteMap.set("w3","100_275");
spriteMap.set("w4","100_300");


//mud form all orientations - top left, top mid, top right, left, mid, right, bot left, bot mid, bot right
spriteMap.set("mudTL","25_25");
spriteMap.set("mudTM","25_50");
spriteMap.set("mudTR","25_75");
spriteMap.set("mudL","25_100");
spriteMap.set("mudM","25_125");
spriteMap.set("mudR","25_150");
spriteMap.set("mudBL","25_175");
spriteMap.set("mudBM","25_200");
spriteMap.set("mudBR","25_225");

//water form all orientations - top left, top mid, top right, left, mid, right, bot left, bot mid, bot right
spriteMap.set("wTL","50_25");
spriteMap.set("wTM","50_50");
spriteMap.set("wTR","50_75");
spriteMap.set("wL","50_100");
spriteMap.set("wM","50_125");
spriteMap.set("wR","50_150");
spriteMap.set("wBL","50_175");
spriteMap.set("wBM","50_200");
spriteMap.set("wBR","50_225");

//rock form all orientations - top left, top mid, top right, left, mid, right, bot left, bot mid, bot right
spriteMap.set("rTL","100_25");
spriteMap.set("rTM","100_50");
spriteMap.set("rTR","100_75");
spriteMap.set("rL","100_100");
spriteMap.set("rM","100_125");
spriteMap.set("rR","100_150");
spriteMap.set("rBL","100_175");
spriteMap.set("rBM","100_200");
spriteMap.set("rBR","100_225");

//dessert form all orientations - top left, top mid, top right, left, mid, right, bot left, bot mid, bot right
spriteMap.set("dTL","125_25");
spriteMap.set("dTM","125_50");
spriteMap.set("dTR","125_75");
spriteMap.set("dL","125_100");
spriteMap.set("dM","125_125");
spriteMap.set("dR","125_150");
spriteMap.set("dBL","125_175");
spriteMap.set("dBM","125_200");
spriteMap.set("dBR","125_225");



//get drawpoints from received sprite name
Map.prototype.getCord = function(sprName)
{
  return this.get(sprName);
}
