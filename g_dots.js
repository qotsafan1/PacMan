// Dot stuff

function Dot(descr) {
        this.setup(descr);
}

Dot.prototype = new Entity();

Dot.prototype.cx = 0;
Dot.prototype.cy = 0;

Dot.prototype.update = function(du) {
	//console.log("hello");
};

Dot.prototype.render = function(ctx) {

	var oldstyle = ctx.fillStyle;
	ctx.fillStyle = '#DAA520';
	util.fillCircle(ctx, this.cx, this.cy, 1);
	ctx.fillStyle = oldstyle;
};