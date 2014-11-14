// Dot stuff

function Dot(descr) {
        this.setup(descr);
}

//Dot.prototype = new Entity();
Dot.prototype.setup = function (descr) {

    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }
};

Dot.prototype.cx = 0;
Dot.prototype.cy = 0;

Dot.prototype.update = function(du) {
	//console.log(entityManager._pacMan[0])
	
	
};

Dot.prototype.render = function(ctx) {
	ctx.fillStyle = '#DAA520';
	util.fillCircle(ctx, this.cx, this.cy, 2);
};