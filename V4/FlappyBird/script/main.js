window.onload = function(){


    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = 384 + 112;

    const context = canvas.getContext('2d');

    var music = document.getElementById('music');

    const enviroment = new Enviroment(canvas, context);
    const bird = new Bird(250, 250, context);
    const pipeCount = 10;
    var pipes = [];
    var pipeSpeed = 3.5;
    var randomness = 180;
    var baseY = 180;
    var y = baseY;
    var pipeLength = 280;
    var spawnGap = canvas.width / 5;
    for(i = 0; i < pipeCount; i++) {
        y += Math.floor(Math.random()*randomness);
        pipes.push(new Pipe(800 + i * spawnGap, y, pipeSpeed, pipeLength, context));
        var topPipe = new Pipe(800 + i * spawnGap, y, pipeSpeed, pipeLength, context);
        topPipe.rotate();
        pipes.push(topPipe);
        y = baseY;
    }
    //music.play();
    gameLoop();

    context.fillStyle = "#FFFFFF";
    function gameLoop(){
        context.fillRect(0,0,context.width,context.height);
        enviroment.updatebg();
        enviroment.renderbg();
        bird.update(pipes);
        bird.render();
        if(bird.crashed){
            console.log("you lose");
            return;
        }
        for(i = 0; i < pipeCount; i++) {
            pipes[i].update();
            if(pipes[i].x < -50) {
                if(i % 2 == 0) {
                    y += Math.floor(Math.random()*randomness);
                }
                pipes[i] = new Pipe((pipeCount/2)*spawnGap , y, pipeSpeed, pipeLength, context);
                if(i % 2 != 0) {
                    pipes[i].rotate();
                    y = baseY;
                }
            }
            pipes[i].render();
        }
        enviroment.updatefg();
        enviroment.renderfg();
        window.requestAnimationFrame(gameLoop);
    }
};

