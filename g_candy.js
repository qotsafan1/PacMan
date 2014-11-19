var g_candy =  {
	showTimer : 0,
	cx : g_canvas.width/2,
	cy : g_canvas.height/2+40,
	radius: 10,
	showTime  : false,
	scale : 0.8
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
	 switch (g_currentLevel) {
        case 1:
			g_candySprite[0].scale = this.scale;
			g_candySprite[0].drawWrappedCentredAt(ctx,g_canvas.width-50,g_canvas.height-20,0);
			if(this.showTime) {
	 			g_candySprite[0].drawWrappedCentredAt(ctx,this.cx,this.cy,0);
	 		}
            break;
        case 2:
			g_candySprite[1].scale = this.scale;
			g_candySprite[1].drawWrappedCentredAt(ctx,g_canvas.width-50,g_canvas.height-20,0);
			if(this.showTime) {
	 			g_candySprite[1].drawWrappedCentredAt(ctx,this.cx,this.cy,0);
	 		}
            break;
        case 3:
			g_candySprite[2].scale = this.scale;
			g_candySprite[2].drawWrappedCentredAt(ctx,g_canvas.width-50,g_canvas.height-20,0);
			if(this.showTime) {
	 			g_candySprite[2].drawWrappedCentredAt(ctx,this.cx,this.cy,0);
	 		}
            break;
        case 4:
			g_candySprite[3].scale = this.scale;
			g_candySprite[3].drawWrappedCentredAt(ctx,g_canvas.width-50,g_canvas.height-20,0);
            break;    
    }

}
