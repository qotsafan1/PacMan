// ===========
// Scary-stuff
// ===========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var g_blinky = new Ghost({
	cx : 224,
    cy : 232,
    scatterTile : [25,0],
    targetTile : [25,0],
    PacTile : [0,0],
    turns : 'left'
});

g_blinky.findTargetTile = function() {
	if (!g_scatterToggle) {
		return this.PacTile;
	}
	return this.scatterTile;
};

g_blinky.drawHealthyGhost = function(ctx) {
    g_blinkySprite[0].scale = 0.45;
    g_blinkySprite[0].drawWrappedCentredAt(ctx, this.cx, this.cy, 0);
    if(g_useUglyRedWall) 
    	util.fillBox(ctx, this.targetTile[0]*16, this.targetTile[1]*16, 16, 16, "red");
};

var g_pinky = new Ghost({
	cx : 224,
	cy : 280,
	scatterTile : [2,0],
	targetTile : [2,0],
	PacTurns : "right",
    turns : 'up'
});

g_pinky.findTargetTile = function() {
	if (!g_scatterToggle) {
		switch (this.PacTurns) {
			case 'up':
				return [g_blinky.PacTile[0],g_blinky.PacTile[1]-4];
				break;
			case "left":
				return [g_blinky.PacTile[0]-4,g_blinky.PacTile[1]];
				break;
			case "down":
				return [g_blinky.PacTile[0],g_blinky.PacTile[1]+4];
				break;
			case "right":
				return [g_blinky.PacTile[0]+4,g_blinky.PacTile[1]];
				break;
		}
	}
	return this.scatterTile;
};

g_pinky.drawHealthyGhost = function(ctx) {
	g_pinkySprite[0].scale = 0.45;
    g_pinkySprite[0].drawWrappedCentredAt(ctx, this.cx, this.cy, 0);
	if(g_useUglyRedWall)
		util.fillBox(ctx, this.targetTile[0]*16, this.targetTile[1]*16, 16, 16, "pink");
};

var g_inky = new Ghost({
	cx : 184,
	cy : 280,
    scatterTile : [27,35],
    targetTile : [27,35],
    turns : 'up'
});

g_inky.findTargetTile = function() {
	if (!g_scatterToggle) {
		var tile = [0,0];
		switch (g_pinky.PacTurns) {
			case 'up':
				tile = [g_blinky.PacTile[0],g_blinky.PacTile[1]-2];
				break;
			case "left":
				tile = [g_blinky.PacTile[0]-2,g_blinky.PacTile[1]];
				break;
			case "down":
				tile = [g_blinky.PacTile[0],g_blinky.PacTile[1]+2];
				break;
			case "right":
				tile = [g_blinky.PacTile[0]+2,g_blinky.PacTile[1]];
				break;
		}
		var dist = [(g_blinky.currentTile[0]-tile[0])*2, (g_blinky.currentTile[1]-tile[1])*2];
		return [g_blinky.currentTile[0]-dist[0], g_blinky.currentTile[1]-dist[1]];
	}
	return this.scatterTile;
};

g_inky.drawHealthyGhost = function(ctx) {
	g_inkySprite[0].scale = 0.45;
    g_inkySprite[0].drawWrappedCentredAt(ctx, this.cx, this.cy, 0);
	if(g_useUglyRedWall)
		util.fillBox(ctx, this.targetTile[0]*16, this.targetTile[1]*16, 16, 16, '#00FFFF');
};

var g_clyde = new Ghost({
	cx : 264,
    cy : 280,
    scatterTile : [0,35],
    targetTile : [0,35],
    turns : 'up'
});

g_clyde.findTargetTile = function() {
	if(!g_scatterToggle) {
		var dist = util.square(this.currentTile[0]-g_blinky.PacTile[0])+ 
			util.square(this.currentTile[1]-g_blinky.PacTile[1]);
		if (Math.round(dist)>64) {return g_blinky.PacTile;}
		else {return this.scatterTile;}

	}
	return this.scatterTile;
};

g_clyde.drawHealthyGhost = function(ctx) {
	g_clydeSprite[0].scale = 0.45;
    g_clydeSprite[0].drawWrappedCentredAt(ctx, this.cx, this.cy, 0);
	if(g_useUglyRedWall)
		util.fillBox(ctx, this.targetTile[0]*16, this.targetTile[1]*16, 16, 16, '#DAA520');
};

g_clyde.fixYourFriends = function() {
    g_blinky.inCage = false;
    g_pinky.inCage = false;
    g_inky.velY = -g_ghostSpeed*g_speed;
    g_clyde.velY = -g_ghostSpeed*g_speed;
    g_blinky.velX = -g_ghostSpeed*g_speed;
    g_pinky.velY = -g_ghostSpeed*g_speed;
    g_blinky.rememberResets();
    g_pinky.rememberResets();
    g_inky.rememberResets();
    g_clyde.rememberResets();
};