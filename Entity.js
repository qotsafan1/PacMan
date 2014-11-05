// ======
// ENTITY
// ======
/*

Provides a set of common functions which can be "inherited" by all other
game Entities.

JavaScript's prototype-based inheritance system is unusual, and requires 
some care in use. In particular, this "base" should only provide shared
functions... shared data properties are potentially quite confusing.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


function Entity() {

/*
    // Diagnostics to check inheritance stuff
    this._entityProperty = true;
    console.dir(this);
*/

};

Entity.prototype.setup = function (descr) {

    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }
    
    // Get my (unique) spatial ID
    this._spatialID = spatialManager.getNewSpatialID();
    
    // I am not dead yet!
    this._isDeadNow = false;
};

Entity.prototype.setPos = function (cx, cy) {
    this.cx = cx;
    this.cy = cy;
};

Entity.prototype.getPos = function () {
    return {posX : this.cx, posY : this.cy};
};

Entity.prototype.centerx = function (tileP) {
    this.cx = tileP[0]*g_maze.tWidth+g_maze.tWidth/2;
};

Entity.prototype.centery = function (tileP) {
    this.cy = tileP[1]*g_maze.tHeight+g_maze.tHeight/2;
};

Entity.prototype.canGoLeft = function (tileP) {
    return 0===g_maze.isThereWall(tileP[0]-1, tileP[1]);
}; 

Entity.prototype.canGoRight = function (tileP) {
    return 0===g_maze.isThereWall(tileP[0]+1, tileP[1]);
};

Entity.prototype.canGoUp = function (tileP) {
    return 0===g_maze.isThereWall(tileP[0], tileP[1]-1);
};

Entity.prototype.canGoDown = function (tileP) {
    return 0===g_maze.isThereWall(tileP[0], tileP[1]+1);
};

Entity.prototype.tilePos = function () {
    return g_maze.returnTilePos(this.cx, this.cy); 
};

Entity.prototype.endOfTile = function (tileP) {
    var x = 0.5<=(this.cx/g_maze.tWidth-tileP[0]);
    var y = 0.5<=(this.cy/g_maze.tHeight-tileP[1]);
    return x && y;
};

Entity.prototype.isNextTileWall = function (tileP) {
    var cx = this.cx, cy = this.cy,
        xVel = this.velX*this.directionX, yVel = this.velY*this.directionY;
    if(xVel<0) {return !this.canGoLeft(tileP);}
    if(xVel>0) {return !this.canGoRight(tileP);}
    if(yVel<0) {return !this.canGoUp(tileP);}
    if(yVel>0) {return !this.canGoDown(tileP);}
    return true;
};

Entity.prototype.getRadius = function () {
    return 0;
};

Entity.prototype.getSpatialID = function () {
    return this._spatialID;
};

Entity.prototype.kill = function () {
    this._isDeadNow = true;
};

Entity.prototype.findHitEntity = function () {
    var pos = this.getPos();
    return spatialManager.findEntityInRange(
        pos.posX, pos.posY, this.getRadius()
    );
};

// This is just little "convenience wrapper"
Entity.prototype.isColliding = function () {
    return this.findHitEntity();
};

Entity.prototype.wrapPosition = function () {
    this.cx = util.wrapRange(this.cx, 0, g_canvas.width);
    this.cy = util.wrapRange(this.cy, 0, g_canvas.height);
};