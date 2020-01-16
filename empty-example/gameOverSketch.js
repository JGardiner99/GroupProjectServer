let font;

let stars = [];
let speed = 2;

function preload()
{
  Unmute = loadImage("./Assets/Images/VolumeButton1.png");
  Mute = loadImage("./Assets/Images/VolumeButton2.png");
  font = loadFont('PressStart2P-Regular.ttf');
  GameOver = loadSound("./Assets/Sounds/GameOver.mp3");

  star = new Star();
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
	document.body.style.overflow = 'hidden';

  console.log(sessionStorage.getItem("volumeControl"));

  let starsAmount = width / 2;

	for(let i = 0; i < starsAmount; i += 1)
	{
		stars[i] = new Star();
	}

  GameOver.play();
  if(sessionStorage.getItem("volumeControl") == 0)
  {
    GameOver.setVolume(0.1);
    Mute = loadImage ("./Assets/Images/VolumeButton1.png");
  }
  else
  {
    GameOver.setVolume(0);
    Mute = loadImage ("./Assets/Images/VolumeButton2.png");
  }
}

function draw()
{
	background(0);
  translate(width / 2, height/2);
  for(let i = 0; i < stars.length; i++)
  {
    stars[i].update();
    stars[i].show();
  }
  translate(-width / 2, -height / 2);

	fill(239, 222, 136);
  textFont(font);
  textSize(width / 12);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2);
  image(Mute, width - 125, height - 125);


  Mute.resize(150, 150);
  if(GameOver.isPlaying() == true)
  {

  }
  else
  {
    window.location.replace("Input.html");
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
				GameOver.setVolume(0);
				sessionStorage.setItem("volumeControl", 1);
				Mute = loadImage ("./Assets/Images/VolumeButton2.png");
			}
			else
			{
				GameOver.setVolume(0.1);
				sessionStorage.setItem("volumeControl", 0);
				Mute = loadImage ("./Assets/Images/VolumeButton1.png");
			}
		}
			console.log(sessionStorage.getItem("volumeControl"));
}
