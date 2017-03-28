const Pipe = function(x, y, speed, lenght, context){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.context = context;
    this.PipeImage = document.getElementById('pipe');
    this.lenght = lenght;
}

Pipe.prototype.update = function(){

}

Pipe.prototype.render = function(){
    this.context.drawImage(this.PipeImage,this.x, this.y , 50, this.length);
}