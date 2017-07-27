# Inspace
[Live!](https://stenkoff.github.io/inspace/)

Inspace is an object-oriented browser game inspired by the game Sinuous built entirely with JavaScript, HTML and CSS. The goal of the game is to stay alive as long as possible in order to achieve a high score. Players can stay alive by avoiding collisions with the red dots. Players can capture other colored dots to get temporary power boosts, such as slowing the speed of the red dots.

![inspace](./assets/images/inspace_img.png)

## Features & Implementation

### Canvas
Inspace utilizes HTML5 canvas for precise pixel control and successful object rendering

![canvas](./assets/images/canvas.png)
![draw](./assets/images/canvas_draw.png)

### Collision Detection
Using HTML5 canvas and the distance formula, the game successfully checks for collisions between two dots by calculating the distance between those dots and determining if that distance is less than the sum of the dots' radii

![collision](./assets/images/collision.png)

### Mouse Position
Inspace uses an event listener on the mouse to track and set the player's position based on the current mouse coordinates

![position](./assets/images/player_pos.png)

### High Score
The game keeps track of a high score using local storage so the player's high score is saved during the browser session even if the browser is refreshed

![high-score](./assets/images/high_score.png)
