// Level stuff
var g_score = 0;
var g_lives = 3;
var g_speed = 2;
var g_ghostSpeed = 0.75;
var g_pacSpeed = 0.8;
var g_scaredGhostSpeed = 0.50;
var g_scaredPacSpeed = 0.9;
var g_inkyOut = 4;
var g_clydeOut = 8;

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

	//Render points
	this.levelsprite.drawAt(ctx, this.cx, this.cy);
	ctx.font = "20px Georgia";
	ctx.fillText(g_score, 0, 50);

	//Render Lives
	var width = 90;
	for(var i=0; i<g_lives;i++) {
		
		ctx.fillStyle = 'yellow';
		util.fillCircle(ctx, width, g_canvas.height - 20, 10);
		width-=30;
	}

	//console.log("buja");
	//ctx.drawImage("images/levelwalls.png", this.cx, this.cy);
};