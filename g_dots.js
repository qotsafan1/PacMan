// Dot stuff

array_cx = [];
array_cy = [];
for(var i=0; i<g_maze.tiles.length;i++) {
    for(var j=0; j<g_maze.tiles[i].length;j++) {
        if(g_maze.tiles[i][j] === 0 || g_maze.tiles[i][j] === 2 || g_maze.tiles[i][j] === 3) {
            array_cx.push(8+i*16);
            array_cy.push(8+j*16);
        }
    }
}

var g_dotsRender = function(ctx, cx, cy) {
	for(var i=0; i<array_cx.length;i++) {
		ctx.fillStyle = '#DAA520';
		util.fillCircle(ctx, array_cx[i], array_cy[i], 2);

	}
}

var g_dotsEaten = function() {
	for(var i=0; i<array_cx.length;i++){
        if(array_cx[i] > entityManager._pacMan[0].cx-entityManager._pacMan[0].getRadius() && array_cx[i] < entityManager._pacMan[0].cx+entityManager._pacMan[0].getRadius() && array_cy[i] > entityManager._pacMan[0].cy-entityManager._pacMan[0].getRadius() && array_cy[i] < entityManager._pacMan[0].cy+entityManager._pacMan[0].getRadius()) {
            array_cx.splice(i,1);
            array_cy.splice(i,1);

            g_point();
        }
    }
}

function Dot(descr) {
        this.setup(descr);
}

Dot.prototype = new Entity();

Dot.prototype.cx = 0;
Dot.prototype.cy = 0;

Dot.prototype.update = function(du) {
	//console.log(entityManager._pacMan[0])
	
	
};

Dot.prototype.render = function(ctx) {

	var oldstyle = ctx.fillStyle;
	ctx.fillStyle = '#DAA520';
	util.fillCircle(ctx, this.cx, this.cy, 2);
	ctx.fillStyle = oldstyle;
};