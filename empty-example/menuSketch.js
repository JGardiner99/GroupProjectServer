let font;

let stars = [];

var menuTheme;
var volumeButton;
var muteButton;

var isMuted = new Boolean(false);

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

  let starsAmount = width / 2;
  let speed = 30;

  for(let i = 0; i < starsAmount; i++)
  {
    stars[i] = new Star();
    stars[i].speed = speed;
  }

  image(Mute, 100, 100);

  menuTheme.setVolume(0.1);
  menuTheme.loop();

  font = loadFont("./Assets/PressStart2P-Regular.ttf");
  textFont(font);
  textSize(width / 9);
  textAlign(CENTER, CENTER);

  playButton = createButton("Press START to play");
  playButton.position(0, height/ 1.8);
  playButton.mousePressed(launchGame);

  tutorialButton = createButton("How to play");
  tutorialButton.position(0, height/1.57);
  tutorialButton.mousePressed(tutorial);

  creditsButton = createButton("Credits");
  creditsButton.position(0, height/1.4);
  creditsButton.mousePressed(credits);
}

function draw()
{
	background(0);

  translate(width / 2, height / 2);
  for(let i = 0; i < stars.length; i++)
  {
    stars[i].update();
    stars[i].show();
  }

  strokeWeight(height/90);
  stroke('#C32020');
  fill('#6B84E8');
  textFont(font);
  text('ODDBALL', 0, -height/8);
  translate(width / 2 - width / 2 , height / 2 - height / 2);

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

function clicked(){
	if(mouseX > width - 100 && mouseY > height - 100)
		{
			if(this.isMuted == false)
			{
				menuTheme.setVolume(0);
				Mute = loadImage ("./Assets/Images/VolumeButton1.png");
				console.log(this.isMuted);
		    this.isMuted = true;
        localStorage.setItem("isMutedValue", this.isMuted);
			}
			else
			{
				menuTheme.setVolume(0.1);
				Mute = loadImage ("./Assets/Images/VolumeButton2.png");
				console.log(this.isMuted);
				this.isMuted = false;
        localStorage.setItem("isMutedValue", this.isMuted);
			}
		}
}
