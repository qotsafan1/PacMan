// Level stuff

function Level() {
    this.cx = 0;
    this.cy = 0;
    this.levelsprite = this.levelsprite || g_levelimg[0];

    this.score = 0;
}

Level.prototype.update = function(du) {
	//console.log("hello");
};

Level.prototype.render = function(ctx) {

	this.levelsprite.drawAt(ctx, this.cx, this.cy);
	//console.log("buja");
	//ctx.drawImage("images/levelwalls.png", this.cx, this.cy);
};