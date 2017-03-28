const Pipe = function(x, y, speed, length, context){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.context = context;
    this.PipeImage = document.getElementById('pipe');
    this.length = length;
}

Pipe.prototype.rotate = function(){
    this.PipeImage = document.getElementById('topPipe');
    this.y -= 350;
}

Pipe.prototype.update = function(){
    this.x -= this.speed;
}

Pipe.prototype.render = function(){
    this.context.drawImage(this.PipeImage,this.x, this.y , 50, this.length);
}