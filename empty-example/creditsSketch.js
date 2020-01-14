function setup()
{
    createCanvas(windowWidth, windowHeight);
	document.body.style.overflow = 'hidden';

}

function draw()
{
	background(0);
	fill(239, 222, 136);
  text("Credits", width / 2, height / 2);
}

function mousePressed()
{
	window.location.href = "menu.html";
}
