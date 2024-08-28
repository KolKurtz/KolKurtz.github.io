//DEMO CLUDGE

var pObj =
{
	HP: 20,
	AR: 10,
	EN: 5,
	CT: 10,
	CELL: 5,
	ZEN: 10,
	SP: 3,
	RG: 2,
	TIME: 6
};

//megacludge - dont change the pobj
var CTMAX = 10;
var ENMAX = 5;
var chargers = 2;
var stimers = 2;

var oObj =
{
	HP: 10,
	AR: 3,
	EN: 2,
	SP: 2,
	RG: 1,
	TIME: 10
};

//END DEMO CLUDGE


//TURN MECHANICS

//three phases - select / reaction / wrap-update
var phase = 1;

//lockout list - moves out of resource - this is faster than checking the DOM
var lockouts = [];

//players round choices - used in AI decision making and damage calc
var firstRoundAction;
var secondRoundAction;

var resCode = "";

var summaryStub = " <div class='closeMe'>NEXT TURN</div> ";

var animWait;

//turn spacebar on and off
var readyEnable = false;

//END TURN MECHANICS


//HTML STUBS

var speedB = "<div>Break the deadlock!</div><img src='deadlock.png'>";
var strengthB = "<div>Break the deadlock!</div><img src='deadlock.png' class='deadlock'>";

//END HTML STUBS



//COMBAT RESOLUTION GRID
//one object per player action, each property represents the opponent choice and looks up a reference code
var combRes = 
{
	DWN: 
	{
		DWN: "ST", SL: "Pmin", UP: "O", DIS: "SP", BANDC: "Pmin", CANDC: "SPO", CANDW: "SP", WITH: "N", GRD: "ST", ROLL: "N", CGRD: "ST" 
	},
	SL:
	{	
		DWN: "Omin", SL: "ST", UP: "Omin", DIS: "SP", BANDC: "Pmin", CANDC: "SP", CANDW: "SP", WITH: "O", GRD: "N", ROLL: "O", CGRD: "P"
	},
	UP:
	{
		DWN: "P", SL: "Pmin", UP: "ST", DIS: "SP", BANDC: "Pmin", CANDC: "SPO", CANDW: "SP", WITH: "N", GRD: "N", ROLL: "N", CGRD: "P"
	},
	DIS: 
	{
		DWN: "SP", SL: "SP", UP: "SP", DIS: "N", BANDC: "P", CANDC: "SP", CANDW: "N", WITH: "N", GRD: "N", ROLL: "N", CGRD: "Pplus"
	},
	BANDC: 
	{
		DWN: "Omin", SL: "Omin", UP: "Omin", DIS: "O", BANDC: "N", CANDC: "Omin", CANDW: "SP", WITH: "N", GRD: "N", ROLL: "N", CGRD: "N"
	},
	CANDC: 
	{
		DWN: "SPP", SL: "SP", UP: "SPP", DIS: "SP", BANDC: "Pmin", CANDC: "SP", CANDW: "SP", WITH: "N", GRD: "ST", ROLL: "N", CGRD: "P"
	},
	CANDW: 
	{
		DWN: "SP", SL: "SP", UP: "SP", DIS: "N", BANDC: "SP", CANDC: "SP", CANDW: "SP", WITH: "N", GRD: "N", ROLL: "N", CGRD: "P"
	},
	WITH: 
	{
		DWN: "N", SL: "P", UP: "N", DIS: "N", BANDC: "N", CANDC: "N", CANDW: "N", WITH: "N", GRD: "N", ROLL: "N", CGRD: "N"
	},
	GRD: 
	{
		DWN: "ST", SL: "N", UP: "N", DIS: "N", BANDC: "N", CANDC: "ST", CANDW: "N", WITH: "N", GRD: "N", ROLL: "N", CGRD: "N"
	},
	ROLL: 
	{
		DWN: "N", SL: "P", UP: "N", DIS: "N", BANDC: "N", CANDC: "N", CANDW: "N", WITH: "N", GRD: "N", ROLL: "N", CGRD: "N"
	},
	CGRD: 
	{
		DWN: "ST", SL: "O", UP: "O", DIS: "OPlus", BANDC: "N", CANDC: "O", CANDW: "O", WITH: "N", GRD: "O", ROLL: "N", CGRD: "N"
	}
}
//END COMBAT RESOLUTION





//ROUND STATS AND COUNTERS

var pTimeBank = 0;

var roundSelectTime = 0;

//END ROUND STATS AND COUNTERS





//SELECT ELEMENTS

var playerStat = $("#hero .statlistS");
var oppoStat = $("#opponent .statlistS");

//END SELECT ELEMENTS





//FIXED COSTS
//base costs - later modified by what opponent picks
var moveCost = 
{
	// movename: EN cost, CT cost, SPD(1-10), DMG (1-10) (flesh), DMGA(armour)
	DWN: [5,5,3,10,5],
	UP: [5,6,4,10,8],
	SL: [2,3,8,6,3],
	DIS: [7,7,3,0,0],
	BANDC: [3,6,6,6,3],
	CANDC: [3,5,5,4,3],
	CANDW: [3,5,5,4,0],
	WITH: [3,5,4,0,0],
	ROLL: [1,5,5,0,0],
	GRD: [1,2,7,0,0],
	CGRD: [1,5,6,6,5]
};

//END FIXED COSTS



function checkControls()
{
	console.log("Re-enable controls");
	$(".controlB").css('background','black');

	lockouts = [];
	
	for(item in moveCost)
	{
		if(moveCost[item][0] > pObj.EN  || moveCost[item][1] > pObj.CT)
		{
			$("#" + item).css('background','white');
			lockouts.push(item);
			console.log("locking out: " + item + " because CT is: " + pObj.CT + " and cost is: " + moveCost[item][1]);
		}
	}
	console.log(lockouts);
}







//XXXXXXXXXX  PRIMARY FUNCTIONS XXXXXXXXXXXXXXXXX

function setupPlyrs()
{
	$(playerStat).empty();
	$(oppoStat).empty();
	
	//reset animation
	$("#playerA").css('background',"url('playerReady.png')");
	$("#enemyA").css('background',"url('enemyReady.png')");
	
	for(thing in pObj)
	{
		$("<div></div>").html(thing + "<br> " + pObj[thing]).appendTo($(playerStat));
	}
	for(thing in oObj)
	{
		$("<div></div>").html(thing + "<br> " + oObj[thing]).appendTo($(oppoStat));
	}
	
	//set timer expiry to player time limit
	expire = pTimeBank;
}



//Check rapidity of response and update costs
function updateGUI(action)
{
	if(timeAlert == true)
	{
		console.log("TIMEOUT! Energy lost. Trying to guard");
	}
	else if(action == "ready")
	{
		
	}
	else
	{
		pObj.EN = pObj.EN - moveCost[action][0];
		pObj.CT = pObj.CT - moveCost[action][1];
		
		//flash changes
		$("<div></div>").addClass('flashCT').addClass('flash').html(moveCost[action][1]).appendTo($("#hero"));
		$("<div></div>").addClass('flashEN').addClass('flash').html(moveCost[action][0]).appendTo($("#hero"));
		$(".flash").fadeOut(1000);
	}
	
			
	pTimeBank = Math.round( (pTimeBank - lastTime) * 100) / 100;
	console.log("Time used: " + pTimeBank);
	
	//lockout any commands outside energy and concentration levels
	checkControls();
	
	setupPlyrs();
}




//Player has selected either modify or continue
function phaseTwo(act)
{
	
	roundSelectTime = Math.round( (lastTime + roundSelectTime) * 100) / 100;
	
	console.log("TOTAL ROUND TIME IS: " +  roundSelectTime);
	console.log("In phase 2 with: " + act + " total time: " + roundSelectTime);
	
	if(act == "ready")
	{
		console.log("Player already had: " + firstRoundAction + ", keeping it.");
		
		//handle player not modifying
		secondRoundAction = firstRoundAction;
	}
	else
	{
		secondRoundAction = act;
		
	}
	
	updateGUI(act);
	tidyUpRestart();
}

//player allows clock to run out - go to phase 2 with guard auto selected
function timeOut()
{
	$("<div></div>").addClass('timeUp').html("TIMEOUT!").appendTo($("body")).fadeOut(1500); 
	
	
	//remove time bank
	pTimeBank = 0.0;
	
	if(phase == 1)
	{
		phase = 2;
		phaseTwo("GRD");
	}
	else
	{
		phaseTwo("GRD");
	}
}





//CALCULATE DAMAGE AND SHOW THE TURN END SUMMARY  [USES WAIT INTERVALS FOR TIMING]
function tidyUpRestart()
{
	console.log("Doing end phase");
	
	animWait = true;
	combatWait = true;
	
	
	//resolve combat!
	combatResolve();
	
	var combatWaiter = setInterval(function()
	{
		if(combatWait == false)
		{
			clearInterval(combatWaiter);
			//animate attacks/deaths etc [HAS TIMEOUT OF 3 seconds and waits for combat to end]
			animateResult();
		}
		else
		{
			console.log("Waiting for combat to end");
		}
	},500);
	
	
	var animWaiter = setInterval(function()
	{
		if(animWait == false)
		{
			clearInterval(animWaiter);
		
			//adjust health and armour according to results
			var resultText = battleResult();
			
			//cover screen with summary
			$("<div></div>").addClass('turnSumm').html(resultText + summaryStub).appendTo('body');
			
			//clear time out alerts
			timeAlert = false;
			
			//reset combatant images to neutral posture
			
			//reset player time to MAX
			pTimeBank = pObj.TIME;
			
			setupPlyrs();
			
			checkControls();
		}
		else
		{
			console.log("Waiting for animation");
		}
		
	},500)
}


function battleResult()
{		
	var dmg = 0;
	var pArmoured, oArmoured;
	
	pObj.AR > 0 ? pArmoured = true: pArmoured = false;
	oObj.AR > 0 ? oArmoured = true: oArmoured = false;

	//health and armour adjust (low dmg 0.4, mid 0.6, high 1)
	switch(resCode)
	{
		case "Omin":
			if(oArmoured == true)
			{
				dmg = Math.floor(0.4 * moveCost[secondRoundAction][4]);
			}
			else
			{
				dmg = Math.floor(0.4 * moveCost[secondRoundAction][3]);
			}
			oObj.HP = oObj.HP - dmg;
			console.log("Opponent hit for: " + dmg);
		break;
		
		case "Omin":
			if(oArmoured == true)
			{
				dmg = Math.floor(0.6 * moveCost[secondRoundAction][4]);
			}
			else
			{
				dmg = Math.floor(0.6 * moveCost[secondRoundAction][3]);
			}
			oObj.HP = oObj.HP - dmg;
			console.log("Opponent hit for: " + dmg);
		break;		
		
		case "Omin":
			if(oArmoured == true)
			{
				dmg = moveCost[secondRoundAction][4];
			}
			else
			{
				dmg = moveCost[secondRoundAction][3];
			}
			console.log("Opponent hit for: " + dmg);
			oObj.HP = oObj.HP - dmg;
		break;
		
		case "Pmin":
			if(pArmoured == true)
			{
				dmg = Math.floor(0.4 * moveCost[opAction][4]);
			}
			else
			{
				dmg = Math.floor(0.4 * moveCost[opAction][3]);
			}
			pObj.HP = pObj.HP - dmg;
			console.log("Player hit for: " + dmg);			
		break;
		
		case "Pplus":
			if(pArmoured == true)
			{
				dmg = Math.floor(0.6 * moveCost[opAction][4]);
			}
			else
			{
				dmg = Math.floor(0.6 * moveCost[opAction][3]);
			}
			pObj.HP = pObj.HP - dmg;
			console.log("Player hit for: " + dmg);		
		break;
		
		case "Pplus":
			if(pArmoured == true)
			{
				dmg = moveCost[opAction][4];
			}
			else
			{
				dmg = moveCost[opAction][3];
			}
			pObj.HP = pObj.HP - dmg;
			console.log("Player hit for: " + dmg);		
		break;
		
		default:
		break;
	}


	//time bonuses
	var timeBonus =  pTimeBank / pObj.TIME;
	var concBonus = Math.floor(timeBonus * CTMAX);
	
	//update player obj for concentration - but limit conc if timed out
	if(timeAlert == true)
	{
		pObj.CT = 2;
	}
	else
	{
		pObj.CT = Math.min(pObj.ZEN,pObj.CT + concBonus);
	}
	//regenerate energy
	pObj.EN = Math.min(pObj.CELL,pObj.EN + pObj.RG);
	
	var results = "<div class='pResult'>";
	for(thing in pObj)
	{
		results += ( "<div>" + thing + "<br> " + pObj[thing] + "</div>");
	}
	results += "</div>";
	results += "<div class='pInfo'>Regenerated " + pObj.RG + " energy.";
	if(timeAlert == true)
	{
		results += "<br>Timed out! Only 2 concentration remaining.</div>";
	}
	else
	{
		results += "<br>Time elapsed: " + pTimeBank + " granting + " + concBonus + " concentration.</div>";
	}
	results += "<div class='buffs'>";
	results += "<img src='chargepod.png' class='charge'>";
	results += "<img src='stimhack.png' class='stim'>";
	results += "</div>";
	
	return results;
}



function combatResolve()
{
	//lookup combat resolution code from tables
	resCode = combRes[secondRoundAction][opAction];
	console.log("Combat resolution code from: " + secondRoundAction + " and: " + opAction + " is: " + resCode);
	
	//process codes ST STO STP SP SPP SPO P Pmin Plus O Omin Oplus N
	
	if( (resCode == "ST") || (resCode == "STO") || (resCode == "STP") )
	{
		strengthBattle(resCode);
	}
	else if(  (resCode == "SP") ||  (resCode == "SPO") || (resCode == "SPP") )
	{
		speedBattle(resCode);
	}
	else
	{
		//no battles to wait for proceed to animation!
		combatWait = false;
	}
}



//ANIMATION


function animateMove()
{	
	console.log("Giving away tactics.... or am I.....");


	var pImage = "player" + generateImageCode(firstRoundAction);
	var opImage = "enemy" + generateImageCode(opAction);
	
	$("#playerA").css('background',"url('" + pImage + "')");
	$("#enemyA").css('background',"url('" + opImage + "')");
	
}


function generateImageCode(actions)
{
	var imageCode;
	
	//switch on movechoice
	switch(actions)
	{
		//guards
		case 'GRD':
		case 'CGRD':
		imageCode = "GRD.png";
		break;
		
		//speed
		case 'SL':
		case 'BANDC':
		case 'CANDC':
		case 'CANDW':
		imageCode = "SPD.png";
		break;
		
		//down
		case 'DWN':
		imageCode = "DWN.png";
		break;
		
		//up
		case 'UP':
		imageCode = "UP.png";
		break;
		
		//agile
		case 'DIS':
		case 'ROLL':
		case 'WITH':
		imageCode = "ready.png";
		break;		
		
		default:
		break;
	}	
	
	return imageCode;
}


//ANIMATE THE MAIN BATTLE RESULTS
//process codes P Pmin Pplus O Omin Oplus N
function animateResult()
{
	//generate a move animation for player and opponent
	var playerAnim = "player" + generateAnimCode(secondRoundAction);
	var oppAnim = "enemy" + generateAnimCode(opAction);
	
	console.log("Animating: " + playerAnim + " for player.");
	console.log("Animating: " + oppAnim + " for enemy.");
	
	//if a combatant is damaged overwrite with a damage animation
	
	
	$("#playerA").css('background',"url('" + playerAnim + "')");
	$("#enemyA").css('background',"url('enemyDMG.gif')");
	
	
	
	setTimeout(function()
	{
		animWait = false;
	},3000);
}



//lookup a gif for selected move and combatant
function generateAnimCode(theAction)
{
	var imageCode;
	
	//switch on movechoice
	switch(theAction)
	{
		//guards
		case 'GRD':
		case 'CGRD':
		imageCode = "GRD.gif";
		break;
		
		//speed
		case 'SL':
		case 'BANDC':
		case 'CANDC':
		case 'CANDW':
		imageCode = "SPD.gif";
		break;
		
		//down
		case 'DWN':
		imageCode = "DWN.gif";
		break;
		
		//up
		case 'UP':
		imageCode = "UP.gif";
		break;
		
		//agile
		case 'DIS':
		case 'ROLL':
		case 'WITH':
		imageCode = "agile.gif";
		break;		
		
		default:
		break;
	}	
	
	return imageCode;
}


//END ANIMATIONS








//BATTLES!!!!!!

function speedBattle(code)
{
	$("<div></div>").addClass("speedb").addClass("battle").html(speedB).appendTo($("body"));
}

function strengthBattle(code)
{
	dlockTarget = Math.floor( 20 * (oObj.SP / pObj.SP) );
	dlockCount = 0;
	$("<div></div>").addClass("strengthb").addClass("battle").html(strengthB + "<div>Target is: " + dlockTarget + "</div><div class='dlockCount'></div>").appendTo($("body"));
	$(".deadlock").fadeOut(3000,function(){
		if(dlockCount >= dlockTarget)
		{
			console.log("WIN BATTLE!");
			$(".strengthb").append("<div>SUCCESS!!!!</div><div class='closeBat'>CLOSE</div>");
			resCode = "Omin";
		}
		else
		{
			console.log("LOSE BATTLE!");
			$(".strengthb").append("<div>FAILURE!!!!</div><div class='closeBat'>CLOSE</div>");
			resCode = "Pmin";
		}
	});
}


//END BATTLES!!!!!!


//XXXXXXXXXX  END PRIMARY FUNCTIONS XXXXXXXXXXXXXXXXX


//MAIN

$("document").ready(function()
{
	//initialize player time bank
	pTimeBank = pObj.TIME;
	
	//initialize max concentration and energy
	CTMAX = pObj.ZEN;
	ENMAX = pObj.CELL;
	
	setupPlyrs();
	
	checkControls();
	
	startTimer();
	
	
	
	$(".controlB").click(function()
	{
		var selAction = $(this).attr('id');
	
		if(lockouts.indexOf(selAction) > -1)
		{
			//deny
			//playbeep
			document.getElementById('nope').play();
		}
		else
		{
			stopTimer();
			
			//split operation on turn phase
			if(phase == 2)
			{	
				//turn space back off
				readyEnable = false;
		
				//opponent selects attack
				selectAttack(firstRoundAction);
				
				//run phase 2
				phaseTwo(selAction);
			}
			else if(phase == 1)
			{
				firstRoundAction = selAction;
				
				//opponent selects attack
				selectAttack();
				//finish phase 1
				phase = 2;
				
				console.log("Player chose: " + selAction + " at: " + lastTime);
				updateGUI(selAction);
				
				//draw combatant posture changes
				animateMove();
				
				//total the time
				roundSelectTime += lastTime;
				
				//reduce the time pool for the timer function
				expire = expire - lastTime;
				
				//enable phase 2 timer
				startTimer();
				
				//allow space presses
				readyEnable = true;
			}
			else
			{
				//impossible?
				console.log("Impossibru!");
			}
		}
	});
	
	
	
	//close Summary and restart round
	$("body").on('click','.closeMe',function(){
		
		console.log("A new turn begins!");
		
		
		$(".turnSumm").remove();
		phase = 1;
		
		
		//reset turn timer
		roundSelectTime = 0.0;
		
		
		startTimer();

	});
	
	
	//listen for spacebar
	$(document).bind('keydown', 'space', function () 
	{
		
        if (phase == 2 && readyEnable == true)
		{
			console.log("Player readied");
	
	
			stopTimer();
	
			//turn space back off
			readyEnable = false;
			
			//opponent selects attack
			selectAttack(firstRoundAction);
			
			//enter phase 2
			phaseTwo("ready");
        }
    });
	
	
	//hoverinfo
	$(".controlB").hover(function(e)
	{
		var x = e.clientX;
		var y = e.clientY;
		var encost = moveCost[$(this).attr('id')][0];
		var ctcost = moveCost[$(this).attr('id')][1];
		
		$(".info").hide();
		$("<div></div>").addClass('info').css('top', (y - 100) + "px").css('left', x + "px").html("EN cost: " +  encost + "<br>CT cost:" + ctcost).appendTo($("body")).fadeOut(2000); 
	});
	
	
	//battleclickers
	$("body").on('click','.deadlock',function()
	{
		dlockCount++;
		$(".dlockCount").html(dlockCount); 
	});
	
	
	//battle close - also frees up combat wait
	$("body").on('click','.closeBat',function()
	{
		combatWait = false;
		$(".battle").remove(); 
	});
	
});