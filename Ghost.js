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
function Ghost(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    //this.rememberResets();
    /*
    // Default sprite, if not otherwise specified
    this.counter = 0;
    this.animationOn = false;
    this.i = 0;
    this.sprite = this.sprite || g_animateSprites[this.i];
    */
    // Set normal drawing scale
    this._scale = 0.45;
    this.speed = 1;
    this.velX = this.speed;
    this.velY = 0;
    this.chosen = false;
};

Ghost.prototype = new Entity();

Ghost.prototype.move = function (target, myTile) {
    var go = this.shortWay(target, myTile);
    if (!this.chosen && this.endOfTile(myTile)) {
        for (var i=0; i<go.length; ++i) {
            if(this.canGoUp(myTile) && go[i]===0 && !(this.velY>0) && 
                g_maze.tiles[myTile[0]][myTile[1]]!==3) {
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

Ghost.prototype.isNextTileWall = function (myTile) {
    var cx = this.cx, cy = this.cy,
        xVel = this.velX, yVel = this.velY;
    if(xVel<0) {return !this.canGoLeft(myTile);}
    if(xVel>0) {return !this.canGoRight(myTile);}
    if(yVel<0) {return !this.canGoUp(myTile);}
    if(yVel>0) {return !this.canGoDown(myTile);}
    return true;
};

Ghost.prototype.update = function (du) {
    this.targetTile = g_maze.PacTile;
    var myTile = this.tilePos();
    var theTile = g_maze.tiles[myTile[0]][myTile[1]];
    if (theTile!==2 && theTile!==3) this.chosen = false;
    if(g_maze.tiles[myTile[0]][myTile[1]]===2 || g_maze.tiles[myTile[0]][myTile[1]]===3) {
        this.move(this.targetTile, myTile);
    }
    else if(this.isNextTileWall(myTile) && this.endOfTile(myTile) && !this.cosen)
    {
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
    this.wrapPosition();
    this.cx += this.velX*du;
    this.cy += this.velY*du;

};

Ghost.prototype.render = function () {
    var oldstyle = ctx.fillStyle;
    if(this.name==="Blinky") {
        ctx.fillStyle = "red";
        util.fillCircle(ctx, this.cx, this.cy, 10);
        //util.fillBox(ctx, this.targetTile[0]*16, this.targetTile[1]*16, 16, 16, "red");
    } 

    ctx.fillStyle = oldstyle;
};