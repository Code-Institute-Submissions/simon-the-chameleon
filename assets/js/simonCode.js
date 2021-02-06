function displayWelcomeContent() {
    $("#game-playable-area").html(
        `<img class="image-simon flex-item-center" src="assets/images/simon-animation.gif" alt="Simon changing colours">
        <p class="flex-item-center text-justify-center">Meet Simon! He is a chameleon and he loves to change his colours.</p>
        <p class="flex-item-center text-justify-center">How far can you follow Simon’s sequence?</p>`
    );
    $("#game-footer").html(
        `<button onclick="displayInstructionsStepOne()">Instructions</button>
        <button>Start</button>`
    );
}

function displayInstructionsStepOne() {
    $("#game-playable-area").html(
        ``
    );
    $("#game-footer").html(
        ``
    );
}

$(document).ready(displayWelcomeContent());