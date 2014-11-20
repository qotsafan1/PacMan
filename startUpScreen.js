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

startUpScreen.prototype.canvas_transparency = 1;
startUpScreen.prototype.text_transparency = 1;

startUpScreen.prototype.canvas_fillcolor = 'rgba(0,0,0,1)';
startUpScreen.prototype.text_fillcolor = 'rgba(0,0,0,1)';

startUpScreen.prototype.pacwhite = "#DEDEDE";

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

		if(this.canvas_transparency >= 0.8) {
			this.canvasrunfade();
		}

		if(this.text_transparency >= 0) {
			this.textrunfade();
		}

		if(!this.soundplayed) {
			if(g_audioOn) this.introSound.play();
			this.soundplayed = true;
		}
	}
};

startUpScreen.prototype.canvasrunfade = function() {
	this.canvas_transparency -= 0.01;
	this.canvas_fillcolor = 'rgba(0,0,0,' + this.canvas_transparency + ')';
};

startUpScreen.prototype.textrunfade = function() {
	this.text_transparency -= 0.5;
	this.text_fillcolor = 'rgba(0,0,0,' + this.text_transparency + ')';
};


startUpScreen.prototype.status = function() {
    if(eatKey(this.KEY_ENTER)) {
        this.ON = false;
        return false;
    }
    return true;
};

startUpScreen.prototype.render = function(ctx) {

	// This fillbox darkens the whole screen
	util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, this.canvas_fillcolor);

	// Draw "press enter to start"
	util.drawPixelText(ctx, g_canvas.width/2-137, g_canvas.height/2, "press enter to start", 14, this.pacwhite);

	// Instructions
	util.drawPixelText(ctx, g_canvas.width/2-110, g_canvas.height/2+60, "Instructions:", 16, this.pacwhite);
	util.drawPixelText(ctx, g_canvas.width/2-105, g_canvas.height/2+90, "use WASD to move", 12, this.pacwhite);
	util.drawPixelText(ctx, g_canvas.width/2-120, g_canvas.height/2+110, "sound ON/OFF with Z", 12, this.pacwhite);
	util.drawPixelText(ctx, g_canvas.width/2-25, g_canvas.height/2+150, "10 PTS", 12, this.pacwhite);
	util.drawPixelText(ctx, g_canvas.width/2-25, g_canvas.height/2+170, "50 PTS", 12, this.pacwhite);



	// Another fillbox darkens the whole screen to hide the text
	util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, this.text_fillcolor);

	// Draw pacman logo
	this.pacmanlogo.drawCentredAt(ctx, this.cx, this.cy, 0);	
};