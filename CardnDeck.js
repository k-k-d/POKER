valuename = ["Ace","2","3","4","5","6","7","8","9","10","Jack","Queen","King"]; //global variable to represent face value
suitname = ["Spades","Clubs","Diamonds","Hearts"];  //global variable to represent suit of a card

var Card = function(value, suit)  //defining a card with 2 attributes - suit & value
{
  this.value = value;
  this.suit = suit;
};

var Deck = function() //defining a deck of cards
{
  this.deck=[]; //array of 52 unique cards
  for(var i=0;i<4;i++)
    {
      for(var j=0;j<13;j++)
        {
          this.deck.push(new Card(j,i));  //pushing 'Card' objects into the array
        }
    }
  this.cardGen = function() //function which returns a random Card from the array
  {
    return this.deck[Math.floor(Math.random()*52)];
  };
};