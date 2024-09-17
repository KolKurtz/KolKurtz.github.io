//VERB CONJUGASION
//kolkurtz 12-10-16
//extension - filters for switching on and off modes - via php selection
//PROBLEM - assumes masculine for agreement of verb terminasion


//VAR
//counters for correct answers
var correctCount, pcCount, piCount, pqpCount, preCount, futCount, conCount, subCount, impCount, indCount = 0;
//person choices
var pOption = ["1s","2s","3s","1p","2p","3p"];
//links a person code to the french word AND the read point in the save object for that verb eg je goes to array index 3
var personCheck =
{
  "1s": ["je",3],
  "2s": ["tu",4],
  "3s": ["il",5],
  "1p": ["nous",6],
  "2p": ["vous",7],
  "3p": ["ils",8]
}
//mode and tenses choices
//first letter is mode (I is indicative, M is imperative, C is cond, S is subj)
var mOption = ["IP","IPC","IPI","IPQP","IF","CPC","CP"];


//STUBS
//tooltip person
var tTipPerson = "PERSON (masculine)<br> eg: 3s is <span class='red'>third</span> person <span class='red'>s</span>ingular - il";

//GLOBAL ACQUIRE TEXT FIELDS AND QUESTION FIELDS
var verbQ = $("#selVerb");
var tenseQ = $("#selTense");
var perQ = $("#selPsn");
var perIn = $("#person input");

//GLOBAL ANSWER STRINGS
var answerP = "";
var answerA = "";
var answerV = "";


//GLOBAL USER SCORE
var score = 0;
var attempts = 0;


//APP STATE
var reporting = false;


//lookup in js library
function loadVerb()
{
  //clear old variables
  answerV = "";
  answerA = "";
  answerP = "";

  //random a person, tense and mode
  var perSel = pOption[Math.floor(Math.random() * pOption.length)];
  var modSel = mOption[Math.floor(Math.random() * mOption.length)];

  //draw random verb with those params
  //first get into the right modetense object
  var selObject = coreLib[modSel];
  //then random out a verb
  var objKeys = Object.keys(selObject);
  var selArray = selObject[objKeys[objKeys.length * Math.random() << 0]];

  //look up the right answer verb conjugated to person from array
  findConj(selArray,perSel);

  //print info for user
  verbQ.html(selArray[1]);
  perQ.html(perSel);
  //convert name of object to readable tense info
  var modRead = readableM(modSel);
  tenseQ.html(modRead);


}



//set global answer variables based on randomised params
function findConj(vbArray,per)
{
  //split operation on 1s because of je and j', look it up from the array
  if(per == "1s")
  {
    answerP = vbArray[2];
  }
  else
  {
    answerP = personCheck[per][0];
  }

  //get the right verb point from the array ie 1s is 3, 2s = 4...
  var conjA = vbArray[personCheck[per][1]];

  //check for aux
  if(conjA.indexOf("_")>-1)
  {
    answerA = conjA.split("_")[0];
    answerV = conjA.split("_")[1];
  }
  else
  {
    answerV = conjA;
  }

}





//get readable user question info about mode instead of object name
function readableM(mode)
{
  switch(mode)
  {
    case "IP":
    var answer = "indicative presente";
    break;

    case "IPC":
    var answer = "indicative passé composé";
    break;

    case "IPI":
    var answer = "indicative imparfait";
    break;

    case "IPQP":
    var answer = "indicative plus-que-parfait";
    break;

    case "IF":
    var answer = "indicative future";
    break;

    case "CPC":
    var answer = "conditional passé composé";
    break;

    case "CP":
    var answer = "conditional present";
    break;

    default:
    break;
  }

  return answer;
}




//validate answer against correct responses
function checkAnswer(p,a,v)
{
  attempts = attempts + 3;

  var qScore = 0;
  if(answerP == p)
  {
    qScore++;
  }
  else
  {
    $("#person .greyTitle").css("color","red");
  }

  if(answerA == a)
  {
    qScore++;
  }
  else
  {
    $("#aux .greyTitle").css("color","red");
  }

  if(answerV == v)
  {
    qScore++;
  }
  else
  {
    $("#verb .greyTitle").css("color","red");
  }

  if(qScore == 0)
  {
    $("#result").html("INCORRECT");
  }
  else if(qScore == 3)
  {
    $("#result").html("CORRECT");
  }
  else
  {
    $("#result").html("PART CORRECT");
  }


  score = score + qScore;

  //tote SCORE
  pcScore = Math.floor( (score / attempts) * 100);


  $("#rightAnswer").html( (answerP =="j'" ? answerP : answerP + " ") + answerA + " " + answerV);
  $("#percent").html(pcScore + "%");

  reporting = true;
  $("#report").show();
}



//MAIN
$(document).ready(function()
{

  console.log("I live!");

  loadVerb();

  //UI
  $( "#selPsn" ).hover(
  function(event)
  {
    var mousePosX = event.pageX;
    var mousePosY = event.pageY;
    $("<div></div>").addClass( "tTip" ).css("left",mousePosX).css("top",mousePosY).html(tTipPerson).appendTo($("#verbInput"));
  }, function()
  {
    $( ".tTip" ).remove();
  }
  );

  $( "#confBox" ).hover(
  function(event)
  {
  $(this).css("background","black");
  }, function()
  {
    $(this).css("background","none");
  }
  );


  //receive confirm click - also triggered by enter key
  $( "#confBox" ).click(function()
  {
    if(reporting == true)
    {
      //do nothing
    }
    else
    {
      var perU = $("#perU").val().toLowerCase().trim();
      var auxU = $("#auxU").val().trim().toLowerCase();
      var verbU = $("#verbU").val().trim().toLowerCase();

      checkAnswer(perU,auxU,verbU);
    }
  });

  //receive continue click
  $( ".again" ).click(function()
  {
    loadVerb();

    $(".greyTitle").css("color","#E1E4E4");

    //empty input FIELDS
    $("#perU").val("");
    $("#auxU").val("");
    $("#verbU").val("");

    reporting = false;
    $("#report").hide();
  });


  //accent board
  $("#left").click(function()
  {
    $("#popAcc").show();
  })


  $("#popAcc table td:nth-child(1),#popAcc table td:nth-child(3)").click(function()
  {
    var temp = $("<input>");
    $("body").append(temp);
    temp.val($(this).html()).select();
    document.execCommand("copy");
    temp.remove();
  });

  $("#accCl").click(function()
  {
    $("#popAcc").hide();
  })

})
