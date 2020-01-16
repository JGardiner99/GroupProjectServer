//createing variabls
var menuTheme;
let stars = [];
var gameFont;
let speed = 2;
var volumeButton;
var muteButton;

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

	sessionStorage.getItem("volumeControl");

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
	else if(sessionStorage.getItem("volumeControl") == 1)
	{
		menuTheme.setVolume(0);
		Mute = loadImage ("./Assets/Images/VolumeButton2.png");
	}
	else
	{

		menuTheme.setVolume(0.1);
		Mute = loadImage ("./Assets/Images/VolumeButton1.png");
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

	//used to draw each star on the screen. stars.length is the amount of stars that will be displayed.
		for(let i = 0; i < stars.length; i += 1)
		{
			stars[i].show();
			stars[i].update();
		}
    translate(-width/2, -height/2);

		image(Mute, width - 125, height - 125);
		Mute.resize(150, 150);
		textAlign(CENTER, CENTER);
    fill(239, 222, 136);
		textSize(width/50);
		text("James Gardiner - Main Developer", width / 2, height/1.8);
		text("Alex Haines - Secondary Content", width/2, height/2);
		text("Carissa Aseme - Prototyping & Design", width/2, height/2.2);
		text("Charlie Forman - Sound Design", width/2, height/2.4);
}
function previousPage(){
	backButton.html(window.location = "menu.html");
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
			  	//if the mouse is inside the chosen area then run the code (same as above)
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

//https://codepen.io/rndm/pen/ozZzry
