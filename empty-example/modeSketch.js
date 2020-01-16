//createing variabls
let font;

let stars = [];
let speed = 2;

var menuTheme;

var easyClicked = false;
var midClicked = false;
var hardClicked = false;

var mode;

function preload()
{
  	//setting file paths to variables
  menuTheme = loadSound("./Assets/Sounds/theme 1.mp3");
  Unmute = loadImage("./Assets/Images/VolumeButton1.png");
  Mute = loadImage("./Assets/Images/VolumeButton2.png");
  font = loadFont("./PressStart2P-Regular.ttf");

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
    //checks to see the value in the sessionStorage if its equal to 0 then have the audio play
    //else mute audio and switch icon
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

    //checks the bool to see if its true, if it is then it runs the code
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
  	//if the mouse is inside the chosen area then run the code (same as above)
	if(mouseX > width - 125 && mouseY > height - 125)
		{
			if(sessionStorage.getItem("volumeControl") == 0)
			{
				menuTheme.setVolume(0);
        //stores variable to the sessionStorage within the browser
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
