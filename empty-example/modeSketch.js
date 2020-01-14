var widthAmount;
var mode;
function setup()
{
  createCanvas(windowWidth, windowHeight);
	document.body.style.overflow = 'hidden';

  font = loadFont("./Assets/PressStart2P-Regular.ttf");
  textFont(font);
  textSize(width / 9);
  textAlign(CENTER, CENTER);

  playButton = createButton("Easy");
  playButton.position(0, height/ 1.8);
  playButton.mousePressed(launchGame);

  tutorialButton = createButton("Medium");
  tutorialButton.position(0, height/1.57);
  tutorialButton.mousePressed(tutorial);

  creditsButton = createButton("Hard");
  creditsButton.position(0, height/1.4);
  creditsButton.mousePressed(credits);
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
