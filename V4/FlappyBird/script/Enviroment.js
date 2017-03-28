Enviroment = function(canvas, context){
    this.canvas = canvas;
    this.context = context;
    this.backgroundPos = 0;
    this.forgroundPos = 0;
    this.backgroundSpeed = 2;
    this.backgroundWidth = 288;
    this.backgroundImage = document.getElementById('background');
    this.forgroundPos = 0;
    this.forgroundImage = document.getElementById('forground');
    this.forgroundSpeed = 3.5;
    this.forgroundWidth = 336;
    //this.context.font = "30px Arial";
}

Enviroment.prototype.updatebg = function(){
    this.backgroundPos -= this.backgroundSpeed;
    if(this.backgroundPos < -this.backgroundWidth){
        this.backgroundPos = 0;
    }
}

Enviroment.prototype.updatefg = function(){
    this.forgroundPos -= this.forgroundSpeed;
    if(this.forgroundPos < -this.forgroundWidth){
        this.forgroundPos = 0;
    }
}

Enviroment.prototype.renderbg = function(){
    for(let i = 0; i <= this.canvas.width/this.backgroundWidth+1; i++){
     this.context.drawImage(this.backgroundImage, this.backgroundPos+(i*this.backgroundWidth), 0);
    }
}

Enviroment.prototype.renderfg = function(count){
    for(let j = 0; j <= this.canvas.width/this.forgroundWidth+1; j++){
        this.context.drawImage(this.forgroundImage, this.forgroundPos+(j*this.forgroundWidth),384);
    }
    //this.context.fillText(count.toString(), 500, 400);
}