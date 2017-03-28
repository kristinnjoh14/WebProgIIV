window.onload = function(){


    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = 384 + 112;

    const context = canvas.getContext('2d');

    const enviroment = new Enviroment(canvas, context);
    const bird = new Bird(250, 250, context);
    const pipeCount = 6;
    var pipes = [];
    for(i = 0; i < pipeCount; i++) {
        pipes.push(new Pipe(500 + i * 500, 350, 3, 200, context));
        var topPipe = new Pipe(500 + i * 500, 350, 3, 200, context);
        topPipe.rotate();
        pipes.push(topPipe);
    }
    gameLoop();

    context.fillStyle = "#FFFFFF";
    function gameLoop(){
        context.fillRect(0,0,context.width,context.height);
        enviroment.update();
        enviroment.render();
        bird.update();
        bird.render();
        for(i = 0; i < pipeCount; i++) {
            pipes[i].update();
            if(pipes[i].x < -50) {
                pipes[i] = new Pipe(1500 , 350, 3, 200, context);
                if(i % 2 != 0) {
                    pipes[i].rotate();
                }
            }
            pipes[i].render();
        }
        window.requestAnimationFrame(gameLoop);
    }
};

