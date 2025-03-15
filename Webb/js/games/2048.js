/**
 * 2048 Game Implementation
 * A sliding tile puzzle game with a purple theme
 */

function load2048() {
    const game2048 = document.getElementById('game-2048');
    
    // Create game elements
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('game-2048-board');
    
    const gameInfo = document.createElement('div');
    gameInfo.classList.add('game-2048-info');
    
    // Add game elements to container
    game2048.appendChild(gameBoard);
    game2048.appendChild(gameInfo);
    
    // Add game info elements
    const scoreDisplay = document.createElement('div');
    scoreDisplay.classList.add('game-2048-score');
    scoreDisplay.innerHTML = '<h3>Score</h3><p id="game-2048-score">0</p>';
    
    const bestScoreDisplay = document.createElement('div');
    bestScoreDisplay.classList.add('game-2048-best');
    bestScoreDisplay.innerHTML = '<h3>Best</h3><p id="game-2048-best">0</p>';
    
    const controlsDisplay = document.createElement('div');
    controlsDisplay.classList.add('game-2048-controls');
    controlsDisplay.innerHTML = `
        <h3>Controls</h3>
        <p>← → ↑ ↓ : Slide Tiles</p>
        <p>R : Restart Game</p>
    `;
    
    const startButton = document.createElement('button');
    startButton.classList.add('game-2048-start');
    startButton.textContent = 'New Game';
    
    // Add info elements to game info container
    gameInfo.appendChild(scoreDisplay);
    gameInfo.appendChild(bestScoreDisplay);
    gameInfo.appendChild(controlsDisplay);
    gameInfo.appendChild(startButton);
    
    // Add game styles
    const game2048Styles = document.createElement('style');
    game2048Styles.textContent = `
        .game-2048-board {
            width: 400px;
            height: 400px;
            background-color: rgba(30, 30, 30, 0.8);
            border: 2px solid var(--primary-purple);
            box-shadow: 0 0 15px var(--glow-color);
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(4, 1fr);
            gap: 10px;
            padding: 10px;
            border-radius: 8px;
            position: relative;
        }
        
        #game-2048 {
            display: flex;
            justify-content: center;
            gap: 20px;
            padding: 20px;
            height: 100%;
            flex-wrap: wrap;
        }
        
        .game-2048-info {
            display: flex;
            flex-direction: column;
            gap: 20px;
            min-width: 200px;
        }
        
        .game-2048-score, .game-2048-best, .game-2048-controls {
            background-color: rgba(30, 30, 30, 0.8);
            border: 1px solid var(--primary-purple);
            border-radius: 4px;
            padding: 10px;
            box-shadow: 0 0 10px rgba(138, 43, 226, 0.3);
        }
        
        .game-2048-score h3, .game-2048-best h3, .game-2048-controls h3 {
            margin-bottom: 10px;
            font-size: 1rem;
            text-align: center;
        }
        
        #game-2048-score, #game-2048-best {
            font-size: 1.5rem;
            text-align: center;
            color: var(--primary-purple);
            font-weight: bold;
        }
        
        .game-2048-controls p {
            font-size: 0.9rem;
            margin-bottom: 5px;
        }
        
        .game-2048-start {
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
        
        .game-2048-start:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(138, 43, 226, 0.5);
        }
        
        .game-2048-tile {
            background-color: rgba(20, 20, 20, 0.5);
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
            font-weight: bold;
            color: var(--text-light);
            transition: all 0.15s ease;
            position: relative;
            overflow: hidden;
        }
        
        .game-2048-tile.tile-2 {
            background-color: #9370db;
            color: #fff;
        }
        
        .game-2048-tile.tile-4 {
            background-color: #8a2be2;
            color: #fff;
        }
        
        .game-2048-tile.tile-8 {
            background-color: #7b68ee;
            color: #fff;
        }
        
        .game-2048-tile.tile-16 {
            background-color: #6a5acd;
            color: #fff;
        }
        
        .game-2048-tile.tile-32 {
            background-color: #5e4fa2;
            color: #fff;
        }
        
        .game-2048-tile.tile-64 {
            background-color: #483d8b;
            color: #fff;
        }
        
        .game-2048-tile.tile-128 {
            background-color: #4b0082;
            color: #fff;
            font-size: 1.8rem;
        }
        
        .game-2048-tile.tile-256 {
            background-color: #800080;
            color: #fff;
            font-size: 1.8rem;
        }
        
        .game-2048-tile.tile-512 {
            background-color: #9400d3;
            color: #fff;
            font-size: 1.8rem;
            box-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
        }
        
        .game-2048-tile.tile-1024 {
            background-color: #8b008b;
            color: #fff;
            font-size: 1.5rem;
            box-shadow: 0 0 15px rgba(138, 43, 226, 0.6);
        }
        
        .game-2048-tile.tile-2048 {
            background-color: #4b0082;
            color: #fff;
            font-size: 1.5rem;
            box-shadow: 0 0 20px rgba(138, 43, 226, 0.8);
        }
        
        .game-2048-tile.tile-super {
            background-color: #2e0854;
            color: #fff;
            font-size: 1.3rem;
            box-shadow: 0 0 25px rgba(138, 43, 226, 1);
        }
        
        .game-2048-tile.new-tile {
            animation: appear 0.2s;
        }
        
        .game-2048-tile.merged {
            animation: pop 0.2s;
        }
        
        @keyframes appear {
            0% {
                opacity: 0;
                transform: scale(0);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes pop {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
        
        @media (max-width: 768px) {
            #game-2048 {
                flex-direction: column;
                align-items: center;
            }
            
            .game-2048-board {
                width: 300px;
                height: 300px;
                gap: 8px;
                padding: 8px;
            }
            
            .game-2048-tile {
                font-size: 1.5rem;
            }
            
            .game-2048-tile.tile-128, .game-2048-tile.tile-256, .game-2048-tile.tile-512 {
                font-size: 1.3rem;
            }
            
            .game-2048-tile.tile-1024, .game-2048-tile.tile-2048, .game-2048-tile.tile-super {
                font-size: 1.1rem;
            }
            
            .game-2048-info {
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .game-2048-score, .game-2048-best {
                min-width: 100px;
            }
        }
    `;
    document.head.appendChild(game2048Styles);
    
    // Initialize the game board
    createGameBoard();
    
    // Game variables
    let board = Array(4).fill().map(() => Array(4).fill(0));
    let score = 0;
    let bestScore = localStorage.getItem('2048-best-score') || 0;
    let gameOver = false;
    let won = false;
    
    // Update best score display
    document.getElementById('game-2048-best').textContent = bestScore;
    
    // Create the game board cells
    function createGameBoard() {
        const board = document.querySelector('.game-2048-board');
        
        // Create 4x4 grid of cells
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const tile = document.createElement('div');
                tile.classList.add('game-2048-tile');
                tile.setAttribute('data-row', row);
                tile.setAttribute('data-col', col);
                board.appendChild(tile);
            }
        }
    }
    
    // Start a new game
    function startGame() {
        // Clear the board
        board = Array(4).fill().map(() => Array(4).fill(0));
        score = 0;
        gameOver = false;
        won = false;
        
        document.getElementById('game-2048-score').textContent = score;
        
        // Remove any game over or win message
        const gameOverMsg = document.querySelector('.game-2048-game-over');
        if (gameOverMsg) gameOverMsg.remove();
        
        const winMsg = document.querySelector('.game-2048-win');
        if (winMsg) winMsg.remove();
        
        // Add two initial tiles
        addRandomTile();
        addRandomTile();
        
        // Update the board display
        updateBoardDisplay();
    }
    
    // Add a random tile (2 or 4) to an empty spot
    function addRandomTile() {
        // Find all empty cells
        const emptyCells = [];
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] === 0) {
                    emptyCells.push({ row, col });
                }
            }
        }
        
        // If there are empty cells, add a new tile
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
            
            // Mark the tile as new for animation
            const tile = document.querySelector(`.game-2048-tile[data-row="${randomCell.row}"][data-col="${randomCell.col}"]`);
            if (tile) {
                tile.classList.add('new-tile');
                setTimeout(() => {
                    tile.classList.remove('new-tile');
                }, 200);
            }
        }
    }
    
    // Update the board display based on the current state
    function updateBoardDisplay() {
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const tile = document.querySelector(`.game-2048-tile[data-row="${row}"][data-col="${col}"]`);
                const value = board[row][col];
                
                // Clear existing classes
                tile.className = 'game-2048-tile';
                
                // Set the tile value
                if (value !== 0) {
                    tile.textContent = value;
                    tile.classList.add(`tile-${value <= 2048 ? value : 'super'}`);
                } else {
                    tile.textContent = '';
                }
            }
        }
    }
    
    // Move tiles in a direction
    function moveTiles(direction) {
        if (gameOver) return false;
        
        let moved = false;
        const newBoard = Array(4).fill().map(() => Array(4).fill(0));
        
        // Process each row/column based on direction
        if (direction === 'left' || direction === 'right') {
            // Process rows
            for (let row = 0; row < 4; row++) {
                const currentRow = board[row].filter(cell => cell !== 0);
                const mergedRow = [];
                
                if (direction === 'left') {
                    // Merge tiles from left to right
                    for (let i = 0; i < currentRow.length; i++) {
                        if (i < currentRow.length - 1 && currentRow[i] === currentRow[i + 1]) {
                            mergedRow.push(currentRow[i] * 2);
                            score += currentRow[i] * 2;
                            i++;
                            moved = true;
                        } else {
                            mergedRow.push(currentRow[i]);
                        }
                    }
                    
                    // Fill the new row
                    for (let i = 0; i < 4; i++) {
                        newBoard[row][i] = i < mergedRow.length ? mergedRow[i] : 0;
                    }
                } else {
                    // Merge tiles from right to left
                    for (let i = currentRow.length - 1; i >= 0; i--) {
                        if (i > 0 && currentRow[i] === currentRow[i - 1]) {
                            mergedRow.unshift(currentRow[i] * 2);
                            score += currentRow[i] * 2;
                            i--;
                            moved = true;
                        } else {
                            mergedRow.unshift(currentRow[i]);
                        }
                    }
                    
                    // Fill the new row
                    for (let i = 0; i < 4; i++) {
                        newBoard[row][i] = i >= 4 - mergedRow.length ? mergedRow[i - (4 - mergedRow.length)] : 0;
                    }
                }
                
                // Check if the row has changed
                if (!moved) {
                    moved = !board[row].every((val, idx) => val === newBoard[row][idx]);
                }
            }
        } else {
            // Process columns
            for (let col = 0; col < 4; col++) {
                const currentCol = [];
                for (let row = 0; row < 4; row++) {
                    if (board[row][col] !== 0) {
                        currentCol.push(board[row][col]);
                    }
                }
                
                const mergedCol = [];
                
                if (direction === 'up') {
                    // Merge tiles from top to bottom
                    for (let i = 0; i < currentCol.length; i++) {
                        if (i < currentCol.length - 1 && currentCol[i] === currentCol[i + 1]) {
                            mergedCol.push(currentCol[i] * 2);
                            score += currentCol[i] * 2;
                            i++;
                            moved = true;
                        } else {
                            mergedCol.push(currentCol[i]);
                        }
                    }
                    
                    // Fill the new column
                    for (let i = 0; i < 4; i++) {
                        newBoard[i][col] = i < mergedCol.length ? mergedCol[i] : 0;
                    }
                } else {
                    // Merge tiles from bottom to top
                    for (let i = currentCol.length - 1; i >= 0; i--) {
                        if (i > 0 && currentCol[i] === currentCol[i - 1]) {
                            mergedCol.unshift(currentCol[i] * 2);
                            score += currentCol[i] * 2;
                            i--;
                            moved = true;
                        } else {
                            mergedCol.unshift(currentCol[i]);
                        }
                    }
                    
                    // Fill the new column
                    for (let i = 0; i < 4; i++) {
                        newBoard[i][col] = i >= 4 - mergedCol.length ? mergedCol[i - (4 - mergedCol.length)] : 0;
                    }
                }
                
                // Check if the column has changed
                if (!moved) {
                    for (let row = 0; row < 4; row++) {
                        if (board[row][col] !== newBoard[row][col]) {
                            moved = true;
                            break;
                        }
                    }
                }
            }
        }
        
        // Update the board if tiles moved
        if (moved) {
            board = newBoard;
            
            // Update score
            document.getElementById('game-2048-score').textContent = score;
            
            // Update best score if needed
            if (score > bestScore) {
                bestScore = score;
                document.getElementById('game-2048-best').textContent = bestScore;
                localStorage.setItem('2048-best-score', bestScore);
            }
            
            // Add a new random tile
            addRandomTile();
            
            // Update the board display
            updateBoardDisplay();
            
            // Check for win or game over
            checkGameStatus();
        }
        
        return moved;
    }
    
    // Check if the game is over or won
    function checkGameStatus() {
        // Check for 2048 tile (win condition)
        if (!won) {
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    if (board[row][col] === 2048) {
                        won = true;
                        showWinMessage();
                        return;
                    }
                }
            }
        }
        
        // Check if the board is full
        let isFull = true;
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] === 0) {
                    isFull = false;
                    break;
                }
            }
            if (!isFull) break;
        }
        
        // If the board is full, check if any moves are possible
        if (isFull) {
            let movePossible = false;
            
            // Check horizontal adjacency
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 3; col++) {
                    if (board[row][col] === board[row][col + 1]) {
                        movePossible = true;
                        break;
                    }
                }
                if (movePossible) break;
            }
            
            // Check vertical adjacency
            if (!movePossible) {
                for (let col = 0; col < 4; col++) {
                    for (let row = 0; row < 3; row++) {
                        if (board[row][col] === board[row + 1][col]) {
                            movePossible = true;
                            break;
                        }
                    }
                    if (movePossible) break;
                }
            }
            
            // If no moves are possible, game over
            if (!movePossible) {
                gameOver = true;
                showGameOverMessage();
            }
        }
    }
    
    // Show game over message
    function showGameOverMessage() {
        const gameOverMsg = document.createElement('div');
        gameOverMsg.classList.add('game-2048-game-over');
        gameOverMsg.innerHTML = `
            <h2>Game Over</h2>
            <p>Score: ${score}</p>
            <p>Best: ${bestScore}</p>
        `;
        
        game2048.appendChild(gameOverMsg);
        
        // Add game over styles
        const gameOverStyles = document.createElement('style');
        gameOverStyles.textContent = `
            .game-2048-game-over {
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
            
            .game-2048-game-over h2 {
                color: var(--primary-purple);
                margin-bottom: 15px;
            }
            
            .game-2048-game-over p {
                margin-bottom: 10px;
                font-size: 1.2rem;
            }
        `;
        document.head.appendChild(gameOverStyles);
    }
    
    // Show win message
    function showWinMessage() {
        const winMsg = document.createElement('div');
        winMsg.classList.add('game-2048-win');
        winMsg.innerHTML = `
            <h2>You Win!</h2>
            <p>You reached 2048!</p>
            <p>Score: ${score}</p>
            <p>Continue playing?</p>
            <div class="win-buttons">
                <button id="continue-btn">Continue</button>
                <button id="new-game-btn">New Game</button>
            </div>
        `;
        
        game2048.appendChild(winMsg);
        
        // Add win styles
        const winStyles = document.createElement('style');
        winStyles.textContent = `
            .game-2048-win {
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
            
            .game-2048-win h2 {
                color: var(--primary-purple);
                margin-bottom: 15px;
            }
            
            .game-2048-win p {
                margin-bottom: 10px;
                font-size: 1.2rem;
            }
            
            .win-buttons {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-top: 15px;
            }
            
            .win-buttons button {
                padding: 8px 15px;
                background: linear-gradient(to right, var(--primary-purple), var(--secondary-purple));
                color: var(--text-light);
                border: none;
                border-radius: 4px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .win-buttons button:hover {
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(138, 43, 226, 0.3);
            }
        `;
        document.head.appendChild(winStyles);
        
        // Add event listeners to buttons
        document.getElementById('continue-btn').addEventListener('click', () => {
            winMsg.remove();
        });
        
        document.getElementById('new-game-btn').addEventListener('click', () => {
            winMsg.remove();
            startGame();
        });
    }
    
    // Keyboard controls
    function handleKeydown(e) {
        if (gameOver) return;
        
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                moveTiles('left');
                break;
            case 'ArrowRight':
                e.preventDefault();
                moveTiles('right');
                break;
            case 'ArrowUp':
                e.preventDefault();
                moveTiles('up');
                break;
            case 'ArrowDown':
                e.preventDefault();
                moveTiles('down');
                break;
            case 'r':
            case 'R':
                startGame();
                break;
        }
    }
    
    // Touch controls
    let touchStartX = 0;
    let touchStartY = 0;
    
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }
    
    function handleTouchEnd(e) {
        if (gameOver) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        // Determine the direction of the swipe
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            if (diffX > 20) {
                moveTiles('right');
            } else if (diffX < -20) {
                moveTiles('left');
            }
        } else {
            // Vertical swipe
            if (diffY > 20) {
                moveTiles('down');
            } else if (diffY < -20) {
                moveTiles('up');
            }
        }
    }
    
    // Add event listeners
    document.addEventListener('keydown', handleKeydown);
    startButton.addEventListener('click', startGame);
    
    // Add touch event listeners
    gameBoard.addEventListener('touchstart', handleTouchStart, { passive: true });
    gameBoard.addEventListener('touchend', handleTouchEnd);
    
    // Clean up function to remove event listeners when game is closed
    function cleanup() {
        document.removeEventListener('keydown', handleKeydown);
        gameBoard.removeEventListener('touchstart', handleTouchStart);
        gameBoard.removeEventListener('touchend', handleTouchEnd);
    }
    
    // Add cleanup to modal close
    const modal = document.getElementById('game-modal');
    modal.addEventListener('close-game', cleanup);
    
    // Start the game
    startGame();
} 