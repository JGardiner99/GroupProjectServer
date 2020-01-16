//createing variabls
var theme;
var gameFont;
var success;
var fail;
var volumeButtonUnmute;
var volumeButtonMute;
var showImage;

let stars = [];
let speed = 2;

var score = 0;
var timeElapsed = 0;
var miss = 15;

//gets the stored session data and stores to variable
var mode = sessionStorage.getItem("Difficulty");

let timer;
//checks to see what variables should be used.
if(mode == 1)
{
	miss = 20;
	timer = 120;
}
else if(mode == 2)
{
	miss = 15;
	timer = 90;
}
else
{
	miss = 10;
	timer = 60;
}

//variables used for the timer
var inter = 60;
var minutes = Math.floor(timer / inter);
var seconds = timer % inter;



function preload()
{
	  	//setting file paths to variables
	theme = loadSound("./Assets/Sounds/thememain.mp3");
	gameFont = loadFont("./PressStart2P-Regular.ttf");
	success = loadSound("./Assets/Sounds/clicksuccess.mp3");
	fail = loadSound("./Assets/Sounds/clickfail.mp3");
	volumeImage = loadImage("./Assets/Images/volumeButton1.png");

	star = new Star();
}

function setup()
{
	  	//hides the scroll bar
	document.body.style.overflow = 'hidden';
	createCanvas(windowWidth, windowHeight);

	let timer;

	let starsAmount = width / 2;

	//calculation for the amount of stars for screen
	for(let i = 0; i < starsAmount; i += 1)
	{
		stars[i] = new Star();
	}
  	//call the audio track needed then looping it
	theme.loop();
	//checks to see the value in the sessionStorage if its equal to 0 then have the audio play
	//else mute audio and switch icon
	if(sessionStorage.getItem("volumeControl") == 0)
	{
		theme.setVolume(0.1);
		success.setVolume(0.5);
		fail.setVolume(0.75);
		Mute = loadImage ("./Assets/Images/VolumeButton1.png");
	}
	else
	{
		theme.setVolume(0);
		success.setVolume(0);
		fail.setVolume(0);
		Mute = loadImage ("./Assets/Images/VolumeButton2.png");
	}
	ball = new Ball();
}

function draw()
{
	background(0);

	textFont(gameFont);
	translate(width/2, height/2);
	speed = map(timeElapsed * 50, 0, width, 2, 20);

	//used to draw each star on the screen. stars.length is the amount of stars that will be displayed.
	for(let i = 0; i < stars.length; i++)
  {
    stars[i].update();
    stars[i].show();
  }

	translate(-width/2, -height/2);

	//if the value given to timer gets to 0 then run code
	if(timer == 0)
	{
		sessionStorage.setItem("scoreTotal", score);
		window.location.replace("gameOver.html");
	}

	//gets three functinos from the Ball class
	ball.update();
	ball.edges();
	ball.show();

		fill(239, 222, 136);
		textSize(20);
		stroke(0);
		strokeWeight(4);
		//display text
		text("Score: " + score, 10, 30);
		text("Misses Left: " + miss, 10, 60);

		//used to choose what message to display (used to make things tidy)
		if (seconds > 9)
		{
			text("Time Remaining: " + minutes + ":" + seconds, width -405, 30);
		}
		else
		{
			text("Time Remaining: " + minutes + ":0" + seconds, width -405, 30);
		}

			//used to calculate time. every 60 frames = 1 second
			if(frameCount % 60 == 0 && timer > 0)
			{
				timer--;
				minutes = Math.floor(timer / inter);
				seconds = timer % inter;

				//used later to calculate speed of stars
				timeElapsed += 1;
			}
			noStroke();

		image(Mute, width - 125, height - 125);
		Mute.resize(150, 150);

		if(mode == 1)
		{
			if(score >= 90)
			{
				ball.noiseMod();
			}
		}
		else if(mode == 2)
		{
				if(score >= 60)
				{
					ball.noiseMod();
				}
		}
		else
		{
			if(score >= 35)
			{
				ball.noiseMod();
			}
		}
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
}

function mousePressed()
{
	clicked();
	ball.clicked();
}

function clicked()
{
	  	//if the mouse is inside the chosen area then run the code (same as above)
	if(mouseX > width - 125 && mouseY > height - 125)
		{
			if(sessionStorage.getItem("volumeControl") == 0)
			{
				theme.setVolume(0);
				success.setVolume(0);
				fail.setVolume(0);
				sessionStorage.setItem("volumeControl", 1);
				Mute = loadImage ("./Assets/Images/VolumeButton2.png");
			}
			else
			{
				theme.setVolume(0.1);
				success.setVolume(0.5);
				fail.setVolume(0.75);
				sessionStorage.setItem("volumeControl", 0);
				Mute = loadImage ("./Assets/Images/VolumeButton1.png");
			}
		}

			console.log(sessionStorage.getItem("volumeControl"));
}


//ball class
class Ball
{
	constructor()
	{
		//start position x and y
		this.x = width/2;
		this.y = height/2;
		//speed of movement x and y
		this.xspeed = 0;
		this.yspeed = 0;
		this.xspeedbool = 0;
		this.yspeedbool = 0;

		//ball radius
		this.r = 75;

		//red green and blue colours
		this.fadeR, this.fadeB = 255;
		this.fadeG = 255;

		//used for the noise function
		this.xOff = 0.01;
		this.xIncrement = 0.01;
		this.reset();
	}

	//used to update the balls x and y position
	update()
	{
		this.x += this.xspeed;
		this.y += this.yspeed;
	}

	//resets the ball if needed
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

	//If the ball hits the side of the canvas then it will bounce off
	edges()
	{
		//if center of ball hits defined values then run code
		if (this.y < 15 || this.y < 14 || this.y > height)
		{
			//mulitply value by -1
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

	//draws ball and adds effects to it
	show()
	{
		if(mode == 1)
		{
			if(score >= 105)
			{
				stroke(255);

				if (score >= 120)
				{
					strokeWeight(1);

					if(score >= 135)
					{
						strokeWeight(0.1);
						if(score >= 150)
						{
							noStroke();
						}
					}
				}
			}
		}
		else if(mode == 2)
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
		}
		else
		{
			if(score >= 35)
			{
				stroke(255);

				if (score >= 40)
				{
					strokeWeight(1);

					if(score >= 45)
					{
						strokeWeight(0.1);
						if(score >= 50)
						{
							noStroke();
						}
					}
				}
			}
		}

		fill(this.fadeR, this.fadeG, this.fadeB);
		ellipse(this.x, this.y, this.r * 2);
	}

	//adds noice to the ball to create random size;
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
				if(mode == 1)
				{
				if(score => 0)
				{
					if(score >= 15)
					{
						this.xspeed = this.xspeed * 1.05;
						this.yspeed = this.yspeed * 1.05;
						this.r = random(70, 80);
						if(score >= 30)
						{
							this.fadeR = random(100, 150);
							this.fadeB = random(100, 150);
							this.fadeG = random(100, 150);
								if(score >= 45)
								{
									this.xspeed = this.xspeed * 1.05;
									this.yspeed = this.yspeed * 1.05;
									 this.r = random(60, 70);
									if(score >= 60)
									{
										this.fadeR = random(50, 100);
										this.fadeB = random(50, 100);
										this.fadeG = random(50, 100);
											if(score >= 75)
											{
												this.xspeed = this.xspeed * 1.05;
												this.yspeed = this.yspeed * 1.05;

												this.fadeR = random(10, 25);
												this.fadeB = random(10, 25);
												this.fadeG = random(10, 25);

												this.r = random(40, 50);
														if(score >= 105)
														{
															this.xspeed = this.xspeed * 1.05;
															this.yspeed = this.yspeed * 1.05;

															this.fadeR = random(50, 100);
															this.fadeB = random(50, 100);
															this.fadeG = random(50, 100);

															if(score >= 120)
															{
																this.fadeR = random(5, 15);
																this.fadeB = random(5, 15);
																this.fadeG = random(5, 15);

																if(score >= 135)
																{
																	this.xspeed = this.xspeed * 1.05;
																	this.yspeed = this.yspeed * 1.05;

																	this.fadeR = random(1, 10);
																	this.fadeB = random(1, 10);
																	this.fadeG = random(1, 10);

																	if(score >= 150)
																	{
																		this.fadeR = 7;
																		this.fadeB = 7;
																		this.fadeG = 7;
																		if(score >= 110)
																		{
																			this.xspeed = this.xspeed * 1.05;
																			this.yspeed = this.yspeed * 1.05;

																			this.fadeR = 5;
																			this.fadeB = 5;
																			this.fadeG = 5;
																			if(score >= 165)
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
				else if(mode == 2)
				{
					if(score => 0)
					{
						if(score >= 10)
						{
							this.xspeed = this.xspeed * 1.05;
							this.yspeed = this.yspeed * 1.05;
							this.r = random(70, 80);
							if(score >= 20)
							{
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

																this.fadeR = random(50, 100);
																this.fadeB = random(50, 100);
																this.fadeG = random(50, 100);

																if(score >= 70)
																{
																	this.fadeR = random(5, 15);
																	this.fadeB = random(5, 15);
																	this.fadeG = random(5, 15);

																	if(score >= 80)
																	{
																		this.xspeed = this.xspeed * 1.05;
																		this.yspeed = this.yspeed * 1.05;

																		this.fadeR = random(1, 10);
																		this.fadeB = random(1, 10);
																		this.fadeG = random(1, 10);

																		if(score >= 90)
																		{
																			this.fadeR = 7;
																			this.fadeB = 7;
																			this.fadeG = 7;
																			if(score >= 100)
																			{
																				this.xspeed = this.xspeed * 1.05;
																				this.yspeed = this.yspeed * 1.05;

																				this.fadeR = 5;
																				this.fadeB = 5;
																				this.fadeG = 5;
																				if(score >= 110)
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
				else
				{
					if(score => 0)
					{
						if(score >= 5)
						{
							this.xspeed = this.xspeed * 1.05;
							this.yspeed = this.yspeed * 1.05;
							this.r = random(70, 80);
							if(score >= 10)
							{
								this.fadeR = random(100, 150);
								this.fadeB = random(100, 150);
								this.fadeG = random(100, 150);
									if(score >= 15)
									{
										this.xspeed = this.xspeed * 1.05;
										this.yspeed = this.yspeed * 1.05;
										 this.r = random(60, 70);
										if(score >= 20)
										{
											this.fadeR = random(50, 100);
											this.fadeB = random(50, 100);
											this.fadeG = random(50, 100);
												if(score >= 25)
												{
													this.xspeed = this.xspeed * 1.05;
													this.yspeed = this.yspeed * 1.05;

													this.fadeR = random(10, 25);
													this.fadeB = random(10, 25);
													this.fadeG = random(10, 25);

													this.r = random(40, 50);
															if(score >= 35)
															{
																this.xspeed = this.xspeed * 1.05;
																this.yspeed = this.yspeed * 1.05;

																this.fadeR = random(50, 100);
																this.fadeB = random(50, 100);
																this.fadeG = random(50, 100);

																if(score >= 40)
																{
																	this.fadeR = random(5, 15);
																	this.fadeB = random(5, 15);
																	this.fadeG = random(5, 15);

																	if(score >= 40)
																	{
																		this.xspeed = this.xspeed * 1.05;
																		this.yspeed = this.yspeed * 1.05;

																		this.fadeR = random(1, 10);
																		this.fadeB = random(1, 10);
																		this.fadeG = random(1, 10);

																		if(score >= 45)
																		{
																			this.fadeR = 7;
																			this.fadeB = 7;
																			this.fadeG = 7;
																			if(score >= 50)
																			{
																				this.xspeed = this.xspeed * 1.05;
																				this.yspeed = this.yspeed * 1.05;

																				this.fadeR = 5;
																				this.fadeB = 5;
																				this.fadeG = 5;
																				if(score >= 55)
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
			else 	if(mouseX > width - 125 && mouseY > height - 125)
			{

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
					sessionStorage.setItem("scoreTotal", score);
					window.location.replace("gameOver.html");
				}
			}
		}
	}
}
//https://codepen.io/rndm/pen/ozZzry
