// ====
// ROCK
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Maze(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

      
    // Default sprite and scale, if not otherwise specified
    //this.sprite = this.sprite || g_sprites.rock;
    //this.scale  = this.scale  || 1;

/*
    // Diagnostics to check inheritance stuff
    this._rockProperty = true;
    console.dir(this);
*/

};

Maze.prototype = new Entity();

Maze.prototype.update = function(du) {

};

Maze.prototype.render = function (ctx) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    ctx.moveTo(10,10);
    ctx.lineTo(390,10);
    //ctx.strokeStyle = "red";
    //ctx.stroke();
};
