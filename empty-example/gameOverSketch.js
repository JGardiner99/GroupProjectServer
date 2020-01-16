let font;

let stars = [];
let speed = 2;

function preload()
{
  Unmute = loadImage("./Assets/Images/VolumeButton1.png");
  Mute = loadImage("./Assets/Images/VolumeButton2.png");

  GameOver = loadSound("./Assets/Sounds/GameOver.mp3");

  star = new Star();
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
	document.body.style.overflow = 'hidden';

  for(let i = 0; i < starsAmount; i++)
  {
    stars[i] = new Star();
    stars[i].speed = speed;
  }
}

function draw()
{
	background(0);

    for(let i = 0; i < stars.length; i++)
    {
      stars[i].update();
      stars[i].show();
    }
	fill(239, 222, 136);
  text("GAME OVER", width / 2, height / 2);
}

function mousePressed()
{
	//window.location.href = "Input.html";
}
