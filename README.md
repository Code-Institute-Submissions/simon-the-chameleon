# Simon, the Chameleon!

![Simon, the Chameleon Website](# "Simon, the Chameleon")

[Demo of Website](https://belaventer.github.io/simon-the-chameleon/).

Simon, the Chameleon! is a fun family-friendly game completely within on your browser. It is a simple and cute "follow the sequence" game to entertain you for hours. How long can your sequence get?

The **primary goal** of this site is to bring fun to the user.

Other user goals:
- Clearly have access to the instructions.
- Be able to interrupt the game whenever it suits.
- Have means to record the results.

## UX
### User stories
1.	As a new visitor to the website, I want to understand the main game.
2.	As a new visitor to the website, I want to find and read the game instructions.
3.	As an user, I want to start, stop or restart the game at any moment.
4.	As an user, I want to change the style of the website to what suits me best.
5.	As an user, I want a way to record my highest level.

### Strategy 

As the main user goal is to have fun, the product is a simple web based game. As a sequence game, the user can play as long as his/her memory allows and for being a web page, there is no installing required other than a browser to open the page. 


### Scope
The main features in scope for the page are the game itself, accompany instructions and settings options for theme selection.

As the developer does not have the required back-end knowledge to create a server to allow for player registration and data collection, the user has the choice to email the results to him/herself once the game is over.

### Structure
The website game is design to fit the devices height and have all the interaction and content available without need for scroll. The buttons for Settings, Instructions and End Game will always be available to the user at any given moment.

The default flow of information will follow the most logical path for a new user: *welcome, instructions, game play, end game*. However, the option to bypass Instructions will be available.

### Skeleton
- [Simon, the Chameleon! Mobile Layout](#)
- [Simon, the Chameleon! Desktop Layout](#)

### Surface
#### Colour
The website has 3 different themes that the user can change (warm, cool or pastel).

The main background is kept neutral colour not to distract from the playing colors (red, blue, yellow, green, purple or orange, depending on selected theme). 

#### Typography
Headings is set to the logo font-family “Sunshiney”.
All other text is set to font-family “Roboto”.
Default fallback font-family: "sans-Serif".

## Features
The game is a singular page with the content being displayed and changed on the middle section. 

- Constant at the top-left (mobile)/top-middle (desktop), there is the **Game** **Title**. This title cannot be interacted with.
- Constant at the top-right, there is the **Settings** buttons. If the button is clicked, the Settings are displayed.
- Constant at the bottom-middle (mobile)/bottom-left (desktop), there is the **Instructions** buttons. If the button is clicked, the Instructions are displayed.
- Once the game starts, constant at the bottom-middle (mobile)/bottom-right (desktop), there is the **End Game** button. If the button is clicked, the game is over.
- Once the game starts, constant at the bottom-middle, there is the **Save & Leave** button. If the button is clicked, the welcome page is reloaded.

The middle section varies depending on the user interaction:

At the page load, the **Welcome** content is shown. The user is given the option to view or skip **Instructions**.

If Instructions button is clicked, the **Instructions Step 1** is displayed. The user is given the option to navigate between Instructions steps or **Start** the game.

When **Start** is clicked, and the user has saved data, the choice is given to continue the previous game or start a new game.

At game play, the User is informed when the sequence is starting with a count down: **Starting in 3...**. Then the user is instructed to **Watch Simon...** and, once sequence is complete, the user is instructed to **Click on the colors below in the order they were shown**. The playable area is clearly defined.

At game over, if by getting the sequence wrong or interrupting the game deliberately, the user is presented with the choice of emailing the results to yourself and/or **Restart** the game.

### Existing Features <!--To be updated during coding-->



### Features left to implement

A potential feature is to allow the user to retry the level if it gets the sequence wrong. Implementing this feature affects the code and the settings layout. Currently, due to time constraint, this feature might not be implemented.

Currently the programmer does not have the knowledge to develop a server to collect/send data and and maintain a database of user and levels. This would be a interesting feature for the future, as it allows for the user to save progress or compare oneself with other users.

## Technologies used
### Languages
- HTML | HTML5
- CSS | CSS3
- JavaScript | JS

### Libraries, Frameworks & Programs
- [Gitpod](https://gitpod.io/workspaces/):

    The developer used Gitpod as the IDE for building the website.
<!--[Bootstrap v4.5](https://getbootstrap.com/):-->

   <!--Used for the Carousel functionality in the Instructions.-->
- [Google Fonts](https://fonts.google.com/):
  
   Used to import “Sunshiney" and “Roboto” fonts.
<!--[Fonts Awesome v5.15](https://fontawesome.com/):-->

- [Typora](https://typora.io/#):

   Used for Markdown editing of README and TESTING files.
- [Clip Studio Paint](https://www.clipstudio.net/en/):

   Used for images development and editing.
<!--[AutoPrefixer](https://autoprefixer.github.io): -->

   <!--Used on CSS to ensure functionality across browsers.-->

## Testing
Refer to [TESTING.md](#) file for testing details.

## Deployment
This project was developed using the Gitpod IDE, committed to git and pushed to GitHub.

### Deploy to GitHub Pages from GitHub Repository:
- Login to GitHub.
- Search for the repository belaventer/simon-the-chameleon and select it.
- Select Settings on the Menu under the Repository name.
- Under "GitHub Pages", use Branch drop-down menu and select Master Branch as the publishing source.
- The page will be refreshed and the website is deployed. Return to GitHub Pages section to view the link to the deployed website.

*<!--At the moment of submitting this Milestone project the Development Branch and Master Branch are identical.-->*

### Run the project locally:
- Ensure you have Gipod Browser Extension for Chrome and you are logged in Gipod with your GitHub account. 
- Login to GitHub.
- Search and select the GitHub repository belaventer/simon-the-chameleon.
- Click the green "Gitpod" button in the top right corner of the repository.
- A new Gitpod workspace will be created from the repository in GitHub and you can start working locally.

### Download project to local IDE:
- Login to GitHub.
- Search for the repository belaventer/simon-the-chameleon and select it.
- Under the repository name, click on Code.
- In the Clone with HTTPs section, copy the clone URL for the repository.
- In your local IDE open the terminal.
- Change the current working directory to the desired cloned location.
- From the terminal run git clone with the copied URL.
- Your local clone will be created and you can start working locally.

## Credit
### Content
<!--All content was written by the developer.-->

### Media
<!--All media was created by the developer.-->

### Code
Favicon added as per ["Add A Favicon to A Website in HTML | Learn HTML and CSS | HTML Tutorial | HTML for Beginners"](https://www.youtube.com/watch?v=kEf1xSwX5D8) by Dani Krossing

<!-- [Bootstrap Documentation](https://getbootstrap.com/) was constantly referred to for the correct use of Bootstrap components and grid. -->

[W3Schools](https://www.w3schools.com/) referred to for general HTML, CSS and JavaScript syntax.

<!--How to justify flex-item learned from [StackOverflow Post](https://stackoverflow.com/questions/32551291/in-css-flexbox-why-are-there-no-justify-items-and-justify-self-properties).-->

### Acknowledgment


## Disclaimer
This project purpose is only educational.

