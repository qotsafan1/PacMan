// ===========
// Ghost STUFF
// ===========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Ghost(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // Set normal drawing scale
    this._scale = 0.45;
    this.speed = g_ghostSpeed*g_speed;
    this.velX = -this.speed;
    this.velY = 0;
    this.chosen = false;
    this.scared = false;
    this.currentTile = [13,14];
    this.inCage = true;
    this.deathTile = [14,17];
};

Ghost.prototype = new Entity();

Ghost.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_velX = this.velX;
    this.reset_velY = this.velY;
    this.reset_tile = this.tilePos();
};

Ghost.prototype.resetGhost = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.velX = this.reset_velX;
    this.velY = this.reset_velY;
    this.currentTile = this.reset_tile;
};

Ghost.prototype.move = function (target, myTile) {
    var go;
    if (this.scared && !this.isDeadNow) go = this.panicDecision();
    else go = this.shortWay(target, myTile);

    if (this.isDeadNow && g_maze.tiles[myTile[0]][myTile[1]]===13) {
            this.velX = 0;
            this.velY = this.speed;
            this.centerx;
            return;
    }
    if (!this.chosen && this.endOfTile(myTile)) {
        for (var i=0; i<go.length; ++i) {
            if(this.canGoUp(myTile) && go[i]===0 && !(this.velY>0) && 
                g_maze.tiles[myTile[0]][myTile[1]]!==3 && 
                g_maze.tiles[myTile[0]][myTile[1]]!==5) {
                this.velX = 0;
                this.velY = -this.speed;
                this.centerx(myTile);
                this.chosen = true;
                return;
            }
            if(this.canGoLeft(myTile) && go[i]===1 && !(this.velX>0)) {
                this.velX = -this.speed;
                this.velY = 0;
                this.centery(myTile);
                this.chosen = true;
                return;
            }
            if(this.canGoDown(myTile) && go[i]===2 && !(this.velY<0)) {
                this.velX = 0;
                this.velY = this.speed;
                this.centerx(myTile);
                this.chosen = true;
                return;
            }
            if(this.canGoRight(myTile) && go[i]===3 && !(this.velX<0)) {
                this.velX = this.speed;
                this.velY = 0;
                this.centery(myTile);
                this.chosen = true;
                return;
            }
        }
    } 
};

// deathly afraid ghosts don´t make the best decisions
Ghost.prototype.panicDecision = function() {
    var rand = Math.floor(util.randRange(1,4));
    var arr = [rand];
    for (var i = 0; i<4; ++i) {
        rand--;
        if (rand===-1) rand = 3;
        arr.push(rand);
    }
    return arr;
};

//0:up, 1:left, 2:down and 3:right
Ghost.prototype.shortWay = function (targ, me) {
    var whereGo = [];
    // distance from tile that is up
    whereGo[0] = util.wrappedDistSq(targ[0],targ[1],me[0],me[1]-1,g_canvas.width, 0);
    // distance from tile that is left
    whereGo[1] = util.wrappedDistSq(targ[0],targ[1],me[0]-1,me[1],g_canvas.width, 0);
    // distance from tile that is down
    whereGo[2] = util.wrappedDistSq(targ[0],targ[1],me[0],me[1]+1,g_canvas.width, 0);
    // distance from tile that is right
    whereGo[3] = util.wrappedDistSq(targ[0],targ[1],me[0]+1,me[1],g_canvas.width, 0);
    // return an array of indices in order decreasing order, if equal in order up>left>down>right
    return util.indexInOrder(whereGo);
};

// checks if the next move is over the center of the tile
Ghost.prototype.endOfTile = function (myTile) {
    var calcx = (this.cx/g_maze.tWidth-myTile[0]);
    var calcy = (this.cy/g_maze.tHeight-myTile[1]);
    var x,y;
    if (this.velX<0 || this.velY<0) {
        if (calcx<0) calcx *=-1;
        if (calcy<0) calcy *=-1;
        x = 0.5>=calcx;
        y = 0.5>=calcy;
        return x && y;
    }
    if (this.velX>0 || this.velY>0) {
        x = 0.5<=calcx;
        y = 0.5<=calcy;
        return x && y;
    }
};

// checks if nest tile in your direction is a wall
Ghost.prototype.isNextTileWall = function (myTile) {
    var cx = this.cx, cy = this.cy,
        xVel = this.velX, yVel = this.velY;
    if(xVel<0) {return !this.canGoLeft(myTile);}
    if(xVel>0) {return !this.canGoRight(myTile);}
    if(yVel<0) {return !this.canGoUp(myTile);}
    if(yVel>0) {return !this.canGoDown(myTile);}
    return true;
};

Ghost.prototype.makingDecisions = function(theTile, myTile) {
    if (this.isDeadNow) {
        this.targetTile = this.deathTile;
    }
    else this.targetTile = this.findTargetTile(myTile);

    // here ghosts make decicions when they land on an intersection
    if(g_maze.isGhostDecTile(theTile, this)) {
        return this.move(this.targetTile, myTile);
    }
    // here ghosts turn before crashing into a wall
    else
    {
        if(this.inCage) {
            return this.velY *= -1;
        }
        if(this.canGoUp(myTile) && this.velY===0) {
            this.velY = -this.speed;
            this.velX = 0;
            this.centerx(myTile);
        }
        else if(this.canGoLeft(myTile) && this.velX===0) {
            this.velX = -this.speed;
            this.velY = 0;
            this.centery(myTile);
        }
        else if(this.canGoDown(myTile) && this.velY===0) {
            this.velY = this.speed;
            this.velX = 0;
            this.centerx(myTile);
        }
        else if(this.canGoRight(myTile) && this.velX===0) {
            this.velX = this.speed;
            this.velY = 0;
            this.centery(myTile);
        }

    }
};

Ghost.prototype.fright = function() {
    this.scared = true;
    this.velY *=-1;
    this.velX *=-1;
};

Ghost.prototype.update = function (du) {
    if (!g_maze.theManMoving) return;

    if(this.scared) this.speed = g_scaredGhostSpeed*g_speed;
    else this.speed = g_ghostSpeed*g_speed;
    if(this.isDeadNow) this.speed = g_speed;

    var endTile = this.endOfTile(this.currentTile);
    var theTile = g_maze.tiles[this.currentTile[0]][this.currentTile[1]];
    spatialManager.unregister(this);
    if(theTile===10 && !this.inCage) {
        this.isDeadNow = false;
        this.centerx(this.currentTile);
        this.velX = 0;
        this.velY = -this.speed;
    }
    else {
        
        if (!g_maze.isGhostDecTile(theTile, this)) this.chosen = false;

        if(endTile && (g_maze.isGhostDecTile(theTile, this) || this.isNextTileWall(this.currentTile))) {
            // if the ghost can´t just keep going and needs to take a decision
            this.makingDecisions(theTile, this.currentTile);
        }
    }

    this.wrapPosition();
    this.cx += this.velX*du;
    this.cy += this.velY*du;
    this.currentTile = this.tilePos();
    spatialManager.register(this);
};

Ghost.prototype.getRadius = function() {
    return 10;
};

Ghost.prototype.render = function (ctx) {
    if(!this.scared) this.drawHealthyGhost(ctx);
    else {
        //var oldstyle = ctx.fillStyle;
        //ctx.fillStyle = 'darkblue';
        //util.fillCircle(ctx, this.cx, this.cy, 10);
        //ctx.fillStyle = oldstyle;
        g_scaredSprite[0].scale = 0.45;
        g_scaredSprite[0].drawWrappedCentredAt(ctx, g_blinky.cx,g_blinky.cy,0);
        g_scaredSprite[0].drawWrappedCentredAt(ctx, g_inky.cx,g_inky.cy,0);
        g_scaredSprite[0].drawWrappedCentredAt(ctx, g_pinky.cx,g_pinky.cy,0);
        g_scaredSprite[0].drawWrappedCentredAt(ctx, g_clyde.cx,g_clyde.cy,0);
    }
};