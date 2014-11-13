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
    this._categories = [this._pacMan, this._level, this._dots, this._fruits, this._ghosts];
},

init: function() {

    this.makeLevel();

    this.generatePacMan(224,424);
    this._ghosts.push(g_blinky);
    this._ghosts.push(g_pinky);
    this._ghosts.push(g_inky);
    this._ghosts.push(g_clyde);
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

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

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
    }
    g_maze.update(du);
    
},

render: function(ctx) {

    var debugX = 10, debugY = 100;
    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(ctx);
            //debug.text(".", debugX + i * 10, debugY);

        }
        debugY += 10;
    }
}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

