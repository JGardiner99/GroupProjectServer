let font;

let stars = [];
let speed = 2;

var menuTheme;

var score = sessionStorage.getItem("scoreTotal");
var mode = sessionStorage.getItem("Difficulty");

var username;
var modeName;

function preload()
{
	menuTheme = loadSound("./Assets/Sounds/theme 1.mp3");
	Unmute = loadImage ("./Assets/Images/VolumeButton2.png");
	Mute = loadImage ("./Assets/Images/VolumeButton1.png");
	star = new Star();
}

function setup()
{
  document.body.style.overflow = 'hidden';
  createCanvas(windowWidth, windowHeight);
	
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

	let starsAmount = width / 2;

	for(let i = 0; i < starsAmount; i += 1)
	{
		stars[i] = new Star();
	}
	var inputWidth = width / 2 - 150;
	var inputWidth2 = (inputWidth);
	var inputHeight = height / 8 * 4.5;

	font = loadFont("./PressStart2P-Regular.ttf");

	if(mode == 1)
	{
		modeName = "EASY";
	}
	else if(mode == 2)
	{
		modeName = "MEDIUM";
	}
	else
	{
		modeName = "HARD";
	}
}

function menu()
{
	enterButton.html(window.location.href = "menu.html")
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

	textAlign(CENTER * 2, CENTER);
  textSize(width / 25);
	strokeWeight(height / 200);
	stroke('#C32020');
	fill('#6B84E8')
	textFont(font);
	text('YOUR SCORE IS ' + score, -width / 3 , -height / 3.2);
	text('DIFFICULTY WAS ' + modeName, -width / 2.3, -height/ 6);
	text('PLEASE INPUT YOUR NAME',  -width / 2.25 , -height / 50);

	enterButton = createButton("Back To Home");
	enterButton.position(-width / 400, height/ 8 * 5.75);
	enterButton.mousePressed(menu);
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

function Leaderboard()
{

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
