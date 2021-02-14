var previousContentPlay;
var previousContentFooter;
var i = 1;

// Settings button clicked event listener. If first time clicked, display the settings. If second time, close settigns.
$("#settings-button").click(function() {
    if (i == 1) {
        previousContentPlay = $("#game-playable-area").html();
        previousContentFooter = $("#game-footer").html();
        displaySettings(i, previousContentPlay, previousContentFooter);
        i++;
    } else {
        displaySettings(i, previousContentPlay, previousContentFooter);
        i--;
    }
});

function displaySettings(i, contentOne, contentTwo) {
    if (i == 1) {
    $("#settings-button").toggleClass("fa-cog").toggleClass("fa-times");
    
    $("#game-playable-area").html(
        `<h4 class="text-justify-center">Settings</h4>
        <p class="text-justify-center">Choose theme:</p>
        <div class="flex-container-row flex-justify-center">
            <img id="theme-warm" class="image-theme cursor-hover" src="assets/images/simon-theme-warm.png" alt="Simon warm theme">
            <img id="theme-cool" class="image-theme cursor-hover" src="assets/images/simon-theme-cool.png" alt="Simon cool theme">
            <img id="theme-pastel" class="image-theme cursor-hover" src="assets/images/simon-theme-pastel.png" alt="Simon pastel theme">
        </div>
        <h4 class="text-justify-center">About the game</h4>
        <p class="game-info-text">Simon, the Chameleon! was developed as a Project submission of the Full Stack Code Institute Course.</p>
        <p class="game-info-text">Version: 1.0</p>
        <p class="game-info-text">Developed by: Isabela Venter</p>`
    );

    if (localStorage.getItem("selectedTheme") != null || localStorage.getItem("selectedTheme") != undefined) {
        $(`#${localStorage.getItem("selectedTheme")}`).addClass("active-theme");
    };

    $("#game-footer").html("");

    // Theme selection event listener
    $(".image-theme").click(function() {
        changeTheme($(this).attr("id"));
    });

    // Closing instruction actions, either display last content or restart the level
    } else {
        $("#settings-button").toggleClass("fa-cog").toggleClass("fa-times");

        var gameStarted = localStorage.getItem('gameStarted');
        var savedProgress = localStorage.getItem('savedProgress');

        if (gameStarted == "true" && savedProgress == "true") {
            gamePlay(parseInt(localStorage.getItem('savedLevel')));
        } else if (gameStarted == "true") {
            gamePlay(1);
        } else {
            $("#game-playable-area").html(contentOne);
            $("#game-footer").html(contentTwo);
        };
    };
};

function changeTheme(selectedTheme) {
    var themeWarmValues = ["#996633", "#663300", "#FFFFCC", "#FF6600"];
    var themeCoolValues = ["#E3E7E9", "#A8bAD1", "#516073", "#7030A0"];
    var themePastelValues = ["#EEDEE6", "#C783C8", "#752896", "#FF0066"];

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
        };
    return;
};

