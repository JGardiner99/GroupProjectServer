var menuTheme;
var gameFont;
var success;
var fail;

let stars = [];
let speed;

var score = 0;
var timeElapsed = 0;
var miss = 10;

let timer = 120;
var inter = 60;
var minutes = Math.floor(timer / inter);
var seconds = timer % inter;

var volumeButton;
var muteButton;
function preload()
{
	menuTheme = loadSound("./Assets/Sounds/theme 1.mp3");
  Unmute = loadImage("./Assets/Images/VolumeButton1.png");
  Mute = loadImage("./Assets/Images/VolumeButton2.png");
	 font = loadFont("./PressStart2P-Regular.ttf");

	star = new Star();
}

function setup()
{
	document.body.style.overflow = 'hidden';
	createCanvas(windowWidth, windowHeight);

	let starsAmount = width / 2;

	for(let i = 0; i < starsAmount; i += 1)
	{
		stars[i] = new Star();
	}

	menuTheme.loop();
	if(sessionStorage.getItem("volumeControl") == 0)
	{
		menuTheme.setVolume(0.1);
		Mute = loadImage ("./Assets/Images/VolumeButton1.png");
	}
	else
	{
		menuTheme.setVolume(0);
		Mute = loadImage ("./Assets/Images/VolumeButton2.png");
	}

	textSize(width / 12);
	textAlign(CENTER, CENTER);

	backButton = createButton("Back");
	backButton.position(0, height/1.2);
	backButton.mousePressed(previousPage);
}

function draw()
{
    background(0);

    textFont(font);
    translate(width/2, height/2);
    speed = map(timeElapsed * 50, 0, width, 2, 20);


			for(let i = 0; i < stars.length; i += 1)
			{
				stars[i].show();
				stars[i].update();
			}

    translate(-width/2, -height/2);

		image(Mute, width - 125, height - 125);
		Mute.resize(150, 150);

    fill(239, 222, 136);
    textSize(width/40);
    text('Welcome to ODDBALL!',width/2,height/10+100);
    textSize(height/60);
    text("Score: " + score, width/13+120, 30);
		text("Misses Left: " + miss, width/15+140, 80);
		text("Time remaining: " + miss + "s", width/1.2-140, 50);
		text('To play, simply click (or tap) the ball',width/2,height/4.7+100);
		text('as it moves around the arena.',width/2,height/4.2+100);
		text('Watch your lives, and try not to miss!',width/2,height/2.7+100);
		text('The game will end when the timer hits 0',width/2,height/2+100);
		text('or when you run out of lives.',width/2,height/1.8+100);

}
function previousPage(){
	backButton.html(window.location.href = "menu.html");
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
}
function mousePressed()
{
	clicked();
}

function clicked()
{
	if(mouseX > width - 125 && mouseY > height - 125)
		{
			if(sessionStorage.getItem("volumeControl") == 0)
			{
				menuTheme.setVolume(0);
				sessionStorage.setItem("volumeControl", 1);
				Mute = loadImage ("./Assets/Images/VolumeButton2.png");
			}
			else
			{
				menuTheme.setVolume(0.1);
				sessionStorage.setItem("volumeControl", 0);
				Mute = loadImage ("./Assets/Images/VolumeButton1.png");
			}
		}
			console.log(sessionStorage.getItem("volumeControl"));
}

//https://codepen.io/rndm/pen/ozZzry
