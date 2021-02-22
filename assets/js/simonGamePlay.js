var interval;

// General function for the sequencing of steps
function gamePlay(currentLevel) {
    var sequenceOrder;

    localStorage.setItem("instructionsOpen", false);
    
    if (currentLevel == 1 && (localStorage.getItem("savedSequence") == "" || localStorage.getItem("savedSequence") == null)) {
        sequenceOrder = [];
    } else {
        sequenceOrder = JSON.parse(localStorage.getItem("savedSequence"));
    }

    localStorage.setItem('gameStarted', true);
    displayGamePlay();

    var loopForLevels = function(m, currentLevel) {
        countDown(currentLevel, sequenceOrder)
            .then(function(passSequence) {
                return displayColour(currentLevel, passSequence);
            }, function(buttonClicked) {
                return Promise.reject(buttonClicked);
            })
            .then(function(colourSequence) {
                checkUserInput(currentLevel, colourSequence)
                    .then(function(sequence) {
                        localStorage.setItem('savedProgress', true);
                        // Saving array on Local Storage https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
                        localStorage.setItem('savedSequence', JSON.stringify(sequence));
                        currentLevel = currentLevel + 1;
                        localStorage.setItem('savedLevel', currentLevel);
                    }, function(err) {
                        return Promise.reject(err);
                    })
                    .then(function() {
                        if (m < currentLevel) {
                            m = m + 1;
                            loopForLevels(m, currentLevel);
                        }
                    }, function(buttonClicked) {
                        switch (buttonClicked) {
                            case "button-instructions":
                                displayInstructions(0);
                                break;
                            case "button-end-game":
                                if (confirm("Your progress will be lost. Do you want to proceed?") || buttonClicked == "Game Over") {
                                    localStorage.setItem('savedProgress', false);
                                    localStorage.setItem('savedLevel', 0);
                                    localStorage.setItem('savedSequence', "");
                                    localStorage.setItem('gameStarted', false);
                                    displayEndGame(currentLevel);
                                } else {
                                    gamePlay(currentLevel);
                                }
                                break;
                            case "Game Over":
                                if (localStorage.getItem("strictOption") == "OFF") {
                                    gamePlay(currentLevel);
                                } else {
                                    localStorage.setItem('savedProgress', false);
                                    localStorage.setItem('savedLevel', 0);
                                    localStorage.setItem('savedSequence', "");
                                    localStorage.setItem('gameStarted', false);
                                    displayEndGame(currentLevel);
                                }
                                break;
                            case "button-leave":
                                if (currentLevel == 1) {
                                    if (confirm("No data to save. Click ok to return to main screen, cancel to restart level.")) {
                                        location.reload();
                                    } else {
                                        return gamePlay(1);
                                    }
                                } else {
                                    alert("Progress saved at level: " + localStorage.getItem("savedLevel"));
                                    location.reload();
                                }
                                break;
                            default:
                                break;
                        }
                        return Promise.reject();
                    });
            }, function(buttonClicked) {
                switch (buttonClicked) {
                    case "button-instructions":
                        displayInstructions(0);
                        break;
                    case "button-end-game":
                        if (confirm("Your progress will be lost. Do you want to proceed?") || buttonClicked == "Game Over") {
                            localStorage.setItem('savedProgress', false);
                            localStorage.setItem('savedLevel', 0);
                            localStorage.setItem('savedSequence', "");
                            localStorage.setItem('gameStarted', false);
                            displayEndGame(currentLevel);
                        } else {
                            gamePlay(currentLevel);
                        }
                        break;
                    case "button-leave":
                        if (currentLevel == 1) {
                            if (confirm("No data to save. Click ok to return to main screen, cancel to restart level.")) {
                                location.reload();
                            } else {
                                return gamePlay(1);
                            }
                        } else {
                            alert("Progress saved at level: " + localStorage.getItem("savedLevel"));
                            location.reload();
                        }
                        break;
                    default:
                        break;
                }
                return Promise.reject();
            });
    };
    loopForLevels(0, currentLevel);
}

// Gameplay steps - initial settings
function displayGamePlay() {
    $("#game-playable-area").html(
        `<img class="image-simon flex-item-center bg-colour-main" src="assets/images/simon-eye.png" alt="Simon changing colours">
        <p class="flex-item-center text-justify-center" id="game-play-messages"> <br> </p>
        <div class="flex-container-row flex-item-center" id="playing-area">
            <div class="playing-colour-area bg-colour-play-red" value="0"></div>
            <div class="playing-colour-area bg-colour-play-blue" value="1"></div>
            <div class="playing-colour-area bg-colour-play-yellow" value="2"></div>
            <div class="playing-colour-area bg-colour-play-green" value="3"></div>
            <div class="playing-colour-area bg-colour-play-custom" value="4"></div>
        </div>`
    );

    $("#game-footer").removeClass("flex-justify-center");

    $("#game-footer").html(
        `<button id="button-instructions">Instructions</button>
        <button id="button-leave">Save & Leave</button>
        <button id="button-end-game">End Game</button>`
    );
}

// Gameplay steps - initial countdown
function countDown(currentLevel, passSequence) {
    var d = $.Deferred();
    var timeSeconds = 3;

    interval = setInterval(function() {
        $("#game-play-messages").html("Starting in: " + timeSeconds + "... <br> Current Level: " + currentLevel);
        timeSeconds = timeSeconds - 1;
        if (timeSeconds < 0) {
            clearInterval(interval);
            gameStarted = true;
            $("#game-play-messages").html("Watch Simon <br> Current Level: " + currentLevel);
            d.resolve(passSequence);
        }
    }, 1000);

    $('button').click(function() {
        clearInterval(interval);
        d.reject($(this).attr("id"));
    });
    $("#settings-button.fa-cog").click(function() {
        if (localStorage.settingsOpen == "true") {
            clearInterval(interval);
            d.reject("Settings");
        }
    });

    return d.promise();
}

// Gameplay steps - display the sequence colours
function displayColour(currentLevel, sequenceOrder) {
    return new Promise(function(resolve, reject) {
        var newColour = Math.floor(Math.random() * 5);
        var t;
        if (newColour != sequenceOrder[currentLevel - 2]) {
            sequenceOrder.push(newColour);
        } else if (newColour < 4) {
            sequenceOrder.push(newColour + 1);
        } else if (newColour == 4) {
            sequenceOrder.push(newColour - 1);
        }

        // Use of wildcard for classes found in: https://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard
        $(".image-simon").removeClass(function(index, className) {
            return (className.match(/\bbg-colour-\S+/g) || []).join(' ');
        });

        var loopForSwitch = function(m) {
            switch (sequenceOrder[m]) {
                case 0:
                    $(".image-simon").addClass("bg-colour-play-red");
                    t = setTimeout(function() {
                        clearColours();
                        m++;
                        if (m == sequenceOrder.length) {
                            resolve(sequenceOrder);
                        }
                        if (m < sequenceOrder.length) {
                            loopForSwitch(m++);
                        }
                    }, 750);
                    break;
                case 1:
                    $(".image-simon").addClass("bg-colour-play-blue");
                    t = setTimeout(function() {
                        clearColours();
                        m++;
                        if (m == sequenceOrder.length) {
                            resolve(sequenceOrder);
                        }
                        if (m < sequenceOrder.length) {
                            loopForSwitch(m++);
                        }
                    }, 750);
                    break;
                case 2:
                    $(".image-simon").addClass("bg-colour-play-yellow");
                    t = setTimeout(function() {
                        clearColours();
                        m++;
                        if (m == sequenceOrder.length) {
                            resolve(sequenceOrder);
                        }
                        if (m < sequenceOrder.length) {
                            loopForSwitch(m++);
                        }
                    }, 750);
                    break;
                case 3:
                    $(".image-simon").addClass("bg-colour-play-green");
                    t = setTimeout(function() {
                        clearColours();
                        m++;
                        if (m == sequenceOrder.length) {
                            resolve(sequenceOrder);
                        }
                        if (m < sequenceOrder.length) {
                            loopForSwitch(m++);
                        }
                    }, 750);
                    break;
                case 4:
                    $(".image-simon").addClass("bg-colour-play-custom");
                    t = setTimeout(function() {
                        clearColours();
                        m++;
                        if (m == sequenceOrder.length) {
                            resolve(sequenceOrder);
                        }
                        if (m < sequenceOrder.length) {
                            loopForSwitch(m++);
                        }
                    }, 750);
                    break;
                default:
                    $(".image-simon").addClass("bg-colour-main");
                    if (m == sequenceOrder.length) {
                        resolve(sequenceOrder);
                    }
                    if (m < sequenceOrder.length) {
                        loopForSwitch(m++);
                    }
                    m++;
            }
        };
        loopForSwitch(0);
        $('button').click(function() {
            clearInterval(t);
            $(".image-simon").addClass("bg-colour-main");
            reject($(this).attr("id"));
        });
        $("#settings-button.fa-cog").click(function() {
            clearInterval(t);
            $(".image-simon").addClass("bg-colour-main");
            reject("Settings");
        });
    });
}

// Remove all colours form the image
function clearColours() {
    // Use of wildcard for classes found in: https://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard
    $(".image-simon").removeClass(function(index, className) {
        return (className.match(/\bbg-colour-\S+/g) || []).join(' ');
    });
}

// Gameplay steps - verify user sequence
function checkUserInput(currentLevel, sequence) {
    var d = $.Deferred();
    var turnStarted = true;
    $(".image-simon").addClass("bg-colour-main");
    $("#game-play-messages").html("YOUR TURN! Click on the colors below in the order they were shown. <br> Current Level: " + currentLevel);
    $(".playing-colour-area").addClass("cursor-hover");

    var userSequence = [];
    var i = 0;
    $(".playing-colour-area").click(function() {
        if (turnStarted === true) {
            if ($(this).attr("value") == sequence[i]) {
                userSequence.push($(this).attr("value"));
                clearColours();
                $(".image-simon").addClass($(this).attr("class")).removeClass("playing-colour-area");
                $("#game-play-messages").html("Nice! Keep going. <br> Current Level: " + currentLevel);
                i++;
                if (i == sequence.length) {
                    $("#game-play-messages").html("Good job! Starting next level");
                    $(".playing-colour-area").removeClass("cursor-hover");
                    setTimeout(() => {
                        clearColours();
                        $(".image-simon").addClass("bg-colour-main");
                        turnStarted = false;
                        userSequence = [];
                        d.resolve(sequence);
                    }, 500);
                }
            } else if ($(this).attr("value") != sequence[i]) {
                $("#game-play-messages").html("Oh no! Wrong colour...");
                $(".playing-colour-area").removeClass("cursor-hover");
                turnStarted = false;
                userSequence = [];
                setTimeout(() => {
                    d.reject("Game Over");
                }, 1000);
            }
        }
    });

    $('button').click(function() {
        turnStarted = false;
        d.reject($(this).attr("id"));
    });
    $('#settings-button.fa-cog').click(function() {
        turnStarted = false;
        d.reject("Settings");
    });

    return d.promise();
}