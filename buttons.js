// Button stuff

function Button(x, y, width, height, img) {
	this.cx = x;
	this.cy = y;

	this.buttonwidth = width;
	this.buttonheight = height;

	this.icon = img;

	this.centerX = this.cx-this.buttonwidth/2;
	this.centerY = this.cy-this.buttonheight/2;

	this.buttoncolor = '#000BDD';
}

Button.prototype.update = function() {

	if(g_mouseX >= this.centerX && g_mouseX <= this.centerX+this.buttonwidth){
		if(g_mouseY >= this.centerY && g_mouseY <= this.centerY+this.buttonheight){
			//g_buttons[0].scale = 1.2;
			this.buttoncolor = 'red';
			//console.log("hello");
		}
		else this.buttoncolor = '#000BDD';
	}
	else this.buttoncolor = '#000BDD';
	
};

Button.prototype.render = function(ctx) {
	
	util.fillBox(ctx, this.centerX, this.centerY, 
					  this.buttonwidth, this.buttonheight, 
					  this.buttoncolor);

	this.icon.drawCentredAt(ctx, this.cx, this.cy, 0);
	
};