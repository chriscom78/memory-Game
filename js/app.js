/*
 * Create a list that holds all of your cards
 */
 let cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
//////////////////////
/// stats storage  ///
//////////////////////
let pairFound = 0;
let gameStart = false;
let moves = 0;
let timer = 0;
const oneStar = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>';
const twoStar = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li>';
const threeStar = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
////////////////////
// Count time //////
var time = new Timer();
time.addEventListener('secondsUpdated', function (sec) {$('.timer').html(time.getTimeValues().toString());
});
//////////////////////////////
//////// reset button ////////
//////////////////////////////
$('#reset-button').click(resetGame);
/////////////////////////////////
// create and append card html //
/////////////////////////////////
function createCard(card) {
    $('.deck').append(`<li class="card animated"><div class="fa ${card}" id="cardbk"></div></li>`);
}
///////////////////////////////////////////////////////////
// Shuffle function from http://stackoverflow.com/a/2450976
///////////////////////////////////////////////////////////
function shuffle(array) {
    var currentIndex = array.length
        , temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
flippedCards = [];
////////////////////////////////////
////// random card genarator ///////
/////////////////////////////////////////////////////////////////////////////////////////
///thanks to an online tuturial that explains the card need to be randomised also ///////
/////////////////////////////////////////////////////////////////////////////////////////
function createCards() {
    for (var deck = 0; deck < 2; deck++) {
        cards = shuffle(cards);
        cards.forEach(createCard);
    }
}
////////////////////////////////////
/////// end card genarator /////////
////////////////////////////////////

///////////////////////
// On click and flip //
//////////////////////
function toggleCard() {
    
    if (gameStart == false) {
        gameStart = true;
        time.start();
    }
    
    if (flippedCards.length === 0) {
        $(this).toggleClass("show open").animateCss('flipInX');
        flippedCards.push($(this));
        removeClick();
    }
    else if (flippedCards.length === 1) {
        // increment moves
        updateMoves();
        $(this).toggleClass("show open").animateCss('flipInX');
        flippedCards.push($(this));
        setTimeout(ReturnOrMatch, 1100);
    }
}
////////////////////////////////////
//  Disable click on open Cards   //
////////////////////////////////////
function removeClick() {
    flippedCards.forEach(function (card) {
        card.off('click');
    });
}
// enable click on the open card
function engageClick() {
    flippedCards[0].click(toggleCard);
}
// check flippedCards if they match or not
function ReturnOrMatch() {
    if (flippedCards[0][0].firstChild.className == flippedCards[1][0].firstChild.className) {
        console.log("matchCard");
        checkWin()
        flippedCards[0].addClass("match").animateCss('pulse');
        flippedCards[1].addClass("match").animateCss('pulse');
        removeClick();
        flippedCards = [];
    }
    else {
        flippedCards[0].toggleClass("show open").animateCss('flipInX');
        flippedCards[1].toggleClass("show open").animateCss('flipInX');
        engageClick();
        flippedCards.push($(this));
        flippedCards = [];
    }
}

/////////////////////////////////////////
// is the game finished /////////////////
/////////////////////////////////////////
function updateMoves() {
    moves += 1;
    $('.moves').html(`${moves} Moves`);
    if (moves == 24) {
        document.querySelector('.stars').innerHTML = (oneStar);
    }
    else if (moves == 15) {
        document.querySelector('.stars').innerHTML = (twoStar);
    }
}
// check whether the game is finished or not 
function checkWin() {
    pairFound += 1;
    if (pairFound == 8) {
        showResults();
    }
}
//////////////////////////////////////////
///// remove stars based on moves ////////
//////////////////////////////////////////
function RemoveStar() {
    
    $('.stars').append.li(apStar);
}
/////////////////////////////////////////////////
// add initial stars when the gamw starts  //////
/////////////////////////////////////////////////
function addStars() {
        document.querySelector('.stars').innerHTML = (threeStar);
    }
//////////////////////////////////////////////////
/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
// reset ready for a new game //////////////////////////////////
///////////////////////////////////////////////////////////////
function resetGame() {
    $('.cardbk').toggleClass("show closed").animateCss('flipInX');
    moves = 0;
    pairFound = 0;
    $('.deck').empty();
    $('.stars').empty();
    $('.container')[0].style.display = "";
    $('.sucess-result')[0].style.display = "none";
    gameStart=false;
    time.stop();
    $('.timer').html("0");

    memGame();
}


function memGame() {

    createCards();
    $('.card').click(toggleCard);
    $('.moves').html("0 Moves");
    addStars(3);
}
// shows result on end game
function showResults() {
    $('.sucess-result').empty();
    time.pause();
    var showScore = `
    <div class="modal-content">
         <p>Congratulations..... You completed this in ${moves} Moves and recorded a time of ${time.getTimeValues().toString()}
            <div class="text-center margin-top-2" id="restart">
                <i class="fa fa-repeat fa-2x">restart</i>
            </div>
         </p>
         
    </div>
    `;
    $('.container')[0].style.display = "none";
    $('.sucess-result')[0].style.display = "block";
    $('.sucess-result').append($(showScore));
    $('#restart').click(resetGame);
}
//////////////////////////////////////////////////////
// add text to the reset button as it is very small //
///////////////////////////////////////////////////// 

////////////////////////////////
// function to add animations //
///////////////////////////////
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'mozAnimationEnd oanimationend webkitAnimationEnd MSAnimationEnd  animationend';
        this.addClass(animationName).one(animationEnd, function () {
            $(this).removeClass(animationName);
        });
        return this;
    }
});

document.querySelector('#reset-button').textContent = " Rest Game";
// start the game

memGame();
