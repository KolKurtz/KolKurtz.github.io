//16 by 18 layouts load at random into the 8 divisions of the main grid

//top left cell of each 8th of the grid
var entryPoints = ["0_0","400_0","800_0","1200_0","0_450","400_450","800_450","1200_450"];

const layout1 =
[
  ["g1","g2","g3","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2"],
  ["g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2"],
  ["g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2"],
  ["g1","g2","g3","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2"],
  ["g1","g2","g1","g2","g1","g2","g1","g3","g1","g2","g3","g2","g1","g2","g1","g2"],
  ["g2","g3","g3","g2","g2","g2","g1","g1","g3","g2","g2","g2","g3","g3","g1","g1"],
  ["g3","g1","g1","g2","g3","g1","g3","g1","g1","g3","g1","g1","g1","g2","g3","g1"],
  ["g1","g3","g3","g3","g2","g3","g1","g1","g1","g1","g1","g1","g1","g1","g3","g3"],
  ["g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2"],
  ["g1","g2","g1","g2","g1","g2","g1","g2","g1","water","g1","g2","g1","g2","g1","g2"],
  ["g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2"],
  ["g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2"],
  ["g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2"],
  ["g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2"],
  ["g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2","g1","g2"],
  ["g1","g2","g1","g2","mudTL","mudTM","mudTR","g2","g1","g2","g1","g2","g1","g2","g1","g2"],
  ["g1","g2","g1","g2","mudL","mudM","mudR","g2","g1","g2","g1","g2","g1","g2","g1","g2"],
  ["g1","g2","g1","g2","mudBL","mudBM","mudBR","g2","g1","g2","g1","g2","g1","g2","g1","g2",]
];

const layout2 =
[
  ["g2","g3","g3","g1","g1","g3","g2","g2","w3","g3","g4","g4","g2","g4","g4","w1"],
  ["g2","w2","g3","g2","g1","g2","g1","g1","w3","g2","g3","g4","g2","g4","g4","w2"],
  ["g2","w1","g3","g3","g3","g4","g4","g3","g1","g1","g1","w4","g4","g3","g2","g2"],
  ["g1","g4","w4","g4","g2","g3","g1","w4","w3","g2","g2","g3","g1","g4","g3","g4"],
  ["g3","w1","g3","g2","g1","w2","g3","g1","w4","g2","g2","g3","g4","g1","g3","g4"],
  ["g3","g2","g1","g2","g3","g2","w4","w2","g4","g2","g4","g3","w4","g2","w3","g2"],
  ["g2","g3","g4","g2","g3","g4","w1","w1","g1","g3","g3","g4","g1","g3","w3","g4"],
  ["g4","g4","g1","w2","g4","g3","g1","g1","w2","g3","g1","w2","g2","g3","g1","g2"],
  ["g4","g2","w1","g3","g2","g3","g3","g1","g1","g1","g4","g3","g4","g4","g2","g2"],
  ["g3","g1","g4","g1","g3","g2","g3","g3","w2","g4","w1","g2","g4","g4","g2","g1"],
  ["g1","g2","g3","g3","g4","g2","g1","w2","g4","g3","w2","g4","g2","g3","g4","g2"],
  ["g3","g4","g3","w2","g3","w4","w1","g4","g1","g4","g4","w4","w2","g4","g1","w2"],
  ["g4","g1","g2","w4","g4","g2","g4","g2","g1","g1","g2","g1","g1","g2","g1","g3"],
  ["g3","w4","g4","g2","g4","g4","g2","g3","g2","w4","g3","w4","g3","w4","g1","w2"],
  ["w2","g3","g4","g4","w4","g2","g3","g4","g2","g4","g4","g4","g2","w3","g4","g3"],
  ["g4","g3","w3","g3","g3","g2","g2","g3","g3","g4","g2","g4","g1","g4","g3","g1"],
  ["g2","g2","w3","w1","g2","g3","g4","g1","g1","g4","w2","g3","g1","g4","w3","g2"],
  ["g3","g4","w4","w1","g2","g4","g1","g4","g1","g1","g3","g1","g4","g1","g2","g1"]
];

const layout3 =
[
  ["g2","g2","g3","g4","g2","g3","g3","g1","g4","g2","g2","g4","g2","g3","g1","g4"],
  ["g1","g3","g3","g4","g1","g4","g4","g1","g3","g3","g2","g3","g3","g4","g2","g1"],
  ["g3","g1","g2","g2","rock","g2","g4","g4","g3","g2","g3","g1","g3","g3","g2","g3"],
  ["g1","g1","g3","g1","g4","g1","g3","g4","g3","g1","g2","g1","g1","water","g3","g1"],
  ["g2","g3","rock","g4","g2","g1","g3","g3","g1","g1","g4","g2","g2","g2","g3","g1"],
  ["g3","g2","g2","g1","rock","g4","g4","g1","g1","g2","g3","g4","g4","g4","g4","g4"],
  ["g1","g1","g2","g4","g1","g3","g3","g1","g2","g1","g4","g3","g2","g3","g1","g2"],
  ["g3","g4","g4","g2","g2","g2","g3","g4","g2","g1","g1","g4","g3","g1","g3","g1"],
  ["g3","g1","g3","g1","g4","g4","g3","g3","g1","g4","g2","g2","g3","g2","g3","g2"],
  ["g2","g2","g1","g3","g1","g3","g1","g3","g3","g2","g1","g2","g1","g4","g3","g3"],
  ["g3","g4","g2","g2","g2","g1","g2","mud","g1","g3","g3","g4","g3","g1","g3","g4"],
  ["g1","g3","g1","g4","g2","g2","g3","g1","g4","g1","g2","g1","g1","g1","g3","g3"],
  ["g1","g4","g4","g3","g4","g3","g2","g4","g3","g4","g1","g1","g2","g1","g1","g2"],
  ["g4","g4","g1","g1","g1","g2","g1","g3","g1","g1","g4","g4","g2","g1","g2","g2"],
  ["g2","g4","g3","g4","g4","g1","g2","g3","g4","g4","g4","g2","g4","g2","g3","g4"],
  ["g2","g4","g3","g4","g2","g2","g2","g3","g4","g2","g2","g1","g1","g1","mud","g1"],
  ["g2","g3","g3","g1","g3","g4","g2","g4","g1","g4","g2","g1","g4","g1","g3","g2"],
  ["g1","g4","g1","g3","g3","g2","g1","g1","g1","g1","g2","g2","g4","g3","g3","g2"]
];

const layout4 =
[
  ["g4","g2","g4","g2","g4","g3","g3","desert","g1","g1","desert","g3","g3","desert","g4","g2"],
  ["g4","g1","g2","desert","desert","g4","g4","desert","g3","g2","g2","g3","g2","g2","g1","g4"],
  ["g3","g4","g2","g2","g2","g3","g1","desert","g4","g3","g2","g2","g2","g4","g3","desert"],
  ["desert","g2","g1","desert","g1","g1","g3","g3","g2","g2","g2","desert","g4","g2","g3","g3"],
  ["g4","g4","g3","desert","desert","g1","g2","g3","g4","g4","g1","desert","g3","g4","g2","g3"],
  ["desert","g1","g3","desert","g2","g1","g4","g4","desert","g3","g3","desert","g4","g4","desert","g2"],
  ["g3","desert","g2","g1","desert","g4","g1","g2","g1","g1","g2","g3","g4","g2","g4","g4"],
  ["desert","g3","g2","g4","g1","g4","g2","g3","g4","desert","g4","desert","desert","g1","g4","g3"],
  ["g4","g2","g3","desert","desert","g2","g3","g2","desert","g3","desert","desert","desert","g4","desert","g1"],
  ["g1","g1","g3","g3","g3","g3","g2","g3","desert","g4","g4","g1","g4","desert","g1","g1"],
  ["g1","g3","g3","g4","g2","g1","g4","g2","g1","g4","g3","g4","desert","g2","g4","desert"],
  ["g3","g4","g4","g1","g3","g1","g2","g3","g2","g4","g4","g3","desert","g2","g4","g2"],
  ["desert","g4","desert","g2","g2","g3","g3","g1","g2","g2","g3","g1","desert","g2","g4","desert"],
  ["g3","g1","desert","desert","g2","g2","g1","desert","g2","g4","g1","g1","g2","g4","g2","desert"],
  ["desert","g2","g2","g4","g3","g3","desert","g3","g3","g4","g2","g4","g1","g1","g1","g2"],
  ["g3","g1","g4","g2","g1","g3","g3","g2","g3","g2","g3","g4","g1","g3","g4","g3"],
  ["g4","desert","g2","g4","desert","g1","g3","g3","g1","desert","g1","g4","g3","g1","g1","g2"],
  ["desert","g1","g3","g4","g4","g1","g4","g2","g1","g4","g3","g3","g4","g4","g1","desert"],
];

const layout5 =
[
  ["g4","g4","g2","g1","g3","g1","g4","g4","desert","desert","g1","g3","g1","desert","g3","desert"],
  ["desert","g2","g4","rock","g1","g4","g2","rock","g3","g3","g1","rock","g1","g4","rock","desert"],
  ["rock","g3","g1","rock","rock","rock","g2","rock","rock","rock","g2","g2","g2","desert","g2","g3"],
  ["g2","rock","g3","g4","g3","rock","g4","rock","g4","desert","desert","g4","desert","g4","g3","g1"],
  ["g1","g3","g2","g3","g2","desert","g1","rock","rock","g4","rock","g2","rock","g4","g3","g2"],
  ["desert","g1","g3","rock","g4","rock","rock","rock","g1","g2","g4","rock","g1","desert","g3","rock"],
  ["rock","g3","g4","g3","rock","desert","desert","g2","desert","desert","g2","rock","g3","desert","g2","desert"],
  ["g4","g3","g1","g1","rock","g2","desert","g2","g1","g2","g2","g2","g4","g2","rock","desert"],
  ["rock","g2","g3","g1","g4","g3","g1","g4","rock","rock","g1","g4","g3","desert","g4","g4"],
  ["g2","g4","g3","g2","g3","desert","g4","g2","desert","g4","g1","rock","g2","g4","g2","g2"],
  ["desert","rock","desert","g1","g1","g3","g1","g4","g3","g1","rock","desert","desert","rock","g4","g4"],
  ["g3","g4","g2","g2","g2","g1","g3","desert","rock","g4","g2","desert","rock","g4","g4","g2"],
  ["g1","rock","rock","rock","rock","rock","desert","g3","g1","g2","g4","desert","g2","g4","g2","g2"],
  ["desert","g2","desert","g2","g2","desert","g4","g4","g4","g2","g4","g4","g4","g4","rock","desert"],
  ["g2","g4","desert","rock","g1","rock","rock","rock","rock","desert","g1","g1","g2","g4","rock","g2"],
  ["g2","g1","rock","rock","desert","g4","g4","desert","rock","rock","desert","rock","g4","g3","g4","desert"],
  ["g4","desert","g2","rock","g2","rock","rock","desert","rock","desert","g4","g1","g4","g4","g1","rock"],
  ["desert","g2","g1","rock","g1","g1","g2","g1","g2","desert","desert","g3","g3","desert","g4","g4"],
];

const layout6 =
[
  ["g4","g4","g2","rock","g3","g1","g4","g4","desert","desert","g1","g3","g1","desert","g3","desert"],
  ["desert","g2","g4","rock","rock","g4","g2","rock","g3","g3","g1","rock","g1","g4","rock","desert"],
  ["rock","g3","g1","rock","rock","rock","g2","rock","rock","rock","g2","g2","g2","desert","g2","g3"],
  ["g2","rock","g3","g4","g3","rock","g4","rock","g4","desert","desert","g4","desert","g4","g3","g1"],
  ["g1","g3","g2","g3","g2","desert","g1","rock","rock","g4","rock","g2","rock","g4","g3","g2"],
  ["desert","g1","g3","rock","g4","rock","rock","rock","g1","g2","g4","rock","g1","desert","g3","rock"],
  ["rock","g3","g4","g3","rock","desert","desert","g2","desert","desert","g2","rock","g3","desert","g2","desert"],
  ["g4","g3","g1","g1","rock","g2","desert","g2","g1","g2","g2","g2","g4","g2","rock","desert"],
  ["rock","g2","g3","g1","g4","g3","g1","g4","rock","rock","g1","g4","g3","desert","g4","g4"],
  ["g2","g4","g3","g2","g3","desert","g4","g2","desert","g4","g1","rock","g2","g4","g2","g2"],
  ["desert","rock","desert","g1","g1","g3","g1","g4","g3","g1","rock","desert","desert","rock","g4","g4"],
  ["g3","g4","g2","g2","g2","g1","g3","desert","rock","g4","g2","desert","rock","g4","g4","g2"],
  ["g1","rock","rock","rock","rock","rock","desert","g3","g1","g2","g4","desert","g2","g4","g2","g2"],
  ["desert","g2","desert","g2","g2","desert","g4","g4","g4","g2","g4","g4","g4","g4","rock","desert"],
  ["g2","g4","desert","rock","g1","rock","rock","rock","rock","desert","g1","g1","g2","g4","rock","g2"],
  ["g2","g1","rock","rock","desert","g4","g4","desert","rock","rock","desert","rock","g4","g3","g4","desert"],
  ["g4","desert","g2","rock","g2","rock","rock","desert","rock","desert","g4","g1","g4","g4","g1","rock"],
  ["desert","g2","g1","rock","g1","g1","g2","g1","g2","desert","desert","g3","g3","desert","g4","g4"],
];

const layout7 =
[
  ["g4","g4","g2","rock","g3","g1","g4","g4","desert","desert","g1","g3","g1","desert","g3","desert"],
  ["desert","g2","g4","rock","rock","g4","g2","rock","g3","g3","g1","rock","g1","g4","rock","desert"],
  ["rock","g3","g1","rock","rock","rock","g2","rock","rock","rock","g2","g2","g2","desert","g2","g3"],
  ["g2","rock","g3","g4","g3","rock","g4","rock","g4","desert","desert","g4","desert","g4","g3","g1"],
  ["g1","g3","g2","g3","g2","desert","g1","rock","rock","g4","rock","g2","rock","g4","g3","g2"],
  ["desert","g1","g3","rock","g4","rock","rock","rock","g1","g2","g4","rock","g1","desert","g3","rock"],
  ["rock","g3","g4","g3","rock","desert","desert","g2","desert","desert","g2","rock","g3","desert","g2","desert"],
  ["g4","g3","g1","g1","rock","g2","desert","g2","g1","g2","g2","g2","g4","g2","rock","desert"],
  ["rock","g2","g3","g1","g4","g3","g1","g4","rock","rock","g1","g4","g3","desert","g4","g4"],
  ["g2","g4","g3","g2","g3","desert","g4","g2","desert","g4","g1","rock","g2","g4","g2","g2"],
  ["desert","rock","desert","g1","g1","g3","g1","g4","g3","g1","rock","desert","desert","rock","g4","g4"],
  ["g3","g4","g2","g2","g2","g1","g3","desert","rock","g4","g2","desert","rock","g4","g4","g2"],
  ["g1","rock","rock","rock","rock","rock","desert","g3","g1","g2","g4","desert","g2","g4","g2","g2"],
  ["desert","g2","desert","g2","g2","desert","g4","g4","g4","g2","g4","g4","g4","g4","rock","desert"],
  ["g2","g4","desert","rock","g1","rock","rock","rock","rock","desert","g1","g1","g2","g4","rock","g2"],
  ["g2","g1","rock","rock","desert","g4","g4","desert","rock","rock","desert","rock","g4","g3","g4","desert"],
  ["g4","desert","g2","rock","g2","rock","rock","desert","rock","desert","g4","g1","g4","g4","g1","rock"],
  ["desert","g2","g1","rock","g1","g1","g2","g1","g2","desert","desert","g3","g3","desert","g4","g4"],
];


const laychoice = [layout1,layout2,layout3,layout4,layout5,layout6,layout7];


//for each eigth load a random layout
//these iterators use hard coded limits of 16 and 18 because ouch my head

function loadLayouts()
{
  for(i=0;i<entryPoints.length;i++)
  {
    var chosen = laychoice[Math.floor(Math.random()*laychoice.length)];
    //rows
    for(j=0;j<18;j++)
    {
      var writeCell = entryPoints[i];
      var writeCellX = writeCell.split("_")[0];
      var writeCellY = parseInt(writeCell.split("_")[1]) + (j * 25);
      var activeCell = writeCellX + "_" + writeCellY;
      //columns
      for(k=0;k<16;k++)
      {
        var cwriteCellX = parseInt(activeCell.split("_")[0]) + (k * 25);
        var cwriteCellY = activeCell.split("_")[1];
        var cactiveCell = cwriteCellX + "_" + cwriteCellY;
        dataModel[cactiveCell][2] = chosen[j][k];
        //change dataModel first property to reflect cell contents
        writeModel(dataModel[cactiveCell][0],chosen[j][k]);
      }
    }
  }
}



//update the primary property of a cell with its terrain prototype
//use switch statement to filter all grasstiles to "grass" for example
function writeModel(cellind,tcontent)
{
  console.log("Changing: " + cellind + " to: " + tcontent);
}
