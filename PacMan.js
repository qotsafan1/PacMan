// =========
// ASTEROIDS
// =========
/*

A sort-of-playable version of the classic arcade game.


HOMEWORK INSTRUCTIONS:

You have some "TODO"s to fill in again, particularly in:

spatialManager.js

But also, to a lesser extent, in:

Rock.js
Bullet.js
Ship.js


...Basically, you need to implement the core of the spatialManager,
and modify the Rock/Bullet/Ship to register (and unregister)
with it correctly, so that they can participate in collisions.

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
// CREATE INITIAL SHIPS
// ====================

function createInitialPacMan() {

    entityManager.generatePacMan({
        cx : 200,
        cy : 200
    });
    
}

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
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_MIXED   = keyCode('M');;
var KEY_GRAVITY = keyCode('G');
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

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

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
        pacman_photo0: "https://notendur.hi.is/jfh2/pacman0.png",
        pacman_photo1: "https://notendur.hi.is/jfh2/pacman1.png",
        pacman_photo2: "https://notendur.hi.is/jfh2/pacman2.png",
        pacman_photo3: "https://notendur.hi.is/jfh2/pacman3.png",
        pacman_photo0left: "https://notendur.hi.is/jfh2/pacman0left.png",
        pacman_photo1left: "https://notendur.hi.is/jfh2/pacman1left.png",
        pacman_photo2left: "https://notendur.hi.is/jfh2/pacman2left.png",
        pacman_photo3left: "https://notendur.hi.is/jfh2/pacman3left.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};
var g_animateSprites = [];
var g_animateSpritesLeft = [];

function preloadDone() {

    var pacman0  = new Sprite(g_images.pacman_photo0),
        pacman1  = new Sprite(g_images.pacman_photo1),
        pacman2  = new Sprite(g_images.pacman_photo2),
        pacman3  = new Sprite(g_images.pacman_photo3),
        pacman0left = new Sprite(g_images.pacman_photo0left),
        pacman1left = new Sprite(g_images.pacman_photo1left),
        pacman2left = new Sprite(g_images.pacman_photo2left),
        pacman3left = new Sprite(g_images.pacman_photo3left);

    g_animateSprites.push(pacman0);
    g_animateSprites.push(pacman1);
    g_animateSprites.push(pacman2);
    g_animateSprites.push(pacman3);

    g_animateSpritesLeft.push(pacman0left);
    g_animateSpritesLeft.push(pacman1left);
    g_animateSpritesLeft.push(pacman2left);
    g_animateSpritesLeft.push(pacman3left);

    entityManager.init();
    createInitialPacMan();

    main.init();
}

// Kick it off
requestPreloads();