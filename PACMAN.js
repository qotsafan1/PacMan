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
function createInitialObjects() {

    g_level = new Level();

    g_startupscreen = new startUpScreen({

        cx : g_canvas.width/2,
        cy : g_canvas.height/2,
        pacmanlogo : g_paclogo[0]

    });

    g_pausemenu = new Menu(300, 180, 15, "pause");
    //g_intromenu = new Menu(300, 180, -250, "intro");

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
var timedelay = 2*SECS_TO_NOMINALS;
var restoredelay = timedelay;
function delayUpdate(du) {
    if(timedelay > 0) {
        timedelay -= du
        return true;
    }
    else{
        timedelay = restoredelay;
        return false;
    }
}

function updateSimulation(du) {
    
    processDiagnostics();

    // Nothing updates for the first seconds the game is run
    if (g_startupscreen.timer >= g_startupscreen.startGame) g_startupscreen.update(du);
    else {

        // Check if startupscreen is on, else allow game to run
        if(g_startupscreen.status() && g_startupscreen.ON) g_startupscreen.update(du);
        else {

            // Pause game if between levels
            if(g_levelchange) {
                if(delayUpdate(du)){
                    g_level.update(du);
                    return;
                }
                else g_levelchange = false;
                
            }

            // Pause game if esc key was pressed
            if(!g_startupscreen.ON) g_pausemenu.checkPause();
            if(g_pausemenu.ON && !g_startupscreen.ON) {
                g_pausemenu.update();
                return;
            }

            g_level.update(du);
            entityManager.update(du);
        }
    }

}
//Audio stuff for toogleing
var KEY_AUDIO = keyCode('Z');
var g_audioOn = true;

//load audio
var g_chompAudio = new Audio('sounds/pacman_chomp.wav'),
    g_sirenAudio = new Audio('sounds/pacman_siren.wav'),
    g_pacmandeathAudio = new Audio('sounds/pacman_death.wav'),
    g_eatGhostsAudio = new Audio('sounds/pacman_eatghost.wav');

// GAME-SPECIFIC DIAGNOSTICS

var g_renderSpatialDebug = false;
var g_useUglyRedWall = false;
var g_scatterToggle = true;

var KEY_SPATIAL = keyCode('X');
var KEY_REDWALL = keyCode('M');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_K = keyCode('K');

function processDiagnostics() {
    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_REDWALL)) g_useUglyRedWall = !g_useUglyRedWall;   

    if(eatKey(KEY_AUDIO)) g_audioOn = !g_audioOn; 
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

    if (g_startupscreen.timer >= g_startupscreen.startGame) g_startupscreen.render(ctx);
    else {
        
        g_level.render(ctx);
        entityManager.render(ctx);

        if (g_renderSpatialDebug) spatialManager.render(ctx);
        
        if (g_pausemenu.ON && !g_startupscreen.ON) g_pausemenu.render(ctx);

        if (g_startupscreen.status() && g_startupscreen.ON) g_startupscreen.render(ctx);
    }
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};


function requestPreloads() {

    var requiredImages = {
        
        levelwalls_blue : "images/walls_blue.png",
        levelwalls_white : "images/walls_white.png",

        b_continue : "images/continue.png",
        b_newgame : "images/newgame.png",
        b_quit : "images/quit.png",

        pacmanlogo : "images/pacmanlogo.png",

        therealone: "images/pacmanRight.png",
        therealoneLeft: "images/pacmanLeft.png",
        deadPacman : "images/deadPacMan1.png",
        inky: "images/inky.png",
        blinky: "images/blinky.png",
        pinky: "images/pinky.png",
        clyde: "images/clyde.png",
        scared: "images/scaredGhosts.png",
        scaredEnd : "images/scaredGhostsEnd.png",
        candy : "images/candy.png"
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
var g_paclogo = [];
var g_deathSprites =[];
var g_candySprite =[];

//spriteArrays for the ghosts!
var g_inkySprite = [],
    g_blinkySprite = [],
    g_pinkySprite = [],
    g_clydeSprite = [],
    g_scaredSprite = [],
    g_scaredEndSprite = [];

function preloadDone() {
    createSpriteSheet(g_animateSprites,g_images.therealone,2,2);
    createSpriteSheet(g_animateSpritesLeft,g_images.therealoneLeft,2,2);
    
    createSpriteSheet(g_deathSprites,g_images.deadPacman,2,4);

    createSpriteSheet(g_candySprite,g_images.candy,4,2);
    //create ghosts sprites
    createSpriteSheet(g_inkySprite,g_images.inky,2,1);
    createSpriteSheet(g_blinkySprite,g_images.blinky,2,1);
    createSpriteSheet(g_pinkySprite,g_images.pinky,2,1);
    createSpriteSheet(g_clydeSprite,g_images.clyde,2,1);
    createSpriteSheet(g_scaredSprite,g_images.scared,2,1);
    createSpriteSheet(g_scaredEndSprite,g_images.scaredEnd,2,1);

    // LEVEL WALLS
    var levelimage1 = g_images.levelwalls_blue;
    var levelsprite1 = new Sprite(levelimage1, 0, 0, levelimage1.width, levelimage1.height);
    g_levelimg.push(levelsprite1);

    var levelimage2 = g_images.levelwalls_white;
    var levelsprite2 = new Sprite(levelimage2, 0, 0, levelimage2.width, levelimage2.height);
    g_levelimg.push(levelsprite2);

    // BUTTONS
    var button1 = g_images.b_continue;
    var continue_buttonsprite = new Sprite(button1, 0, 0, button1.width, button1.height);
    g_buttons.push(continue_buttonsprite);

    var button2 = g_images.b_newgame;
    var newgame_buttonsprite = new Sprite(button2, 0, 0, button2.width, button2.height);
    g_buttons.push(newgame_buttonsprite);

    var button3 = g_images.b_quit;
    var quit_buttonsprite = new Sprite(button3, 0, 0, button3.width, button3.height);
    g_buttons.push(quit_buttonsprite);

    // LOGO
    var logo = g_images.pacmanlogo;
    var logosprite = new Sprite(logo, 0, 0, logo.width, logo.height);
    g_paclogo.push(logosprite);


    entityManager.init();
    createInitialObjects();

    main.init();
}

// Kick it off
requestPreloads();
