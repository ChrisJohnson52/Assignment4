//Christian Johnson
//Assignment 4
//Bug Squish
var roach = [];
var count = 60;
var moving = 0;
var score = 0;
var alive = true;
var s = 0;
var timeRemaining;
var startTime = 30;
var gameState = 1; 
var animationSpeed = 4;
var previousScore = score;

function setup() 
{
	createCanvas(750, 500);
	imageMode(CENTER);
}

function preload()
{
	for(var i = 0; i < count; i++)
  {
		roach[i] = new Walker("RoachSprite.png", random(710) + 40, random(480) + 20, random([-1, +1]), alive);
	}
}

function clicked()
{
	if(mouseIsPressed){
		click = true;
	}
	else{
		click = false;
	}
	return false;
}

function draw()
{
	background(200);
	if(gameState == 1)
  {
		s = second();
		timeRemaining = 30 - abs(startTime - s);
		for(var i = 0; i < count; i++)
    {
			roach[i].draw();
			textSize(24);
		}
		text("Score: " + score, 30, 30);
		fill(255, 255, 255);
		text("Time Remaining: " + timeRemaining, 30, 60);
		if(timeRemaining == 0 || timeRemaining == 30)
    {
			gameState = 2;
		}
	}

	if(gameState == 2)
  {
		fill(255, 255, 255);
		textSize(40);
		text("Game Over", 250, 120);
		textSize(22);
		text("Roaches Squished: " + score, 255, 200);
		textSize(12);
		text("Refresh the page to play again.", 280, 400);
	}

	if(score == 60) 
  {
    gameState = 3; 
  }

	if(gameState == 3)
  {
		textSize(50);
		text("You Win!!!", 250, 120);
		textSize(22);
		text("Roaches Squished: " + score, 255, 200);
		textSize(12);
		text("Refresh the page to play again.", 280, 400);
	}
	clicked();
}

function Walker(imageName, x, y, moving, alive)
{
	this.spritesheet = loadImage(imageName);
	this.frame = 0;
	this.x = x;
	this.y = y;
	this.moving = moving;
	this.facing = moving;
	this.alive = alive
	this.draw = function() 
  {
		push();
		translate(this.x, this.y);
		if(this.facing < 0){
			scale(-1.0, 1.0);
		}
		if(this.alive == true)
    {
			if(this.moving == 0)
      {
				image(this.spritesheet, 0, 0, 80, 80, 0, 0, 80, 80);
			}
			else
      {
				if(this.frame == 0)
        {
					image(this.spritesheet, 0, 0, 80, 80, 0, 0, 80, 80);
				}
				if(this.frame == 1)
        {
					image(this.spritesheet, 0, 0, 80, 80, 80, 0, 80, 80);
				}
				if(this.frame == 2)
        {
					image(this.spritesheet, 0, 0, 80, 80, 160, 0, 80, 80);
				}
				if(this.frame == 3)
        {
					image(this.spritesheet, 0, 0, 80, 80, 240, 0, 80, 80);
				}
				if(this.frame == 4)
        {
					image(this.spritesheet, 0, 0, 80, 80, 320, 0, 80, 80);
				}
				if(this.frame == 5)
        {
					image(this.spritesheet, 0, 0, 80, 80, 400, 0, 80, 80);
				}

				if(score >= 0 && score < 10)
        {
					animationSpeed = 3;
				}
				if(score >= 10 && score <= 25)
        {
					animationSpeed = 1;
				}
				if(score > 25 && score < 50)
        {
					animationSpeed = .5;
				}
				if(score >= 50)
        {
					animationSpeed = .25;
				}

				if(frameCount % animationSpeed == 0)
        {
					this.frame = (this.frame + 1) % 5;
					this.x = this.x + 6 * this.moving;
					if(this.x < 40 || this.x > width - 40)
          {
						this.moving = -this.moving
						this.facing = -this.facing
					}
				}
			}
		}
		else
    {
			image(this.spritesheet, 0, 0, 80, 80, 480, 0, 80, 80);
		}
		pop();
	}

	this.stop = function()
  {
		this.moving = 0;
		this.frame = 3;
	}

	this.go = function(direction)
  {
		this.moving = direction;
		this.facing = direction;
	}

	this.squish = function(x, y)
  {
		if(this.x -40 < x && x < this.x + 40 &&
	 		this.y -40 < y && y < this.y + 40 ){
			this.moving = 0;
			this.mouseX = x;
			this.mouseY = y;
			this.initialX = this.x;
			this.initialY = this.y;
			if(this.alive == true)
      {
				score++;
			}
			this.alive = false;
		}
	}
}

function mousePressed()
{
	for(var i = 0; i < count; i++)
  {
		roach[i].squish(mouseX, mouseY);
	}
}
