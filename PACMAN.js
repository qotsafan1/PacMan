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

    entityManager.generatePacMan({
        cx : 224,
        cy : 424
    });

    entityManager.makeLevel();

    entityManager.generateGhost({
        cx : 224,
        cy : 232,
        name : "Blinky",
        targetTile : [25,0]
    });
    
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

var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');
var KEY_REDWALL = keyCode('M');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_K = keyCode('K');

function processDiagnostics() {

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
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        pacman_photo0: "images/pacman0.png",
        pacman_photo1: "images/pacman1.png",
        pacman_photo2: "images/pacman2.png",
        pacman_photo3: "images/pacman3.png",
        pacman_photo0left: "images/pacman0left.png",
        pacman_photo1left: "images/pacman1left.png",
        pacman_photo2left: "images/pacman2left.png",
        pacman_photo3left: "images/pacman3left.png",

        level_walls : "images/walls.png",

        pacman_dead0: "images/deadPacman0.png",
        pacman_dead1: "images/deadPacman1.png",
        pacman_dead2: "images/deadPacman2.png",
        pacman_dead3: "images/deadPacman3.png",
        pacman_dead4: "images/deadPacman4.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};
var g_animateSprites = [];
var g_animateSpritesLeft = [];
var g_levelimg = [];
var g_deathSprites =[];

function preloadDone() {

    var pacman0  = new Sprite(g_images.pacman_photo0),
        pacman1  = new Sprite(g_images.pacman_photo1),
        pacman2  = new Sprite(g_images.pacman_photo2),
        pacman3  = new Sprite(g_images.pacman_photo3),
        pacman0left = new Sprite(g_images.pacman_photo0left),
        pacman1left = new Sprite(g_images.pacman_photo1left),
        pacman2left = new Sprite(g_images.pacman_photo2left),
        pacman3left = new Sprite(g_images.pacman_photo3left);

    var level = new Sprite(g_images.level_walls);

    var deadPacman0 = new Sprite(g_images.pacman_dead0),  
        deadPacman1 = new Sprite(g_images.pacman_dead1),   
        deadPacman2 = new Sprite(g_images.pacman_dead2),   
        deadPacman3 = new Sprite(g_images.pacman_dead3),   
        deadPacman4 = new Sprite(g_images.pacman_dead4);

    g_animateSprites.push(pacman0);
    g_animateSprites.push(pacman1);
    g_animateSprites.push(pacman2);
    g_animateSprites.push(pacman3);

    g_animateSpritesLeft.push(pacman0left);
    g_animateSpritesLeft.push(pacman1left);
    g_animateSpritesLeft.push(pacman2left);
    g_animateSpritesLeft.push(pacman3left);

    g_levelimg.push(level);

    g_deathSprites.push(deadPacman0);
    g_deathSprites.push(deadPacman1);
    g_deathSprites.push(deadPacman2);
    g_deathSprites.push(deadPacman3);
    g_deathSprites.push(deadPacman4);

    entityManager.init();
    createInitialPacMan();

    main.init();
}

// Kick it off
requestPreloads();
