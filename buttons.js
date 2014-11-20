// Button stuff

function Button(x, y, width, height, img, id) {
	this.cx = x;
	this.cy = y;

	this.buttonwidth = width;
	this.buttonheight = height;

	this.icon = img;

	this.centerX = this.cx-this.buttonwidth/2;
	this.centerY = this.cy-this.buttonheight/2;

	this.ID = id;
}



Button.prototype.buttoncolor = '#000BDD';

Button.prototype.update = function() {

	if (this.overButton()) this.buttoncolor = 'red';
	else this.buttoncolor = '#000BDD';
	
};

Button.prototype.toggleon = function() {
	if (this.overButton()) this.icon.scale = 0.95;
};

Button.prototype.toggleoff = function() {
	if (this.overButton()) { 
		if(this.ID===1) g_isGamePaused = false;
		if(this.ID===3) main.gameOver();
		this.icon.scale = 1;
	}
};

Button.prototype.overButton = function() {
	if(g_mouseX >= this.centerX && g_mouseX <= this.centerX+this.buttonwidth){
		if(g_mouseY >= this.centerY && g_mouseY <= this.centerY+this.buttonheight){
			return true;
		}
		else return false;
	}
	else return false;
};

Button.prototype.render = function(ctx) {
	
	util.fillBox(ctx, this.centerX, this.centerY, 
					  this.buttonwidth, this.buttonheight, 
					  this.buttoncolor);

	this.icon.drawCentredAt(ctx, this.cx, this.cy, 0);
	
};