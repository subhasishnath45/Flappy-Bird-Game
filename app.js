document.addEventListener('DOMContentLoaded',()=>{
    const bird = document.querySelector('.bird');
    const gameContainer = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    let birdLeft = 220; // 500-60 = 440 / 2 = 220
    let birdBottom = 100;
    let gravity = 2;
    let isGameOver = false;
    let gap = 430;

    function startGame(){
        birdBottom -= gravity;
        bird.style.bottom = `${birdBottom}px`;
        bird.style.left = `${birdLeft}px`;
    }
    let gameTimerId = setInterval(startGame, 20);
    
    // clearInterval(timeId);

    function control(e){
        if(e.keyCode === 32){// for spacebar
            jump();
        }
    }

    function jump(){
        if(birdBottom < 500) birdBottom += 50;
        bird.style.bottom = `${birdBottom}px`;
        console.log(birdBottom);
    }
    // when pressing on spacebar we involk control function.
    document.addEventListener('keyup', control);

    function generateObstacle(){
        let obstacleLeft = 500;

        let randomHeight = Math.random() * 60; // generate 0 to 60 random number.

        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');

        if(!isGameOver){ // adding both obstacles if the game is not over.
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
        }
        gameContainer.appendChild(obstacle);
        gameContainer.appendChild(topObstacle);

        // positioning bottom obstacle.
        obstacle.style.left = `${obstacleLeft}px`;
        obstacle.style.bottom = `${obstacleBottom}px`;

        // positioning top obstacle.
        topObstacle.style.left = `${obstacleLeft}px`;
        topObstacle.style.bottom = obstacleBottom + gap + 'px';
        // following function will move both obstacles
        function moveObstacle(){
            obstacleLeft -= 2;
            obstacle.style.left = `${obstacleLeft}px`;
            topObstacle.style.left = `${obstacleLeft}px`;
            if(obstacleLeft === -60){ // when the obstacle moves out of the screen 
                clearInterval(timerId);
                gameContainer.removeChild(obstacle);
                gameContainer.removeChild(topObstacle);
            }
            if(
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && 
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200)||
                birdBottom === 0){ // as soon as the bird hits the ground.
                gameOver(); // game over.
                clearInterval(timerId); // stop the obstacle movement.
            }

        }
        // moving our obstacle in every 20 milliseconds.
        let timerId = setInterval(moveObstacle, 20);
        if(!isGameOver){
            setTimeout(generateObstacle, 3000);
        }

    }
    generateObstacle();

    function gameOver(){
        clearInterval(gameTimerId);
        console.log('Game Over');
        isGameOver = true;
        document.removeEventListener('keyup', control);
    }


});