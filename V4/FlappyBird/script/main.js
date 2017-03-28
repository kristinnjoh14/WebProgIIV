window.onload = function(){


    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = 384 + 112;

    const context = canvas.getContext('2d');

    var music = document.getElementById('music');

    environment = new Enviroment(canvas, context);
    bird = new Bird(250, 100, context);
    var score = 0;
    var restart = false;

    const pipeCount = 10;
    var pipes = [];
    var pipeSpeed = 3.5;
    var randomness = 180;
    var baseY = 180;
    var y = baseY;
    var pipeLength = 280;
    var spawnGap = canvas.width / 5;

    music.play();
    start();
    gameLoop();
    context.fillStyle = "#FFFFFF";
    function gameLoop(){
        context.fillRect(0,0,context.width,context.height);
        environment.updatebg();
        environment.renderbg();
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
            if(pipes[i].x < 200 && !pipes[i].pointGiven) {
                score++;
                console.log(score);
                pipes[i].pointGiven = true;
            }
            pipes[i].render();
        }
        drawScore(context, canvas);
        if(!bird.crashed) {
            bird.update(pipes);
        }
        bird.render();
        environment.updatefg();
        environment.renderfg(score);
        if(bird.crashed){
            //console.log("you lose");
            pipeSpeed = 0;
            environment.backgroundSpeed = 0;
            environment.forgroundSpeed = 0;
            for(i = 0; i < pipeCount; i++) {
                pipes[i].speed = 0;
            }
            //start();
            document.getElementById('restart').style.visibility = "visible";
        }
        document.getElementById('restart').onclick = start;
        window.requestAnimationFrame(gameLoop);
    }
    function start() {
        bird = new Bird(250, 100, context);
        score = 0;
        pipeSpeed = 3.5;
        pipes = [];
        environment.forgroundSpeed = 3.5;
        environment.backgroundSpeed = 2;
        for(i = 0; i < pipeCount; i++) {
            y += Math.floor(Math.random()*randomness);
            pipes.push(new Pipe(800 + i * spawnGap, y, pipeSpeed, pipeLength, context));
            var topPipe = new Pipe(800 + i * spawnGap, y, pipeSpeed, pipeLength, context);
            topPipe.rotate();
            pipes.push(topPipe);
            y = baseY;
        }
        document.getElementById('restart').style.visibility = "hidden";
    }
    function drawScore(context, canvas){
      context.font="30px Verdana";
      context.textAlign="center";
      context.fillText(score, canvas.width/2, canvas.height/4);
    }
};

