var g_candy =  {
	level : 1,
	showTimer : 0,
	cx : g_canvas.width/2,
	cy : g_canvas.height/2+40,
	radius: 10,
	showTime  : false
};

g_candy.update = function(du) {
	if(g_dotCounter === 70 || g_dotCounter === 177){
		this.showTime = true;
		this.showTimer = 10;
	} 
	if(this.showTime) {
		this.showTimer -= du/SECS_TO_NOMINALS;
		if(this.showTimer < 0) this.showTime = false;
	}
	if((entityManager._pacMan[0].cx > this.cx-this.radius && entityManager._pacMan[0].cx < this.cx+this.radius) && (entityManager._pacMan[0].cy > this.cy-this.radius && entityManager._pacMan[0].cy < this.cy +this.radius) && this.showTime===true) {
		this.showTime = false;
		g_candyPoints();
	}
}

g_candy.render = function(ctx) {
	 switch (this.level) {
        case 1:
            ctx.fillStyle = 'red';
			util.fillCircle(ctx, g_canvas.width-50,g_canvas.height-20, this.radius);
			if(this.showTime) {
	 			util.fillCircle(ctx, this.cx,this.cy, this.radius);
	 		}
            break;
        case 2:
            ctx.fillStyle = 'blue';
			util.fillCircle(ctx, g_canvas.width-50,g_canvas.height-20, this.radius);
			if(this.showTime) {
	 			util.fillCircle(ctx, this.cx,this.cy, this.radius);
	 		}
            break;
        case 3:
        	ctx.fillStyle = 'green';
			util.fillCircle(ctx, g_canvas.width-50,g_canvas.height-20, this.radius);
			if(this.showTime) {
	 			util.fillCircle(ctx, this.cx,this.cy, this.radius);
	 		}
            break;
        case 4:
            ctx.fillStyle = 'yellow';
			util.fillCircle(ctx, g_canvas.width-50,g_canvas.height-20, this.radius);
            break;    
    }

}
