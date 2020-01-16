//createing variabls
let font;

let stars = [];
let speed = 2;

var menuTheme;

var volumeButton;
var muteButton;
var volumeControl;

function preload()
{
	//setting file paths to variables
	menuTheme = loadSound("./Assets/Sounds/theme 1.mp3");
	Unmute = loadImage ("./Assets/Images/VolumeButton2.png");
	Mute = loadImage ("./Assets/Images/VolumeButton1.png");
  font = loadFont('PressStart2P-Regular.ttf');

	star = new Star();
}

function setup()
{
	//hides the scroll bar
	document.body.style.overflow = 'hidden';
  createCanvas(windowWidth, windowHeight);

	let starsAmount = width / 2;

	//calculation for the amount of stars for screen
	for(let i = 0; i < starsAmount; i += 1)
	{
		stars[i] = new Star();
	}

	//call the audio track needed then looping it
	menuTheme.loop();
	//checks to see the value in the sessionStorage if its equal to 0 or if its null then have the audio play
	//else mute audio and switch icon
	if(sessionStorage.getItem("volumeControl") == 0 || sessionStorage == null)
	{
		menuTheme.setVolume(0.1);
		//stores variable to the sessionStorage within the browser
		sessionStorage.setItem("volumeControl", 0);
		Mute = loadImage ("./Assets/Images/VolumeButton1.png");
	}
	else
	{
		menuTheme.setVolume(0);
		sessionStorage.setItem("volumeControl", 1);
		Mute = loadImage ("./Assets/Images/VolumeButton2.png");
	}

	textFont(font);
	textSize(width / 12);
	textAlign(CENTER, CENTER);

	playButton = createButton("Press START to play");
	playButton.position(0, height/ 1.9);
	playButton.mousePressed(launchGame);

	tutorialButton = createButton("How to play")
	tutorialButton.position(0, height/1.6);
	tutorialButton.mousePressed(tutorial);

	creditsButton = createButton("Credits")
	creditsButton.position(0, height/1.4);
	creditsButton.mousePressed(credits);

}

function draw()
{
	background(0);
	translate(width/2, height/2);

	//used to draw each star on the screen. stars.length is the amount of stars that will be displayed.
	for(let i = 0; i < stars.length; i += 1)
	{
		stars[i].show();
		stars[i].update();
	}

	strokeWeight(height/90);
	stroke('#C32020');
	fill('#6B84E8');
	textFont(font);
	text('ODDBALL', 0, -height/8);
	translate(-width/2, -height/2);
	image(Mute, width - 125, height - 125);
  Mute.resize(150, 150);
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
}

function mousePressed()
{
	clicked();
}

function launchGame()
{
	playButton.html(window.location.href = "Mode.html");
}

function tutorial()
{
	tutorialButton.html(window.location.href = "tutorial.html");
}

function credits()
{
	creditsButton.html(window.location.href = "credits.html");
}

function clicked()
{
	//if the mouse is inside the chosen area then run the code (same as above)
	if(mouseX > width - 125 && mouseY > height - 125)
		{
			if(sessionStorage.getItem("volumeControl") == 0 || sessionStorage == null)
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
