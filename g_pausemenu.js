// Pause menu

var g_pausemenu;
var g_intromenu;

function pauseButtons(xpos, ypos) {

	var b_continue = new Button(xpos, ypos+40, g_buttons[0].width, g_buttons[0].height, g_buttons[0], 1);

	var b_newgame = new Button(xpos, ypos+90, g_buttons[1].width, g_buttons[1].height, g_buttons[1], 2);
    var b_quit = new Button(xpos, ypos+140, g_buttons[1].width, g_buttons[1].height, g_buttons[2], 3);

	var buttons = [b_continue, b_newgame,b_quit];

	return buttons;
}

function Menu(width, height, offset, type) {

	this.menu_width = width;
	this.menu_height = height;

	this.menu_cx = (g_canvas.width-this.menu_width)/2;
	this.menu_cy = (g_canvas.height-this.menu_height-offset)/2;

	this.menu_type = type;

	if(type === "pause") {
		this.buttons = pauseButtons(g_canvas.width/2, this.menu_cy);
	}
}

//pauseMenu.prototype = new Entity();

Menu.prototype.canvas_fillcolor = 'rgba(0,0,0,0.5)';
Menu.prototype.menu_fillcolor = 'rgba(0,0,0,0.7)';
Menu.prototype.strokecolor = "#000BDD";
Menu.prototype.menu_radius = 20;
Menu.prototype.menu_linewidth = 4;

Menu.prototype.ON = false;
Menu.prototype.KEY_ESC = 27;

Menu.prototype.update = function() {

	for (var i = 0; i < this.buttons.length; i++) {
		this.buttons[i].update();
	}
};

Menu.prototype.buttonpushed = function() {

	for (var i = 0; i < this.buttons.length; i++) {
		this.buttons[i].toggleon();
	}
};

Menu.prototype.buttonreleased = function() {

	for (var i = 0; i < this.buttons.length; i++) {
		this.buttons[i].toggleoff();
	}
	this.ON = false;
};

Menu.prototype.checkPause = function() {
    if (eatKey(this.KEY_ESC)) {
        this.ON = !this.ON;
    }
};

Menu.prototype.render = function(ctx) {

	// This fillbox darkens the whole screen
	if(this.menu_type === "pause") util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, this.canvas_fillcolor);

	// Draws a rounded menu rectangle
	util.roundedBox(ctx, this.menu_cx, this.menu_cy, this.menu_width, 
						 this.menu_height, this.menu_radius, 
						 this.menu_fillcolor, this.menu_linewidth, this.strokecolor);

	// Draw buttons if any
	if(this.buttons !== undefined){
		for (var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].render(ctx);
		}
	}
};
