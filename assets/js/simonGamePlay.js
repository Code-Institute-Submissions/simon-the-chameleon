// General function for the sequencing of steps
function gamePlay(currentLevel) {
    var sequenceOrder = [];
    localStorage.setItem('gameStarted', true);
    displayGamePlay();

    var loopForLevels = function(m, currentLevel) {
        countDown(currentLevel, sequenceOrder)
            .then(function(passSequence) {
                return displayColour(currentLevel, passSequence)
            })
            .then(function(colourSequence) {
                checkUserInput(currentLevel, colourSequence)
                    .then(function() {
                        currentLevel = currentLevel + 1;
                    }, function() {
                        displayWelcomeContent();
                    })
                    .then(function() {
                        if (m < currentLevel) {
                            m = m + 1;
                            loopForLevels(m, currentLevel);
                        }
                    });
            });
    };

    loopForLevels(0, currentLevel);
}

// Functions for gameplay steps
function displayGamePlay() {
    $("#game-playable-area").html(
        `<img class="image-simon flex-item-center bg-colour-main" src="assets/images/simon-eye.png" alt="Simon changing colours">
        <p class="flex-item-center text-justify-center" id="game-play-messages""> <br> </p>
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
        `<button onclick="displayInstructions(0)">Instructions</button>
        <button onclick="">Save & Leave</button>
        <button onclick="">End Game</button>`
    );
    return;
}

var interval;

function countDown(currentLevel, passSequence) {
    var d = $.Deferred();
    var timeSeconds = 3;


    interval = setInterval(function() {
        $("#game-play-messages").html("Starting in: " + timeSeconds + "...");
        timeSeconds = timeSeconds - 1;
        if (timeSeconds < 0) {
            clearInterval(interval);
            gameStarted = true;
            $("#game-play-messages").html("Watch Simon <br> Current Level: " + currentLevel);
            d.resolve(passSequence);
        }
    }, 1000);

    return d.promise();
}

function displayColour(currentLevel, sequenceOrder) {
    return new Promise(function(resolve) {
        var newColour = Math.floor(Math.random() * 5);

        if (newColour != sequenceOrder[currentLevel - 2]) {
            sequenceOrder.push(newColour);
        } else if (newColour < 4) {
            sequenceOrder.push(newColour + 1);
        } else if (newColour == 4) {
            sequenceOrder.push(newColour - 1);
        };

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
                        };
                        if (m < sequenceOrder.length) {
                            loopForSwitch(m++)
                        };
                    }, 750);
                    break;
                case 1:
                    $(".image-simon").addClass("bg-colour-play-blue");
                    t = setTimeout(function() {
                        clearColours();
                        m++;
                        if (m == sequenceOrder.length) {
                            resolve(sequenceOrder);
                        };
                        if (m < sequenceOrder.length) {
                            loopForSwitch(m++)
                        };
                    }, 750);
                    break;
                case 2:
                    $(".image-simon").addClass("bg-colour-play-yellow");
                    t = setTimeout(function() {
                        clearColours();
                        m++;
                        if (m == sequenceOrder.length) {
                            resolve(sequenceOrder);
                        };
                        if (m < sequenceOrder.length) {
                            loopForSwitch(m++)
                        };
                    }, 750);
                    break;
                case 3:
                    $(".image-simon").addClass("bg-colour-play-green");
                    t = setTimeout(function() {
                        clearColours();
                        m++;
                        if (m == sequenceOrder.length) {
                            resolve(sequenceOrder);
                        };
                        if (m < sequenceOrder.length) {
                            loopForSwitch(m++)
                        };
                    }, 750);
                    break;
                case 4:
                    $(".image-simon").addClass("bg-colour-play-custom");
                    t = setTimeout(function() {
                        clearColours();
                        m++;
                        if (m == sequenceOrder.length) {
                            resolve(sequenceOrder);
                        };
                        if (m < sequenceOrder.length) {
                            loopForSwitch(m++)
                        };
                    }, 750);
                    break;
                default:
                    $(".image-simon").addClass("bg-colour-main");
                    if (m == sequenceOrder.length) {
                        resolve(sequenceOrder);
                    };
                    if (m < sequenceOrder.length) {
                        loopForSwitch(m++)
                    };
                    m++;
            }
        }
        loopForSwitch(0);
    })
}

function clearColours() {
    // Use of wildcard for classes found in: https://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard
    $(".image-simon").removeClass(function(index, className) {
        return (className.match(/\bbg-colour-\S+/g) || []).join(' ');
    });
}

function checkUserInput(currentLevel, sequence) {
    var d = $.Deferred();
    $(".image-simon").addClass("bg-colour-main");
    $("#game-play-messages").html("YOUR TURN! Click on the colors below in the order they were shown. <br> Current Level: " + currentLevel);
    $(".playing-colour-area").addClass("cursor-hover");

    var userSequence = [];
    var i = 0;
    $(".playing-colour-area").click(function() {
        if ($(this).attr("value") == sequence[i]) {
            userSequence.push($(this).attr("value"));
            $("#game-play-messages").html("Nice! Keep going. <br> Current Level: " + currentLevel);
            i++;
            if (i == sequence.length) {
                $("#game-play-messages").html("Good job! Starting next level");
                localStorage.setItem('savedProgress', true);
                localStorage.setItem('savedLevel', currentLevel);
                // Saving array on Local Storage https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
                localStorage.setItem('savedSequence', JSON.stringify(sequence));
                d.resolve(userSequence);
            }
        } else if ($(this).attr("value") != sequence[i]) {
            sequence = [];
            userSequence = [];
            gameStarted = false;
            d.reject();
            console.log(d.state())
        }
    });

    return d.promise()
}