const Bird = function(x, y, context){
    this.x = x;
    this.y = y;
    this.context = context;
    this.gravity = 0;
    this.width = 52;
    this.height = 39;
    this.spites = [document.getElementById('bird1'), document.getElementById('bird2'), document.getElementById('bird3'), document.getElementById('bird4')];
    var that = this;            //Many cant tell the diffrence between this and that
    this.counter = 0;
    this.index = 0;
    this.crashed = false;
    window.addEventListener('keydown', function(e){
        if(e.keyCode == 32){
            that.gravity = -14;
            console.log('spacebar');
        }
    });
}

Bird.prototype.update = function(pipes){
    this.counter++;
    if(this.counter % 3 == 0){
        this.index = (this.index +1) % this.spites.length;
    }
    this.y += this.gravity;
    this.gravity += 1.4;
    if(this.Crash(pipes)){
        this.crashed = true;
    }
};

Bird.prototype.render = function(){
    let horizontal = -this.width/2;
    let vertical = -this.height/2;
    this.context.save();
    this.context.translate(this.x, this.y);
    let angle = this.gravity/32
    this.context.rotate(angle);
    this.context.drawImage(this.spites[this.index], horizontal, vertical, this.width, this.height);
    this.context.restore();
};

Bird.prototype.Crash = function(pipes){
    for(let i = 0; i < pipes.length; i++){
        let pipe = pipes[i];
        let isHigh = pipe.y < 0;
        let x0 = pipe.x;
        let x1 = pipe.x + pipe.width;
        if(isHigh){
            let y0 = pipe.y + pipe.length;
            let birdass = this.x;
            let birdhead = this.y - this.height/2;
            if(birdass > x0 && birdass < x1 && birdhead < y0){
                return true;
            }
        }
        else{
            let y2 = pipe.y;
            let birdass = this.x;
            let birdhead = this.y + this.height/2;
            if(birdass > x0 && birdass < x1 && birdhead > y2/* || bird2 > x0 && bird2 < x1 && birdb2 > y2*/){
                return true;
            }
        }
    }
    if(this.y + this.height/2 > 384) {
        return true;
    }
}