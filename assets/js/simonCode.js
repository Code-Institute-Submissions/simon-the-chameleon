// On page load, display welcome content.
$.when( $.ready ).then(function() {
  displayWelcomeContent();
});

// Declaring project variables and local storage variables.
var gameStarted;
localStorage.setItem('savedProgress', false);

// Function to load Welcome content
function displayWelcomeContent() {
    $("#game-playable-area").html(
        `<img class="image-simon flex-item-center" src="assets/images/simon-animation.gif" alt="Simon changing colours">
        <p class="flex-item-center text-justify-center">Meet Simon! He is a chameleon and he loves to change his colours.</p>
        <p class="flex-item-center text-justify-center">How far can you follow Simon’s sequence?</p>`
    );
    $("#game-footer").html(
        `<button onclick="displayInstructions(0)">Instructions</button>
        <button onclick="checkSavedProgress()">Start</button>`
    );
}

// Function to check if user has saved progress
function checkSavedProgress() {
    var userSavedProgress = localStorage.getItem('savedProgress');

    if (userSavedProgress == 'false') {
        gamePlay(1);
    };
    // else {
    //     displayContinueGameQuestion();
    // }
}