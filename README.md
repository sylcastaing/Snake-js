# Snake-js

Simple Snake Game in HTML5, CSS3 and JS.

## Installation

`npm install -g gulp`

`npm install`

## Start dev

For start building, watching and dev server launch :

`gulp`

## Building Dev

`gulp build`

This task build the application in a 'build' directory : 
- Copy and minify HTML
- Build less, recess and minify styles in a styles.min.css file
- Start browserify to compile js in a snake.js file
- Inject js and css in index.html

## Building Dist

`gulp dist`

Generate a snake.min.js file in a dist directory. 
