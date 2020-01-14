var widthAmount;
var mode;
function setup()
{
    createCanvas(windowWidth, windowHeight);
	document.body.style.overflow = 'hidden';

  widthAmount = width / 3;
  gameData = new GameData();
}

function draw()
{
	background(0);
  fill(255);
  rect(width/2, 0, width / 2, height);
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
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
