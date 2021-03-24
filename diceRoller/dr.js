//Dice roller app
//kolkurtz 24_03_21
//version 0.5


//TODO
//Consider compiling fight into shoot using an arg to separate


//WS 0 ,BS 1,S 2,T  3,W  4,A  5,Sav  6,WeaponS 7,AP 8,DMG 9,NoATKS 10,MweaponS 11,AP  12,DMG  13,NoAtks  14
const units = 
{
    orkBoyShoota: [3,5,4,4,1,2,6,4,0,1,2,4,0,1,1], 
    orkBoySlugChop: [3,5,4,4,1,2,6,4,0,1,1,4,0,1,2],
    smIntercessorBR: [3,3,4,4,2,2,3,4,-1,1,1,4,0,1,1]
}


//global handles
    //get the output rows
    const outH = document.getElementById("hit");
    const outW = document.getElementById("wound");
    const outS = document.getElementById("save");
    const outD = document.getElementById("damage");
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

    return [result,wounded];
}

//save rolling
function saveRoll(savDef,apAtk)
{
    var modSave = savDef-apAtk;

    var result = Math.floor(Math.random()*6)+1;
    //variable for success or not
    var saved = 0;


    if(result>=modSave)
    {
        saved=1;
    }
    

    return[result,saved];
}

//damage rolling
function rollDmg(wpDmg)
{
    var finalD = 0;
    if(wpDmg == "d3")
    {
        finalD = Math.floor(Math.random()*3) + 1;
    }
    else if(wpDmg == "d6")
    {
        finalD = Math.floor(Math.random()*6) + 1;
    }
    else
    {
        console.log("You should not have come to this place");
    }

    return finalD;
}





//shooting rolls
function shoot()
{
    //combat matrix - all results in an object
    var combat = {};

    //wipe outputs
    outTxt.innerHTML="";
    var removals = document.getElementsByClassName("dyn");
    while(removals.length > 0){
        removals[0].parentNode.removeChild(removals[0]);
    }


    //identify attacker
    var atkr = units["orkBoyShoota"];
    var atkrCount = 9;
    var atkrShots = 9 * atkr[10];

    //identify defender
    var dfndr = units["smIntercessorBR"];

    //for each attacker
    for(let i=0;i<atkrShots;i++)
    {
        //new data row
        var combatItemLabel = "cbt"+ i;
        combat[combatItemLabel] = [];

        //hits
        var newAtk = document.createElement("div");
        newAtk.classList.add('dyn');
        var rollyH = d6Roll();
                //store
                combat[combatItemLabel][0]=rollyH;
        newAtk.innerHTML = "" + rollyH;
        outH.append(newAtk);
        if(rollyH >= atkr[1])
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
        newAtk.classList.add('dyn');
        var rollyW = wRoll(atkr[7],dfndr[3]);
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
        newAtk.classList.add('dyn');
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

        //damage
        var newAtk = document.createElement("div");
        newAtk.classList.add('dyn');
        var dmgUnit = "" + atkr[9];

        if(dmgUnit.indexOf("d")<0)
        {
            newAtk.innerHTML = atkr[9];
            combat[combatItemLabel][6]=atkr[9];
            outD.append(newAtk);
        }
        else
        {
            //do multi damage roll
            finalDmg = rollDmg(atkr[9]);
            newAtk.innerHTML = finalDmg;
            combat[combatItemLabel][6]=finalDmg;
            outD.append(newAtk);
        }

        //outcomes
        var newAtk = document.createElement("div");
        newAtk.classList.add('dyn');
        if(combat[combatItemLabel][1]==1 && combat[combatItemLabel][3]==1 && combat[combatItemLabel][5]==0)
        {
            if(combat[combatItemLabel][6]>=dfndr[4])
            {
                combat[combatItemLabel][7]="kill";
                newAtk.innerHTML = "KILL";
            }
            else
            {
                combat[combatItemLabel][7]="wound";
                newAtk.innerHTML = "WND";
            }
            newAtk.style.backgroundColor='red';
        }
        else
        {
            combat[combatItemLabel][7]="";
        }
        outO.append(newAtk);
    }

    
    //Calculate final outcome
    console.log(combat);
    //count wounds
    var countDead = 0;
    var countWounds = 0;
    for(thing in combat)
    {
        if(combat[thing][7]=="kill")
        {
            console.log("Found a kill");
            countDead++;
        }
        if(combat[thing][7]=="wound")
        {
            console.log("Found a wound");
            countWounds++;
        }
    }

    //dead from wounds
    var extraDeads = Math.floor(countWounds / dfndr[4]);
    var remainWounds = countWounds % dfndr[4];

    countDead = countDead + extraDeads;


    outTxt.innerHTML+="" + atkrCount + " orkBoyShoota" + "s have killed " + countDead + " smIntercessorBR" + "s and wounded " + remainWounds + " more";

}





//shooting rolls
function fight()
{
    //combat matrix - all results in an object
    var combat = {};

    //wipe outputs
    outTxt.innerHTML="";
    var removals = document.getElementsByClassName("dyn");
    while(removals.length > 0){
        removals[0].parentNode.removeChild(removals[0]);
    }


    //identify attacker
    var atkr = units["orkBoyShoota"];
    var atkrCount = 9;
    var atkrShots = 9 * atkr[10];

    //identify defender
    var dfndr = units["smIntercessorBR"];

    //for each attacker
    for(let i=0;i<atkrShots;i++)
    {
        //new data row
        var combatItemLabel = "cbt"+ i;
        combat[combatItemLabel] = [];

        //hits
        var newAtk = document.createElement("div");
        newAtk.classList.add('dyn');
        var rollyH = d6Roll();
                //store
                combat[combatItemLabel][0]=rollyH;
        newAtk.innerHTML = "" + rollyH;
        outH.append(newAtk);
        if(rollyH >= atkr[0])
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
        newAtk.classList.add('dyn');
        var rollyW = wRoll(atkr[11],dfndr[3]);
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
        newAtk.classList.add('dyn');
        var rollyS = saveRoll(dfndr[6],atkr[12]);
        newAtk.innerHTML = "" + rollyS[0];
                //store
                combat[combatItemLabel][4]=rollyS[0];
                combat[combatItemLabel][5]=rollyS[1];
        outS.append(newAtk);
        if(rollyS[1]==1)
        {
            newAtk.style.backgroundColor='red';
        }

        //damage
        var newAtk = document.createElement("div");
        newAtk.classList.add('dyn');
        var dmgUnit = "" + atkr[13];

        if(dmgUnit.indexOf("d")<0)
        {
            newAtk.innerHTML = atkr[9];
            combat[combatItemLabel][6]=atkr[9];
            outD.append(newAtk);
        }
        else
        {
            //do multi damage roll
            finalDmg = rollDmg(atkr[9]);
            newAtk.innerHTML = finalDmg;
            combat[combatItemLabel][6]=finalDmg;
            outD.append(newAtk);
        }

        //outcomes
        var newAtk = document.createElement("div");
        newAtk.classList.add('dyn');
        if(combat[combatItemLabel][1]==1 && combat[combatItemLabel][3]==1 && combat[combatItemLabel][5]==0)
        {
            if(combat[combatItemLabel][6]>=dfndr[4])
            {
                combat[combatItemLabel][7]="kill";
                newAtk.innerHTML = "KILL";
            }
            else
            {
                combat[combatItemLabel][7]="wound";
                newAtk.innerHTML = "WND";
            }
            newAtk.style.backgroundColor='red';
        }
        else
        {
            combat[combatItemLabel][7]="";
        }
        outO.append(newAtk);
    }

    
    //Calculate final outcome
    console.log(combat);
    //count wounds
    var countDead = 0;
    var countWounds = 0;
    for(thing in combat)
    {
        if(combat[thing][7]=="kill")
        {
            console.log("Found a kill");
            countDead++;
        }
        if(combat[thing][7]=="wound")
        {
            console.log("Found a wound");
            countWounds++;
        }
    }

    //dead from wounds
    var extraDeads = Math.floor(countWounds / dfndr[4]);
    var remainWounds = countWounds % dfndr[4];

    countDead = countDead + extraDeads;


    outTxt.innerHTML+="" + atkrCount + " orkBoyShoota" + "s have killed " + countDead + " smIntercessorBR" + "s and wounded " + remainWounds + " more";

}









//main
function main()
{
    document.getElementById("shoot").addEventListener("click", function() {
        shoot();
      });

    document.getElementById("fight").addEventListener("click", function() {
        fight();
      });

}