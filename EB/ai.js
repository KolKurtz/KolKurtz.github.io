//AI PLAYERS

var persons = ["RISKY","VIOLENT","SKILLED","TIMID"];

var opAction = "GRD";

var abilityLog = [];


//choose opponent response
function selectAttack(playerAction)
{	
	//if phase 2
	if(playerAction)
	{

		console.log("Phase two AI selecting");
		var randy = Math.floor(Math.random() * 10);
		
		//perfect interpretation - opponent reads you like a book
		switch(playerAction)
		{
			//power attack pose
			case "DWN":
			case "UP":
				randy > 8 ? opAction = "GRD" : opAction = "CGRD";
			break;
			
			//fast attack
			case "SL":
			case "BANDC":
			case "CANDC":
			case "CANDW":
				opAction = "DWN";
			break;

			//manouver
			case "WITH":
			case "ROLL":
				opAction = "DWN";
			break;

			//guards
			case "GRD":
			case "CGRD":
				opAction = "DWN";
			break;
			
			default:
			break;
		}
	
	}
	else
	{
		//in phase 1
		console.log("Phase one AI selecting");
		switch(persons)
		{
			case "RISKY":
				opAction = "DN";
			break;
			
			case "VIOLENT":
				opAction = "DN";
			break;
			
			case "SKILLED":
				opAction = "DN";
			break;
			
			case "TIMID":
				opAction = "DN";
			break;
			
			default:
			break;
		}
	}
}