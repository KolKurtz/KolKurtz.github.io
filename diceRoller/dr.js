//Dice roller app
//kolkurtz 24_03_21

//WS,BS,S,T,W,A,Sav,WeaponS,AP
const units = 
{
    orkBoyShoota: [5,3,4,4,1,2,6,4,0],
    smIntercessorBR: [3,3,4,4,2,2,3,4,-1]
}


//global handles
    //get the output rows
    const outH = document.getElementById("hit");
    const outW = document.getElementById("wound");
    const outS = document.getElementById("save");
    const outO = document.getElementById("outcome");
    const outTxt = document.getElementById("resultText");


//general d6 dice roller
function d6Roll()
{
    var result = Math.floor(Math.random()*6)+1;
    return result;
}

//wound rolling
function wRoll(inStr,inTough)
{
    var differ=inTough/inStr;
    console.log(differ);

    var result = Math.floor(Math.random()*6)+1;

    //variable for success or not
    var wounded = 0;
    
    if(differ>= 2)
    {
        //low str, need a 6
        if(result==6)
        {wounded=1;}
        else
        {wounded=0;}
    }
    else if(differ>1 & differ<2)
    {
        //lower str, need a 5
        if(result>=5)
        {wounded=1;}
        else
        {wounded=0;}
    }
    else if(differ==1)
    {
        //same, need a 4
        if(result>=4)
        {wounded=1;}
        else
        {wounded=0;}
    }
    else if(differ<1 && differ>0.5)
    {
        //higher, need a 3
        if(result>=3)
        {wounded=1;}
        else
        {wounded=0;}
    }
    else if(differ<=0.5)
    {
        //highest, need a 2
        if(result>=2)
        {wounded=1;}
        else
        {wounded=0;}

    }
    else
    {
        console.log("You should not have come to this place");
    }

    console.log("Returning wounded result of:" + wounded);

    return [result,wounded];
}

//save rolling
function saveRoll(savDef,apAtk)
{
    var modSave = savDef-apAtk;
    console.log("saving on a: " + modSave);

    var result = Math.floor(Math.random()*6)+1;
    //variable for success or not
    var saved = 0;


    if(result>=modSave)
    {
        saved=1;
    }
    

    return[result,saved];
}





//main
function roll()
{
    //identify attacker
    var atkr = units["orkBoyShoota"];
    var atkrCount = 10;

    //identify defender
    var dfndr = units["smIntercessorBR"];

    //combat matrix - all results in an object
    var combat = {};

    //for each attacker
    for(let i=0;i<atkrCount;i++)
    {
        //new data row
        var combatItemLabel = "cbt"+ i;
        combat[combatItemLabel] = [];

        //hits
        var newAtk = document.createElement("div");
        var rollyH = d6Roll();
                //store
                combat[combatItemLabel][0]=rollyH;
        newAtk.innerHTML = "" + rollyH;
        outH.append(newAtk);
        if(rollyH > atkr[0])
        {
            newAtk.style.backgroundColor='red';
            combat[combatItemLabel][1]=1;
        }
        else
        {
            combat[combatItemLabel][1]=0;
        }
        
        
        //wounds
        var newAtk = document.createElement("div");
        var rollyW = wRoll(atkr[7],dfndr[3]);
        console.log("die roll of: " + rollyW[0] + "is a result of:" + rollyW[1]);
        newAtk.innerHTML = "" + rollyW[0];
               //store
               combat[combatItemLabel][2]=rollyW[0];
               combat[combatItemLabel][3]=rollyW[1];
        outW.append(newAtk);
        if(rollyW[1]==1)
        {
            newAtk.style.backgroundColor='red';
        }
        
        
        //saves
        var newAtk = document.createElement("div");
        var rollyS = saveRoll(dfndr[6],atkr[8]);
        newAtk.innerHTML = "" + rollyS[0];
                //store
                combat[combatItemLabel][4]=rollyS[0];
                combat[combatItemLabel][5]=rollyS[1];
        outS.append(newAtk);
        if(rollyS[1]==1)
        {
            newAtk.style.backgroundColor='red';
        }

        //outcomes
        var newAtk = document.createElement("div");
        if(combat[combatItemLabel][1]==1 && combat[combatItemLabel][3]==1 && combat[combatItemLabel][5]==0)
        {
            combat[combatItemLabel][6]="wound";
            newAtk.innerHTML = "WND";
            newAtk.style.backgroundColor='red';
        }
        else
        {
            combat[combatItemLabel][6]="";
        }
        outO.append(newAtk);
    }

    console.log(combat);
    //Calculate final outcome
    //count wounds
    var countWounds = 0;
    for(thing in combat)
    {
        if(combat[thing][6]=="wound")
        {
            console.log("FOund a wound");
            countWounds++;
        }
    }
    var countDead = countWounds / dfndr[4];


    outTxt.innerHTML+="" + atkrCount + " orkBoyShoota" + "s have killed " + countDead + " smIntercessorBR" + "s";


}