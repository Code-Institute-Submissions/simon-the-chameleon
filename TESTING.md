# Simon, the Chameleon! - Testing Protocol

[Demo of Website](https://belaventer.github.io/simon-the-chameleon/).

Refer to [Main project file](README.md) for further detail.

## Code validation

- [W3C CSS Jigsaw Validator](https://jigsaw.w3.org/css-validator/)
- [W3C Markup Validator](https://validator.w3.org/#validate_by_input)
- [JSHint Validator](https://jshint.com/)

All HTML, CSS and JS files were validated with direct input and returned no errors at the time of this entry.

## User stories testing

1.	As a new visitor to the website, I want to understand the main game.

![Welcome page](/screenshots/screenshot-welcome-page.png "Simon Welcome Content")

    - As a new visitor, I can tell this is a colour changing game from the animated gif and small welcome text on the main screen.

2.	As a new visitor to the website, I want to find and read the game instructions.

![Instructions page](/screenshots/screenshot-instructions-page.png "Simon Instruction Example")

    - As a new visitor, I can easily find the Instructions on the bottom-right with the labeled "Instructions" button.
    - As a new visitor, I can navigate between the available instructions with the left and right arrows.

3.	As a user, I want to start, stop or restart the game at any moment.

![Game controls](/screenshots/screenshot-game-control.png "Simon Game Controls")

    - As a user, I can click the "Start" button at the bottom middle of the page to start the game play.
    - As a user, I can click the "Save & Leave" or "End Game" buttons at the bottom of the page to stop the game play.
    - As a user, once the game is over, I can click the "Restart" button at the bottom of the page to start a new game.

4.	As a user, I want to change the style of the website to what suits me best.

![Theme options](/screenshots/screenshot-change-theme.png "Simon Theme Options")

    - As a user, I can click the settings button and choose a different theme.
    - As a user, I can reload the page and verify my preferences were saved.

5.	As a user, I want a way to record my highest level.

![Emailing](/screenshots/screenshot-record-level.png "Simon Emailing Option")

    - As a user, I can see the highest achieved level once the game is over.
    - As a user, I can email the level to myself once the game is over.

## Manual testing of features

The deployed GitHub Page website was viewed on 2 desktops screens (21 and 13 inches) and also on Motorola G6 Play device.

The website was tested with Google Chrome (v.88), Mozilla Firefox (v.85) and Microsoft Edge (v.88) browsers.

On mobile, it was viewed with Google Chrome application v.88 on Android 9.

The Developer Tools of Google Chrome (v.88) on desktop was used to verify responsiveness on different devices.

1. **Welcome**:

   | Test No. | Action & expected results                                    | Pass / Fail |
   | -------- | :----------------------------------------------------------- | :---------- |
   | 1.1      | Load the Simon, the Chameleon! webpage and verify the Welcome content is displayed. | Pass        |
   | 1.2      | Click on the "Settings" button (cog symbol) and verify the settings content is displayed, then exit the Settings by clicking the "X" symbol and verify the Welcome content is displayed. | Pass        |
   | 1.3      | Click on the "Start" button and verify the game starting count down is displayed, then reload the page and verify the Welcome content is displayed. | Fail*    |

   *: The game was suggesting that there was data saved even if there was no Local Storage. This was fixed by expanding the if condition on chackSavedProgress function to consider savedProgress === null.

2. **Instructions**:

   | Test No. | Action & expected results                                    | Pass / Fail |
   | -------- | :----------------------------------------------------------- | :---------- |
   | 2.1      | From the Welcome content, click the "Instructions" button and verify the *Starting the game* step is displayed. | Pass        |
   | 2.2      | From the *Starting the game* step, click on the right side arrow, verify the next step is displayed, then click on the left side arrow and verify the previous step is displayed. | Pass        |
   | 2.3      | From the *Starting the game* step, click on the right side arrow and verify the subsequent steps are displayed until it loops back to *Starting the game* step. | Pass        |
   | 2.4      | From the *Starting the game* step, click on the left side arrow and verify the previous steps are displayed until it loops back to *Starting the game* step. | Pass        |
   | 2.5      | Click on the "Settings" button (cog symbol) and verify the settings content is displayed, then exit the Settings by clicking the "X" symbol and verify the same Instructions content is displayed. | Pass        |
   | 2.6      | Click on the "Start" button and verify the game starting count down is displayed, then click the "Instructions" button and verify the *Starting the game* step is displayed. | Pass        |

3. **Game Play**:

   | Test No. | Action & expected results                                    | Pass / Fail |
   | -------- | :----------------------------------------------------------- | :---------- |
   | 3.1      | Click on the "Start" button and verify the game starting count down is displayed. Once the count down is complete verify the Simon image changes its colour once. | Pass        |
   | 3.2      | Click on the correct colour and verify the next level count down starts. Once the count down is complete verify the Simon image changes its colour incrementally with the level. | Pass        |
   | 3.3      | Click the "Instructions" button and verify the *Starting the game* step is displayed, then click on the "Continue" button and verify the current level is restarted. | Pass        |
   | 3.4      | Click on the "Settings" button (cog symbol) and verify the settings content is displayed, then exit the Settings by clicking the "X" symbol and verify the current level is re-started. | Pass        |
   | 3.5      | Click on the "Save & Leave" button and verify an alert confirming the level saved is displayed and the page is reloaded (Welcome content is display). Click the "Start" button and verify the choice to continue previous game or start a new one is displayed. | Pass        |
   | 3.6      | Click on the "Continue" button and verify the game play starts on the saved level. | Pass        |
   | 3.7      | Click on the "Save & Leave" button again. From the "Welcome" content, click on "Instructions" then "Start" and verify the choice to continue previous game or start a new one is displayed. | Pass        |
   | 3.8      | Click on the "New Game" button and verify the game play starts on level 1. | Pass        |
   | 3.9      | Click on the "End Game" button, and verify the confirmation prompt to proceed is displayed. Click "Cancel" and verify the level is restarted. | Pass        |
   | 3.9      | Click on the "End Game" button and click "Ok" on the prompt. Verify the "Game Over" content is displayed. | Pass        |
   | 3.10     | Click on the "Restart" button and verify the game play starts on level 1. Ensure the Strict mode is OFF on the Settings, and purposely click the wrong colour. Verify the level is re-started. Continue to play until a certain level (record the level achieved), then end the game as on step 3.9. | Fail**    |

   **: The Strict Mode reads null. This was fixed by moving the variable declaration of strictModeOption to within the displaySettings function scope.

4. **Game Over**:

   | Test No. | Action & expected results                                    | Pass / Fail |
   | -------- | :----------------------------------------------------------- | :---------- |
   | 4.1      | From the Game Over content, verify the highest level displayed matches the current level being played before the game finished. | Pass        |
   | 4.2      | From the Game Over content, click on the "Settings" button (cog symbol) and verify the settings content is displayed, then exit the Settings by clicking the "X" symbol and verify the Game Over content is displayed. | Pass        |
   | 4.3      | From the Game Over content, click on the "Simon, the Chameleon" title and verify the Welcome content is displayed. | Pass        |

5. **Email results**:

   | Test No. | Action & expected results                                    | Pass / Fail |
   | -------- | :----------------------------------------------------------- | :---------- |
   | 5.1      | From the Game Over content, enter your email and click on the "Send" button. Verify on your personal email account, that you have received an email with your level. | Pass        |

6. **Settings**:

   | Test No. | Action & expected results                                    | Pass / Fail |
   | -------- | :----------------------------------------------------------- | :---------- |
   | 6.1      | Click on "Settings" button (cog symbol) then click on the grey Simon image and verify the colour scheme of the page changes. Reload the page and verify the colour scheme picked is saved. | Pass        |
   | 6.2      | Click on "Settings" button (cog symbol) then click on the pink Simon image and verify the colour scheme of the page changes. Reload the page and verify the colour scheme picked is saved. | Pass        |
   | 6.3      | Click on "Settings" button (cog symbol) then click on the brown Simon image and verify the colour scheme of the page changes. Reload the page and verify the colour scheme picked is saved. | Pass        |

7. **Strict mode**:

   | Test No. | Action & expected results                                    | Pass / Fail |
   | -------- | :----------------------------------------------------------- | :---------- |
   | 7.1      | Click on "Settings" button (cog symbol) then click on OFF next to Strict Mode and verify it is now ON. | Pass        |
   | 7.2      | Start the game play with Strict Mode ON, and purposely click the wrong colour during your turn. Verify the game ends. | Pass        |

### Known issues

From the use of display flex on CSS, when the paragraph content increases, some images can get cut on the instructions and on the settings. It is also known that the Theme images on settings are not displayed on screens of very short height, for example mobiles on landscape display.

If the user entered the wrong email, the alert error message is not displayed to let them know the email was not sent.