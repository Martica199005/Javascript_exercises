//Challenge 1: Your age in days

function ageInDays(){
var birthYear= prompt('What year were you born?');
var ageInDayss= (2020-birthYear)*365;
var h1= document.createElement('h1');
var textAnswer= document.createTextNode('You are '+ageInDayss+' days old!');
h1.setAttribute('id','ageInDays'); //set the attribute id=AgeinDays() to the h1 element
h1.appendChild(textAnswer); //The appendChild() returns the appended child.
document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}


//Challenge 2: Generate cats

function generateCat(){
    var image= document.createElement('img');
    var div= document.getElementById("flex-cat-gen");
    image.src="https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}


//Challenge 3: Rock, Paper, Scissors

function rpsGame(yourChoice){
    console.log(yourChoice);
   // console.log(yourChoice.src);
    var humanChoice, botChoice;
    humanChoice= yourChoice.id;
    console.log('YourChoice:',humanChoice);
    botChoice= numberToChoice(randomInt());
    console.log('ComputerChoice:',botChoice);
    result= decideWinner(humanChoice,botChoice); // it returns an array
    message= finalMessage(result); // message is an object ( dictionary in Python) {'message':'You won!', 'color':'green'}
    console.log('the result is: ',message.message);
    rpsFrontEnd(yourChoice.id,botChoice,message);
}


function randomInt(){
    console.log(Math.random()*3);
    console.log(Math.floor(Math.random()*3));
    return Math.floor(Math.random()*3); //Math.random() gives random number from 0 to 1
                                        //Math.floor makes the number as integers and lower them: 2.3-->2
}

function numberToChoice(number){
    return ['rock','paper','scissor'][number];
}

function decideWinner(yourChoice,computerChoice){
    var rpsDatabase={'rock':{'scissor':1, 'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissor':0},
        'scissor':{'paper':1,'scissor':0.5 , 'rock':0}
    };
    console.log('yourChoice:',yourChoice);
    console.log('botChoice:',computerChoice);
    var yourScore= rpsDatabase[yourChoice][computerChoice];
    var computerScore= rpsDatabase[computerChoice][yourChoice];

    return [yourScore,computerScore];
}

function finalMessage(yourScore,computerScore){
    if (yourScore==0){
        return {'message':'You lost', 'color':'red'};
    }
    else if (yourScore==0.5){
        return {'message':'You tied', 'color':'yellow'};
    }
    else{
        return {'message':'You won', 'color':'green'};
    }
}

function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage){
    var imagesDatabase={
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src,
    };


    //let's remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv=document.createElement('div');
    var botDiv=document.createElement('div');
    var messageDiv =document.createElement('div');

    humanDiv.innerHTML="<img src='"+imagesDatabase[humanImageChoice]+"'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1)'>";
    messageDiv.innerHTML="<h1 style='color: "+finalMessage['color']+"; font-size:60px; padding:30px; '>"+finalMessage['message']+"</h1>";
    botDiv.innerHTML="<img src='"+imagesDatabase[botImageChoice]+"'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(255, 0, 0, 1)'>";

    console.log('Here');
    console.log(finalMessage.color);
    console.log(finalMessage.message);



    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

//It always gives 'You won', adjust it


//Challenge 4: Change the Color of all buttons

var all_buttons= document.getElementsByTagName('button');
var copyAllButtons=[];

//use let and const

for (i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

console.log(copyAllButtons);


function buttonColorChange(buttonThingy){
    if (buttonThingy.value == 'red'){
        buttonsRed();
    } else if(buttonThingy.value == 'green'){
        buttonsGreen();
    }else if(buttonThingy.value == 'reset'){
        buttonColorReset();
    }else if(buttonThingy.value == 'random'){
        randomColors();
    }
}

function buttonsRed(){
    for (i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');

    }
}

function buttonsGreen(){
    for (i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');

    }
}


function buttonColorReset(){
    for (i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);

    }

}

function randomColors(){
    let choices=['btn-primary' ,'btn-danger','btn-success','btn-warning'];
    for (i=0;i<all_buttons.length;i++){
        let randomNumber= Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
        
}

// Blackjack

let blackjackGame = {
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'] ,
    'cardsMap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]} ,
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnOver':false,
};

const YOU=blackjackGame['you'];
const DEALER=blackjackGame['dealer'];

const hitSound= new Audio('static/sounds/swish.m4a');
const winSound= new Audio('static/sounds/cash.mp3');
const lostSound= new Audio('static/sounds/aww.mp3');




//querySelector is a better way that how he did before with ids

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);


function blackjackHit(){

    if ( blackjackGame['isStand']== false) {

        let card=randomCard();
        console.log(card);
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
        console.log( YOU['score']);

   
   //flex doesn't work
    }
}


function showCard(card,activePlayer) {
    if (activePlayer['score']<=21){
    let cardImage= document.createElement('img');
    name_card=card+'.png';
    console.log(name_card);
   cardImage.src='static/images/'+name_card; //it didn't work with ${card}
   //style:'height=150 width=150';
   cardImage.height=150;
   cardImage.width=100;
   document.querySelector(activePlayer['div']).appendChild(cardImage);
   hitSound.play();
    }

}

//deal function makes the images disappear


function blackjackDeal() {
    //let winner = computeWinner();
   // showResult(winner);
if (blackjackGame['turnOver']==true) {
    
    blackjackGame['isStand']=false;

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    console.log(yourImages);
    for (i=0;i<yourImages.length; i++){
    yourImages[i].remove();
    }

    for (i=0;i<dealerImages.length; i++){
        dealerImages[i].remove();
        }
    YOU['score']=0;
    DEALER['score']=0;

    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').textContent=0;

    document.querySelector('#your-blackjack-result').style.color='#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color='#ffffff';

    document.querySelector('#blackjack-result').textContent="Let's play";
    document.querySelector('#blackjack-result').style.color='black';

    blackjackGame['turnOver']=true;
}

}

function randomCard(){
    let randomIndex= Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(card,activePlayer){
if (card=='A') {
    //  if adding 11 keeps me below 21, add 11. Otherwise, add 1
        if (activePlayer['score']+blackjackGame['cardsMap'][card][1]<=21){
            activePlayer['score']+= blackjackGame['cardsMap'][card][1];
            } else {
        activePlayer['score']+= blackjackGame['cardsMap'][card][0];
        }
    }  else  {
            activePlayer['score']+=blackjackGame['cardsMap'][card];

    }
}

function showScore(activePlayer){
    if (activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';

    } else{
    document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
    }
}


function dealerLogic(){
    blackjackGame['isStand']= true;
    
    while( DEALER['score'], 16 && blackjackGame['isStand']=== true) {
    let card = randomCard();
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
    }

    blackjackGame['turnsOver']=true;
    let winner= computeWinner();
    showResult(winner);
}

//compute winner and return who just won
// update the wins, draws and losses

function computeWinner(){
    let winner;
    if (YOU['score']<= 21){
        if (YOU['score']>DEALER['score'] || DEALER['score']>21){
            blackjackGame['wins']++;
            winner=YOU;
        } else if (YOU['score']<DEALER['score']){
            blackjackGame['losses']++;
            winner=DEALER;
        } else if (YOU['score']==DEALER['score']){
            blackjackGame['draws']++;
        }

        // condition when user busts but dealer doesn't
    } else if (YOU['score']>21 && DEALER['score']<=21) {
        blackjackGame['losses']++;
        winner=DEALER;
       // condition when you AND the dealer busts     
    }else if (YOU['score']>21 && DEALER['score']>21) {
        blackjackGame['draws']++;
    }

    console.log(blackjackGame);
    return winner;
}

function showResult(winner) {
    let message, messageColor;
    if (blackjackGame['turnOver']==true) {
    if (winner == YOU) { 
        document.querySelector('#wins').textContent=blackjackGame['wins'];
        message='You won!';
        messageColor='green';
        winSound.play();
    } else if (winner == DEALER){
        document.querySelector('#losses').textContent=blackjackGame['losses'];
        message='You lost!';
        messageColor='red';
        lostSound.play();
    } else {
        document.querySelector('#draws').textContent=blackjackGame['draws'];
       message='You drew!'; // adjust it
        messageColor='black';
    } 

    document.querySelector('#blackjack-result').textContent=message;
    document.querySelector('#blackjack-result').style.color=messageColor;
}
}


// Missing: function sleep(ms), async function dealerlogic()

// you drew appears always, fix it
// it doesn't work as it should, before of 7h:43

//Challenge 6: See Ajax and API's