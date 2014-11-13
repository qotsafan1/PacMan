/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {

    // TODO: YOUR STUFF HERE!
    this._nextSpatialID += 1;
    return this._nextSpatialID;

},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();
    
    // TODO: YOUR STUFF HERE!
   var inEntities = this._entities.indexOf(entity);
    if (inEntities !== -1) {
        this._entities[inEntities] = entity;
    }
    else {
        this._entities.push(entity);
    } 
},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();
    // TODO: YOUR STUFF HERE!
    for (var i = 0; i < this._entities.length; i++) {
        if(this._entities[i]._isDeadNow) {
            this._entities[i]= false;
        }
    };
},

findEntityInRange: function(posX, posY, radius) {

    // TODO: YOUR STUFF HERE!
        var entity = this._entities;
    for(var i=0; i<entity.length; i++){
        var wrapDis = util.wrappedDistSq(entity[i].getPos().posX, entity[i].getPos().posY, posX, posY, g_canvas.width, g_canvas.height);
        var dis = entity[i].getRadius() + radius;

        if (wrapDis < Math.pow(dis,2)) {
            if((posX !== entity[i].cx) && (posY !== entity[i].cy)){
                return entity[i];
            }
        }
    }

},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";

    for (var ID in this._entities) {
        var e = this._entities[ID];
        util.strokeCircle(ctx, e.cx, e.cy, e.getRadius());
    }
    ctx.strokeStyle = oldStyle;
}

}
