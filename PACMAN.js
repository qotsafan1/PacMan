// =========
// PAC-MAN
// =========
/*
A sort-of-playable version of the classic arcade game.
*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// ====================
// CREATE PAC-MAN
// ====================
function createInitialPacMan() {

    //entityManager.generatePacMan({
      //  cx : 224,
     //   cy : 424
    //});

    //entityManager.makeLevel();
}

// ======================
// Fixing maze for tunnel
// ======================
g_maze.fixMaze();


// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    processDiagnostics();
    
    entityManager.update(du);

}

// GAME-SPECIFIC DIAGNOSTICS

var g_useAveVel = true;
var g_renderSpatialDebug = false;
var g_useUglyRedWall = false;
var g_scatterToggle = true;

var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');
var KEY_REDWALL = keyCode('M');
var KEY_SCATTER = keyCode('N');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_K = keyCode('K');

function processDiagnostics() {
    if (eatKey(KEY_SCATTER)) g_scatterToggle = !g_scatterToggle;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_REDWALL)) g_useUglyRedWall = !g_useUglyRedWall;    
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`

// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {
    g_maze.render(ctx);

    entityManager.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
    
    if(g_isGamePaused) g_pausemenu.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};


function requestPreloads() {

    var requiredImages = {
        
        level_walls : "images/walls.png",
        b_continue : "images/continue.png",

        therealone: "images/pacmanRight.png",
        therealoneLeft: "images/pacmanLeft.png",
        deadPacman : "images/deadPacMan.png",
        inky: "images/inky.png",
        blinky: "images/blinky.png",
        pinky: "images/pinky.png",
        clyde: "images/clyde.png",
        scared: "images/scaredGhosts.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}
//function to create spriteSheet, takes in array to store them, image and 
//number of colums and rows to split the image up to.
function createSpriteSheet(spriteArray,image,numCol,numRow){
    var imgHeight = image.height;
    var imgWidth = image.width;
    var celWidth = imgWidth/numCol;
    var celHeight = imgHeight/numRow;

    for(var row = 0; row < numRow;++row){
        for(var col = 0; col < numCol; ++col){
            spriteArray.push(new Sprite(image,col*celWidth,row*celHeight,celWidth,celHeight));
        }
    }
}

var g_sprites = {};
var g_animateSprites = [];
var g_animateSpritesLeft = [];
var g_levelimg = [];
var g_buttons = [];
var g_deathSprites =[];

//spriteArrays for the ghosts!
var g_inkySprite = [],
    g_blinkySprite = [],
    g_pinkySprite = [],
    g_clydeSprite = [],
    g_scaredSprite = [];

function preloadDone() {
    createSpriteSheet(g_animateSprites,g_images.therealone,2,2);
    createSpriteSheet(g_animateSpritesLeft,g_images.therealoneLeft,2,2);
    createSpriteSheet(g_deathSprites,g_images.deadPacman,2,3);

    //create ghosts sprites
    createSpriteSheet(g_inkySprite,g_images.inky,2,1);
    createSpriteSheet(g_blinkySprite,g_images.blinky,2,1);
    createSpriteSheet(g_pinkySprite,g_images.pinky,2,1);
    createSpriteSheet(g_clydeSprite,g_images.clyde,2,1);
    createSpriteSheet(g_scaredSprite,g_images.scared,2,1);

    var levelimage = g_images.level_walls;
    var level = new Sprite(levelimage, 0, 0, levelimage.width, levelimage.height);
    g_levelimg.push(level);

    var button = g_images.b_continue;
    var continue_button = new Sprite(button, 0, 0, button.width, button.height);
    g_buttons.push(continue_button);

    entityManager.init();
    //createInitialPacMan();
    g_pausemenu = new pauseMenu();

    main.init();
}

// Kick it off
requestPreloads();
