// Startup screen

var g_startupscreen;

function startUpScreen(logo) {
	this.cx = g_canvas.width/2;
	this.cy = g_canvas.height/2;
	this.pacmanlogo = logo;

}

startUpScreen.prototype.timer = 1 * SECS_TO_NOMINALS;

startUpScreen.prototype.update = function(du) {
	this.timer -= du;
};

startUpScreen.prototype.render = function(ctx) {

	this.pacmanlogo.drawCentredAt(ctx, this.cx, this.cy, 0);
	
};