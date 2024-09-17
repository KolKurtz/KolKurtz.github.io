//GBLOG MAIN KOLKURTZ 2021
//v1.0.1
//TODO

var stats = {};

//load faction
function loadStats(fac)
{
    var loadString = "" + fac + ".csv";

    $.ajax({
        url:loadString,
        dataType:"text",
        success:function(data)
        {
         stats = data.split(/\r?\n|\r/);
        }
       });
       
    console.log(stats);
}


//MAIN    

function runMain()
{

    //UI BINDING
    $('.tool').click(function(){
        var clicky = $(this).attr('id');
        if(clicky=="kkhome")
        {
            window.location="https://kolkurtz.github.io/";
        }
        else
        {
            console.log("Out of options");
        }
    });

    //FACTION SWITCH + load
    $('#faction').change(function(e){
            var factSelect = this.value;
            console.log('Faction changed to ' + factSelect);
            loadStats(factSelect);
        });

}
