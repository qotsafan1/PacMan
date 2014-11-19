// Startup screen

var g_startupscreen;

function startUpScreen(descr) {
	this.setup(descr);
}

startUpScreen.prototype = new Entity();

startUpScreen.prototype.yvel = -4;

startUpScreen.prototype.logo_toppos = 130;

startUpScreen.prototype.timer = 3 * SECS_TO_NOMINALS;

startUpScreen.prototype.startgame = 1.5 * SECS_TO_NOMINALS;

startUpScreen.prototype.ON = true;
startUpScreen.prototype.KEY_ENTER = 13;

startUpScreen.prototype.transparency = 1;

startUpScreen.prototype.canvas_fillcolor = 'rgba(0,0,0,1)';

startUpScreen.prototype.introSound = new Audio("sounds/pacman_beginning.wav");
startUpScreen.prototype.soundplayed = false;

startUpScreen.prototype.update = function(du) {

	if(this.timer >= 0){
		this.timer -= du;
	}

	if(this.timer <= this.startgame) {

		if(this.cy >= this.logo_toppos){

			this.cy += this.yvel * du;
		}

		if(this.transparency >= 0.8) {
			this.runfade();
		}

		if(!this.soundplayed) {
			//this.introSound.play();
			this.soundplayed = true;
		}
	}
};

startUpScreen.prototype.runfade = function() {
	this.transparency -= 0.01;
	this.canvas_fillcolor = 'rgba(0,0,0,' + this.transparency + ')';
}


startUpScreen.prototype.status = function() {
    if(eatKey(this.KEY_ENTER)) {
        this.ON = false;
        return false;
    }
    return true;
}

startUpScreen.prototype.render = function(ctx) {

	// This fillbox darkens the whole screen
	util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, this.canvas_fillcolor);

	ctx.fillText("press enter to start", g_canvas.width/2-80, g_canvas.height/2);

	this.pacmanlogo.drawCentredAt(ctx, this.cx, this.cy, 0);	
};