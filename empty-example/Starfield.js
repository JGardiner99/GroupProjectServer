class Star
{
  constructor(x, y, z)
  {
    this.x = random(-width , width);
    this.y = random(-height , height);
    this.z = random(width);

    this.pz = this.z;
    this.speed = 2;
  }

  update() {
    this.z -= this.speed;

    if (this.z < 1)
    {
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.z = width;
    }
  }
  show() {
    fill(255);
    noStroke();

    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);

		let r = map(this.z, 0, width, 12, 0);
    ellipse(sx, sy, r, r);
  }
}
//https://editor.p5js.org/arthurrc/sketches/BJ9HSRqh7
