// Pause menu

var g_pausemenu;
var g_mainmenu;

function Menu(width, height) {

	this.menu_width = width;
	this.menu_height = height;

	this.menu_cx = (g_canvas.width-this.menu_width)/2;
	this.menu_cy = (g_canvas.height-this.menu_height-15)/2;

    this.b_continue = new Button(g_canvas.width/2, this.menu_cy+40, 
                            	 g_buttons[0].width, g_buttons[0].height, g_buttons[0]);

    //this.b_newgame = new Button(g_canvas.width/2, this.menu_cy+90, 150,30, g_buttons[0]);
    //this.b_quit = new Button(g_canvas.width/2, this.menu_cy+140, 150,30, g_buttons[0]);

}

//pauseMenu.prototype = new Entity();

Menu.prototype.canvas_fillcolor = 'rgba(0,0,0,0.5)';
Menu.prototype.menu_fillcolor = 'rgba(0,0,0,0.7)';
Menu.prototype.strokecolor = "#000BDD";
Menu.prototype.menu_radius = 20;
Menu.prototype.menu_linewidth = 4;

Menu.prototype.update = function() {

	this.b_continue.update();
	//this.b_newgame.update();
	//this.b_quit.update();
};

Menu.prototype.buttonpushed = function() {
	this.b_continue.toggleon();
};

Menu.prototype.buttonreleased = function() {
	this.b_continue.toggleoff();
};

Menu.prototype.render = function(ctx) {

	// This fillbox darkens the whole screen
	util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, this.canvas_fillcolor);

	// Draws a rounded menu rectangle
	util.roundedBox(ctx, this.menu_cx, this.menu_cy, this.menu_width, 
						 this.menu_height, this.menu_radius, 
						 this.menu_fillcolor, this.menu_linewidth, this.strokecolor);

	// Draw buttons
	this.b_continue.render(ctx);
	//this.b_newgame.render(ctx);
	//this.b_quit.render(ctx);
};
