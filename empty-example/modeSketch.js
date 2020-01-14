var widthAmount;
var mode;
function setup()
{
    createCanvas(windowWidth, windowHeight);
	document.body.style.overflow = 'hidden';

  widthAmount = width / 3;

}

function draw()
{
	background(0);
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
}

function mousePressed()
{
  if(mouseX > width / 2)
    {
      background(0, 0, 255);
      mode = 1;
    }
    else
    {
      background(255, 0, 0);
      mode = 2;
    }

    window.location.href = "index.html";
}
