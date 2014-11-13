// Dot stuff

function Fruit(descr) {
        this.setup(descr);
}

Fruit.prototype = new Entity();

Fruit.prototype.cx = 0;
Fruit.prototype.cy = 0;

Fruit.prototype.update = function(du) {
	//console.log(entityManager._pacMan[0])
	
	
};

Fruit.prototype.render = function(ctx) {

	var oldstyle = ctx.fillStyle;
	ctx.fillStyle = '#DAA520';
	util.fillCircle(ctx, this.cx, this.cy, 6);
	ctx.fillStyle = oldstyle;
};