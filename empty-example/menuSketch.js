let font;

let stars = [];
let speed = 2;

var menuTheme;
var volumeButton;
var muteButton;
var isMuted = new Boolean(false);

function preload()
{
	menuTheme = loadSound("./Assets/Sounds/theme 1.wav");
	Unmute = loadImage ("./Assets/Images/VolumeButton2.png");
	Mute = loadImage ("./Assets/Images/VolumeButton1.png");
}


function setup()
{
    document.body.style.overflow = 'hidden';
    createCanvas(windowWidth, windowHeight);

	menuTheme.setVolume(0.1);
	menuTheme.loop();

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
			let sy = map(this.y / this.z, 0, 1, 0, height);
			let r = map(this.z, 0, width, 12, 0);
			ellipse(sx, sy, r, r);
		} // display

		this.update = function()
		{
			this.z -= speed;

			if(this.z < 1) {
				this.z = width;
				this.x = random(-width, width);
				this.y = random(-height, height);
			}
		} // update
	} // Star

	for(let i = 0; i < 600; i += 1)
	{
		stars[i] = new Star();
	}

	createCanvas(windowWidth, windowHeight);
	document.body.style.overflow = 'hidden';

  font = loadFont('PressStart2P-Regular.ttf');
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
		stars[i].display();
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

function clicked(){
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
