const Bird = function(x, y, context){
    this.x = x;
    this.y = y;
    this.context = context;
    this.gravity = 0;
    this.width = 80;
    this.height = 68;
    this.spites = [document.getElementById('bird1'), document.getElementById('bird2'), document.getElementById('bird3'), document.getElementById('bird4')];
    var that = this;            //Many cant tell the diffrence between this and that
    this.counter = 0;
    this.index = 0;
    window.addEventListener('keydown', function(e){
        if(e.keyCode == 32){
            that.gravity = -16;
            console.log('spacebar');
        }
    });
}

Bird.prototype.update = function(){
    this.counter++;
    if(this.counter % 3 == 0){
        this.index = (this.index +1) % this.spites.length;
    }
    this.y += this.gravity;
    this.gravity += 1.25;
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
