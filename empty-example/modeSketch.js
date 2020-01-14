let font;

let stars = [];
let speed = 2;

var menuTheme;
var volumeButton;
var muteButton;

var mode;
var volumeControl = localStorage.getItem("volumeValue");
var isMuted = new Boolean(volumeControl);
function preload()
{
  menuTheme = loadSound("./Assets/Sounds/theme 1.wav");
  Unmute = loadImage("./Assets/Images/VolumeButton1.png");
  Mute = loadImage("./Assets/Images/VolumeButton2.png");
  star = new Star();
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
	document.body.style.overflow = 'hidden';

  font = loadFont("./Assets/PressStart2P-Regular.ttf");
  textFont(font);
  textSize(width / 7);
  textAlign(CENTER, CENTER);

  playButton = createButton("Easy");
  playButton.position(0, height/ 2.35);
  playButton.mousePressed(launchGame);

  tutorialButton = createButton("Medium");
  tutorialButton.position(0, height/2);
  tutorialButton.mousePressed(launchGame);

  creditsButton = createButton("Hard");
  creditsButton.position(0, height/1.75);
  creditsButton.mousePressed(launchGame);

  console.log(volumeControl);
}

function draw()
{
	background(0);
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
}

function launchGame()
{
	playButton.html(window.location.href = "index.html");
}

function mousePressed()
{
  if(mouseX > width / 2)
    {
        mode = 1;
        localStorage.setItem("modeValue", mode);
        window.location.href = "index.html";
      }
      else
      {
        mode = 2;
        localStorage.setItem("modeValue", mode);
        window.location.href = "index.html";
      }
}
