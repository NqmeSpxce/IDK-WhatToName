/**
 * Tetris Game Implementation
 * A classic Tetris game with a purple theme
 */

// This function will be called when the Tetris game is selected
function loadTetris() {
    const tetrisGame = document.getElementById('tetris-game');
    
    // Create game elements
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('tetris-board');
    
    const gameInfo = document.createElement('div');
    gameInfo.classList.add('tetris-info');
    
    // Add game elements to container
    tetrisGame.appendChild(gameBoard);
    tetrisGame.appendChild(gameInfo);
    
    // Add game info elements
    const scoreDisplay = document.createElement('div');
    scoreDisplay.classList.add('tetris-score');
    scoreDisplay.innerHTML = '<h3>Score</h3><p id="tetris-score">0</p>';
    
    const levelDisplay = document.createElement('div');
    levelDisplay.classList.add('tetris-level');
    levelDisplay.innerHTML = '<h3>Level</h3><p id="tetris-level">1</p>';
    
    const nextPieceDisplay = document.createElement('div');
    nextPieceDisplay.classList.add('tetris-next');
    nextPieceDisplay.innerHTML = '<h3>Next</h3><div id="tetris-next-piece"></div>';
    
    const controlsDisplay = document.createElement('div');
    controlsDisplay.classList.add('tetris-controls');
    controlsDisplay.innerHTML = `
        <h3>Controls</h3>
        <p>← → : Move</p>
        <p>↑ : Rotate</p>
        <p>↓ : Soft Drop</p>
        <p>Space : Hard Drop</p>
        <p>P : Pause</p>
    `;
    
    const startButton = document.createElement('button');
    startButton.classList.add('tetris-start');
    startButton.textContent = 'Start Game';
    
    // Add info elements to game info container
    gameInfo.appendChild(scoreDisplay);
    gameInfo.appendChild(levelDisplay);
    gameInfo.appendChild(nextPieceDisplay);
    gameInfo.appendChild(controlsDisplay);
    gameInfo.appendChild(startButton);
    
    // Add game styles
    const tetrisStyles = document.createElement('style');
    tetrisStyles.textContent = `
        .tetris-board {
            width: 300px;
            height: 600px;
            background-color: rgba(30, 30, 30, 0.8);
            border: 2px solid var(--primary-purple);
            box-shadow: 0 0 15px var(--glow-color);
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            grid-template-rows: repeat(20, 1fr);
            gap: 1px;
            padding: 1px;
            border-radius: 4px;
        }
        
        #tetris-game {
            display: flex;
            justify-content: center;
            gap: 20px;
            padding: 20px;
            height: 100%;
            flex-wrap: wrap;
        }
        
        .tetris-info {
            display: flex;
            flex-direction: column;
            gap: 20px;
            min-width: 200px;
        }
        
        .tetris-score, .tetris-level, .tetris-next, .tetris-controls {
            background-color: rgba(30, 30, 30, 0.8);
            border: 1px solid var(--primary-purple);
            border-radius: 4px;
            padding: 10px;
            box-shadow: 0 0 10px rgba(138, 43, 226, 0.3);
        }
        
        .tetris-score h3, .tetris-level h3, .tetris-next h3, .tetris-controls h3 {
            margin-bottom: 10px;
            font-size: 1rem;
            text-align: center;
        }
        
        #tetris-score, #tetris-level {
            font-size: 1.5rem;
            text-align: center;
            color: var(--primary-purple);
            font-weight: bold;
        }
        
        #tetris-next-piece {
            height: 80px;
            background-color: rgba(20, 20, 20, 0.5);
            border-radius: 4px;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(4, 1fr);
            gap: 1px;
            padding: 1px;
        }
        
        .tetris-controls p {
            font-size: 0.9rem;
            margin-bottom: 5px;
        }
        
        .tetris-start {
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
        
        .tetris-start:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(138, 43, 226, 0.5);
        }
        
        .tetris-cell {
            background-color: rgba(20, 20, 20, 0.5);
            border-radius: 2px;
        }
        
        .tetris-cell.filled {
            border-radius: 2px;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
        }
        
        .tetris-cell.filled.I {
            background-color: #00f0f0;
            border: 1px solid #00ffff;
        }
        
        .tetris-cell.filled.O {
            background-color: #f0f000;
            border: 1px solid #ffff00;
        }
        
        .tetris-cell.filled.T {
            background-color: #a000f0;
            border: 1px solid #bf00ff;
        }
        
        .tetris-cell.filled.S {
            background-color: #00f000;
            border: 1px solid #00ff00;
        }
        
        .tetris-cell.filled.Z {
            background-color: #f00000;
            border: 1px solid #ff0000;
        }
        
        .tetris-cell.filled.J {
            background-color: #0000f0;
            border: 1px solid #0000ff;
        }
        
        .tetris-cell.filled.L {
            background-color: #f0a000;
            border: 1px solid #ffaa00;
        }
        
        .tetris-cell.ghost {
            background-color: rgba(138, 43, 226, 0.2);
            border: 1px dashed var(--primary-purple);
        }
        
        @media (max-width: 768px) {
            #tetris-game {
                flex-direction: column;
                align-items: center;
            }
            
            .tetris-board {
                width: 250px;
                height: 500px;
            }
            
            .tetris-info {
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .tetris-score, .tetris-level {
                min-width: 100px;
            }
        }
    `;
    document.head.appendChild(tetrisStyles);
    
    // Initialize the game board
    createGameBoard();
    
    // Game variables
    let score = 0;
    let level = 1;
    let speed = 1000; // Initial speed in ms
    let gameInterval;
    let isPaused = false;
    let gameOver = false;
    
    // Current and next tetromino
    let currentTetromino = null;
    let nextTetromino = null;
    
    // Game board state (10x20 grid)
    let board = Array(20).fill().map(() => Array(10).fill(0));
    
    // Tetromino shapes
    const tetrominoes = {
        I: {
            shape: [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            color: 'I'
        },
        O: {
            shape: [
                [1, 1],
                [1, 1]
            ],
            color: 'O'
        },
        T: {
            shape: [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
            ],
            color: 'T'
        },
        S: {
            shape: [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0]
            ],
            color: 'S'
        },
        Z: {
            shape: [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0]
            ],
            color: 'Z'
        },
        J: {
            shape: [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
            ],
            color: 'J'
        },
        L: {
            shape: [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0]
            ],
            color: 'L'
        }
    };
    
    // Create the game board cells
    function createGameBoard() {
        const board = document.querySelector('.tetris-board');
        
        // Create 20x10 grid of cells
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 10; col++) {
                const cell = document.createElement('div');
                cell.classList.add('tetris-cell');
                cell.setAttribute('data-row', row);
                cell.setAttribute('data-col', col);
                board.appendChild(cell);
            }
        }
    }
    
    // Get a random tetromino
    function getRandomTetromino() {
        const shapes = Object.keys(tetrominoes);
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        return {
            ...tetrominoes[randomShape],
            row: 0,
            col: Math.floor((10 - tetrominoes[randomShape].shape[0].length) / 2)
        };
    }
    
    // Draw the current tetromino on the board
    function drawTetromino() {
        if (!currentTetromino) return;
        
        // Clear all non-fixed cells
        document.querySelectorAll('.tetris-cell.current, .tetris-cell.ghost').forEach(cell => {
            cell.classList.remove('filled', 'current', 'ghost', 'I', 'O', 'T', 'S', 'Z', 'J', 'L');
        });
        
        // Draw ghost piece (preview of where piece will land)
        const ghostRow = getDropPosition();
        drawGhostPiece(ghostRow);
        
        // Draw current piece
        currentTetromino.shape.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell) {
                    const boardRow = currentTetromino.row + rowIndex;
                    const boardCol = currentTetromino.col + colIndex;
                    
                    if (boardRow >= 0) {
                        const cellElement = document.querySelector(`.tetris-cell[data-row="${boardRow}"][data-col="${boardCol}"]`);
                        if (cellElement) {
                            cellElement.classList.add('filled', 'current', currentTetromino.color);
                        }
                    }
                }
            });
        });
    }
    
    // Draw the ghost piece (landing preview)
    function drawGhostPiece(ghostRow) {
        currentTetromino.shape.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell) {
                    const boardRow = ghostRow + rowIndex;
                    const boardCol = currentTetromino.col + colIndex;
                    
                    if (boardRow >= 0 && boardRow < 20) {
                        const cellElement = document.querySelector(`.tetris-cell[data-row="${boardRow}"][data-col="${boardCol}"]`);
                        if (cellElement && !cellElement.classList.contains('filled')) {
                            cellElement.classList.add('ghost');
                        }
                    }
                }
            });
        });
    }
    
    // Calculate the position where the current piece would land
    function getDropPosition() {
        let testRow = currentTetromino.row;
        while (isValidMove(currentTetromino.shape, testRow + 1, currentTetromino.col)) {
            testRow++;
        }
        return testRow;
    }
    
    // Draw the next tetromino in the preview area
    function drawNextTetromino() {
        if (!nextTetromino) return;
        
        const nextPieceContainer = document.getElementById('tetris-next-piece');
        nextPieceContainer.innerHTML = '';
        
        // Create a grid for the next piece preview
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const cell = document.createElement('div');
                cell.classList.add('tetris-cell');
                nextPieceContainer.appendChild(cell);
            }
        }
        
        // Draw the next piece
        const shape = nextTetromino.shape;
        shape.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell) {
                    const index = rowIndex * 4 + colIndex;
                    const cellElement = nextPieceContainer.children[index];
                    if (cellElement) {
                        cellElement.classList.add('filled', nextTetromino.color);
                    }
                }
            });
        });
    }
    
    // Update the game board based on the current state
    function updateBoard() {
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.querySelector(`.tetris-cell[data-row="${rowIndex}"][data-col="${colIndex}"]`);
                if (cellElement) {
                    cellElement.classList.remove('filled', 'I', 'O', 'T', 'S', 'Z', 'J', 'L');
                    if (cell) {
                        cellElement.classList.add('filled', cell);
                    }
                }
            });
        });
    }
    
    // Check if the move is valid
    function isValidMove(shape, newRow, newCol) {
        return shape.every((row, rowIndex) => {
            return row.every((cell, colIndex) => {
                if (!cell) return true;
                
                const boardRow = newRow + rowIndex;
                const boardCol = newCol + colIndex;
                
                // Check if within bounds
                const isWithinBounds = 
                    boardRow >= 0 && 
                    boardRow < 20 && 
                    boardCol >= 0 && 
                    boardCol < 10;
                
                // Check if space is empty
                const isEmpty = isWithinBounds && !board[boardRow][boardCol];
                
                return isWithinBounds && isEmpty;
            });
        });
    }
    
    // Rotate the current tetromino
    function rotateTetromino() {
        if (!currentTetromino || currentTetromino.color === 'O') return; // O piece doesn't rotate
        
        const originalShape = currentTetromino.shape;
        const size = originalShape.length;
        
        // Create a new rotated shape
        const rotatedShape = Array(size).fill().map(() => Array(size).fill(0));
        
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                rotatedShape[col][size - 1 - row] = originalShape[row][col];
            }
        }
        
        // Check if the rotation is valid
        if (isValidMove(rotatedShape, currentTetromino.row, currentTetromino.col)) {
            currentTetromino.shape = rotatedShape;
            drawTetromino();
        } else {
            // Try wall kicks (move left or right if rotation is blocked by wall)
            const kicks = [-1, 1, -2, 2]; // Try these offsets
            for (const kick of kicks) {
                if (isValidMove(rotatedShape, currentTetromino.row, currentTetromino.col + kick)) {
                    currentTetromino.shape = rotatedShape;
                    currentTetromino.col += kick;
                    drawTetromino();
                    return;
                }
            }
        }
    }
    
    // Move the current tetromino down
    function moveDown() {
        if (!currentTetromino) return;
        
        if (isValidMove(currentTetromino.shape, currentTetromino.row + 1, currentTetromino.col)) {
            currentTetromino.row++;
            drawTetromino();
        } else {
            // Lock the piece in place
            lockTetromino();
            
            // Check for completed lines
            checkLines();
            
            // Get the next piece
            currentTetromino = nextTetromino;
            nextTetromino = getRandomTetromino();
            drawNextTetromino();
            
            // Check if game over
            if (!isValidMove(currentTetromino.shape, currentTetromino.row, currentTetromino.col)) {
                endGame();
            }
            
            drawTetromino();
        }
    }
    
    // Move the current tetromino left
    function moveLeft() {
        if (!currentTetromino) return;
        
        if (isValidMove(currentTetromino.shape, currentTetromino.row, currentTetromino.col - 1)) {
            currentTetromino.col--;
            drawTetromino();
        }
    }
    
    // Move the current tetromino right
    function moveRight() {
        if (!currentTetromino) return;
        
        if (isValidMove(currentTetromino.shape, currentTetromino.row, currentTetromino.col + 1)) {
            currentTetromino.col++;
            drawTetromino();
        }
    }
    
    // Hard drop the current tetromino
    function hardDrop() {
        if (!currentTetromino) return;
        
        currentTetromino.row = getDropPosition();
        drawTetromino();
        
        // Lock the piece immediately
        lockTetromino();
        
        // Check for completed lines
        checkLines();
        
        // Get the next piece
        currentTetromino = nextTetromino;
        nextTetromino = getRandomTetromino();
        drawNextTetromino();
        
        // Check if game over
        if (!isValidMove(currentTetromino.shape, currentTetromino.row, currentTetromino.col)) {
            endGame();
        }
        
        drawTetromino();
    }
    
    // Lock the current tetromino in place
    function lockTetromino() {
        currentTetromino.shape.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell) {
                    const boardRow = currentTetromino.row + rowIndex;
                    const boardCol = currentTetromino.col + colIndex;
                    
                    if (boardRow >= 0 && boardRow < 20) {
                        board[boardRow][boardCol] = currentTetromino.color;
                    }
                }
            });
        });
        
        updateBoard();
    }
    
    // Check for completed lines
    function checkLines() {
        let linesCleared = 0;
        
        for (let row = 19; row >= 0; row--) {
            if (board[row].every(cell => cell !== 0)) {
                // Remove the line
                board.splice(row, 1);
                // Add a new empty line at the top
                board.unshift(Array(10).fill(0));
                linesCleared++;
                row++; // Check the same row again
            }
        }
        
        if (linesCleared > 0) {
            // Update score
            const linePoints = [0, 40, 100, 300, 1200]; // Points for 0, 1, 2, 3, 4 lines
            score += linePoints[linesCleared] * level;
            document.getElementById('tetris-score').textContent = score;
            
            // Update level
            level = Math.floor(score / 1000) + 1;
            document.getElementById('tetris-level').textContent = level;
            
            // Update speed
            speed = Math.max(100, 1000 - (level - 1) * 100);
            if (gameInterval) {
                clearInterval(gameInterval);
                gameInterval = setInterval(moveDown, speed);
            }
            
            // Update the board
            updateBoard();
        }
    }
    
    // Start the game
    function startGame() {
        if (gameInterval) clearInterval(gameInterval);
        
        // Reset game state
        board = Array(20).fill().map(() => Array(10).fill(0));
        score = 0;
        level = 1;
        speed = 1000;
        isPaused = false;
        gameOver = false;
        
        document.getElementById('tetris-score').textContent = score;
        document.getElementById('tetris-level').textContent = level;
        
        // Clear the board
        document.querySelectorAll('.tetris-cell').forEach(cell => {
            cell.classList.remove('filled', 'current', 'ghost', 'I', 'O', 'T', 'S', 'Z', 'J', 'L');
        });
        
        // Get the first pieces
        currentTetromino = getRandomTetromino();
        nextTetromino = getRandomTetromino();
        
        drawTetromino();
        drawNextTetromino();
        
        // Start the game loop
        gameInterval = setInterval(moveDown, speed);
        
        // Change button text
        startButton.textContent = 'Restart Game';
    }
    
    // End the game
    function endGame() {
        clearInterval(gameInterval);
        gameOver = true;
        
        // Show game over message
        const gameOverMsg = document.createElement('div');
        gameOverMsg.classList.add('tetris-game-over');
        gameOverMsg.innerHTML = `
            <h2>Game Over</h2>
            <p>Score: ${score}</p>
            <p>Level: ${level}</p>
        `;
        
        tetrisGame.appendChild(gameOverMsg);
        
        // Add game over styles
        const gameOverStyles = document.createElement('style');
        gameOverStyles.textContent = `
            .tetris-game-over {
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
            
            .tetris-game-over h2 {
                color: var(--primary-purple);
                margin-bottom: 15px;
            }
            
            .tetris-game-over p {
                margin-bottom: 10px;
                font-size: 1.2rem;
            }
        `;
        document.head.appendChild(gameOverStyles);
    }
    
    // Pause the game
    function togglePause() {
        if (gameOver) return;
        
        isPaused = !isPaused;
        
        if (isPaused) {
            clearInterval(gameInterval);
            
            // Show pause message
            const pauseMsg = document.createElement('div');
            pauseMsg.classList.add('tetris-pause');
            pauseMsg.innerHTML = '<h2>Paused</h2><p>Press P to resume</p>';
            pauseMsg.id = 'pause-message';
            tetrisGame.appendChild(pauseMsg);
            
            // Add pause styles
            const pauseStyles = document.createElement('style');
            pauseStyles.textContent = `
                .tetris-pause {
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
                
                .tetris-pause h2 {
                    color: var(--primary-purple);
                    margin-bottom: 15px;
                }
            `;
            document.head.appendChild(pauseStyles);
        } else {
            // Remove pause message
            const pauseMsg = document.getElementById('pause-message');
            if (pauseMsg) pauseMsg.remove();
            
            // Resume game
            gameInterval = setInterval(moveDown, speed);
        }
    }
    
    // Keyboard controls
    function handleKeydown(e) {
        if (gameOver) return;
        
        if (e.key === 'p' || e.key === 'P') {
            togglePause();
            return;
        }
        
        if (isPaused) return;
        
        switch (e.key) {
            case 'ArrowLeft':
                moveLeft();
                break;
            case 'ArrowRight':
                moveRight();
                break;
            case 'ArrowDown':
                moveDown();
                break;
            case 'ArrowUp':
                rotateTetromino();
                break;
            case ' ':
                hardDrop();
                break;
        }
    }
    
    // Add event listeners
    document.addEventListener('keydown', handleKeydown);
    startButton.addEventListener('click', startGame);
    
    // Clean up function to remove event listeners when game is closed
    function cleanup() {
        document.removeEventListener('keydown', handleKeydown);
        if (gameInterval) clearInterval(gameInterval);
    }
    
    // Add cleanup to modal close
    const modal = document.getElementById('game-modal');
    modal.addEventListener('close-game', cleanup);
    
    // Add mobile controls for touch devices
    if ('ontouchstart' in window) {
        const touchControls = document.createElement('div');
        touchControls.classList.add('tetris-touch-controls');
        
        touchControls.innerHTML = `
            <button id="tetris-left"><i class="fas fa-arrow-left"></i></button>
            <button id="tetris-rotate"><i class="fas fa-arrow-up"></i></button>
            <button id="tetris-right"><i class="fas fa-arrow-right"></i></button>
            <button id="tetris-down"><i class="fas fa-arrow-down"></i></button>
            <button id="tetris-drop"><i class="fas fa-angle-double-down"></i></button>
        `;
        
        tetrisGame.appendChild(touchControls);
        
        // Add touch control styles
        const touchStyles = document.createElement('style');
        touchStyles.textContent = `
            .tetris-touch-controls {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-top: 20px;
                width: 100%;
            }
            
            .tetris-touch-controls button {
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
            
            .tetris-touch-controls button:active {
                transform: scale(0.95);
            }
        `;
        document.head.appendChild(touchStyles);
        
        // Add touch event listeners
        document.getElementById('tetris-left').addEventListener('click', moveLeft);
        document.getElementById('tetris-right').addEventListener('click', moveRight);
        document.getElementById('tetris-down').addEventListener('click', moveDown);
        document.getElementById('tetris-rotate').addEventListener('click', rotateTetromino);
        document.getElementById('tetris-drop').addEventListener('click', hardDrop);
    }
} 