let leftscore = 0;
let rightscore = 0;

function setup() 
{
    createCanvas(800, 500);
    puck = new Puck();
}

function draw() 
{
    background(0);
    
    puck.update();
    puck.edges();
    puck.show();
}

function mousePressed()
{
	puck.clicked();	
}

class Puck 
{
    constructor() 
	{
        this.x = width/2;
        this.y = height/2;
        this.xspeed = 0;
        this.yspeed = 0;
        this.r = random(15, 30);
        
        this.reset();
    }
    
    update() 
	{
        this.x += this.xspeed;
        this.y += this.yspeed;
    }
    
    reset() 
	{
        this.x = width/2;
        this.y = height/2;
        let angle = random(-PI/4, PI/4);
        this.xspeed = 5 * Math.cos(angle);
        this.yspeed = 5 * Math.sin(angle);
        
        if (random(1) < 0.5) 
		{
            this.xspeed *= -1;
        }
    }
    
    edges() 
	{
        if (this.y < 10 || this.y > height) 
		{
            this.yspeed *= -1;
        }
		
		if(this.y > height - 10)
		{
			this.yspeed *= -1;
		}
        
		if (this.x < 10|| this.x > width) 
		{
            this.xspeed *= -1;
        }
    }
    
    show() 
	{
        fill(255);
        ellipse(this.x, this.y, this.r*2);
    }
	
	clicked()
	{
		let d = dist(mouseX, mouseY, this.x, this.y);
		
		if(d < this.r)
		{
			console.log("hit");
		}
		else
		{
			console.log("miss");
		}
	}
}
