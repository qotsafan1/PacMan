// ============
// PacMan STUFF
// ============

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
    this.speed = 2;//1.6;
    this.turns = "right";
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

// Initial, inheritable, default values
PacMan.prototype.rotation = 0;
PacMan.prototype.cx = 200;
PacMan.prototype.cy = 200;
PacMan.prototype.velX = 0;
PacMan.prototype.velY = 0;
PacMan.prototype.directionX = 1;
PacMan.prototype.directionY = 1;

PacMan.prototype.isDead = false;

PacMan.prototype.move = function(du, tileP) {
    if(keys[this.KEY_KILL]){
        this.die();
    }

    var rotation;
    if(keys[this.KEY_UP] && this.canGoUp(tileP) && !this.isDead) {
        if(!g_maze.theManMoving) g_maze.theManMoving = true;
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
        this.turns = "up";   
    }
    if(keys[this.KEY_DOWN] && this.canGoDown(tileP) && !this.isDead) {
        if(!g_maze.theManMoving) g_maze.theManMoving = true;
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
        this.turns = "down"
    }
    if(keys[this.KEY_RIGHT] && this.canGoRight(tileP) && !this.isDead) {
        if(!g_maze.theManMoving) g_maze.theManMoving = true;
        if(this.animationOn === false) this.animationOn = true;
        this.velX = this.speed;
        this.velY = 0;
        if(this.directionX < 0) {
            this.directionX *= -1;
        }       
        this.rotation = 0;
        this.centery(tileP);
        this.turns = "right";
    }
    if(keys[this.KEY_LEFT] && this.canGoLeft(tileP) && !this.isDead) {
        if(!g_maze.theManMoving) g_maze.theManMoving = true;
        if(this.animationOn === false) this.animationOn = true;
        this.velX = this.speed;
        this.velY = 0;
        if(this.directionX > 0) {
            this.directionX *= -1;
        }       
        this.rotation = 0;
        this.centery(tileP);
        this.turns = "left";
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
    g_blinky.resetGhost();
    g_pinky.resetGhost();
    g_inky.resetGhost();
    g_clyde.resetGhost();
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

PacMan.prototype.eatDot = function(tileP){
    /*var dotEntity = entityManager._dots;
    var fruitEntity = entityManager._fruits;
    //console.log(this.cx + "  " + dotEntity[1].cx);


    for(var i=0; i<fruitEntity.length;i++){
        if((fruitEntity[i].cx > this.cx-this.getRadius() && fruitEntity[i].cx < this.cx +this.getRadius()) && (fruitEntity[i].cy > this.cy-this.getRadius() && fruitEntity[i].cy < this.cy +this.getRadius())) {
                fruitEntity.splice(i,1);
                this.makeGhostsScared();
        }
    }

    for(var i=0; i<dotEntity.length;i++){
        if((dotEntity[i].cx > this.cx-this.getRadius() && dotEntity[i].cx < this.cx +this.getRadius()) && (dotEntity[i].cy > this.cy-this.getRadius() && dotEntity[i].cy < this.cy +this.getRadius())) {
            dotEntity.splice(i,1);
        }
    }   */
    switch (g_maze.tiles[tileP[0]][tileP[1]]) {
        case 0:
            g_maze.tiles[tileP[0]][tileP[1]]=10;
            break;
        case 2:
            g_maze.tiles[tileP[0]][tileP[1]]=4;
            break;
        case 3:
            g_maze.tiles[tileP[0]][tileP[1]]=5;
            break;
        case 8:
            g_maze.tiles[tileP[0]][tileP[1]]=7;
            this.makeGhostsScared();
            break;
        }
            /*
    if (g_maze.tiles[tileP[0]][tileP[1]]===0 || g_maze.tiles[tileP[0]][tileP[1]]===2 ||
            g_maze.tiles[tileP[0]][tileP[1]]===3) {

    }
    else if(g_maze.tiles[tileP[0]][tileP[1]]===8) {
        g_maze.tiles[tileP[0]][tileP[1]] = 7;
        this.makeGhostsScared();
    }*/
}

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

// tell ghost to be scared because now the TheMan is in the house took the big pill
PacMan.prototype.makeGhostsScared= function() {
    g_maze.scaredTimer = 0;
    g_blinky.fright();
    g_pinky.fright();
    g_inky.fright();
    g_clyde.fright();
};

PacMan.prototype.update = function (du) {
    var tileP =this.tilePos();
    spatialManager.unregister(this);
 
    this.eatDot(tileP);

    this.move(du, tileP);
    if(this.isNextTileWall(tileP) && this.endOfTile(tileP))
    {
        this.velX=0;
        this.velY=0;
        this.centerx(tileP);
        this.centery(tileP);
    }
    if(this.isColliding() && !this.isDead){
        var thing = this.isColliding();
        if (!thing.scared) {
            this.die();
        }
        else {
            thing.isDeadNow = true;
        }
    } 
    spatialManager.register(this);
    g_pinky.PacTurns = this.turns;
    g_blinky.PacTile = this.tilePos();
};

PacMan.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9*this._scale;
};

PacMan.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};

PacMan.prototype.die = function() {
    this.rotation = 0;  
    this.isDead = true;
    this.animationOn = false;
    this.i = 0;
    this.counter = 0;
    g_maze.theManMoving = false;
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