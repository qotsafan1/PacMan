// Level stuff
var g_score = 0;
var g_lives = 3;

g_newGame = function() {
	g_score = 0;
	g_lives = 3;
}

function Level() {
    this.cx = 0;
    this.cy = 0;
    this.levelsprite = this.levelsprite || g_levelimg[0];

    this.score = 0;
}

Level.prototype.update = function(du) {
	//console.log(g_lives);
};

g_point = function() {
	g_score++;
};

g_lossOfLife = function () {
	g_lives--;
}

Level.prototype.render = function(ctx) {

	this.levelsprite.drawAt(ctx, this.cx, this.cy);
	ctx.font = "20px Georgia";
	ctx.fillText(g_score, 0, 50);


	//console.log("buja");
	//ctx.drawImage("images/levelwalls.png", this.cx, this.cy);
};