// ==========
// PacMan STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function PacMan(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();
    
    // Default sprite, if not otherwise specified
    this.counter = 0;
    this.animationOn = false;
    this.i = 0;
    this.sprite = this.sprite || g_animateSprites[this.i];
   
    // Set normal drawing scale, and warp state off
    this._scale = 0.45;
    this.speed = 1.6;
};

PacMan.prototype = new Entity();

PacMan.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

PacMan.prototype.KEY_UP = 'W'.charCodeAt(0);
PacMan.prototype.KEY_DOWN  = 'S'.charCodeAt(0);
PacMan.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
PacMan.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);
PacMan.prototype.KEY_KILL = 'I'.charCodeAt(0);

PacMan.prototype.KEY_FIRE   = ' '.charCodeAt(0);

// Initial, inheritable, default values
PacMan.prototype.rotation = 0;
PacMan.prototype.cx = 200;
PacMan.prototype.cy = 200;
PacMan.prototype.velX = 0;
PacMan.prototype.velY = 0;
PacMan.prototype.directionX = 1;
PacMan.prototype.directionY = 1;
PacMan.prototype.launchVel = 2;
PacMan.prototype.numSubSteps = 1;
PacMan.prototype.isDead = false;
// HACKED-IN AUDIO (no preloading)
PacMan.prototype.warpSound = new Audio(
    "sounds/shipWarp.ogg");

PacMan.prototype.move = function(du, tileP) {
    if(keys[this.KEY_KILL]){
        this.isDead = true;
        this.animationOn = false;
        this.i = 0;
        this.counter = 0;
    }

    var rotation;
    if(keys[this.KEY_UP] && this.canGoUp(tileP) && !this.isDead) {
        if(this.animationOn === false) this.animationOn = true;
        this.velX = 0;
        this.velY = this.speed;
        if(this.directionY > 0) {
            this.directionY *= -1;
        }
        //prevent pacman's "moonwalk"
        if(this.sprite === g_animateSprites[this.i]) this.rotation = -Math.PI/2;
        if(this.sprite === g_animateSpritesLeft[this.i]) this.rotation = Math.PI/2;
        this.centerx(tileP);      
    }
    if(keys[this.KEY_DOWN] && this.canGoDown(tileP) && !this.isDead) {
        if(this.animationOn === false) this.animationOn = true;
        this.velX = 0;
        this.velY = this.speed;
        if(this.directionY < 0) {
            this.directionY *= -1;
        }
        //prevent pacman's "moonwalk"
        if(this.sprite === g_animateSprites[this.i])this.rotation = Math.PI/2;
        if(this.sprite === g_animateSpritesLeft[this.i]) this.rotation = -Math.PI/2;
        this.centerx(tileP);
    }
    if(keys[this.KEY_RIGHT] && this.canGoRight(tileP) && !this.isDead) {
        if(this.animationOn === false) this.animationOn = true;
        this.velX = this.speed;
        this.velY = 0;
        if(this.directionX < 0) {
            this.directionX *= -1;
        }       
        this.rotation = 0;
        this.centery(tileP);
    }
    if(keys[this.KEY_LEFT] && this.canGoLeft(tileP) && !this.isDead) {
        if(this.animationOn === false) this.animationOn = true;
        this.velX = this.speed;
        this.velY = 0;
        if(this.directionX > 0) {
            this.directionX *= -1;
        }       
        this.rotation = 0;
        this.centery(tileP);
    }
    this.wrapPosition();
    this.cx += this.velX*this.directionX*du;
    this.cy += this.velY*this.directionY*du;
    //change image
    this.animateDeath();
    this.animate();
};

PacMan.prototype.resetPacman = function(){
    //set initial position, rotation, and velocity
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;
    this.halt();
    //
    this.i = 0;
    this.counter = 0;
    //no animation ongoing if pacman is reset
    this.isDead = false;
    this.animationOn = false;
    //initialize the sprite
    this.sprite = g_animateSprites[this.i];
};
PacMan.prototype.animateDeath = function(){
    if(this.isDead === true){
        this.halt();
        this.sprite = g_deathSprites[this.i];
        if(this.counter%5 === 0) this.i++;
        this.counter++;

        if(this.i === g_deathSprites.length){
            this.resetPacman();
        }
    }
};

PacMan.prototype.animate = function(){
    if(this.animationOn){
        if(this.counter%5 === 0 && this.counter <= 10)this.i++;
        if(this.counter%5 === 0 && this.counter > 10) this.i--;
        if(this.directionX === -1){
            this.sprite = g_animateSpritesLeft[this.i];
        } else{
            this.sprite = g_animateSprites[this.i];
        }
        //if(this.i === g_animateSprites.length-1) this.i=0;
        this.counter++;
        if(this.counter === 30) this.counter = 0;
        }    
    };

PacMan.prototype.update = function (du) {
    var tileP =this.tilePos();
    spatialManager.unregister(this);
    if(this._isDeadNow) return entityManager.KILL_ME_NOW;
 
    this.move(du, tileP);
    if(this.isNextTileWall(tileP) && this.endOfTile(tileP))
    {
        this.velX=0;
        this.velY=0;
        this.centerx(tileP);
        this.centery(tileP);
    }
    if(this.isColliding()){} 
    else {
        spatialManager.register(this);
    }
};

PacMan.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9*this._scale;
};

PacMan.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};

var NOMINAL_ROTATE_RATE = 0.1;

PacMan.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawWrappedCentredAt(
    ctx, this.cx, this.cy, this.rotation
    );
    this.sprite.scale = origScale;
};