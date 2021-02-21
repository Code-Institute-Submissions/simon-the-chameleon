// On page load, display welcome content.
$.when($.ready).then(function() {
    localStorage.setItem('gameStarted', false);
    localStorage.setItem("instructionsOpen", false);
    if (localStorage.getItem("selectedTheme") != null || localStorage.getItem("selectedTheme") != undefined) {
        changeTheme(localStorage.getItem("selectedTheme"));
    }
    if (localStorage.getItem("strictOption") === null || localStorage.getItem("strictOption") === undefined) {
        localStorage.setItem("strictOption", "OFF");
    }
    displayWelcomeContent();
});

// Load Welcome content
function displayWelcomeContent() {
    $("#game-playable-area").html(
        `<img class="image-simon flex-item-center" src="assets/images/simon-animation.gif" alt="Simon changing colours">
        <p class="flex-item-center text-justify-center">Meet Simon! He is a chameleon and he loves to change his colours.</p>
        <p class="flex-item-center text-justify-center">How far can you follow Simon’s sequence?</p>`
    );
    $("#game-footer").html(
        `<button onclick="displayInstructions(0)">Instructions</button>
        <button id="initial-start-button" onclick="checkSavedProgress()">Start</button>`
    );
}

// Check if user has saved progress
function checkSavedProgress() {
    var userSavedProgress = localStorage.getItem('savedProgress');

    if (userSavedProgress == 'false' || userSavedProgress === undefined) {
        gamePlay(1);
    } else {
        displayContinueGameQuestion();
    }
}

// Continuing last progress
function displayContinueGameQuestion() {
    $("#game-playable-area").html(
        `<h4 class="flex-item-center text-justify-center">Welcome back!</h4>
        <p class="flex-item-center text-justify-center">If you like to continue your previous game click CONTINUE.<br>If you wish to start a new game, click NEW GAME.</p>`
    );

    $("#game-footer").addClass("flex-justify-center");

    $("#game-footer").html(
        `<button id="button-load-previous-game">Continue</button>
        <button id="button-start-new-game">New game</button>`
    );

    $("#button-load-previous-game").click(function() {
        $("#game-footer").removeClass("flex-justify-center");
        gamePlay(parseInt(localStorage.getItem('savedLevel')));
    });

    $("#button-start-new-game").click(function() {
        localStorage.setItem('savedProgress', false);
        localStorage.setItem('savedLevel', 0);
        localStorage.setItem('savedSequence', "");
        $("#game-footer").removeClass("flex-justify-center");
        gamePlay(1);
    });
}