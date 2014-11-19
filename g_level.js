// Level stuff
var g_score = 0;
var g_lives = 3;
var g_speed = 2;
var g_ghostSpeed = 0.75;
var g_pacSpeed = 0.8;
var g_scaredGhostSpeed = 0.50;
var g_scaredPacSpeed = 0.9;
var g_inkyOut = 4;
var g_clydeOut = 8;
var g_ghostFrightTime = 6;
var g_currentLevel = 1;
var g_dotCounter = 0;
var highscore = localStorage.getItem("highscore");

g_newGame = function() {
	g_score = 0;
	g_lives = 3;
}

function Level() {
    this.cx = 0;
    this.cy = 0;
    this.levelsprite = this.levelsprite || g_levelimg[0];

    this.score = 0;
}

Level.prototype.update = function(du) {
	//console.log(g_lives);
	if (array_cx.length === 0 && entityManager._fruits.length === 0) {
		nextLevel();
	}
	if(g_lives === 0){
		g_LostGame();
		g_score = 0;
		g_lives = 3;
		g_currentLevel = 0;
		nextLevel();
	}
};

g_point = function(num) {
	g_score+=num;
};

g_SmallPoints = function() {
	g_score+=10;
};

g_BigPoints = function() {
	g_score+=50;
};

g_lossOfLife = function () {
	g_lives--;
}

g_LostGame = function() {
	if(g_lives === 0 && g_score > highscore){
		(localStorage.setItem("highscore", g_score));
	} 
}

Level.prototype.render = function(ctx) {

	//Render points
	this.levelsprite.drawAt(ctx, this.cx, this.cy);
	ctx.font = "bold 20px arial";
	ctx.fillStyle = 'grey';
	ctx.fillText("1UP", 50, 20);
	ctx.fillText(g_score, 50, 40);
	if(g_score===0) ctx.fillText("  0", 50, 40);
	ctx.fillText("HIGH SCORE", 165, 20);
	if(highscore != null) ctx.fillText(highscore, 165, 40);

	//Render Lives
	var width = 90;
	for(var i=0; i<g_lives;i++) {
		g_animateSprites[i].scale = 0.45;
		g_animateSprites[i].drawWrappedCentredAt(ctx,width,g_canvas.height-20,0);
		//ctx.fillStyle = 'yellow';
		//util.fillCircle(ctx, width, g_canvas.height - 20, 10);
		width-=30;
	}

	//console.log("buja");
	//ctx.drawImage("images/levelwalls.png", this.cx, this.cy);
};

function nextLevel () {
	g_currentLevel++;
	newLevel(g_currentLevel);
	g_maze.resetMaze();
	g_dotCounter = 0;
	array_cx = [];
	array_cy = [];
	entityManager._pacMan[0].resetPacman();
	entityManager.generateFourFruits();
	g_scatterToggle = true;
	makeDots();
};

function newLevel (level) {
	if (level===1) {
		g_ghostSpeed = 0.75;
		g_pacSpeed = 0.8;
		g_scaredGhostSpeed = 0.50;
		g_scaredPacSpeed = 0.9;
		g_inkyOut = 4;
		g_clydeOut = 8;
		g_ghostFrigthTime = 6;
		g_maze.chaseScatter = [7,20,7,20,5,20,5,false];
		return; 
	}
	if (level>1 && level<5) {
		g_ghostSpeed = 0.85;
		g_pacSpeed = 0.9;
		g_scaredGhostSpeed = 0.55;
		g_scaredPacSpeed = 0.95;
		g_inkyOut = 4;
		g_clydeOut = 8;
		g_ghostFrigthTime = 4;
		g_maze.chaseScatter = [7,20,7,20,5,1033,1/60,false];
		return;
	}
	if (level>4 && level<21) {
		g_ghostSpeed = 0.95;
		g_pacSpeed = 1;
		g_scaredGhostSpeed = 0.6;
		g_scaredPacSpeed = 1;
		g_inkyOut = 4;
		g_clydeOut = 8;
		g_ghostFrigthTime = 2;
		g_maze.chaseScatter = [5,20,5,20,5,1037,1/60,false];
		return;
	}
	g_ghostSpeed = 0.95;
	g_pacSpeed = 0.9;
	g_scaredGhostSpeed = 0.55;
	g_scaredPacSpeed = 0.95;
	g_inkyOut = 4;
	g_clydeOut = 8;
	g_ghostFrigthTime = 0;
	g_maze.chaseScatter = [5,20,5,20,5,1037,1/60,false];
};