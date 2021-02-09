// Function to load Instructions content
function displayInstructions(stepNumber) {
    var instructionsContent = [
        ["instructionsStepOne", "starting the game", "Click on the START button below to start the game. Simon will change his color once the countdown completes."],
        ["instructionsStepTwo", "your turn to play", "When Simon finishes his sequence, it is your turn to play. Click on the colours below Simon on the same order they were shown to move on to the next level"],
        ["instructionsStepThree", "game over", "If you click the wrong colour, it is game over! But don't be sad, you can start a new game by clicking on the RESTART button"],
        ["instructionsStepFour", "leaving or ending the game", "If you wish to stop the game and resume at a later day, click the SAVE & LEAVE button and your progress will be saved. If you wish to end the game to start a new run, click the END GAME button."],
        ["instructionsStepFive", "sending your results to yourself", "Once the game is over, you can send the results to yourself by entering your email and clicking SEND"],
        ["instructionsStepSix", "changing game settings", "You can change the game background colours by clicking on the settings button and chosing a diferent theme"]
    ];

    $("#game-playable-area").html(
        `<h4 class="text-justify-center">Instructions</h4>
        <div class="flex-container-row">
            <p class="flex-item-center"><button onclick="checkStepNumber(${stepNumber}, 'Previous')"><i class="fas fa-long-arrow-alt-left"></i></button></p>
            <img class="image-instruction" src="assets/images/${instructionsContent[stepNumber][0]}.png" alt="Simon game instruction: ${instructionsContent[stepNumber][1]}">
            <p class="flex-item-center"><button onclick="checkStepNumber(${stepNumber}, 'Next')"><i class="fas fa-long-arrow-alt-right"></i></button></p>
        </div>
        <p class="text-justify-center">${instructionsContent[stepNumber][2]}</p>`
    );

    // Footer button: if instruction is clicked during game plat, display CONTINUE instead of start.
    var buttonString;

    if (gameStarted == false) {
        buttonString = "START"
    } else {
        buttonString = "CONTINUE"
    };

    $("#game-footer").addClass("flex-justify-center");

    $("#game-footer").html(
        `<button onclick="checkSavedProgress()">${buttonString}</button>`
    );
}

// Function to change the Instructions step displayed
function checkStepNumber(stepNumber, changeDirection) {
    if (stepNumber == 0 & changeDirection == "Previous") {
        displayInstructions(5);
        stepNumber = 5;
    } else if (stepNumber == 5 & changeDirection == "Next") {
        displayInstructions(0);
        stepNumber = 0;
    } else if (stepNumber != 0 & changeDirection == "Previous") {
        displayInstructions(stepNumber - 1);
        stepNumber = stepNumber - 1;
    } else if (stepNumber != 5 & changeDirection == "Next") {
        displayInstructions(stepNumber + 1);
        stepNumber = stepNumber + 1;
    }
}