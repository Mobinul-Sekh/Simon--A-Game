var gameState = [];
var userState = [];
var gameColor = ["blue", "yellow", "red", "green"];

var started = false;
var gameLevel = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + gameLevel);
        nextPattern();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userState.push(userChosenColor);

    playSound(userChosenColor);
    animateBtn(userChosenColor);

    checkAns(userState.length-1);
});

function playSound(key){
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
};

function animateBtn(btn){
    $("#" + btn).addClass("pressed");

    setTimeout(() => {
        $("#" + btn).removeClass("pressed");
    }, 100);
};

function checkAns(inputHight){
    if( userState[inputHight] === gameState[inputHight]){
        if(userState.length === gameState.length){
            setTimeout(() => {
                nextPattern();
            }, 1000);
        }
    }else{
        $("body").addClass("game-over");

        playSound("wrong");

        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 100);

        gameOver();
    }
}


function nextPattern(){
    userState = [];
    gameLevel++;
    $("#level-title").text("Level " + gameLevel);

    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = gameColor[randomNumber];
    gameState.push(randomColor);

    playSound(randomColor);
    animateBtn(randomColor);
};

function gameOver(){
    gameState = [];
    gameLevel = 0;
    started = false;
}