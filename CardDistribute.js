function cards9()   //function to generate nine cards to be used in a game 2(player) + 2(bot) + 5(common) = 9
{
    var d=new Deck();
    var cards=new Array(9);
    for(var i=0;i<9;i++)
    {
        cards[i]=d.cardGen();
        for(var j=0;j<i;j++)
        {
            if(cards[i].suit==cards[j].suit && cards[i].value==cards[j].value)  //checking if a generated card is equal to a previously generated card
            i--;
        }
    }
    return cards;
}

var Hands = function(cards) //defines a hand for each player and the 5 common cards |   'cards' - array of 9 Cards
{
    this.player_hand=new Array(7);  //5(common) + 2(player exclusive)
    this.bot_hand=new Array(7); //5(common) + 2(player exclusive)
    this.common=new Array(5);   //5(common)
    this.cards = cards;
    for(var i=0;i<5;i++)    //first 5 cards are common
    {
        this.common[i] = cards[i];
        this.player_hand[i] = cards[i];
        this.bot_hand[i] = cards[i]; 
    }
    for(var i=5;i<7;i++)
    {
        this.player_hand[i] = cards[i]; //6 and 7 for player
        this.bot_hand[i] = cards[i+2];  //8 and 9 for bot
    }   
}

