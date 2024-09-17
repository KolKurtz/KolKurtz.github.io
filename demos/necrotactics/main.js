var opts =
{
    gangOpt: "none",
    corOpt: true,
    houseOpt: true,
    cardCount: 2,
    undOpt: 0
};

const tacticCards = 
{
    card0: ["click","core","play this card after an enemy fighter completes an attack with a ranged weapon","the weapon immediately runs out of ammo, as if it had failed an ammo check"],
    card1: ["bait and switch","community", "play this card instead of activating a fighter", "take a ready marker from any of your fighters and place it on a fighter who has already activated this round"],
    card2: ["battle madness","escher","Play instead of activating a fighter","Choose a Broken Fighter from either gang. They immediately make a ranged attack against the closest fighter they can see, friend or foe. If they are in base contact with another fighter, they make close combat attacks instead."],
    card3: ["Beast Lure","core","A fighter can spend an action to play this card","Place the Beast’s Lair marker within 3’’ of this fighter. Then, they can move up to D6’’. If they end the action within 6’’ of the lair, there is a chance they will be attacked as normal"],
    card4: ["Blackout","escher","Play this card at the start of any round","For the duration of this round, ranged attacks have an additional -1 modifier if made against targets between 6’’ and 12’’ away, or a -2 modifier if made against targets more than 12’’ away. Attackers using an infra-scope or photo goggles, or targeting a fighter with a Blaze marker, ignore these penalties."],
    card5: ["blazing fury","escher","Play this card when activating a fighter","For the duration of this fighter's turn, the Shoot action is treated as simple rather than Basic"],
    card6: ["blood debt","core","Play this card when one of your fighters is taken out of Action by an enemy fighter's attack","For the rest of the battle, add 1 to the result of any hit rolls for fighters from your gang when they target the attacker. Tuck this card under the attacker’s Fighter card as a reminder"],
    card7: ["burst of courage","escher","Play this card when making a Cool check for a fighter","The fighter automatically passes the check, and any more Cool checks they are required to make until the end of the round."],
    card8: ["chain attacks","escher","Play when a fighter takes an enemy Out of Action with a Melee attack","The activating fighter can move up to D6’’ and make a Fight Basic action. Their activation then immediately ends"],
    card9: ["combat drugs","van saar","Play when a fighter makes a melee attack", "For the duration of this turn, the fighter gains D3 additional attacks. However, should the fighter gain the full 3 additional attacks, they will automatically suffer a Flesh Wound at the end of their activation"]
}

function optToggle(opty)
{
    var checkOpt = opty.id;
    console.log("option contains:" + opts[checkOpt]);

    if(opts[checkOpt]==true)
    {
        opts[opty.id] = false;
        $(opty).text("OFF");
    }
    else
    {
        opts[opty.id] = true;
        $(opty).text("ON");
    }

}



function populateCards()
{
    var maxCount = datas.length;
    console.log("choosing from " + maxCount + " cards");


    var chosenCards = [];

    // do filters


    for (let i=0;i<opts.cardCount;i++)
    {
        var randy = Math.floor(datas.length * Math.random()) + 1;
        
        var nextCard = datas[randy];
        
        chosenCards.push(nextCard);
    }

    cardsOut(chosenCards);
    console.log(chosenCards);

}


function cardsOut(cardys)
{
    for(let j=0;j<cardys.length;j++)
    {
        $( "<div/>", 
        {
            "id": "card"+j,
            "class": "card",
            "text": "",
            click: function() 
            {
            $( this ).hide();
            }
        }).append("<ul><li class='titleC'>" + cardys[j].title.toLowerCase() + "</li><li class='setC'>" + cardys[j].cardSet.toLowerCase() + "</li><li class='condC'>" + cardys[j].timing.toLowerCase() + "</li><li class='descC'>" + cardys[j].effect.toLowerCase() + "</li></ul>").appendTo($('#main'));
    }
}



function runMain()
{
    //bind selectors and go button
    $( ".control" ).on( "click", "img", function() {

        $(".control img").removeClass("outliner");

        var selecty = $(this)[0];
        opts.gangOpt = selecty.id;
        $(selecty).addClass("outliner");
    });

    $( ".control" ).on( "click", ".optInd", function() {
        var selecty = $(this)[0];
        optToggle(selecty);
    });

    $( "#totCount" ).on( "click", function(event) {
        var totCount = $(event.target).text();
        totCount = parseInt(totCount);
        totCount++;
        if(totCount == 4)
        {
            totCount = 0;
        }
        else
        {}
        $(event.target).text(totCount);
        opts.cardCount = totCount;
    });

    $( "#undCount" ).on( "click", function(event) {
        var undCount = $(event.target).text();
        undCount = parseInt(undCount);
        undCount++;
        if(undCount == 4)
        {
            undCount = 0;
        }
        else
        {}
        $(event.target).text(undCount);
        opts.undOpt = undCount;
    });


    $("body").on( "click", ".generator", function() {

        console.log(opts);
        //check valid selection
        if(opts.gangOpt == "none")
        {
            alert("choose a gang");
        }
        else if(opts.corOpt==false && opts.houseOpt==false)
        {
            alert("must choose core or house cards");
        }
        else
        {
            console.log(datas);
            populateCards();
        }
    });

}