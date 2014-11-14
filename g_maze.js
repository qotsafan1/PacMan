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
            [9,9,9,1,0,1,1,1,0,1,1,1,1,1,1,1,1,9,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,2,0,0,0,1,1,9,9,9,4,9,9,4,9,9,2,1,1,2,0,0,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,9,1,1,1,1,1,9,1,1,0,1,1,0,1,1,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,9,1,9,9,9,1,9,1,1,0,1,1,0,1,1,0,1,1,0,1,9,9],
            [9,9,9,1,0,0,0,0,2,1,1,0,9,9,5,1,9,9,9,1,9,1,1,0,0,0,3,1,1,0,0,0,2,1,9,9],
            [9,9,9,1,1,1,1,1,0,1,1,1,1,1,4,11,4,4,9,1,9,1,1,1,1,1,0,1,1,1,1,1,0,1,9,9],
            [9,9,9,1,1,1,1,1,0,1,1,1,1,1,4,11,4,4,9,1,9,1,1,1,1,1,0,1,1,1,1,1,0,1,9,9],
            [9,9,9,1,0,0,0,0,2,1,1,0,9,9,5,1,9,9,9,1,9,1,1,0,0,0,3,1,1,0,0,0,2,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,9,1,9,9,9,1,9,1,1,0,1,1,0,1,1,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,9,1,1,1,1,1,9,1,1,0,1,1,0,1,1,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,2,0,0,0,1,1,9,9,9,4,9,9,4,9,9,2,1,1,2,0,0,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,1,1,1,1,1,1,9,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,1,1,1,1,1,1,9,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,9,9],
            [9,9,9,1,2,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,1,1,1,9,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,1,1,1,9,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,1,1,1,9,1,1,1,1,1,0,1,1,0,0,0,2,1,1,0,1,9,9],
            [9,9,9,1,0,1,1,1,0,1,1,0,1,1,1,1,1,9,1,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,9,9],
            [9,9,9,1,0,0,8,0,2,0,0,0,1,1,1,1,1,9,1,1,1,1,1,0,0,0,8,1,1,0,0,0,0,1,9,9],
            [9,9,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9]],
    tHeight : 16,
    tWidth : 16,
    scaredTimer : 0,
    theManMoving : false,
    dots : [],
    fruits : []
};

g_maze.returnTilePos = function (cx, cy) {
    var xTile= Math.floor(cx/16);
    var yTile= Math.floor(cy/16);
    return [xTile,yTile];
};

g_maze.isThereWall = function (tx, ty) {
    return this.tiles[tx][ty];
};

g_maze.isGhostDecTile = function (num) {
    return (num===2 || num===3 || num===4 || num===5);
};

g_maze.drawTile = function (ctx, x, y, style) {
    var oldStyle = ctx.strokeStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x*this.tWidth, y*this.tHeight, this.tWidth, this.tHeight);
    ctx.strokeStyle = oldStyle;
};

g_maze.update = function(du) {
    if (g_blinky.scared || g_pinky.scared || g_inky.scared || g_clyde.scared) {
        if (this.scaredTimer>6) { 
            this.scaredTimer=0;
            this.stopBeingScared();
            return;
        }
        this.scaredTimer += du/SECS_TO_NOMINALS;
    }
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
    var oldstyle = ctx.fillStyle;
    ctx.fillStyle = '#DAA520';
    for (var i=0; i<this.dots.length; ++i) {
        var now = this.dots[i];
        if (this.tiles[now[0]][now[1]]===0 || this.tiles[now[0]][now[1]]===2 ||
            this.tiles[now[0]][now[1]]===3) util.fillCircle(ctx, now[0]*16+8, now[1]*16+8, 2);
        else this.dots.splice(i,1); 
    }
    for (var k=0; k<this.fruits.length; ++k) {
        var now = this.fruits[k];
        if (this.tiles[now[0]][now[1]]===8) util.fillCircle(ctx, now[0]*16+8, now[1]*16+8, 6);
        else this.fruits.splice(k,1);
    }
    ctx.fillStyle = oldstyle;
};

//fixing tunnel that uses wrapparound
g_maze.fixMaze = function () {
    g_maze.tiles[-1]=[];
    g_maze.tiles[-2]=[];
    g_maze.tiles[-1][16]=1;
    g_maze.tiles[-1][17]=0;
    g_maze.tiles[-1][18]=1;
    g_maze.tiles[-2][16]=1;
    g_maze.tiles[-2][17]=0;
    g_maze.tiles[-2][18]=1;
    g_maze.tiles[28]=[];
    g_maze.tiles[29]=[];
    g_maze.tiles[28][16]=1;
    g_maze.tiles[28][17]=0;
    g_maze.tiles[28][18]=1;
    g_maze.tiles[29][16]=0;
    g_maze.tiles[29][17]=0;
    g_maze.tiles[29][18]=0;
    for (var i = 0; i<this.tiles.length; ++i) {
        var x = this.tiles[i];
        for (var k = 0; k<x.length; ++k) {
            if (x[k]===0 || x[k]===2 || x[k]===3) {
                this.dots.push([i,k]);
            }
            else if(x[k]===8) {
                this.fruits.push([i,k]);
            }
        }
    }
};

g_maze.stopBeingScared = function() {
    g_blinky.scared = false;
    g_pinky.scared = false;
    g_inky.scared = false;
    g_clyde.scared = false;
};