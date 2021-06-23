// MAIN JS LISTER LIST APP KOLKURTZ 2021
//version 0.02
//TODO
// create a new list
// recolour lists - list becomes object
// enable delete list through hamburger icon
// simplify complete-uncomplete methods
// write restore code for JSON backup recovery
// track activity and recall through tool
// add last backup date warning (statList)

//GLOBAL PAGE ELEM VARS//
const listCont = document.getElementById('main');


//MESSY GLOBAL VARIABLES
var editList = "";



//TEST STORAGE//
// Item encoding Open or Complete _ Item body
/*
var lArchive = {
    "DAILY ACTIVITIES": ["O*Eat food","O*Eat food","O*Eat food","O*Eat food","O*Eat food"],
    "BATTLE PLAN": ["O*War","O*Eat food","C*Eat food","O*War","C*Eat food","O*Eat food","O*Eat food","O*Eat food"],
    "STATS": ["O*Last saved: 21_6_22","O*Open tasks: 35","O*Closed tasks: 12"]
}
*/


//DATA SAVE
function listSave()
{
    const lJSON = JSON.stringify(lArchive);
    localStorage.setItem('backup',lJSON);
}




//DATA LOAD
var lArchive = localStorage.getItem('backup');
const lJSON = JSON.stringify(lArchive);


function accessStorage()
{
    if(localStorage.getItem('backup')) {
        populateLists();
      } else {
        //browser storage is empty, prompt for text file input
      }

    console.log("HTML Local Storage API ready");
    console.log("list backup is currently:" + localStorage.getItem('backup'));
}

function populateLists()
{
    console.log("Loading lists from local storage");
    try {
            lArchive = JSON.parse(localStorage.getItem('backup'));
            buildLists(lArchive);
        } catch (ex) {
            console.error(ex);
        }    
}



//UPDATE


function buildLists(inArch)
{
    //empty list container
    $(listCont).empty();


    var count = 0;
    for (item in inArch)
    {
        $( "<div/>", 
        {
            "id": "list" + count,
            "class": "listy",
            click: function() {
              $( this ).toggleClass( "test" );
            }
        })
        .appendTo(listCont);
        
        var thisList = document.getElementById("list" + count);
        thisList.innerHTML+="<div class='lTit'>" + item + "</div><div class='lControl'><div class='subCont swatch'></div><div class='subCont inAndOut'></div></div>";
        thisList.innerHTML+="<div class='lBodyO'></div><div class='lBodyC'></div>";
        var thisBodyO = thisList.querySelector('.lBodyO');
        var thisBodyC = thisList.querySelector('.lBodyC');

        //items
        for(i=0;i<inArch[item].length;i++)
        {
            //check open or complete and split
            var splitItem = inArch[item][i].split("*");

            if(splitItem.indexOf("C")>-1)
            {
                thisBodyC.innerHTML+="<div id='" + splitItem[1] + "_" + i + "' class='listItem complete'><div class='iBody'>" + splitItem[1] + "</div><div class='iControl'><div class='iCont unticker'></div><div class='iCont deleter'></div></div></div>";
            }
            else
            {
                thisBodyO.innerHTML+="<div id='" + splitItem[1] + "_" + i + "' class='listItem'><div class='iBody'>" + splitItem[1] + "</div><div class='iControl'><div class='iCont ticker'></div><div class='iCont deleter'></div></div></div>";
            }
        }

        //add new item button, close list body and list
        thisList.innerHTML+="<div class='newItem'>+</div></div>";

        count++;
    };
}




//BACKUP
function download(filename, text) 
{
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}



//BEEPS
function beep(mood)
{
    if(mood=='good')
    {
        var audio = new Audio('bip.wav');
        audio.play();
    }
    else
    {
        var audio = new Audio('badbip.wav');
        audio.play();
    }
}


// ------------------------------ CORE FUNCTIONS --------------------------------
// MANAGE LISTS

//Store new list item and display
function lStore(parentList,newI)
{
    console.log("Creating item: " + newI + " in: " + parentList);

    //STORE
    lArchive[parentList].push("O*" + newI);
    listSave();
    console.log(lArchive);
    //UPDATE
    buildLists(lArchive);

}

//Complete a task
function completeIt(iName,lName)
{
    
    var splitty = iName.split("_");

    //STORE
    lArchive[lName][parseInt(splitty[1])] = "C*"+splitty[0];
    listSave();
    
    //UPDATE
    buildLists(lArchive);
}
//Uncomplete a task
function uncompleteIt(iName,lName)
{
    
    var splitty = iName.split("_");

    //STORE
    lArchive[lName][parseInt(splitty[1])] = "O*"+splitty[0];
    listSave();
    
    //UPDATE
    buildLists(lArchive);
}
//Delete a task
function deleteIt(iName,lName)
{
    
    var splitty = iName.split("_");

    //STORE
    var oldArray = lArchive[lName];
    oldArray.splice(splitty[1],1);

    lArchive[lName]=oldArray;
    listSave();
    
    console.log(lArchive);

    //UPDATE
    buildLists(lArchive);
}






//EVENT
$('#main').on( 'click', '.newItem', function()
{
    //clear text input
    $('#textTask').val('');
    //show modal
    $(".modal").fadeToggle();
    // Identify list
    editList = $(this).parent().children(":first").text();
} );

// Start file download
document.getElementById('backup').addEventListener('click', function()
{
    // Download JSON file
    var text = lJSON;
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'_');
    var filename = "backup_" + utc + ".txt";
    download(filename, text);
}, 
false);

//hide modal on escape or close click
$(document).keydown(function(e) 
{
    if(e.keyCode == 27) {
        $(".modal").hide(300);
}
});

$(".close").click(function()
{
    $(".modal").fadeOut();
});

//handle text input changes for new tasks
$('#newTask').keydown(function (e) 
{ 
    curInput = $('#textTask').val();

    if(curInput.length>179)
    {
        console.log(curInput.length);
        $("#adv").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        beep();
    }
    
    //handle enter
    if(e.keyCode == 13)
    {
        e.preventDefault();

        if(curInput.length>179)
        {
            $("#adv").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            beep();
        }
        else
        {
            //remove asterisks
            var trimInput = curInput.replace(/\*/g,'');

            console.log("Creating new task: " + trimInput);
            lStore(editList,trimInput);

            $('.close').click();
        }
    }
});


//Handle tick click
$('#main').on( 'click', '.ticker', function()
{
    beep('good');
    //Identify list
    var parentList = $(this).parents()[3];
    //get list title
    var listTitle = $(parentList).children()[0];
    // Identify list item
    var editItem = $(this).parents()[1];
    completeIt(editItem.id,$(listTitle).text());
} );

//Handle untick click
$('#main').on( 'click', '.unticker', function()
{
    beep();
    //Identify list
    var parentList = $(this).parents()[3];
    //get list title
    var listTitle = $(parentList).children()[0];
    // Identify list item
    var editItem = $(this).parents()[1];
    uncompleteIt(editItem.id,$(listTitle).text());
} );

//Handle delete click
$('#main').on( 'click', '.deleter', function()
{
    beep();
    //Identify list
    var parentList = $(this).parents()[3];
    //get list title
    var listTitle = $(parentList).children()[0];
    // Identify list item
    var editItem = $(this).parents()[1];
    deleteIt(editItem.id,$(listTitle).text());
} );






//MAIN    

function runMain()
{
    $('.modal').hide();

    if(localStorage.getItem('test')) {
        accessStorage();
      } else {
        alert("Unsupported data storage API")
      }
}



