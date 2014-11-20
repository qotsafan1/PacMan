// Startup screen

var g_startupscreen;

function startUpScreen(descr) {
	this.setup(descr);
}

startUpScreen.prototype = new Entity();

startUpScreen.prototype.yvel = -4;

startUpScreen.prototype.logo_toppos = 180;

startUpScreen.prototype.timer = 3 * SECS_TO_NOMINALS;

startUpScreen.prototype.startgame = 1.5 * SECS_TO_NOMINALS;

startUpScreen.prototype.shift = 20;

startUpScreen.prototype.ON = true;
startUpScreen.prototype.KEY_ENTER = 13;

startUpScreen.prototype.canvas_transparency = 1;
startUpScreen.prototype.text_transparency = 1;

startUpScreen.prototype.canvas_fillcolor = 'rgba(0,0,0,1)';
startUpScreen.prototype.text_fillcolor = 'rgba(0,0,0,1)';

startUpScreen.prototype.pacwhite = "#DEDEDE";

startUpScreen.prototype.red = 222;
startUpScreen.prototype.green = 222;
startUpScreen.prototype.blue = 222;
startUpScreen.prototype.colorfadeinout = 'rgb(222,222,222)';
startUpScreen.prototype.fadedirection = false;

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

		this.entertextchange();
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

startUpScreen.prototype.entertextchange = function() {

	if(this.blue < 1  || this.blue > 222) this.fadedirection = !this.fadedirection;

	if(this.fadedirection) {
		this.blue += 10;
		this.green += 10;
	} 
	else if (!this.fadedirection) {
		this.blue -= 10;
		this.green -= 10;
	}
	
	this.colorfadeinout = 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
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
	util.drawPixelText(ctx, g_canvas.width/2, g_canvas.height/2, "press enter to start", 14, this.colorfadeinout);

	// Instructions
	this.introframe(ctx, 340, 300, 180);
	
	// Another fillbox darkens the whole screen to hide the text
	util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, this.text_fillcolor);

	// Draw pacman logo
	this.pacmanlogo.drawCentredAt(ctx, this.cx, this.cy, 0);	
};

startUpScreen.prototype.introframe = function(ctx, ypos, width, height) {

	util.roundedBox(ctx, (g_canvas.width-width)/2, ypos, width, height, 20, 'rgba(0,0,0,0.7)', 4, "#000BDD");
	util.drawPixelText(ctx, g_canvas.width/2, ypos+20+this.shift, "Instructions:", 16, this.pacwhite);
	util.drawPixelText(ctx, g_canvas.width/2, ypos+50+this.shift, "use arrow keys to move", 12, this.pacwhite);
	util.drawPixelText(ctx, g_canvas.width/2, ypos+70+this.shift, "press ESC to pause", 12, this.pacwhite);
	util.drawPixelText(ctx, g_canvas.width/2, ypos+90+this.shift, "sound ON/OFF with Z", 12, this.pacwhite);
	util.drawPixelText(ctx, g_canvas.width/2, ypos+120+this.shift, "10 PTS", 12, this.pacwhite);
	util.drawPixelText(ctx, g_canvas.width/2, ypos+140+this.shift, "50 PTS", 12, this.pacwhite);

	util.fillCircle(ctx, g_canvas.width/2-55, ypos+113+this.shift, 2);
	util.fillCircle(ctx, g_canvas.width/2-55, ypos+133+this.shift, 6);

}