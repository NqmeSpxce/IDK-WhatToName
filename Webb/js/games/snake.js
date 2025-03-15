/**
 * Snake Game Implementation
 * A classic Snake game with a purple theme
 */

function loadSnake() {
    const snakeGame = document.getElementById('snake-game');
    
    // Create game elements
    const gameCanvas = document.createElement('canvas');
    gameCanvas.classList.add('snake-canvas');
    gameCanvas.width = 400;
    gameCanvas.height = 400;
    
    const gameInfo = document.createElement('div');
    gameInfo.classList.add('snake-info');
    
    // Add game elements to container
    snakeGame.appendChild(gameCanvas);
    snakeGame.appendChild(gameInfo);
    
    // Add game info elements
    const scoreDisplay = document.createElement('div');
    scoreDisplay.classList.add('snake-score');
    scoreDisplay.innerHTML = '<h3>Score</h3><p id="snake-score">0</p>';
    
    const highScoreDisplay = document.createElement('div');
    highScoreDisplay.classList.add('snake-high-score');
    highScoreDisplay.innerHTML = '<h3>High Score</h3><p id="snake-high-score">0</p>';
    
    const speedDisplay = document.createElement('div');
    speedDisplay.classList.add('snake-speed');
    speedDisplay.innerHTML = `
        <h3>Speed</h3>
        <div class="speed-buttons">
            <button id="slow-btn">Slow</button>
            <button id="medium-btn" class="active">Medium</button>
            <button id="fast-btn">Fast</button>
        </div>
    `;
    
    const controlsDisplay = document.createElement('div');
    controlsDisplay.classList.add('snake-controls');
    controlsDisplay.innerHTML = `
        <h3>Controls</h3>
        <p>Arrow Keys: Move Snake</p>
        <p>Space: Pause/Resume</p>
    `;
    
    const startButton = document.createElement('button');
    startButton.classList.add('snake-start');
    startButton.textContent = 'Start Game';
    
    // Add info elements to game info container
    gameInfo.appendChild(scoreDisplay);
    gameInfo.appendChild(highScoreDisplay);
    gameInfo.appendChild(speedDisplay);
    gameInfo.appendChild(controlsDisplay);
    gameInfo.appendChild(startButton);
    
    // Add mobile controls for touch devices
    const mobileControls = document.createElement('div');
    mobileControls.classList.add('snake-mobile-controls');
    mobileControls.innerHTML = `
        <button id="up-btn"><i class="fas fa-arrow-up"></i></button>
        <div class="horizontal-controls">
            <button id="left-btn"><i class="fas fa-arrow-left"></i></button>
            <button id="right-btn"><i class="fas fa-arrow-right"></i></button>
        </div>
        <button id="down-btn"><i class="fas fa-arrow-down"></i></button>
    `;
    
    if ('ontouchstart' in window) {
        snakeGame.appendChild(mobileControls);
    }
    
    // Add game styles
    const snakeStyles = document.createElement('style');
    snakeStyles.textContent = `
        .snake-canvas {
            background-color: rgba(20, 20, 20, 0.9);
            border: 2px solid var(--primary-purple);
            box-shadow: 0 0 15px var(--glow-color);
            border-radius: 8px;
        }
        
        #snake-game {
            display: flex;
            justify-content: center;
            gap: 20px;
            padding: 20px;
            height: 100%;
            flex-wrap: wrap;
            position: relative;
        }
        
        .snake-info {
            display: flex;
            flex-direction: column;
            gap: 20px;
            min-width: 200px;
        }
        
        .snake-score, .snake-high-score, .snake-speed, .snake-controls {
            background-color: rgba(30, 30, 30, 0.8);
            border: 1px solid var(--primary-purple);
            border-radius: 4px;
            padding: 10px;
            box-shadow: 0 0 10px rgba(138, 43, 226, 0.3);
        }
        
        .snake-score h3, .snake-high-score h3, .snake-speed h3, .snake-controls h3 {
            margin-bottom: 10px;
            font-size: 1rem;
            text-align: center;
        }
        
        #snake-score, #snake-high-score {
            font-size: 1.5rem;
            text-align: center;
            color: var(--primary-purple);
            font-weight: bold;
        }
        
        .snake-controls p {
            font-size: 0.9rem;
            margin-bottom: 5px;
        }
        
        .speed-buttons {
            display: flex;
            justify-content: center;
            gap: 5px;
        }
        
        .speed-buttons button {
            padding: 5px 10px;
            background-color: rgba(20, 20, 20, 0.8);
            color: var(--text-light);
            border: 1px solid var(--secondary-purple);
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .speed-buttons button:hover {
            background-color: rgba(138, 43, 226, 0.2);
        }
        
        .speed-buttons button.active {
            background: linear-gradient(to right, var(--primary-purple), var(--secondary-purple));
            box-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
        }
        
        .snake-start {
            padding: 10px;
            background: linear-gradient(to right, var(--primary-purple), var(--secondary-purple));
            color: var(--text-light);
            border: none;
            border-radius: 4px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(138, 43, 226, 0.3);
        }
        
        .snake-start:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(138, 43, 226, 0.5);
        }
        
        .snake-mobile-controls {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            margin-top: 20px;
            width: 100%;
        }
        
        .horizontal-controls {
            display: flex;
            gap: 50px;
        }
        
        .snake-mobile-controls button {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(to right, var(--primary-purple), var(--secondary-purple));
            color: var(--text-light);
            border: none;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(138, 43, 226, 0.3);
        }
        
        .snake-mobile-controls button:active {
            transform: scale(0.95);
        }
        
        .snake-game-over {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.8);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            z-index: 10;
            border: 2px solid var(--primary-purple);
            box-shadow: 0 0 20px var(--glow-color);
            animation: fadeIn 0.5s;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .snake-game-over h2 {
            color: var(--primary-purple);
            margin-bottom: 15px;
        }
        
        .snake-game-over p {
            margin-bottom: 10px;
            font-size: 1.2rem;
        }
        
        .snake-pause {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.8);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            z-index: 10;
            border: 2px solid var(--primary-purple);
            box-shadow: 0 0 20px var(--glow-color);
        }
        
        .snake-pause h2 {
            color: var(--primary-purple);
            margin-bottom: 15px;
        }
        
        @media (max-width: 768px) {
            #snake-game {
                flex-direction: column;
                align-items: center;
            }
            
            .snake-canvas {
                width: 300px;
                height: 300px;
            }
            
            .snake-info {
                width: 300px;
            }
        }
    `;
    document.head.appendChild(snakeStyles);
    
    // Game variables
    const ctx = gameCanvas.getContext('2d');
    const gridSize = 20;
    const gridWidth = gameCanvas.width / gridSize;
    const gridHeight = gameCanvas.height / gridSize;
    
    let snake = [];
    let food = {};
    let direction = 'right';
    let nextDirection = 'right';
    let score = 0;
    let highScore = localStorage.getItem('snake-high-score') || 0;
    let gameSpeed = 150; // Default medium speed
    let gameInterval;
    let isPaused = false;
    let gameOver = false;
    
    // Update high score display
    document.getElementById('snake-high-score').textContent = highScore;
    
    // Initialize the game
    function initGame() {
        // Reset game state
        snake = [
            { x: 5, y: 10 },
            { x: 4, y: 10 },
            { x: 3, y: 10 }
        ];
        
        direction = 'right';
        nextDirection = 'right';
        score = 0;
        gameOver = false;
        
        // Update score display
        document.getElementById('snake-score').textContent = score;
        
        // Generate initial food
        generateFood();
        
        // Start game loop
        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, gameSpeed);
    }
    
    // Generate food at random position
    function generateFood() {
        // Generate random position
        let foodX = Math.floor(Math.random() * gridWidth);
        let foodY = Math.floor(Math.random() * gridHeight);
        
        // Make sure food doesn't spawn on snake
        while (snake.some(segment => segment.x === foodX && segment.y === foodY)) {
            foodX = Math.floor(Math.random() * gridWidth);
            foodY = Math.floor(Math.random() * gridHeight);
        }
        
        food = { x: foodX, y: foodY };
    }
    
    // Main game loop
    function gameLoop() {
        if (isPaused || gameOver) return;
        
        // Update snake position
        moveSnake();
        
        // Check for collisions
        if (checkCollision()) {
            endGame();
            return;
        }
        
        // Check if snake eats food
        if (snake[0].x === food.x && snake[0].y === food.y) {
            // Increase score
            score += 10;
            document.getElementById('snake-score').textContent = score;
            
            // Update high score if needed
            if (score > highScore) {
                highScore = score;
                document.getElementById('snake-high-score').textContent = highScore;
                localStorage.setItem('snake-high-score', highScore);
            }
            
            // Generate new food
            generateFood();
            
            // Don't remove tail (snake grows)
        } else {
            // Remove tail segment
            snake.pop();
        }
        
        // Draw everything
        drawGame();
    }
    
    // Move the snake
    function moveSnake() {
        // Update direction
        direction = nextDirection;
        
        // Calculate new head position
        const head = { x: snake[0].x, y: snake[0].y };
        
        switch (direction) {
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
        }
        
        // Wrap around edges
        if (head.x < 0) head.x = gridWidth - 1;
        if (head.x >= gridWidth) head.x = 0;
        if (head.y < 0) head.y = gridHeight - 1;
        if (head.y >= gridHeight) head.y = 0;
        
        // Add new head to snake
        snake.unshift(head);
    }
    
    // Check for collisions with self
    function checkCollision() {
        const head = snake[0];
        
        // Check collision with self (skip head)
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        
        return false;
    }
    
    // Draw the game
    function drawGame() {
        // Clear canvas
        ctx.fillStyle = 'rgba(20, 20, 20, 0.9)';
        ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(50, 50, 50, 0.5)';
        ctx.lineWidth = 0.5;
        
        // Vertical lines
        for (let x = 0; x <= gameCanvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, gameCanvas.height);
            ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= gameCanvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(gameCanvas.width, y);
            ctx.stroke();
        }
        
        // Draw snake
        snake.forEach((segment, index) => {
            // Create gradient for snake segments
            const gradient = ctx.createLinearGradient(
                segment.x * gridSize,
                segment.y * gridSize,
                (segment.x + 1) * gridSize,
                (segment.y + 1) * gridSize
            );
            
            if (index === 0) {
                // Head
                gradient.addColorStop(0, '#9370db');
                gradient.addColorStop(1, '#8a2be2');
            } else {
                // Body
                gradient.addColorStop(0, '#8a2be2');
                gradient.addColorStop(1, '#6a5acd');
            }
            
            ctx.fillStyle = gradient;
            
            // Draw rounded rectangle for snake segment
            roundRect(
                ctx,
                segment.x * gridSize + 1,
                segment.y * gridSize + 1,
                gridSize - 2,
                gridSize - 2,
                index === 0 ? 8 : 5
            );
            
            // Draw eyes if it's the head
            if (index === 0) {
                ctx.fillStyle = 'white';
                
                // Position eyes based on direction
                let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
                
                switch (direction) {
                    case 'up':
                        leftEyeX = segment.x * gridSize + gridSize * 0.3;
                        leftEyeY = segment.y * gridSize + gridSize * 0.3;
                        rightEyeX = segment.x * gridSize + gridSize * 0.7;
                        rightEyeY = segment.y * gridSize + gridSize * 0.3;
                        break;
                    case 'down':
                        leftEyeX = segment.x * gridSize + gridSize * 0.3;
                        leftEyeY = segment.y * gridSize + gridSize * 0.7;
                        rightEyeX = segment.x * gridSize + gridSize * 0.7;
                        rightEyeY = segment.y * gridSize + gridSize * 0.7;
                        break;
                    case 'left':
                        leftEyeX = segment.x * gridSize + gridSize * 0.3;
                        leftEyeY = segment.y * gridSize + gridSize * 0.3;
                        rightEyeX = segment.x * gridSize + gridSize * 0.3;
                        rightEyeY = segment.y * gridSize + gridSize * 0.7;
                        break;
                    case 'right':
                        leftEyeX = segment.x * gridSize + gridSize * 0.7;
                        leftEyeY = segment.y * gridSize + gridSize * 0.3;
                        rightEyeX = segment.x * gridSize + gridSize * 0.7;
                        rightEyeY = segment.y * gridSize + gridSize * 0.7;
                        break;
                }
                
                ctx.beginPath();
                ctx.arc(leftEyeX, leftEyeY, gridSize * 0.15, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.beginPath();
                ctx.arc(rightEyeX, rightEyeY, gridSize * 0.15, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        // Draw food
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.arc(
            food.x * gridSize + gridSize / 2,
            food.y * gridSize + gridSize / 2,
            gridSize / 2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
        
        // Add glow to food
        ctx.shadowColor = '#ff6b6b';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(
            food.x * gridSize + gridSize / 2,
            food.y * gridSize + gridSize / 2,
            gridSize / 2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.shadowBlur = 0;
    }
    
    // Helper function to draw rounded rectangles
    function roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
    }
    
    // End the game
    function endGame() {
        clearInterval(gameInterval);
        gameOver = true;
        
        // Show game over message
        const gameOverMsg = document.createElement('div');
        gameOverMsg.classList.add('snake-game-over');
        gameOverMsg.innerHTML = `
            <h2>Game Over</h2>
            <p>Score: ${score}</p>
            <p>High Score: ${highScore}</p>
            <button id="play-again-btn">Play Again</button>
        `;
        
        snakeGame.appendChild(gameOverMsg);
        
        // Add play again button style
        const playAgainBtn = document.getElementById('play-again-btn');
        playAgainBtn.style.padding = '10px 20px';
        playAgainBtn.style.marginTop = '15px';
        playAgainBtn.style.background = 'linear-gradient(to right, var(--primary-purple), var(--secondary-purple))';
        playAgainBtn.style.color = 'white';
        playAgainBtn.style.border = 'none';
        playAgainBtn.style.borderRadius = '4px';
        playAgainBtn.style.cursor = 'pointer';
        
        // Add event listener to play again button
        playAgainBtn.addEventListener('click', () => {
            gameOverMsg.remove();
            initGame();
        });
    }
    
    // Toggle pause
    function togglePause() {
        if (gameOver) return;
        
        isPaused = !isPaused;
        
        if (isPaused) {
            // Show pause message
            const pauseMsg = document.createElement('div');
            pauseMsg.classList.add('snake-pause');
            pauseMsg.id = 'pause-message';
            pauseMsg.innerHTML = '<h2>Paused</h2><p>Press Space to resume</p>';
            snakeGame.appendChild(pauseMsg);
        } else {
            // Remove pause message
            const pauseMsg = document.getElementById('pause-message');
            if (pauseMsg) pauseMsg.remove();
        }
    }
    
    // Set game speed
    function setGameSpeed(speed) {
        switch (speed) {
            case 'slow':
                gameSpeed = 200;
                break;
            case 'medium':
                gameSpeed = 150;
                break;
            case 'fast':
                gameSpeed = 100;
                break;
        }
        
        // Update UI
        document.querySelectorAll('.speed-buttons button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.getElementById(`${speed}-btn`).classList.add('active');
        
        // Restart interval with new speed
        if (gameInterval) {
            clearInterval(gameInterval);
            if (!gameOver) {
                gameInterval = setInterval(gameLoop, gameSpeed);
            }
        }
    }
    
    // Handle keyboard input
    function handleKeydown(e) {
        // Pause/resume with space
        if (e.key === ' ' || e.code === 'Space') {
            e.preventDefault();
            togglePause();
            return;
        }
        
        if (isPaused || gameOver) return;
        
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                if (direction !== 'down') nextDirection = 'up';
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (direction !== 'up') nextDirection = 'down';
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (direction !== 'right') nextDirection = 'left';
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (direction !== 'left') nextDirection = 'right';
                break;
        }
    }
    
    // Event listeners
    document.addEventListener('keydown', handleKeydown);
    startButton.addEventListener('click', () => {
        // Remove any existing game over message
        const gameOverMsg = document.querySelector('.snake-game-over');
        if (gameOverMsg) gameOverMsg.remove();
        
        // Start/restart the game
        initGame();
        
        // Change button text
        startButton.textContent = 'Restart Game';
    });
    
    // Speed button event listeners
    document.getElementById('slow-btn').addEventListener('click', () => setGameSpeed('slow'));
    document.getElementById('medium-btn').addEventListener('click', () => setGameSpeed('medium'));
    document.getElementById('fast-btn').addEventListener('click', () => setGameSpeed('fast'));
    
    // Mobile control event listeners
    if ('ontouchstart' in window) {
        document.getElementById('up-btn').addEventListener('click', () => {
            if (!isPaused && !gameOver && direction !== 'down') nextDirection = 'up';
        });
        
        document.getElementById('down-btn').addEventListener('click', () => {
            if (!isPaused && !gameOver && direction !== 'up') nextDirection = 'down';
        });
        
        document.getElementById('left-btn').addEventListener('click', () => {
            if (!isPaused && !gameOver && direction !== 'right') nextDirection = 'left';
        });
        
        document.getElementById('right-btn').addEventListener('click', () => {
            if (!isPaused && !gameOver && direction !== 'left') nextDirection = 'right';
        });
    }
    
    // Draw initial game state
    drawGame();
    
    // Clean up function
    function cleanup() {
        document.removeEventListener('keydown', handleKeydown);
        if (gameInterval) clearInterval(gameInterval);
    }
    
    // Add cleanup to modal close
    const modal = document.getElementById('game-modal');
    modal.addEventListener('close-game', cleanup);
} 