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

// HACKED-IN AUDIO (no preloading)
PacMan.prototype.warpSound = new Audio(
    "sounds/shipWarp.ogg");

PacMan.prototype.move = function(du) {
    var rotation;
    if(keys[this.KEY_UP]) {
        if(this.animationOn === false) this.animationOn = true;
        this.velX = 0;
        this.velY = 3;
        if(this.directionY > 0) {
            this.directionY *= -1;
        } 
        this.rotation = -Math.PI/2;      
    }
    if(keys[this.KEY_DOWN]) {
        if(this.animationOn === false) this.animationOn = true;
        this.velX = 0;
        this.velY = 3;
        if(this.directionY < 0) {
            this.directionY *= -1;
        }       
        this.rotation =  Math.PI/2;
    }
    if(keys[this.KEY_RIGHT]) {
        if(this.animationOn === false) this.animationOn = true;
        this.velX = 3;
        this.velY = 0;
        if(this.directionX < 0) {
            this.directionX *= -1;
        }       
        this.rotation = 0;
    }
    if(keys[this.KEY_LEFT]) {
        if(this.animationOn === false) this.animationOn = true;
        this.velX = 3;
        this.velY = 0;
        if(this.directionX > 0) {
            this.directionX *= -1;
        }       
        this.rotation = 0;
    }
    this.wrapPosition();
    this.cx += this.velX*this.directionX*du;
    this.cy += this.velY*this.directionY*du;
    //change image
    this.animate();
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
    
    spatialManager.unregister(this);
    if(this._isDeadNow) return entityManager.KILL_ME_NOW;

 
    this.move(du);

    // Handle firing
   

    // TODO: YOUR STUFF HERE! --- Warp if isColliding, otherwise Register
    if(this.isColliding()){
        
    } else {
        spatialManager.register(this);
    }
};

PacMan.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9*this._scale;
};


PacMan.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;
    
    this.halt();
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