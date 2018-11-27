var t1 = 0; var t2 = 0; var t3 = 0; var t4 = 0;
var hand = new Array(7);

var GiveValue = function(){
    var x1 = calcHand(0,1,2,3,4);
    var x2 = calcHand(0,1,2,3,5);
    var x3 = calcHand(0,1,2,4,5);
    var x4 = calcHand(0,1,3,4,5);
    var x5 = calcHand(0,2,3,4,5);
    var x6 = calcHand(1,2,3,4,5);
    var x7 = calcHand(0,1,2,3,6);
    var x8 = calcHand(0,1,2,4,6);
    var x9 = calcHand(0,1,3,4,6);
    var x10 = calcHand(0,2,3,4,6);
    var x11 = calcHand(1,2,3,4,6);
    var x12 = calcHand(0,1,2,5,6);
    var x13 = calcHand(0,1,3,5,6);
    var x14 = calcHand(0,2,3,5,6);
    var x15 = calcHand(1,2,3,5,6);
    var x16 = calcHand(0,1,4,5,6);
    var x17 = calcHand(0,2,4,5,6);
    var x18 = calcHand(1,2,4,5,6);
    var x19 = calcHand(0,3,4,5,6);
    var x20 = calcHand(1,3,4,5,6);
    var x21 = calcHand(2,3,4,5,6);
    var x = Math.min(x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14,x15,x16,x17,x18,x19,x20,x21);             
    return x;
}//This function gives us what best hand is there in the 7 cards.

var GiveSum = function(x){
    var a = 0;
    switch(x){
        case 1:a = 30939;break;
        case 2:a = 3590;break;
        case 3:a = 594;break;
        case 4:a = 37.5;break;
        case 5:a = 32.1;break;
        case 6:a = 20.6;break;
        case 7:a = 19.7;break;
        case 8:a = 4.74;break;
        case 9:a = 3.26;break;
        case 10:a = 1.28;break;
    }
    return a;
}//This function assigns value to a particular variable whose range of values decides what bot does

var calcHand = function(a,b,c,d,e){
    var suitc = new Array(4);
    var valuec = new Array(13);
    var threes=0;
    var twos=0;
    var fours=0;
    var f=0;
    var x=0;
    for(var j=0;j<4;j++){
        suitc[j]=0;
    }
    for(var j=0;j<13;j++){
        valuec[j]=0;
    }
    var k=[a,b,c,d,e];
    for(i=0;i<5;i++){
        for(j=0;j<4-i;j++){
            if(hand[k[j]].value > hand[k[j+1]].value){
                k[j+1]=k[j]+k[j+1];
                k[j]=k[j+1]-k[j];
                k[j+1]=k[j+1]-k[j];
            }
        }
    }
    for (var i=0;i<5;i++){
        for(var j=0;j<4;j++){
            if(hand[k[i]].suit == j){
                suitc[j]++;
            }
        }
        for(var j=0;j<13;j++){
            if(hand[k[i]].value == j){
                valuec[j]++;
            }
        }            
    }
    for(i=0;i<13;i++){
        if(valuec[i]==2){
            twos++;
        }
        else if(valuec[i]==3){
            threes++;
        }
        else if(valuec[i]==4){
            fours++;
        }
    }
    for(i=0;i<4;i++){
        if(suitc[i]==5){
            f=1;
        }
    }
    if(hand[k[4]].value-hand[k[1]].value==3 && hand[k[4]].value-hand[k[0]].value==12 && f==1){
        x=1;
    }
    else if(hand[k[4]].value-hand[k[0]].value==4 && f==1){
        x=2;
    }
    else if(f==0 && fours == 1){
        x=3;
    }
    else if(f==0 && threes==1 && twos==1){
        x=4;
    }
    else if(f==1){
        x=5;
    }
    else if(hand[k[4]]-hand[k[0]]==4){
        x=6;
    }
    else if(threes==1){
        x=7;
    }
    else if(twos==2){
        x=8;
    }
    else if(twos==1){
        x=9;
    }
    else{
        x=10;
    }
    return x;
}//This function calculates the hand that the particular 5 cards lead up to. 


var botTurn1 = function(){
    t1++;
    if(foldplayer == 1){//this is when the player folds henceforth the bot has no other choice.
        bot_bet(0);
    }
    else if(allinplayer == 1){//If the player goes all in
        if(play.allcards.bot_hand[5].value == 0 || play.allcards.bot_hand[5].value >=7 || play.allcards.bot_hand[6].value == 0 || play.allcards.bot_hand[6].value >= 7 || play.allcards.bot_hand[6].value == play.allcards.bot_hand[5].value){
            bot_allin();
        }
        else{
            bot_fold();
        }
    }
    else{
        bot_bet(playerbet);
    }
}//This function decides what the bot does in the first chance

var botTurn2 = function(){
    t2++;
    hand[0] = play.allcards.bot_hand[0];//this array is the one which represents the 5 card
    hand[1] = play.allcards.bot_hand[1];//the bot knows when 3 cards on the table are shown
    hand[2] = play.allcards.bot_hand[2];//The bot doesn't know the rest of the 2 cards.
    hand[3] = play.allcards.bot_hand[5];
    hand[4] = play.allcards.bot_hand[6];
    var a = 0;
    //The bot looks for all possible combination in the 2 unknown cards. These loops decide what the 2 unknown
    for(var i =0;i<4;i++){//cards can be with all possible combinations
        for(var j =0;j<13;j++){
            for(var p = 0;p<4;p++){
                for(var q = 0;q<13;q++){
                    var flag = 1;
                    for(k=0;k<5;k++){
                        if((hand[k].value==j&&hand[k].suit==i)||(hand[k].value==q&&hand[k].suit==p)){
                            flag=0;break;
                        }
                    }
                    if(flag==0||(i==p&&j==q))continue;
                    hand[5]=new Card(j,i);hand[6]=new Card(q,p);
                    var x = GiveValue();         
                    a = a + GiveSum(x);
                }
            }
        }
    }
    var k = ["Royal Flush","Straight Flush","Four of a Kind","Full House","Flush","Straight","Three of a Kind","Two pair","Pair","None"];
    var x = calcHand(0,1,2,3,4);
    if(foldplayer == 1){//if the player folds
        bot_bet(0);
    }
    else if(allinplayer == 1){//if the player goes all in
        if(x <= 8){// if the bot has something of a 3 of a kind or higher then it also goes allin
            bot_allin();
        }
        else{
            bot_fold();
        }
    }
    else{
        if( a >= 20000)bot_allin();//these are the optimal values of a variable based on whose range the bot decides its play
        else if( a<=20000 && a>= 15000 && botmoney >= playerbet + potmoney/2 - botbet && t2<=2 && playerbet + potmoney/2 <= limit - botbet)bot_bet(playerbet + potmoney/2 - botbet);
        else if(a>=10000 && botmoney >= playerbet + 10 - botbet && t2<=2 && playerbet + 10 <= limit- botbet)bot_bet(playerbet + 10 - botbet);
        else bot_fold();
    }
}// bots action in the second chance

var botTurn3 = function(){
    hand[0] = play.allcards.bot_hand[0];//the bot now knows 6 cards
    hand[1] = play.allcards.bot_hand[1];
    hand[2] = play.allcards.bot_hand[2];
    hand[3] = play.allcards.bot_hand[5];
    hand[4] = play.allcards.bot_hand[6];
    hand[5] = play.allcards.bot_hand[3];
    var b = 0;
    for(var i =0;i<4;i++){
        for(var j =0;j<13;j++){
            var flag = 1;
            for(k=0;k<6;k++){
                if(hand[k].value==j && hand[k].suit == i){
                    flag=0;break;
                }
            }
            if(flag==0)continue;
            hand[6]=new Card(j,i);
            var x = GiveValue();
            b = b + GiveSum(x);
        }
    }
    var k = ["Royal Flush","Straight Flush","Four of a Kind","Full House","Flush","Straight","Three of a Kind","Two pair","Pair","None"];
    if(foldplayer == 1){
        bot_bet(0);
    }
    else if(allinplayer == 1){
        if(b>=325){
            bot_allin();
        }
        else{
            bot_fold();
        }
    }
    else{
        if( b >= 325)bot_allin();
        else if( b>= 195 && botmoney >= playerbet + potmoney/2 - botbet && t2<=2 && playerbet + potmoney/2 <= limit-botbet)bot_bet(playerbet + potmoney/2 - botbet);
        else if( b>=150 && t2<=2 ){
            if(botmoney >= playerbet + 10 - botbet && playerbet + 10 <= limit-botbet){
                bot_bet(playerbet + 10 - botbet);
            }else{
                bot_bet(playerbet-botbet);
            }
        }
        else bot_fold();
    }
}// bots action in the third chance

var botTurn4 = function(){
    var x = GiveValue();
    if(foldplayer == 1){
        bot_bet(0);
    }
    else if(allinplayer == 1){
        if(x <= 4){
            bot_allin();
        }
        else{
            bot_fold();
        }
    }
    else{
        if(x<=2)bot_allin();
        else if(x<=6 && botmoney >= playerbet + 10 - botbet && t4 <= 4 && playerbet + 10 <= limit-botbet)bot_bet(playerbet+10 - botbet);
        else if(x<=8 && botmoney >= playerbet - botbet)bot_bet(playerbet - botbet);
        else bot_fold();
    }
}//bot's 4th chance