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
    targetTile : [25,0]
});

g_blinky.findTargetTile = function() {
	return this.scatterTile;
};

g_blinky.render = function(ctx) {
	var oldstyle = ctx.fillStyle;
    ctx.fillStyle = "red";
    util.fillCircle(ctx, this.cx, this.cy, 10);
    if(g_useUglyRedWall) 
    	util.fillBox(ctx, this.targetTile[0]*16, this.targetTile[1]*16, 16, 16, "red");
    ctx.fillStyle = oldstyle;
};

var g_pinky = new Ghost({
	cx : 224,
	cy : 232,
	scatterTile : [2,0],
	targetTile : [2,0]
});

g_pinky.findTargetTile = function() {
	return this.scatterTile;
};

g_pinky.render = function(ctx) {
	var oldstyle = ctx.fillStyle;
	ctx.fillStyle = "pink";
	util.fillCircle(ctx, this.cx, this.cy, 10);
	if(g_useUglyRedWall)
		util.fillBox(ctx, this.targetTile[0]*16, this.targetTile[1]*16, 16, 16, "pink");
	ctx.fillStyle = oldstyle;
};

var g_inky = new Ghost({
	cx : 224,
    cy : 232,
    scatterTile : [27,35],
    targetTile : [27,35]
});

g_inky.findTargetTile = function() {
	return this.scatterTile;
};

g_inky.render = function(ctx) {
	var oldstyle = ctx.fillStyle;
	ctx.fillStyle = '#00FFFF';
	util.fillCircle(ctx, this.cx, this.cy, 10);
	if(g_useUglyRedWall)
		util.fillBox(ctx, this.targetTile[0]*16, this.targetTile[1]*16, 16, 16, '#00FFFF');
	ctx.fillStyle = oldstyle;
};

var g_clyde = new Ghost({
	cx : 224,
    cy : 232,
    scatterTile : [0,35],
    targetTile : [0,35]
});

g_clyde.findTargetTile = function() {
	return this.scatterTile;
};

g_clyde.render = function(ctx) {
	var oldstyle = ctx.fillStyle;
	ctx.fillStyle = '#DAA520';
	util.fillCircle(ctx, this.cx, this.cy, 10);
	if(g_useUglyRedWall)
		util.fillBox(ctx, this.targetTile[0]*16, this.targetTile[1]*16, 16, 16, '#DAA520');
	ctx.fillStyle = oldstyle;
};