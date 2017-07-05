## Sinuous

### Background
A game built in javascript with the goal of staying alive as long as possible in order to achieve a high score.
1. Stay alive.
2. Avoid colliding with the red dots.
3. Capture other colored dots to get temporary boosts, such as invulnerability.

### Functionality & MVP
With this rendition of sinuous, users will be able to:
* Dodge red dots by scrolling
* Capture boosts by colliding with non-red dots
* See number of lives, time, score and level for each round
* Start, stop and reset buttons, and scrolling to control the game.
In addition, this project will include:
* An About modal describing rules of the game, including a legend denoting the significance of the various dots.
* A production README

### Wireframes
This app will consist of a single screen with game board and nav links to Github, LinkedIn, and the About modal. Game controls will include Start, Stop, and Reset buttons as well as a mouse scrolling to move the player. The board will be a rectangle filled with moving red dots and a blue representation of the player in the center.

![wire-frame](./docs/sinuous.png)

###Architecture and Technologies
Sinuous will be implemented with the following Technologies:
JavaScript: game logic
jQuery: To manipulate DOM elements for menus and starting a new game instance.
Webpack: to allow classes to work concurrently without using Require JS.

In addition to the entry file, there will be three scripts involved in this project:
game.js: this script will handle the background and many of the app's features, including player movements, game score and generating dots
player.js: this script will handle player construction and collision detection
dot.js: this script will handle dot object construction and collision detection

### Implementation Timeline

Day 1: Setup all necessary Node modules, including getting webpack up and running. Write a basic entry file and create the board and dot scripts outlined above.

Day 2: Build out the Player object to connect to the Board object and render it on the board. Make the player moveable through scrolling within the game board.

Day 3: Create controls for the game speed, strop, start, reset and other rendering features. Incorporate the collision logic and game scoring into the board rendering. Style the frontend, making it polished and professional.
