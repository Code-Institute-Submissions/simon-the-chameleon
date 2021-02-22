var previousContentPlay;
var previousContentFooter;
var clickCounter = 1;

// Settings button clicked event listener. If first time clicked, display the settings. If second time, close settigns.
$("#settings-button").click(function() {
    if (clickCounter == 1) {
        previousContentPlay = $("#game-playable-area").html();
        previousContentFooter = $("#game-footer").html();
        displaySettings(clickCounter, previousContentPlay, previousContentFooter);
        localStorage.setItem("settingsOpen", true);
        clickCounter++;
    } else {
        localStorage.setItem("settingsOpen", false);
        displaySettings(clickCounter, previousContentPlay, previousContentFooter);
        clickCounter--;
    }
});

function displaySettings(clickCounter, contentOne, contentTwo) {
    if (clickCounter == 1) {
        var strictModeOption = localStorage.getItem("strictOption");

        $("#settings-button").toggleClass("fa-cog").toggleClass("fa-times");

        $("#game-playable-area").html(
            `<h4 class="text-justify-center">Settings</h4>
            <p class="text-justify-center">Choose theme:</p>
            <div class="flex-container-row flex-justify-center">
                <img id="theme-warm" class="image-theme cursor-hover" src="assets/images/simon-theme-warm.png" alt="Simon warm theme">
                <img id="theme-cool" class="image-theme cursor-hover" src="assets/images/simon-theme-cool.png" alt="Simon cool theme">
                <img id="theme-pastel" class="image-theme cursor-hover" src="assets/images/simon-theme-pastel.png" alt="Simon pastel theme">
            </div>
            <p>Strict mode: <span id="strict-mode" class="cursor-hover"s>${strictModeOption}</span></p>
            <h4 class="text-justify-center">About the game</h4>
            <p class="game-info-text">Simon, the Chameleon! was developed as a Project submission of the Full Stack Code Institute Course.</p>
            <p class="game-info-text">Version: 1.0</p>
            <p class="game-info-text">Developed by: Isabela Venter</p>`
        );

        if (localStorage.getItem("selectedTheme") != null || localStorage.getItem("selectedTheme") != undefined) {
            $(`#${localStorage.getItem("selectedTheme")}`).addClass("active-theme");
        }

        $("#game-footer").html("");

        // Theme selection event listener
        $(".image-theme").click(function() {
            changeTheme($(this).attr("id"));
        });

        // Strict Mode selection event listener
        $("#strict-mode").click(function() {
            if (strictModeOption == "OFF") {
                strictModeOption = "ON";
                $(this).html(strictModeOption);
                localStorage.setItem("strictOption", strictModeOption);
            } else {
                strictModeOption = "OFF";
                $(this).html(strictModeOption);
                localStorage.setItem("strictOption", strictModeOption);
            }
        });

        // Closing instruction actions, either display last content or restart the level
    } else {
        var gameStarted = localStorage.getItem('gameStarted');
        var savedProgress = localStorage.getItem('savedProgress');
        var instructionsOpened = localStorage.getItem('instructionsOpen');
        
        $("#settings-button").toggleClass("fa-cog").toggleClass("fa-times");

        if (gameStarted == "true" && savedProgress == "true" && instructionsOpened == "false") {
            gamePlay(parseInt(localStorage.getItem('savedLevel')));
        } else if (gameStarted == "true" && instructionsOpened == "false") {
            gamePlay(1);
        } else if (gameStarted == "false" || instructionsOpened == "true") {
            $("#game-playable-area").html(contentOne);
            $("#game-footer").html(contentTwo);
        }
    }
}

function changeTheme(selectedTheme) {
    var themeWarmValues = ["#996633", "#663300", "#FFFFCC", "#FF6600"];
    var themeCoolValues = ["#E3E7E9", "#A8bAD1", "#344355", "#7030A0"];
    var themePastelValues = ["#EEDEE6", "#D390D4", "#53156E", "#FF0066"];

    $(".image-theme").removeClass("active-theme");
    $(`#${selectedTheme}`).addClass("active-theme");

    // Change CSS var value found in https://davidwalsh.name/css-variables-javascript
    switch (selectedTheme) {
        case "theme-warm":
            localStorage.setItem("selectedTheme", "theme-warm");
            document.documentElement.style.setProperty("--bg-colour-main", themeWarmValues[0]);
            document.documentElement.style.setProperty("--bg-colour-playable-area", themeWarmValues[1]);
            document.documentElement.style.setProperty("--colour-text-main", themeWarmValues[2]);
            document.documentElement.style.setProperty("--bg-colour-play-custom", themeWarmValues[3]);
            break;
        case "theme-cool":
            localStorage.setItem("selectedTheme", "theme-cool");
            document.documentElement.style.setProperty("--bg-colour-main", themeCoolValues[0]);
            document.documentElement.style.setProperty("--bg-colour-playable-area", themeCoolValues[1]);
            document.documentElement.style.setProperty("--colour-text-main", themeCoolValues[2]);
            document.documentElement.style.setProperty("--bg-colour-play-custom", themeCoolValues[3]);
            break;
        case "theme-pastel":
            localStorage.setItem("selectedTheme", "theme-pastel");
            document.documentElement.style.setProperty("--bg-colour-main", themePastelValues[0]);
            document.documentElement.style.setProperty("--bg-colour-playable-area", themePastelValues[1]);
            document.documentElement.style.setProperty("--colour-text-main", themePastelValues[2]);
            document.documentElement.style.setProperty("--bg-colour-play-custom", themePastelValues[3]);
            break;
        default:
            localStorage.setItem("selectedTheme", "theme-warm");
            document.documentElement.style.setProperty("--bg-colour-main", themeWarmValues[0]);
            document.documentElement.style.setProperty("--bg-colour-playable-area", themeWarmValues[1]);
            document.documentElement.style.setProperty("--colour-text-main", themeWarmValues[2]);
            document.documentElement.style.setProperty("--bg-colour-play-custom", themeWarmValues[3]);
    }
}