// Pause menu

var g_pausemenu;

function pauseMenu() {

    this.menu_width = 300;
    this.menu_height = 180;

    this.menu_cx = (g_canvas.width-this.menu_width)/2;
    this.menu_cy = (g_canvas.height-this.menu_height-15)/2;

    this.menu_radius = 20;
    this.menu_linewidth = 4;

    this.canvas_fillcolor = 'rgba(0,0,0,0.4';
    this.menu_fillcolor = 'rgba(0,0,0,0.7)';
    this.strokecolor = '#000BDD';

    this.b_continue = new Button(g_canvas.width/2, this.menu_cy+40, 201, 30, g_buttons[0]);

    this.b_newgame = new Button(g_canvas.width/2, this.menu_cy+90, 150,30, g_buttons[0]);
    this.b_quit = new Button(g_canvas.width/2, this.menu_cy+140, 150,30, g_buttons[0]);

}

pauseMenu.prototype.update = function() {

	this.b_continue.update();
	this.b_newgame.update();
	this.b_quit.update();
};

pauseMenu.prototype.watch = function() {

};

pauseMenu.prototype.render = function(ctx) {

	util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, this.canvas_fillcolor);
	util.roundedBox(ctx, this.menu_cx, this.menu_cy, this.menu_width, 
						 this.menu_height, this.menu_radius, 
						 this.menu_fillcolor, this.menu_linewidth, this.strokecolor);

	this.b_continue.render(ctx);
	//this.b_newgame.render(ctx);
	//this.b_quit.render(ctx);
};
