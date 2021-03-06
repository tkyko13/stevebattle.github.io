function Vehicle(img,w,l) {
  
  Thing.call(this,img,w,l,random(width),random(height),random(TAU));
  this.prototype = Object.create(Thing.prototype);
  
  // vehicles leave a visible path
  this.PATH_LENGTH=1000;
  this.path = new Array(this.PATH_LENGTH);
  this.pathIndex = 0;

  // vehicle must clear edge + margin for a visually clean exit
  this.MARGIN = 50;
  
  // calculate end-point coordinates given origin, angle and length
  // p5.Vector origin, float angle, float len
  this.endPoint = function(origin, angle, len) {
    return createVector(origin.x + len * cos(-angle), origin.y + len * sin(-angle));
  };
  
  this.clearPath = function() {
    this.path = new Array(this.PATH_LENGTH);
    this.pathIndex = 0;
  };
  
  this.drawPath = function() {
    // add current position to path
    this.path[this.pathIndex] = createVector(this.position.x,this.position.y);
    this.pathIndex = (this.pathIndex+1)%this.PATH_LENGTH;
    
    for (var i=0; i<this.PATH_LENGTH-1; i++) {     
      var p1 = this.path[(this.pathIndex+i)%this.PATH_LENGTH];
      stroke(0); fill(0);
      if (p1!=null) ellipse(p1.x,p1.y,2,2);
    }
  };
  
  this.checkBorders = function() {
    // keep the vehicle on-screen
    if (this.position.x+this.MARGIN<0 || 
      this.position.x - this.MARGIN>width || 
      this.position.y + this.MARGIN<0 || 
      this.position.y - this.MARGIN>height) {
        
      this.clearPath();
      this.setPosition(random(width)/2, random(height)/2);
      this.angle = radians(random(360));
    }
  };

}
