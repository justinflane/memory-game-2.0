//Declaring variables

// this array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];
//logs cards array to console
console.log(cards);

// deck of all cards in game
const deck = document.getElementById("card-deck");

// move variable
let moves = 0;
let counter = document.querySelector(".moves");

// star icons
const stars = document.querySelectorAll(".fa-star");

// matched cards
let matchedCard = document.getElementsByClassName("match");

// stars
let starsList = document.querySelectorAll(".stars li");

// pop-up on win game
let modalPopUp = document.getElementById("winner-pop-up");

// close close pop-up
let closeIcon = document.querySelector(".close");

// array to hold opened cards
let openedCards = [];

//inspirational message - need to get this added in when stars get to one
let keepGoing = document.getElementById("keep-going");



// Shuffle cards - FEND
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


// function to start a new play - resets cards, moves and timer


function startGame(){

    // shuffle deck
    cards = shuffle(cards);
    // remove exisiting classes from each card and reset to play
    for (let i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        //classList accesses an elements list of classes
        cards[i].classList.remove("show", "open", "match", "disabled", "unmatched");
    }


    // reset moves
    moves = 0;
    counter.innerHTML = moves;

    // reset stars
    for (var i = 0; i < stars.length; i++){
        stars[i].style.display = "block";
    }

    //reset timer - variables declared below
    second = 0;
    minute = 0;
    hour = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}



// shuffles cards when page is either refreshed or click on refresh icon occurs
document.body.onload = startGame();



// toggles open and show class to display when clicked on cards
let displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// add opened cards to OpenedCards list and check if cards are match or not
// if the length of the array is two then the match is made - because the type
// is the same for both
function cardOpen() {
    openedCards.push(this);
    let lenCards = openedCards.length;
    if(lenCards === 2) {
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


// if opened cards are a match add/remove the correct classes to keep playing
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// when cards don't match set them to unmatched and reset (remove classes) after 1second
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    keepGoing.innerHTML = "Try Again";
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
        keepGoing.innerHTML = "";

    },1500);
}


// adds extra class so to disable card in cards array
function disable() {
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// adds disabled to matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// count player's moves and start timer when moves === 1
function moveCounter(){
    moves++;
    counter.innerHTML = moves;

    if(moves === 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // set stars based on number of moves
    if (moves > 5 && moves <= 10){
        for( i = 0; i < 3; i++){
            if(i > 1){
                stars[i].style.display = "none";
            }
        }
    }
    else if (moves > 15){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.display = "none";
            }
        }
    }
}


// set up for game timer - every second increment
var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute + " mins " + second + " secs";
        second++;
        if(second === 60){
            minute++;
            second = 0;
        }

    },1000);
}



// when all cards match and game is won display modal pop up showing results
function congratulations(){
    if (matchedCard.length === 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // add show class to overlay class to show modal
        modalPopUp.classList.add("show");

        // declare star rating variable
        let starRating = document.querySelector(".stars").innerHTML;

        //show # of moves, time taken and stars on pop-up
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        // close pop up icon //
        closeModal();
    };
}

function closeModal(){
    closeIcon.addEventListener("click", function(close){
        modalPopUp.classList.remove("show");
        //starts game again from X button
        startGame();
    });
}


//starts game again from play again button - eventHandler
function playAgain(){
    modalPopUp.classList.remove("show");
    startGame();
}
