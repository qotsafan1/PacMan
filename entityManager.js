/*

entityManager.js

We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA

_pacMan : [],
_level  : [],
_ghosts : [],
_dots   : [],
_fruits  : [],
_maze   : [],
pacRtime : 0,
levelRtime : 0,
ghostsRtime : 0,
dotsRtime : 0,
fruitsRtime : 0,
mazeRtime : 0,
pacUtime : 0,
levelUtime : 0,
ghostsUtime : 0,
dotsUtime : 0,
fruitsUtime : 0,
counter : 0,
mazeUtime : 0,


// "PRIVATE" METHODS

generatePacMan : function(cx, cy) {
    this._pacMan.push(new PacMan({
        cx : cx,
        cy : cy
    }));
},

generateGhost : function(descr) {
    this._ghosts.push(new Ghost(descr));
},

generateDot : function(cx, cy) {
    this._dots.push(new Dot({
        cx : cx,
        cy : cy
    }));
},

generateFruit : function(cx, cy) {
    this._fruits.push(new Fruit({
        cx : cx,
        cy : cy
    }));
},

makeLevel : function(){
    this._level.push(new Level());
},

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._pacMan, this._level, this._dots, this._fruits, this._ghosts, this._maze,];
},

init: function() {

    this.makeLevel();

    this.generatePacMan(224,424);
    this._ghosts.push(g_blinky);
    this._ghosts.push(g_pinky);
    this._ghosts.push(g_inky);
    this._ghosts.push(g_clyde);
    this._maze.push(g_maze);
    g_clyde.fixYourFriends();

    for(var i=0; i < g_maze.tiles.length; ++i) {
        for(var j=0; j < g_maze.tiles[i].length; ++j) {
            if(g_maze.tiles[i][j] === 0 || g_maze.tiles[i][j] === 2 || g_maze.tiles[i][j] === 3) {
                this.generateDot(8+i*16, 8+j*16);
            }
            if(g_maze.tiles[i][j] === 8) {
                this.generateFruit(8+i*16, 8+j*16);
            }

        }
    }
        

},

update: function(du) {
    var things = ['pacman', 'level', 'dots', 'fruits', 'ghosts', 'maze'];
    var arr = [];
    if(g_takingTime) this.counter+=du/SECS_TO_NOMINALS;
    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        var a = performance.now();

        while (i < aCategory.length) {

            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }

        var b = performance.now();
        if(g_takingTime) {
            if (things[c]==='pacman') {
                this.pacUtime += b-a;
            }
            if (things[c]==='level') {
                this.levelUtime += b-a;
            }
            if (things[c]==='dots') {
                this.dotsUtime += b-a;
            }
            if (things[c]==='fruits') {
                this.fruitsUtime += b-a;
            }
            if (things[c]==='ghosts') {
                this.ghostsUtime += b-a;
            }
            if (things[c]==='maze') {
                this.mazeUtime += b-a;
            }
        }
    }
    if(g_takingTime) {
        console.log("PacMan update time:  "+ (this.pacUtime/this.counter));
        console.log("Level update time:  "+ (this.levelUtime/this.counter));
        console.log("Dots update time:  "+ (this.dotsUtime/this.counter));
        console.log("Fruits update time:  "+ (this.fruitsUtime/this.counter));
        console.log("Ghosts update time:  "+ (this.ghostsUtime/this.counter));
        console.log("Maze update time:  "+ (this.mazeUtime/this.counter));
        console.log('');
    }
    //g_maze.update(du);
    
},

render: function(ctx) {
    var things = ['pacman', 'level', 'dots', 'fruits', 'ghosts', 'maze'];
    var arr = [];

    var debugX = 10, debugY = 100;
    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        var a = performance.now();

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(ctx);
            //debug.text(".", debugX + i * 10, debugY);

        }
        debugY += 10;

        var b = performance.now();
        if(g_takingTime) {
            if (things[c]==='pacman') {
                this.pacRtime += b-a;
            }
            if (things[c]==='level') {
                this.levelRtime += b-a;
            }
            if (things[c]==='dots') {
                this.dotsRtime += b-a;
            }
            if (things[c]==='fruits') {
                this.fruitsRtime += b-a;
            }
            if (things[c]==='ghosts') {
                this.ghostsRtime += b-a;
            }
            if (things[c]==='maze') {
                this.mazeRtime += b-a;
            }
        }
    }
    if(g_takingTime) {
        console.log("PacMan render time:  "+ (this.pacRtime/this.counter));
        console.log("Level render time:  "+ (this.levelRtime/this.counter));
        console.log("Dots render time:  "+ (this.dotsRtime/this.counter));
        console.log("Fruits render time:  "+ (this.fruitsRtime/this.counter));
        console.log("Ghosts render time:  "+ (this.ghostsRtime/this.counter));
        console.log("Maze render time:  "+ (this.mazeRtime/this.counter));
        console.log('');
    }
}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

