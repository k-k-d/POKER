var play;   //global object upon which every other function is called
var playermoney = 500,botmoney = 500;   //500 is alloted to the player and the bot each
var limit = (playermoney>botmoney) ? botmoney:playermoney;  //limit is the amount allowed when someone goes all in
var potmoney = 0;   //money in the pot
var moves = 1; var number_of_games = 0;
var flag_player = 1; var flag_bot = 1;  //flag to determine if the player is active or not
var playerbet = 0; var botbet = 0;  //bet of the player in each turn
var number_of_active_players = flag_bot + flag_player;
var number_cards_drawn = 0;
var foldbot = 0; var foldplayer = 0; var allinbot = 0 ; var allinplayer = 0;    //flags for various actions
var player_action = 10; //player action denotes what option the player chooses to play during his turn
var cancel = 0;     //cancel is a flag which determines an invalid bet amount
var k = ["Royal Flush","Straight Flush","Four of a Kind","Full House","Flush","Straight","Three of a Kind","Two pair","Pair","None"];   //denotes type of hand to print

var player_bet = function()
{
    var bet = document.getElementById("betamt").value;  //bet is obtained from the slider
    console.log(limit,bet,playerbet);
    if(parseInt(bet) < 0 || (parseInt(bet) + playerbet)> limit)  //checking if the bet is legal
    {
        alert("Invalid Bet!!!");
        cancel=1;
    }
    if(cancel==0)
    {
        bet = parseInt(bet);
        playerbet +=bet;    //incrementing player's bet for the turn
        potmoney += bet; playermoney -= bet;    //increasing money in pot and decreasing money with player
        if(playermoney == 0 || playerbet==limit) {flag_player = 0; allinplayer = 1;}
    }
}

var player_check = function()   //this is equivalent to the player_bet function with bet = 0 but with some tweaks
{
    var bet = 0;
    playerbet +=bet;
    potmoney += bet; playermoney -= bet;
    if(playermoney == 0) {flag_player = 0; allinplayer = 1;}
}

var player_allin = function()   //this is equivalent to the player_bet function with bet = limit but with some tweaks
{
    potmoney += limit-playerbet; playermoney += playerbet - limit;
    allinplayer = 1; flag_player = 0; playerbet = limit;   
}

var player_fold = function()
{
    foldplayer = 1; flag_player = 0;    //changing flag values
}

var bot_bet = function(bet)
{
    console.log("BOT BETS");
    if(bet!=0)document.getElementById("botsays").innerHTML="I bet "+bet;    //notifying the player about the bot's bet amount
    else document.getElementById("botsays").innerHTML="I check";    //when the bot checks, in a way it bets 0
    botbet += bet;  //incrementing bot's bet for this turn
    potmoney += bet; botmoney -= bet;   //increasing money in pot and decreasing money with bot
    if(botmoney == 0) {flag_bot = 0; allinbot = 1;}
}

var bot_allin = function()
{
    console.log("BOT GOES ALL IN");
    document.getElementById("botsays").innerHTML="I go all in ";    //notifying the player about the bot's bet amount
    allinbot = 1; flag_bot = 0; potmoney += limit - botbet; botmoney += botbet - limit; 
    botbet = limit;    //updating money and flags
}

var bot_fold = function()
{
    console.log("BOT FOLDS");
    document.getElementById("botsays").innerHTML="I fold";  //notifying the player
    foldbot = 1; flag_bot = 0; botbet = 0;  //updating flags
}

var game = function()   //function to set up the game
{
    limit = (playermoney>botmoney) ? botmoney:playermoney;
    number_of_games++;	
	play = new Game();
    console.log(play.allcards.player_hand);
    console.log(play.allcards.bot_hand);
    console.log(play.handCreateCompute());
}

var turn1 = function()  //the first turn - when no card is revealed
{
    if(flag_player == 1)
    {
        if(player_action == 3)  //based on the button the player presses the corresponding function is called
        {
            player_check();
        }
        if(player_action == 1)
        {
            player_allin();
        }
        if(player_action == 0)
        {
            player_fold();
        }
        if(player_action == 2)
        {
            if(allinbot == 1)alert("U either go ALL IN or FOLD");
            else player_bet();
        }
    }
    if(cancel==0)
    {
    if(flag_bot == 1)botTurn1();    //the bot is given its turn
    console.log(botbet);
    console.log(playerbet);
    if(playerbet == botbet && flag_bot == 1 && flag_player == 1)    //if the turn ends, reveal 3 cards and set all buttons to trigger turn2() onclick
    {
        flipCard(0);
	    flipCard(1);
	    flipCard(2);
        number_cards_drawn = 3;
        botbet = 0; playerbet = 0;
        document.getElementById("bet").setAttribute("onclick", "player_action = 2 ; turn2(); ");
        document.getElementById("allin").setAttribute("onclick", "player_action = 1 ; turn2(); ");
        document.getElementById("fold").setAttribute("onclick", "player_action = 0 ; turn2(); ");
        document.getElementById("check").setAttribute("onclick", "player_action = 3 ; turn2(); ");
        limit = (playermoney>botmoney) ? botmoney:playermoney;
    }
    if(foldbot == 1 || foldplayer == 1 || allinplayer == 1)finish();
    }
    cancel = 0;
}

var turn2 = function()  //the second turn - when 3 cards are revealed   |   code similar to turn1()
{
    if(flag_player == 1)
    {
        if(player_action == 3)
        {
            player_check();
        }
        if(player_action == 1)
        {
            player_allin();
        }
        if(player_action == 0)
        {
            player_fold();
        }
        if(player_action == 2)
        {
            player_bet();
        }
    }
    if(cancel==0)
    {
    if(flag_bot == 1)botTurn2();
    console.log(botbet);
    console.log(playerbet);
    if(playerbet == botbet && flag_bot == 1 && flag_player == 1)    //if the turn ends, reveal 1 more card and set all buttons to trigger turn3() onclick
    {
	    flipCard(3);
        number_cards_drawn = 4;
        botbet = 0; playerbet = 0;
        document.getElementById("bet").setAttribute("onclick", "player_action = 2 ; turn3(); ");
        document.getElementById("allin").setAttribute("onclick", "player_action = 1 ; turn3(); ");
        document.getElementById("fold").setAttribute("onclick", "player_action = 0 ; turn3(); ");
        document.getElementById("check").setAttribute("onclick", "player_action = 3 ; turn3(); ");
        limit = (playermoney>botmoney) ? botmoney:playermoney;
    }
    if(foldbot == 1 || foldplayer == 1 || allinplayer == 1)finish();
    }
    cancel=0;
}

var turn3 = function()  //the third turn - when 4 cards are revealed   |   code similar to turn1()
{
    if(flag_player == 1)
    {
        if(player_action == 3)
        {
            player_check();
        }
        if(player_action == 1)
        {
            player_allin();
        }
        if(player_action == 0)
        {
            player_fold();
        }
        if(player_action == 2)
        {
            player_bet();
        }
    }
    if(cancel==0)
    {
    if(flag_bot == 1)botTurn3();
    console.log(botbet);
    console.log(playerbet);
    if(playerbet == botbet && flag_bot == 1 && flag_player == 1)    //if the turn ends, reveal 1 more card and set all buttons to trigger turn4() onclick
    {
	    flipCard(4);
        number_cards_drawn = 5;
        botbet = 0; playerbet = 0;
        document.getElementById("bet").setAttribute("onclick", "player_action = 2 ; turn4(); ");
        document.getElementById("allin").setAttribute("onclick", "player_action = 1 ; turn4(); ");
        document.getElementById("fold").setAttribute("onclick", "player_action = 0 ; turn4(); ");
        document.getElementById("check").setAttribute("onclick", "player_action = 3 ; turn4(); ");
        limit = (playermoney>botmoney) ? botmoney:playermoney;
    }
    if(foldbot == 1 || foldplayer == 1 || allinplayer == 1 )finish();
    }
    cancel=0;
}

var turn4 = function()  //the fourth turn - when 4 cards are revealed   |   code similar to turn1()
{
    if(flag_player == 1)
    {
        if(player_action == 3)
        {
            player_check();
        }
        if(player_action == 1)
        {
            player_allin();
        }
        if(player_action == 0)
        {
            player_fold();
        }
        if(player_action == 2)
        {
            player_bet();
        }
    }
    if(cancel==0)
    {
    if(flag_bot == 1)botTurn4();    //if this turn ends, the round ends
    console.log(botbet);
    console.log(playerbet);
    if((playerbet == botbet && flag_bot == 1 && flag_player == 1) || foldbot == 1 || foldplayer == 1 || allinplayer == 1)
    {
        botbet = 0; playerbet = 0;limit = (playermoney>botmoney) ? botmoney:playermoney;finish();
    }
    }
    cancel=0;
}

var finish =function()  //function which finally displays the bot's cards and the unturned cards after a round
{
    flipCard(0);
    flipCard(1);
    flipCard(2);
    flipCard(3);
    flipCard(4);
    var op = play.handCreateCompute();
    document.getElementById("C7").src = play.allcards.bot_hand[5].value+"-"+play.allcards.bot_hand[5].suit+".png";
    document.getElementById("C8").src = play.allcards.bot_hand[6].value+"-"+play.allcards.bot_hand[6].suit+".png";
    //displaying winner and loser
    if(foldbot == 1){playermoney += potmoney;potmoney = 0; setTimeout(function(){win();},3000);}
	else if(foldplayer == 1){botmoney += potmoney;potmoney = 0; setTimeout(function(){lose();},3000);}
	else if(allinbot == 1 && allinplayer == 1)
	{
		if(op == "win"){playermoney += potmoney;potmoney = 0; setTimeout(function(){win();},3000);}
		else if(op == "lose"){botmoney += potmoney; potmoney = 0; setTimeout(function(){lose();},3000);}
		else {playermoney += potmoney/2;botmoney += potmoney/2;potmoney = 0; setTimeout(function(){draw();},3000);}
    }
    else
    {
        if(op == "win"){playermoney += potmoney; setTimeout(function(){win();},3000);}
		else if(op == "lose"){botmoney += potmoney; setTimeout(function(){lose();},3000);}
		else {playermoney += potmoney/2;botmoney += potmoney/2; setTimeout(function(){draw();},3000);}
    }
    if(botmoney != 0 && playermoney != 0)setTimeout(function(){nextRound();console.log("Next Rnd");},8000);
    else if (botmoney == 0)document.getElementById("botsays").innerHTML="YOU WIN THE GAME\n   Press Reset for next Game";
    else if (playermoney == 0)document.getElementById("botsays").innerHTML="YOU LOSE THE GAME\n   Press Reset for next Game";
}

function win()  //displays player's hand type and bot's hand type
{
    document.getElementById("botsays").innerHTML="Player : "+k[play.p-1]+"\n &nbsp&nbsp  Bot : "+k[play.b-1]+"\n &nbsp&nbsp  You Won the Round";
}

function lose()//displays player's hand type and bot's hand type
{
    document.getElementById("botsays").innerHTML="Player : "+k[play.p-1]+"\n &nbsp&nbsp  Bot : "+k[play.b-1]+"\n &nbsp&nbsp  You Lost the Round";
}

function draw()//displays player's hand type and bot's hand type
{
    document.getElementById("botsays").innerHTML="Player : "+k[play.p-1]+"\n &nbsp&nbsp  Bot : "+k[play.b-1]+"\n &nbsp&nbsp  The Round has been Drawn";
}

function func_player_money()    //updates player money on screen
{
	document.getElementById("plmoney").innerHTML = "PLAYER MONEY : "+playermoney ;
}

function func_bot_money()   //updates bot money on screen
{
	document.getElementById("bomoney").innerHTML = "BOT MONEY : "+botmoney ;
}

function func_pot_money()   //updates pot money on screen
{
	document.getElementById("pomoney").innerHTML = "POT MONEY : "+potmoney ;
}

//call functions to update money in specified intevals of time
// setInterval(limit = (playermoney>botmoney) ? botmoney:playermoney,500);
setInterval(func_player_money,500);
setInterval(func_bot_money,500);
setInterval(func_pot_money,500);

var nextRound = function()  //re-initialises every global variable and button and automatically begins next round
{
    moves = 1;
	flag_player = 1;
	flag_bot = 1;
	activitybot = 1,activityplayer = 1; 
	number_cards_drawn = 0;
	potmoney = 0;
	foldbot = 0;
	allinbot = 0;
	foldplayer = 0;
    allinplayer = 0;
    cancel=0;
    playerbet=0;botbet=0;
    document.getElementById("allin").setAttribute("onclick", "player_action = 1 ; turn1(); ");
    document.getElementById("bet").setAttribute("onclick", "player_action = 2 ; turn1(); ");
    document.getElementById("fold").setAttribute("onclick", "player_action = 0 ; turn1(); ");
    document.getElementById("check").setAttribute("onclick", "player_action = 3 ; turn1(); ");
    document.getElementById("C0").src = "CardBack.png";
    document.getElementById("C1").src = "CardBack.png";
    document.getElementById("C2").src = "CardBack.png";
    document.getElementById("C3").src = "CardBack.png";
    document.getElementById("C4").src = "CardBack.png";
    document.getElementById("C5").src = "CardBack.png";
    document.getElementById("C6").src = "CardBack.png";
    document.getElementById("C7").src = "CardBack.png";
    document.getElementById("C8").src = "CardBack.png";
    document.getElementById("botsays").innerHTML="Starting Next Round...";
	start();
}

var reset = function()  //re-initialises every variable and waits for user to press reset to begin next Game
{
    playermoney = 500,botmoney = 500;
    limit = (playermoney>botmoney) ? botmoney:playermoney;
    potmoney = 0;
    moves = 1; number_of_games = 0;
    flag_player = 1;
    flag_bot = 1; playerbet = 0; botbet = 0;
    number_of_active_players = flag_bot + flag_player;
    number_cards_drawn = 0;
    foldbot = 0; foldplayer = 0; allinbot = 0 ; allinplayer = 0;
    player_action=10;
    cancel=0;
    playerbet=0;botbet=0;
    document.getElementById("allin").setAttribute("onclick", "player_action = 1 ; turn1(); ");
    document.getElementById("bet").setAttribute("onclick", "player_action = 2 ; turn1(); ");
    document.getElementById("fold").setAttribute("onclick", "player_action = 0 ; turn1(); ");
    document.getElementById("check").setAttribute("onclick", "player_action = 3 ; turn1(); ");
    document.getElementById("C0").src = "CardBack.png";
    document.getElementById("C1").src = "CardBack.png";
    document.getElementById("C2").src = "CardBack.png";
    document.getElementById("C3").src = "CardBack.png";
    document.getElementById("C4").src = "CardBack.png";
    document.getElementById("C5").src = "CardBack.png";
    document.getElementById("C6").src = "CardBack.png";
    document.getElementById("C7").src = "CardBack.png";
    document.getElementById("C8").src = "CardBack.png";
    document.getElementById("botsays").innerHTML="Press START";
}