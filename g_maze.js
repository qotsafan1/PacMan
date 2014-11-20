// ==========
// MAZE-STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var g_maze = {
    tiles :[[9,9,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9],
            [9,9,9,1,0,0,8,0,2,0,0,0,1,1,1,1,1,9,1,1,1,1,1,0,0,0,8,1,1,0,0,0,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,1,1,1,9,1,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,1,1,1,9,1,1,1,1,1,0,1,1,2,0,0,2,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,1,1,1,9,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,1,1,1,9,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,9,9],
            [9,9,9,1,2,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,1,1,1,1,1,1,9,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,1,1,1,1,1,1,15,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,2,0,0,0,1,1,9,9,9,4,9,9,4,9,9,2,1,1,2,0,0,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,9,1,1,1,1,1,9,1,1,0,1,1,0,1,1,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,9,1,12,12,12,1,9,1,1,0,1,1,0,1,1,0,1,1,0,1,9,9],
            [9,9,9,1,0,0,0,0,2,1,1,0,9,9,5,1,12,12,12,1,9,1,1,0,0,0,3,1,1,0,0,0,2,1,9,9],
            [9,9,9,1,1,1,1,1,0,1,1,1,1,1,13,1,10,10,10,1,9,1,1,1,1,1,9,1,1,1,1,1,0,1,9,9],
            [9,9,9,1,1,1,1,1,0,1,1,1,1,1,13,1,10,10,10,1,9,1,1,1,1,1,9,1,1,1,1,1,0,1,9,9],
            [9,9,9,1,0,0,0,0,2,1,1,0,9,9,5,1,12,12,12,1,9,1,1,0,0,0,3,1,1,0,0,0,2,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,9,1,12,12,12,1,9,1,1,0,1,1,0,1,1,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,9,1,1,1,1,1,9,1,1,0,1,1,0,1,1,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,2,0,0,0,1,1,9,9,9,4,9,9,4,9,9,2,1,1,2,0,0,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,1,1,1,1,1,1,9,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,1,1,1,1,1,1,9,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,9,9],
            [9,9,9,1,2,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,1,1,1,15,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,1,1,1,9,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,1,1,1,9,1,1,1,1,1,0,1,1,0,0,0,2,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,1,1,1,9,1,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,9,9],
            [9,9,9,1,0,0,8,0,2,0,0,0,1,1,1,1,1,9,1,1,1,1,1,0,0,0,8,1,1,0,0,0,0,1,9,9],
            [9,9,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9]],
    tHeight : 16,
    tWidth : 16,
    scaredTimer : 0,
    theManMoving : false,
    nextOut : 0,
    ghostScared : false,
    chaseScatter : [7,20,7,20,5,20,5,false],
    chaseScatterCounter : 0,
    dotCounter : 0
};

g_maze.resetMaze = function () {
    this.scaredTimer = 0;
    this.theManMoving = false;
    this.chaseScatterCounter = 0;
    this.dotCounter = 0;
};

g_maze.returnTilePos = function (cx, cy) {
    var xTile= Math.floor(cx/16);
    var yTile= Math.floor(cy/16);
    return [xTile,yTile];
};

g_maze.isThereWall = function (tx, ty) {
    return this.tiles[tx][ty];
};

g_maze.isGhostDecTile = function (num, e) {
    return (num===2 || num===3 || num===4 || num===5 || (e.isDeadNow && num===13));
};

g_maze.drawTile = function (ctx, x, y, style) {
    var oldStyle = ctx.strokeStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x*this.tWidth, y*this.tHeight, this.tWidth, this.tHeight);
    ctx.strokeStyle = oldStyle;
};

g_maze.cageLogic = function () {
    this.nextOut = 0;
    this.dotCounter++;
};

g_maze.update = function(du) {
    if (this.theManMoving) {
        if (g_blinky.scared || g_pinky.scared || g_inky.scared || g_clyde.scared) {
            if (this.scaredTimer>g_ghostFrightTime) { 
                this.scaredTimer=0;
                this.stopBeingScared();
                this.ghostScared = false;
            }
            else this.scaredTimer += du/SECS_TO_NOMINALS;
        }

        this.nextOut += du/SECS_TO_NOMINALS;
        if (g_inky.inCage && g_inky.endOfTile(g_inky.currentTile) && (this.nextOut>4 || 
                this.dotCounter===17)) {
            g_inky.goOut();
            this.dotCounter = 0;
        }
        else if (g_clyde.inCage && g_clyde.endOfTile(g_clyde.currentTile) && (this.nextOut>4 || 
                this.dotCounter===32)) {
            g_clyde.goOut();
            this.dotCounter = 0;
        }
        if (this.chaseScatter[0] && !this.ghostScared) {
            this.chaseScatterCounter += du/SECS_TO_NOMINALS;
            if(this.chaseScatterCounter>this.chaseScatter[0]) {
                this.chaseScatter.splice(0,1);
                this.chaseScatterCounter = 0;
                g_scatterToggle = !g_scatterToggle;
            }
        }
    }
    g_candy.update(du);
};

g_maze.render = function (ctx) {
    if (g_useUglyRedWall) {
        var styles = ["black", "red", "green", "yellow", "green", "yellow"];
        for (var i=0; i<this.tiles.length; ++i) {
            var row = this.tiles[i];
            for (var k=0; k<row.length; ++k) {
                if(row[k]>0 && row[k]<6) this.drawTile(ctx, i, k, styles[row[k]]);
            }
        }
    }

    g_dotsRender(ctx);
    g_candy.render(ctx);
};

//fixing tunnel that uses wrapparound
g_maze.fixMaze = function () {
    g_maze.tiles[-1]=[];
    g_maze.tiles[-2]=[];
    g_maze.tiles[-1][16]=1;
    g_maze.tiles[-1][17]=9;
    g_maze.tiles[-1][18]=1;
    g_maze.tiles[-2][16]=1;
    g_maze.tiles[-2][17]=9;
    g_maze.tiles[-2][18]=1;
    g_maze.tiles[28]=[];
    g_maze.tiles[29]=[];
    g_maze.tiles[28][16]=1;
    g_maze.tiles[28][17]=9;
    g_maze.tiles[28][18]=1;
    g_maze.tiles[29][16]=9;
    g_maze.tiles[29][17]=9;
    g_maze.tiles[29][18]=9;
};

g_maze.stopBeingScared = function() {
    g_blinky.scared = false;
    g_pinky.scared = false;
    g_inky.scared = false;
    g_clyde.scared = false;
};