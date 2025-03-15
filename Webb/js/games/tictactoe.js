/**
 * Tic Tac Toe Game Implementation
 * Play against an AI with a purple theme
 */

function loadTicTacToe() {
    const tictactoeGame = document.getElementById('tictactoe-game');
    
    // Create game elements
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('tictactoe-board');
    
    const gameInfo = document.createElement('div');
    gameInfo.classList.add('tictactoe-info');
    
    // Add game elements to container
    tictactoeGame.appendChild(gameBoard);
    tictactoeGame.appendChild(gameInfo);
    
    // Add game info elements
    const statusDisplay = document.createElement('div');
    statusDisplay.classList.add('tictactoe-status');
    statusDisplay.innerHTML = '<h3>Status</h3><p id="tictactoe-status">Your turn (X)</p>';
    
    const scoreDisplay = document.createElement('div');
    scoreDisplay.classList.add('tictactoe-score');
    scoreDisplay.innerHTML = '<h3>Score</h3><div class="score-container"><p>You: <span id="player-score">0</span></p><p>AI: <span id="ai-score">0</span></p></div>';
    
    const difficultyDisplay = document.createElement('div');
    difficultyDisplay.classList.add('tictactoe-difficulty');
    difficultyDisplay.innerHTML = `
        <h3>Difficulty</h3>
        <div class="difficulty-buttons">
            <button id="easy-btn" class="active">Easy</button>
            <button id="medium-btn">Medium</button>
            <button id="hard-btn">Hard</button>
        </div>
    `;
    
    const restartButton = document.createElement('button');
    restartButton.classList.add('tictactoe-restart');
    restartButton.textContent = 'New Game';
    
    // Add info elements to game info container
    gameInfo.appendChild(statusDisplay);
    gameInfo.appendChild(scoreDisplay);
    gameInfo.appendChild(difficultyDisplay);
    gameInfo.appendChild(restartButton);
    
    // Add game styles
    const tictactoeStyles = document.createElement('style');
    tictactoeStyles.textContent = `
        .tictactoe-board {
            width: 300px;
            height: 300px;
            background-color: rgba(30, 30, 30, 0.8);
            border: 2px solid var(--primary-purple);
            box-shadow: 0 0 15px var(--glow-color);
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
            gap: 6px;
            padding: 6px;
            border-radius: 8px;
        }
        
        #tictactoe-game {
            display: flex;
            justify-content: center;
            gap: 20px;
            padding: 20px;
            height: 100%;
            flex-wrap: wrap;
        }
        
        .tictactoe-info {
            display: flex;
            flex-direction: column;
            gap: 20px;
            min-width: 200px;
        }
        
        .tictactoe-status, .tictactoe-score, .tictactoe-difficulty {
            background-color: rgba(30, 30, 30, 0.8);
            border: 1px solid var(--primary-purple);
            border-radius: 4px;
            padding: 10px;
            box-shadow: 0 0 10px rgba(138, 43, 226, 0.3);
        }
        
        .tictactoe-status h3, .tictactoe-score h3, .tictactoe-difficulty h3 {
            margin-bottom: 10px;
            font-size: 1rem;
            text-align: center;
        }
        
        #tictactoe-status {
            font-size: 1.1rem;
            text-align: center;
            color: var(--text-light);
        }
        
        .score-container {
            display: flex;
            justify-content: space-around;
        }
        
        .score-container p {
            font-size: 1rem;
        }
        
        #player-score, #ai-score {
            font-weight: bold;
            color: var(--primary-purple);
        }
        
        .difficulty-buttons {
            display: flex;
            justify-content: center;
            gap: 5px;
        }
        
        .difficulty-buttons button {
            padding: 5px 10px;
            background-color: rgba(20, 20, 20, 0.8);
            color: var(--text-light);
            border: 1px solid var(--secondary-purple);
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .difficulty-buttons button:hover {
            background-color: rgba(138, 43, 226, 0.2);
        }
        
        .difficulty-buttons button.active {
            background: linear-gradient(to right, var(--primary-purple), var(--secondary-purple));
            box-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
        }
        
        .tictactoe-restart {
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
        
        .tictactoe-restart:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(138, 43, 226, 0.5);
        }
        
        .tictactoe-cell {
            background-color: rgba(20, 20, 20, 0.5);
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 3rem;
            font-weight: bold;
            color: var(--text-light);
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .tictactoe-cell:hover:not(.filled) {
            background-color: rgba(138, 43, 226, 0.2);
            box-shadow: 0 0 10px rgba(138, 43, 226, 0.3);
        }
        
        .tictactoe-cell.filled {
            cursor: not-allowed;
        }
        
        .tictactoe-cell.x {
            color: #9370db;
            text-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
        }
        
        .tictactoe-cell.o {
            color: #ff6b6b;
            text-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
        }
        
        .tictactoe-cell.winning {
            background-color: rgba(138, 43, 226, 0.3);
            animation: pulse 1s infinite;
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 5px rgba(138, 43, 226, 0.5);
            }
            50% {
                box-shadow: 0 0 20px rgba(138, 43, 226, 0.8);
            }
            100% {
                box-shadow: 0 0 5px rgba(138, 43, 226, 0.5);
            }
        }
        
        @media (max-width: 768px) {
            #tictactoe-game {
                flex-direction: column;
                align-items: center;
            }
            
            .tictactoe-board {
                width: 280px;
                height: 280px;
            }
            
            .tictactoe-info {
                width: 280px;
            }
        }
    `;
    document.head.appendChild(tictactoeStyles);
    
    // Create the game board cells
    function createGameBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('tictactoe-cell');
            cell.setAttribute('data-index', i);
            gameBoard.appendChild(cell);
        }
    }
    
    // Initialize the game board
    createGameBoard();
    
    // Game variables
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    let difficulty = 'easy';
    let playerScore = 0;
    let aiScore = 0;
    
    // Winning combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    
    // Status messages
    const winMessage = () => `Player ${currentPlayer} wins!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `Your turn (X)`;
    const aiTurn = () => `AI's turn (O)`;
    
    // Event listeners for cells
    document.querySelectorAll('.tictactoe-cell').forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
    });
    
    // Event listener for restart button
    restartButton.addEventListener('click', restartGame);
    
    // Event listeners for difficulty buttons
    document.getElementById('easy-btn').addEventListener('click', () => setDifficulty('easy'));
    document.getElementById('medium-btn').addEventListener('click', () => setDifficulty('medium'));
    document.getElementById('hard-btn').addEventListener('click', () => setDifficulty('hard'));
    
    // Handle cell click
    function handleCellClick(cell) {
        const index = parseInt(cell.getAttribute('data-index'));
        
        if (board[index] !== '' || !gameActive || currentPlayer !== 'X') return;
        
        // Update the board
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('filled', 'x');
        
        // Check for win or draw
        if (checkWin()) {
            endGame(false);
            return;
        }
        
        if (checkDraw()) {
            endGame(true);
            return;
        }
        
        // Switch to AI player
        currentPlayer = 'O';
        document.getElementById('tictactoe-status').textContent = aiTurn();
        
        // AI makes a move after a short delay
        setTimeout(() => {
            if (gameActive) makeAIMove();
        }, 500);
    }
    
    // Make AI move based on difficulty
    function makeAIMove() {
        let index;
        
        switch (difficulty) {
            case 'easy':
                index = getRandomMove();
                break;
            case 'medium':
                // 50% chance of making a smart move
                index = Math.random() < 0.5 ? getSmartMove() : getRandomMove();
                break;
            case 'hard':
                index = getSmartMove();
                break;
            default:
                index = getRandomMove();
        }
        
        // Update the board
        board[index] = currentPlayer;
        const cell = document.querySelector(`.tictactoe-cell[data-index="${index}"]`);
        cell.textContent = currentPlayer;
        cell.classList.add('filled', 'o');
        
        // Check for win or draw
        if (checkWin()) {
            endGame(false);
            return;
        }
        
        if (checkDraw()) {
            endGame(true);
            return;
        }
        
        // Switch back to player
        currentPlayer = 'X';
        document.getElementById('tictactoe-status').textContent = currentPlayerTurn();
    }
    
    // Get a random valid move
    function getRandomMove() {
        const emptyCells = board.reduce((acc, cell, index) => {
            if (cell === '') acc.push(index);
            return acc;
        }, []);
        
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
    
    // Get a smart move using minimax algorithm
    function getSmartMove() {
        // First check if AI can win in the next move
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                if (checkWinForPlayer('O')) {
                    board[i] = '';
                    return i;
                }
                board[i] = '';
            }
        }
        
        // Then check if player can win in the next move and block
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                if (checkWinForPlayer('X')) {
                    board[i] = '';
                    return i;
                }
                board[i] = '';
            }
        }
        
        // Take center if available
        if (board[4] === '') return 4;
        
        // Take corners if available
        const corners = [0, 2, 6, 8].filter(i => board[i] === '');
        if (corners.length > 0) {
            return corners[Math.floor(Math.random() * corners.length)];
        }
        
        // Take any available edge
        const edges = [1, 3, 5, 7].filter(i => board[i] === '');
        if (edges.length > 0) {
            return edges[Math.floor(Math.random() * edges.length)];
        }
        
        // Fallback to random move
        return getRandomMove();
    }
    
    // Check if the current player has won
    function checkWin() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            if (
                board[a] !== '' &&
                board[a] === board[b] &&
                board[a] === board[c]
            ) {
                // Highlight the winning cells
                document.querySelector(`.tictactoe-cell[data-index="${a}"]`).classList.add('winning');
                document.querySelector(`.tictactoe-cell[data-index="${b}"]`).classList.add('winning');
                document.querySelector(`.tictactoe-cell[data-index="${c}"]`).classList.add('winning');
                return true;
            }
            return false;
        });
    }
    
    // Check if a specific player has won (used for AI logic)
    function checkWinForPlayer(player) {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return (
                board[a] === player &&
                board[b] === player &&
                board[c] === player
            );
        });
    }
    
    // Check if the game is a draw
    function checkDraw() {
        return board.every(cell => cell !== '');
    }
    
    // End the game
    function endGame(isDraw) {
        gameActive = false;
        
        if (isDraw) {
            document.getElementById('tictactoe-status').textContent = drawMessage();
        } else {
            document.getElementById('tictactoe-status').textContent = winMessage();
            
            // Update scores
            if (currentPlayer === 'X') {
                playerScore++;
                document.getElementById('player-score').textContent = playerScore;
            } else {
                aiScore++;
                document.getElementById('ai-score').textContent = aiScore;
            }
        }
    }
    
    // Restart the game
    function restartGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        
        // Clear the board
        document.querySelectorAll('.tictactoe-cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('filled', 'x', 'o', 'winning');
        });
        
        // Reset status
        document.getElementById('tictactoe-status').textContent = currentPlayerTurn();
    }
    
    // Set difficulty level
    function setDifficulty(level) {
        difficulty = level;
        
        // Update UI
        document.querySelectorAll('.difficulty-buttons button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.getElementById(`${level}-btn`).classList.add('active');
        
        // Restart game when difficulty changes
        restartGame();
    }
    
    // Clean up function
    function cleanup() {
        document.querySelectorAll('.tictactoe-cell').forEach(cell => {
            cell.removeEventListener('click', handleCellClick);
        });
    }
    
    // Add cleanup to modal close
    const modal = document.getElementById('game-modal');
    modal.addEventListener('close-game', cleanup);
} 