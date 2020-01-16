let font;

let stars = [];
let speed = 2;

var menuTheme;
var volumeButton;
var muteButton;

var easyClicked = false;
var midClicked = false;
var hardClicked = false;

var mode;

function preload()
{
  menuTheme = loadSound("./Assets/Sounds/theme 1.mp3");
  Unmute = loadImage("./Assets/Images/VolumeButton1.png");
  Mute = loadImage("./Assets/Images/VolumeButton2.png");

  star = new Star();
}

function setup()
{
	document.body.style.overflow = 'hidden';
  createCanvas(windowWidth, windowHeight);

  for(let i = 0; i < 600; i += 1)
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


  font = loadFont("./PressStart2P-Regular.ttf");
  textFont(font);
  textSize(width / 15);
  textAlign(CENTER, CENTER);

  easyButton = createButton("Easy");
  easyButton.position(0, height/ 2);
  easyButton.mousePressed(easyButtonClicked);

  midButton = createButton("Medium");
  midButton.position(0, height/1.75);
  midButton.mousePressed(midButtonClicked);

  hardButton = createButton("Hard");
  hardButton.position(0, height/1.55);
  hardButton.mousePressed(hardButtonClicked);

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

function easyButtonClicked()
{
    easyClicked = true;
    midClicked = false;
    hardClicked = false;

    if(easyClicked == true)
    {
      sessionStorage.setItem("Difficulty", 1);
      easyButton.html(window.location.href = "index.html");
    }
    else
    {
      console.log("Error");
    }
}

function midButtonClicked()
{
  easyClicked = false;
  midClicked = true;
  hardClicked = false;

  if(midClicked == true)
  {
    sessionStorage.setItem("Difficulty", 2);
    midButton.html(window.location.href = "index.html");
  }
  else
  {
      console.log("Error");
  }
}

function hardButtonClicked()
{
  easyClicked = false;
  midClicked = false;
  hardClicked = true;

  if(hardClicked == true)
  {
    sessionStorage.setItem("Difficulty", 3);
    hardButton.html(window.location.href = "index.html");
  }
  else
  {
      console.log("Error");
  }
}

function mousePressed()
{
  clicked();
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
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

			console.log(localStorage.getItem("volumeControl"));
}
