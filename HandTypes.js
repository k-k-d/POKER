var HandTypes = function(hand)  //constructor function which accepts a hand of 7 cards (5-common + 2-player exclusive) as argument
{
    this.h = hand;
    this.bestHand = function(a,b,c,d,e) //function to find what type of hand the cards corresponding to the 5 indices constitute
    {
        var suitc = new Array(4);   //no. of cards of each suit
        var valuec = new Array(13); //no. of cards of each value
        var threes=0;   //no. of sets of 3 cards with same face value
        var twos=0;     //no. of sets of 2 cards with same face value
        var fours=0;    //no. of sets of 4 cards with same face value
        var f=0;        //flag to denote flush
        var x=0;        //flag to denote type of hand
        for(var j=0;j<4;j++)
        {
            suitc[j]=0;
        }
        for(var j=0;j<13;j++)
        {
            valuec[j]=0;
        }
        var k=[a,b,c,d,e];
        for(i=0;i<5;i++)
        {
            for(j=0;j<4-i;j++)
            {
                if(this.h[k[j]].value > this.h[k[j+1]].value)   //sorting cards according to face value
                {
                    k[j+1]=k[j]+k[j+1];
                    k[j]=k[j+1]-k[j];
                    k[j+1]=k[j+1]-k[j];
                }
            }
        }
        for (var i=0;i<5;i++)
        {
            for(var j=0;j<4;j++)
            {
                if(this.h[k[i]].suit == j)  //counting each suit
                {
                    suitc[j]++;
                }
            }
            for(var j=0;j<13;j++)
            {
                if(this.h[k[i]].value == j) //counting each face value
                {
                    valuec[j]++;
                }
            }            
        }
        for(i=0;i<13;i++)
        {
            if(valuec[i]==2)
            {
                twos++; //counting pairs
            }
            else if(valuec[i]==3)
            {
                threes++;   //counting threes
            }
            else if(valuec[i]==4)
            {
                fours++;    //counting fours
            }
        }
        for(i=0;i<4;i++)
        {
            if(suitc[i]==5)
            {
                f=1;    //checking for flush
            }
        }
        if(this.h[k[4]].value-this.h[k[1]].value==3 && this.h[k[4]].value-this.h[k[0]].value==12 && f==1)
        {
            x=1;    //Royal Flush
        }
        else if(this.h[k[4]].value-this.h[k[0]].value==4 && f==1)
        {
            x=2;    //Straight Flush
        }
        else if(f==0 && fours == 1)
        {
            x=3;    //Four of a Kind
        }
        else if(f==0 && threes==1 && twos==1)
        {
            x=4;    //Full House
        }
        else if(f==1)
        {
            x=5;    //Flush
        }
        else if(this.h[k[4]]-this.h[k[0]]==4)
        {
            x=6;    //Straight
        }
        else if(threes==1)
        {
            x=7;    //Three of a Kind
        }
        else if(twos==2)
        {
            x=8;    //Two Pair
        }
        else if(twos==1)
        {
            x=9;    //Pair
        }
        else
        {
            x=10;   //None
        }
        return x;
    }
}

var Game = function()
{
    this.allcards = new Hands(cards9());    //generating cards by calling the already defined functions
    this.playerhand = new HandTypes(this.allcards.player_hand);
    this.bothand = new HandTypes(this.allcards.bot_hand);this.p=0;this.b=0;
    this.handCreateCompute = function()
    {
        //passing different combinations of 5 from the 7 cards of the player
        var x1 = this.playerhand.bestHand(0,1,2,3,4);
        var x2 = this.playerhand.bestHand(0,1,2,3,5);
        var x3 = this.playerhand.bestHand(0,1,2,4,5);
        var x4 = this.playerhand.bestHand(0,1,3,4,5);
        var x5 = this.playerhand.bestHand(0,2,3,4,5);
        var x6 = this.playerhand.bestHand(1,2,3,4,5);
        var x7 = this.playerhand.bestHand(0,1,2,3,6);
        var x8 = this.playerhand.bestHand(0,1,2,4,6);
        var x9 = this.playerhand.bestHand(0,1,3,4,6);
        var x10 = this.playerhand.bestHand(0,2,3,4,6);
        var x11 = this.playerhand.bestHand(1,2,3,4,6);
        var x12 = this.playerhand.bestHand(0,1,2,5,6);
        var x13 = this.playerhand.bestHand(0,1,3,5,6);
        var x14 = this.playerhand.bestHand(0,2,3,5,6);
        var x15 = this.playerhand.bestHand(1,2,3,5,6);
        var x16 = this.playerhand.bestHand(0,1,4,5,6);
        var x17 = this.playerhand.bestHand(0,2,4,5,6);
        var x18 = this.playerhand.bestHand(1,2,4,5,6);
        var x19 = this.playerhand.bestHand(0,3,4,5,6);
        var x20 = this.playerhand.bestHand(1,3,4,5,6);
        var x21 = this.playerhand.bestHand(2,3,4,5,6);
        this.p = Math.min(x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14,x15,x16,x17,x18,x19,x20,x21); //the effective type of hand is the minimum of all th values
        //passing different combinations of 5 from the 7 cards of the player
        var x1 = this.bothand.bestHand(0,1,2,3,4);
        var x2 = this.bothand.bestHand(0,1,2,3,5);
        var x3 = this.bothand.bestHand(0,1,2,4,5);
        var x4 = this.bothand.bestHand(0,1,3,4,5);
        var x5 = this.bothand.bestHand(0,2,3,4,5);
        var x6 = this.bothand.bestHand(1,2,3,4,5);
        var x7 = this.bothand.bestHand(0,1,2,3,6);
        var x8 = this.bothand.bestHand(0,1,2,4,6);
        var x9 = this.bothand.bestHand(0,1,3,4,6);
        var x10 = this.bothand.bestHand(0,2,3,4,6);
        var x11 = this.bothand.bestHand(1,2,3,4,6);
        var x12 = this.bothand.bestHand(0,1,2,5,6);
        var x13 = this.bothand.bestHand(0,1,3,5,6);
        var x14 = this.bothand.bestHand(0,2,3,5,6);
        var x15 = this.bothand.bestHand(1,2,3,5,6);
        var x16 = this.bothand.bestHand(0,1,4,5,6);
        var x17 = this.bothand.bestHand(0,2,4,5,6);
        var x18 = this.bothand.bestHand(1,2,4,5,6);
        var x19 = this.bothand.bestHand(0,3,4,5,6);
        var x20 = this.bothand.bestHand(1,3,4,5,6);
        var x21 = this.bothand.bestHand(2,3,4,5,6);
        this.b = Math.min(x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14,x15,x16,x17,x18,x19,x20,x21);  //the effective type of hand is the minimum of all th values
        console.log("Player",k[this.p-1],"\n","Bot",k[this.b-1]);
        //Determining Possible Winner and Loser if No one folds
        if(this.b>this.p)return "win";
        else if(this.p>this.b)return "lose";
        else
        {
            var x = ((this.allcards.player_hand[5].value > this.allcards.player_hand[6].value || this.allcards.player_hand[5].value==0)&&this.allcards.player_hand[6].value!=0)?this.allcards.player_hand[5].value:this.allcards.player_hand[6].value;
            var y = ((this.allcards.bot_hand[5].value > this.allcards.bot_hand[6].value || this.allcards.bot_hand[5].value==0) && this.allcards.bot_hand[6].value!=0)?this.allcards.bot_hand[5].value:this.allcards.bot_hand[6].value;                
            console.log(x,y);
            if((x>y&&x!=0&&y!=0) || (x==0 && y!=0))return "win";
            else if((y>x&&x!=0&&y!=0) || (y==0 && x!=0))return "lose";
            else 
            {
                var x = ((this.allcards.player_hand[5].value < this.allcards.player_hand[6].value && this.allcards.player_hand[5].value!=0)||this.allcards.player_hand[6].value==0)?this.allcards.player_hand[5].value:this.allcards.player_hand[6].value;
                var y = ((this.allcards.bot_hand[5].value < this.allcards.bot_hand[6].value && this.allcards.bot_hand[5].value==0)||this.allcards.bot_hand[6].value==0)?this.allcards.bot_hand[5].value:this.allcards.bot_hand[6].value;
                if((x>y&&x!=0&&y!=0) || (x==0 && y!=0))return "win";
                else if((y>x&&x!=0&&y!=0) || (y==0 && x!=0))return "lose";
                else return "draw";
            }
        }
    }
}