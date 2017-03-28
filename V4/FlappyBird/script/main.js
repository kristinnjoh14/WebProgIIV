window.onload = function(){


    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = 384 + 112;

    const context = canvas.getContext('2d');

    const enviroment = new Enviroment(canvas, context);
    const bird = new Bird(250, 250, context);
    gameLoop();

    context.fillStyle = "#FFFFFF";
    function gameLoop(){
        context.fillRect(0,0,context.width,context.height);
        enviroment.update();
        enviroment.render();
        bird.update();
        bird.render();
        window.requestAnimationFrame(gameLoop);
    }
};

