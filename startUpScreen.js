// Startup screen

var g_startupscreen;

function startUpScreen(descr) {
	this.setup(descr);
}

startUpScreen.prototype = new Entity();

startUpScreen.prototype.timer = 1 * SECS_TO_NOMINALS;

startUpScreen.prototype.update = function(du) {
	this.timer -= du;
};

startUpScreen.prototype.render = function(ctx) {
	this.pacmanlogo.drawCentredAt(ctx, this.cx, this.cy, 0);	
};