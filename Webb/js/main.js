// DOM Elements
const gameCards = document.querySelectorAll('.game-card');
const modal = document.getElementById('game-modal');
const modalTitle = document.getElementById('modal-title');
const gameContainer = document.getElementById('game-container');
const closeBtn = document.querySelector('.close-btn');
const themeToggle = document.getElementById('theme-toggle-checkbox');

// Define which games are available
const availableGames = {
    tetris: true,
    pacman: false,
    '2048': true,
    tictactoe: true,
    mario: false,
    flappybird: false,
    snake: true,
    breakout: false
};

// Game modules
const games = {
    tetris: {
        title: 'Tetris',
        load: loadTetris
    },
    pacman: {
        title: 'Pacman',
        load: function() {
            showGameNotAvailable('Pacman');
        }
    },
    '2048': {
        title: '2048',
        load: load2048
    },
    tictactoe: {
        title: 'Tic Tac Toe',
        load: loadTicTacToe
    },
    mario: {
        title: 'Super Mario',
        load: function() {
            showGameNotAvailable('Super Mario');
        }
    },
    flappybird: {
        title: 'Flappy Bird',
        load: function() {
            showGameNotAvailable('Flappy Bird');
        }
    },
    snake: {
        title: 'Snake',
        load: loadSnake
    },
    breakout: {
        title: 'Breakout',
        load: function() {
            showGameNotAvailable('Breakout');
        }
    }
};

// Show message for games that aren't available yet
function showGameNotAvailable(gameName) {
    const notAvailableContainer = document.createElement('div');
    notAvailableContainer.classList.add('game-not-available');
    notAvailableContainer.innerHTML = `
        <h3>${gameName} is coming soon!</h3>
        <p>We're still working on this game. Please try one of our other games in the meantime.</p>
        <div class="game-preview">
            <i class="fas fa-gamepad game-preview-icon"></i>
        </div>
    `;
    gameContainer.appendChild(notAvailableContainer);
    
    // Add styles for not available message
    const notAvailableStyles = document.createElement('style');
    notAvailableStyles.textContent = `
        .game-not-available {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 2rem;
            height: 100%;
            min-height: 400px;
        }
        
        .game-not-available h3 {
            color: var(--primary-purple);
            margin-bottom: 1rem;
            font-size: 1.8rem;
        }
        
        .game-not-available p {
            color: var(--text-dim);
            margin-bottom: 2rem;
            max-width: 600px;
        }
        
        .game-preview {
            width: 150px;
            height: 150px;
            background: linear-gradient(135deg, var(--primary-purple), var(--secondary-purple));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 30px var(--glow-color);
            animation: pulse 2s infinite;
        }
        
        .game-preview-icon {
            font-size: 4rem;
            color: var(--text-light);
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 10px var(--glow-color);
                transform: scale(1);
            }
            50% {
                box-shadow: 0 0 30px var(--glow-color);
                transform: scale(1.05);
            }
            100% {
                box-shadow: 0 0 10px var(--glow-color);
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(notAvailableStyles);
}

// Theme toggle functionality
function initThemeToggle() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark-mode');
        document.documentElement.classList.add('light-mode');
        themeToggle.checked = true;
    } else {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.remove('light-mode');
        themeToggle.checked = false;
    }
    
    // Add event listener for theme toggle
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            // Switch to light mode
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            
            // Add animation to toggle
            animateThemeChange('light');
        } else {
            // Switch to dark mode
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
            
            // Add animation to toggle
            animateThemeChange('dark');
        }
    });
}

// Animate theme change
function animateThemeChange(theme) {
    const body = document.body;
    
    // Create and append overlay for transition effect
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${theme === 'light' ? '#ffffff' : '#121212'};
        opacity: 0;
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    body.appendChild(overlay);
    
    // Trigger animation
    setTimeout(() => {
        overlay.style.opacity = '0.3';
        
        setTimeout(() => {
            overlay.style.opacity = '0';
            
            setTimeout(() => {
                body.removeChild(overlay);
            }, 500);
        }, 300);
    }, 0);
}

// Update game cards to show which games are available
document.addEventListener('DOMContentLoaded', () => {
    gameCards.forEach(card => {
        const gameType = card.getAttribute('data-game');
        const playBtn = card.querySelector('.play-btn');
        
        if (!availableGames[gameType]) {
            // Add "Coming Soon" label
            const comingSoon = document.createElement('div');
            comingSoon.classList.add('coming-soon');
            comingSoon.textContent = 'Coming Soon';
            card.appendChild(comingSoon);
            
            // Update button text
            if (playBtn) {
                playBtn.textContent = 'Preview';
            }
        }
    });
    
    // Add styles for coming soon label
    const comingSoonStyles = document.createElement('style');
    comingSoonStyles.textContent = `
        .coming-soon {
            position: absolute;
            top: 10px;
            right: 10px;
            background: linear-gradient(to right, var(--primary-purple), var(--secondary-purple));
            color: var(--text-light);
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
            box-shadow: 0 0 10px var(--glow-color);
        }
        
        .game-card {
            position: relative;
        }
    `;
    document.head.appendChild(comingSoonStyles);
    
    // Initialize theme toggle
    initThemeToggle();
});

// Event Listeners
gameCards.forEach(card => {
    card.addEventListener('click', (e) => {
        const gameBtn = e.target.closest('.play-btn');
        if (gameBtn) {
            const gameType = card.getAttribute('data-game');
            openGameModal(gameType);
        }
    });
});

closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside the content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Functions
function openGameModal(gameType) {
    if (games[gameType]) {
        modalTitle.textContent = games[gameType].title;
        
        // Clear previous game content
        gameContainer.innerHTML = '';
        
        // Load the game
        games[gameType].load();
        
        // Show modal with animation
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeModal() {
    // Add closing animation
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.animation = 'modalFadeOut 0.3s';
    
    setTimeout(() => {
        modal.style.display = 'none';
        modalContent.style.animation = 'modalFadeIn 0.4s';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
        
        // Stop game if needed
        gameContainer.innerHTML = '';
    }, 300);
}

// Add a subtle parallax effect to the hero section
const hero = document.querySelector('.hero');
window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    hero.style.backgroundPosition = `${x * 50}px ${y * 50}px`;
});

// Breathing animation for game cards
const gameCardsArray = Array.from(gameCards);
gameCardsArray.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Add keyframes for modal closing animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes modalFadeOut {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-50px);
    }
}
`;
document.head.appendChild(style);

// Initialize the page with some animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate the hero content
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'all 1s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 300);
    
    // Animate the game cards
    gameCardsArray.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
}); 