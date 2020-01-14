var theme;
var gameFont;
var success;
var fail;
var volumeButtonUnmute;
var volumeButtonMute;
var showImage;
let stars = [];
let speed;

var score = 0;
var timeElapsed = 0;
var miss = 15;

let timer = 120;
var inter = 60;
var minutes = Math.floor(timer / inter);
var seconds = timer % inter;

var mode = 0;

function preload()
{
	theme = loadSound("./Sounds/theme3.ogg");
	gameFont = loadFont("PressStart2P-Regular.ttf");
	success = loadSound("./Sounds/click success.wav");
	fail = loadSound("./Sounds/click fail.wav");
	volumeImage = loadImage("./Images/volumeButton1.png");
}

function setup()
{
	document.body.style.overflow = 'hidden';
	createCanvas(windowWidth, windowHeight);

	theme.setVolume(0.15);
	success.setVolume(0.5);
	fail.setVolume(0.75);
	theme.loop();

	function Star()
	{
		this.x = random(-width, width);
		this.y = random(-height, height);
		this.z = random(width);

		this.display = function()
		{

		noStroke();
		fill(255);
		let sx = map(this.x / this.z, 0, 1, 0, width/2);
		let sy = map(this.y / this.z, 0, 1, 0, height/2);
		let r = map(this.z, 0, width, 12, 0);
		ellipse(sx, sy, r, r);
		} // display

		this.update = function()
		{
			this.z -= speed;

			if(this.z < 1)
			{
				this.z = width;
				this.x = random(-width, width);
				this.y = random(-height, height);
			}
		} // update
	} // Star

	for(let i = 0; i < 500; i += 1)
	{
	stars[i] = new Star();
	}
	volumeImage.resize(100, 100);

	console.log("mode type: " + mode);

	ball = new Ball();
}

function draw()
{
	background(0);

	textFont(gameFont);
	translate(width/2, height/2);
	speed = map(timeElapsed * 50, 0, width, 2, 20);

	for(let i = 0; i < stars.length; i += 1)
	{
		stars[i].display();
		stars[i].update();
	}

	translate(-width/2, -height/2);


	if(timer == 0)
	{
		window.location.replace("gameOver.html");
	}

	ball.update();
	ball.edges();
	ball.show();

		fill(239, 222, 136);
		textSize(20);
		stroke(0);
		strokeWeight(4);
		text("Score: " + score, 10, 30);
		text("Misses Left: " + miss, 10, 60);

		if (seconds > 9)
		{
			text("Time Remaining: " + minutes + ":" + seconds, width -405, 30);
		}
		else
		{
			text("Time Remaining: " + minutes + ":0" + seconds, width -405, 30);
		}


			if(frameCount % 60 == 0 && timer > 0)
			{
				timer--;
				minutes = Math.floor(timer / inter);
				seconds = timer % inter;

				timeElapsed += 1;
			}
			noStroke();
		image(volumeImage, width - 100, height - 100);

		if(score >= 60)
		{
			ball.noiseMod();
		}
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
}

function mousePressed()
{
	ball.clicked();
}

//ball class
class Ball
{
	constructor()
	{
		this.x = width/2;
		this.y = height/2;
		this.xspeed = 0;
		this.yspeed = 0;
		this.xspeedbool = 0;
		this.yspeedbool = 0;
		this.r = 75;
		this.isMuted = new Boolean(false);

		this.fadeR, this.fadeB = 255;
		this.fadeG = 255;

		this.xOff = 0.01;
		this.xIncrement = 0.01;
		this.reset();
	}

	update()
	{
		this.x += this.xspeed;
		this.y += this.yspeed;
	}

	reset()
	{
		this.x = width/2;
		this.y = height/2;
		let angle = random(-PI/4, PI/4);
		this.xspeed = 5 * Math.cos(angle);
		this.yspeed = 5 * Math.sin(angle);

		if (random(1) < 0.5)
		{
			this.xspeed *= -1;
		}
	}

	edges()
	{
		if (this.y < 15 || this.y < 14 || this.y > height)
		{
			this.yspeed *= -1;
		}


		if(this.y > height - 15)
		{
			this.yspeed *= -1;
		}



		if (this.x < 15 || this.x < 14 || this.x > width)
		{
			this.xspeed *= -1;
		}



		if(this.x > width - 15)
		{
			this.xspeed *= -1;
		}
	}

	show()
	{
		if(score >= 70)
		{
			stroke(255);

			if (score >= 80)
			{
				strokeWeight(1);

				if(score >= 90)
				{
					strokeWeight(0.1);
					if(score >= 100)
					{
						noStroke();
					}
				}
			}
		}
		fill(this.fadeR, this.fadeG, this.fadeB);
		ellipse(this.x, this.y, this.r * 2);
	}

	noiseMod()
	{
		this.n = noise(this.xOff) * 100;

		this.r = this.n;

		this.xOff += this.xIncrement;
	}

	clicked()
	{
		//this variable "d" works out where the mouse and the ball is on the canvas
		let d = dist(mouseX, mouseY, this.x, this.y);
		//this if statement determiners if the users mouse is within the canvas
		//if they are outside of the canvas then any click wont be counted as a miss
		if (mouseX < width && mouseY < height)
		{
			//this if statement allows the system to see if the mouse is clicked within the radius of the ball
			if(d < this.r)
			{
				success.play();
				//this gives xspeed a random value 1 or 2
				this.fadeR = random(200, 255);
				this.fadeB = random(200, 255);
				this.fadeG = random(200, 255);

				this.xspeedbool = Math.floor(Math.random() * 2) + 1;
				if(this.xspeedbool == 1)
				{
					this.xspeed = random(-3, -10);
				}
				else
				{
					this.xspeed = random(3, 10);
				}
				//this gives yspeed a random value 1 or 2
				this.yspeedbool = Math.floor(Math.random() * 2) + 1;
				/*
				this if statement determines what number was assigned to yspeed
				in order to work out what speed to give the ball
				if y speed is equal to 1 then it gives the ball a negative speed its movement is flipped
				if its equal to anything else (2) then its assigned a positive value
				*/
				if(this.yspeedbool == 1)
				{
					this.yspeed = random(-3, -10);
				}
				else
				{
					this.yspeed = random(3, 10);
				}
				//this gets the score then adds one to it every time the ball is clicked
				score = score + 1;
				if(score => 0)
				{
					if(score >= 10)
					{
						this.xspeed = this.xspeed * 1.05;
						this.yspeed = this.yspeed * 1.05;
						this.r = random(70, 80);
						if(score >= 20)
						{
							this.xspeed = this.xspeed * 1.05;
							this.yspeed = this.yspeed * 1.05;

							this.fadeR = random(100, 150);
							this.fadeB = random(100, 150);
							this.fadeG = random(100, 150);
								if(score >= 30)
								{
									this.xspeed = this.xspeed * 1.05;
									this.yspeed = this.yspeed * 1.05;
									 this.r = random(60, 70);
									if(score >= 40)
									{
										this.xspeed = this.xspeed * 1.05;
										this.yspeed = this.yspeed * 1.05;

										this.fadeR = random(50, 100);
										this.fadeB = random(50, 100);
										this.fadeG = random(50, 100);
											if(score >= 50)
											{
												this.xspeed = this.xspeed * 1.05;
												this.yspeed = this.yspeed * 1.05;

												this.fadeR = random(10, 25);
												this.fadeB = random(10, 25);
												this.fadeG = random(10, 25);

												this.r = random(40, 50);
												if(score >= 60)
												{
													this.xspeed = this.xspeed * 1.05;
													this.yspeed = this.yspeed * 1.05;

														if(score >= 70)
														{
															this.xspeed = this.xspeed * 1.05;
															this.yspeed = this.yspeed * 1.05;

															this.fadeR = random(50, 100);
															this.fadeB = random(50, 100);
															this.fadeG = random(50, 100);

															if(score >= 80)
															{
																this.fadeR = random(5, 15);
																this.fadeB = random(5, 15);
																this.fadeG = random(5, 15);

																if(score >= 90)
																{
																	this.fadeR = random(1, 10);
																	this.fadeB = random(1, 10);
																	this.fadeG = random(1, 10);

																	if(score >= 100)
																	{
																		this.fadeR = 7;
																		this.fadeB = 7;
																		this.fadeG = 7;
																		if(score >= 110)
																		{
																			this.fadeR = 5;
																			this.fadeB = 5;
																			this.fadeG = 5;
																			if(score >= 120)
																			{
																				this.fadeR = 3;
																				this.fadeB = 3;
																				this.fadeG = 3;
																			}
																		}
																	}
																}
															}
														}
												}
											}
									}
								}
						}
					}
				}
			}
			else if(mouseX > width - 100 && mouseY > height - 100)
			{
				if(this.isMuted == false)
				{
					theme.setVolume(0);
					fail.setVolume(0);
					success.setVolume(0);
					this.isMuted = true;
					volumeImage = loadImage("./Images/volumeButton1.png");
					console.log(this.isMuted);
				}
				else
				{
					theme.setVolume(0.15);
					fail.setVolume(0.75);
					success.setVolume(0.5);
					this.isMuted = false;
					volumeImage = loadImage("./Images/volumeButton2.png");
					console.log(this.isMuted);
				}
			}
			else
			{
				fail.play();
				// this is the same as the score but it takes one from the counter
				miss = miss - 1;

				// when the miss counter hits 0 then run the code
				if(miss == 0)
				{
					//this is a redirect to a page
					window.location.replace("gameOver.html");
					background(0);
				}
			}
		}
	}
}
//https://codepen.io/rndm/pen/ozZzry
