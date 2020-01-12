function setup() 
{
    createCanvas(windowWidth, windowHeight);
	document.body.style.overflow = 'hidden';
	
	button = createButton("play")
	button.position(width / 2, height/ 2);
}

function draw() 
{
	background(0);
}

function mousePressed()
{
	button.html(window.location.href = "index.html");
}
