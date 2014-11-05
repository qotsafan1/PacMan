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

    entityManager.makeLevel(g_level);
    
}

// ======================
// Fixing maze for tunnel
// ======================
g_maze.tiles[-1]=0;
g_maze.tiles[-1][16]=0;
g_maze.tiles[28]=0;
g_maze.tiles[28][16]=0;

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

var g_allowMixedActions = true;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_MIXED   = keyCode('M');;
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_K = keyCode('K');

function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    
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

        level_walls : "images/levelwalls.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};
var g_animateSprites = [];
var g_animateSpritesLeft = [];
var g_levelimg;

function preloadDone() {

    var pacman0  = new Sprite(g_images.pacman_photo0),
        pacman1  = new Sprite(g_images.pacman_photo1),
        pacman2  = new Sprite(g_images.pacman_photo2),
        pacman3  = new Sprite(g_images.pacman_photo3),
        pacman0left = new Sprite(g_images.pacman_photo0left),
        pacman1left = new Sprite(g_images.pacman_photo1left),
        pacman2left = new Sprite(g_images.pacman_photo2left),
        pacman3left = new Sprite(g_images.pacman_photo3left);

    var level = g_images.level_walls;

    g_animateSprites.push(pacman0);
    g_animateSprites.push(pacman1);
    g_animateSprites.push(pacman2);
    g_animateSprites.push(pacman3);

    g_animateSpritesLeft.push(pacman0left);
    g_animateSpritesLeft.push(pacman1left);
    g_animateSpritesLeft.push(pacman2left);
    g_animateSpritesLeft.push(pacman3left);

    g_levelimg = level;

    console.log(g_levelimg);

    entityManager.init();
    createInitialPacMan();

    main.init();
}

// Kick it off
requestPreloads();
