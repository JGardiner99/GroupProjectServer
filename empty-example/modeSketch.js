let font;

let stars = [];
let speed = 2;

var menuTheme;
var volumeButton;
var muteButton;
var volumeControl = localStorage.getItem("volumeValue");
var isMuted = new Boolean(volumeControl);

var mode;

function preload()
{
  menuTheme = loadSound("./Assets/Sounds/theme 1.wav");
  Unmute = loadImage("./Assets/Images/VolumeButton1.png");
  Mute = loadImage("./Assets/Images/VolumeButton2.png");

  star = new Star();
}

function setup()
{
	document.body.style.overflow = 'hidden';
  createCanvas(windowWidth, windowHeight);

  menuTheme.setVolume(0.1);
	menuTheme.loop();

  for(let i = 0; i < 600; i += 1)
	{
		stars[i] = new Star();
	}

  font = loadFont("./PressStart2P-Regular.ttf");
  textFont(font);
  textSize(width / 15);
  textAlign(CENTER, CENTER);

  playButton = createButton("Easy");
  playButton.position(0, height/ 2.2);
  playButton.mousePressed(launchGame);

  tutorialButton = createButton("Medium");
  tutorialButton.position(0, height/2);
  tutorialButton.mousePressed(launchGame);

  creditsButton = createButton("Hard");
  creditsButton.position(0, height/1.8);
  creditsButton.mousePressed(launchGame);
}

function draw()
{
	background(0);
  translate(width / 2, height / 2);

	for(let i = 0; i < stars.length; i += 1)
	{
		stars[i].show();
		stars[i].update();
	}
  strokeWeight(height/90);
  stroke('#C32020');
  fill('#6B84E8');
  textFont(font);
  text('Difficulty', 0, -height/8);
  translate(-width/2, -height/2);
  image(Mute, width - 125, height - 125);
  Mute.resize(150, 150);
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
}

function launchGame()
{
	playButton.html(window.location.href = "index.html");
}

function clicked()
{
	if(mouseX > width - 125 && mouseY > height - 125)
		{
			if(this.isMuted == false)
			{
				menuTheme.setVolume(0);
				this.isMuted = true;
				console.log(this.isMuted);
        localStorage.setItem("volumeValue", this.isMuted);
				Mute = loadImage ("./Assets/Images/VolumeButton2.png");
			}
			else
			{
				menuTheme.setVolume(0.1);
				this.isMuted = false;
				console.log(this.isMuted);
        localStorage.setItem("volumeValue", this.isMuted);
				Mute = loadImage ("./Assets/Images/VolumeButton1.png");
			}
		}
}
