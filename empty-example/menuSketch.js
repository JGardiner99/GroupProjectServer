let font;

let stars = [];
let speed = 2;

var menuTheme;

var volumeButton;
var muteButton;
var volumeControl;

function preload()
{
	menuTheme = loadSound("./Assets/Sounds/theme 1.mp3");
	Unmute = loadImage ("./Assets/Images/VolumeButton2.png");
	Mute = loadImage ("./Assets/Images/VolumeButton1.png");
  font = loadFont('PressStart2P-Regular.ttf');
	star = new Star();
}

function setup()
{
  document.body.style.overflow = 'hidden';
  createCanvas(windowWidth, windowHeight);
	sessionStorage.setItem("volumeControl", 0)
	menuTheme.setVolume(0.1);
	menuTheme.loop();

	let starsAmount = width / 2;

	for(let i = 0; i < starsAmount; i += 1)
	{
		stars[i] = new Star();
	}

	createCanvas(windowWidth, windowHeight);
	document.body.style.overflow = 'hidden';

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
	if(mouseX > width - 125 && mouseY > height - 125)
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
}
