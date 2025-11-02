class GameManager {
    constructor(canvas, engine, world) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.engine = engine;
        this.world = world;
        this.raceManager = new RaceManager(world, engine);
        this.platforms = [];
        this.selectedColorIndex = null;
        this.gameState = 'colorSelection'; // colorSelection, racing, result
        
        // Setup fireworks
        const fireworksCanvas = document.getElementById('fireworks-canvas');
        this.fireworks = new Fireworks(fireworksCanvas);
        
        this.setupCanvas();
        this.setupEventListeners();
    }
    
    setupCanvas() {
        const updateCanvasSize = () => {
            this.canvas.width = CONFIG.canvasWidth;
            this.canvas.height = CONFIG.canvasHeight;
        };
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
    }
    
    setupEventListeners() {
        // Create color selection buttons
        const colorButtonsContainer = document.getElementById('color-buttons');
        COLORS.forEach((color, index) => {
            const btn = document.createElement('button');
            btn.className = 'color-btn';
            btn.style.backgroundColor = color;
            btn.textContent = COLOR_NAMES[index];
            btn.addEventListener('click', () => this.selectColor(index));
            colorButtonsContainer.appendChild(btn);
        });
        
        // Play again button
        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.resetGame();
        });
    }
    
    selectColor(colorIndex) {
        this.selectedColorIndex = colorIndex;
        this.gameState = 'racing';
        
        // Hide color selection, show game screen
        document.getElementById('color-selection-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        document.getElementById('result-screen').classList.add('hidden');
        
        // Generate new level
        this.generateLevel();
        
        // Create marbles
        this.raceManager.createMarbles();
        
        // Start race
        this.raceManager.startRace();
        
        // Update HUD
        const selectedColorDisplay = document.getElementById('selected-color-display');
        selectedColorDisplay.textContent = `You chose: ${COLOR_NAMES[colorIndex]}`;
        selectedColorDisplay.style.color = COLORS[colorIndex];
        
        // Start game loop
        this.gameLoop();
    }
    
    generateLevel() {
        // Clear existing platforms
        this.platforms.forEach(platform => {
            Matter.World.remove(this.world, platform);
        });
        this.platforms = [];
        
        // Generate new platforms
        this.platforms = LevelGenerator.generatePlatforms(this.world);
    }
    
    gameLoop() {
        if (this.gameState !== 'racing') return;
        
        // Update physics
        Matter.Engine.update(this.engine);
        
        // Check for winner
        const raceFinished = this.raceManager.update();
        
        // Update results display
        this.updateResultsDisplay();
        
        if (raceFinished) {
            this.handleRaceEnd();
            return;
        }
        
        // Render
        this.render();
        
        // Continue loop
        requestAnimationFrame(() => this.gameLoop());
    }
    
    updateResultsDisplay() {
        const finishedMarbles = this.raceManager.getFinishedMarbles();
        const resultsDisplay = document.getElementById('results-display');
        
        if (finishedMarbles.length === 0) {
            resultsDisplay.innerHTML = '';
            return;
        }
        
        let html = '';
        finishedMarbles.forEach((finish, index) => {
            const position = index + 1;
            const marble = finish.marble;
            const time = finish.time;
            
            // Format time as 00:08.031
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            const milliseconds = Math.floor((time % 1) * 1000);
            const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
            
            const className = position === 1 ? 'winner' : 'other';
            const color = position === 1 ? '#f00' : '#fff';
            
            html += `<div class="result-line ${className}" style="color: ${color}">${position}. ${marble.colorName} (${timeStr})</div>`;
        });
        
        resultsDisplay.innerHTML = html;
    }
    
    handleRaceEnd() {
        const winner = this.raceManager.getWinner();
        const winnerColorIndex = winner.colorIndex;
        const isWin = winnerColorIndex === this.selectedColorIndex;
        
        // Find player's place in the results
        const finishedMarbles = this.raceManager.getFinishedMarbles();
        let playerPlace = null;
        finishedMarbles.forEach((finish, index) => {
            if (finish.marble.colorIndex === this.selectedColorIndex) {
                playerPlace = index + 1; // 1-based position
            }
        });
        
        this.gameState = 'result';
        
        // Show result screen
        document.getElementById('game-screen').classList.add('hidden');
        document.getElementById('result-screen').classList.remove('hidden');
        
        const resultMessage = document.getElementById('result-message');
        if (isWin) {
            resultMessage.textContent = 'You Win!';
            resultMessage.className = 'win';
            // Start fireworks celebration
            this.fireworks.start();
        } else {
            // Show place on loss screen - formatted per line
            const placeText = this.getPlaceText(playerPlace);
            resultMessage.innerHTML = `Try Again<br><br>You Got ${placeText}`;
            resultMessage.className = 'lose';
            // Stop any fireworks
            this.fireworks.stop();
        }
    }
    
    getPlaceText(place) {
        if (place === null) return 'Last Place';
        
        const suffixes = ['', 'st', 'nd', 'rd'];
        const lastDigit = place % 10;
        const lastTwoDigits = place % 100;
        
        // Handle 11th, 12th, 13th (all end in 'th')
        if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
            return place + 'th Place';
        }
        
        // Handle 1st, 2nd, 3rd
        if (lastDigit >= 1 && lastDigit <= 3 && place < 10) {
            return place + suffixes[lastDigit] + ' Place';
        }
        
        // Everything else is 'th'
        return place + 'th Place';
    }
    
    render() {
        // Clear canvas with black background
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw bottom boundary line (finish line)
        this.ctx.strokeStyle = '#FFFF00';
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([10, 5]);
        this.ctx.beginPath();
        this.ctx.moveTo(0, CONFIG.bottomBoundary);
        this.ctx.lineTo(this.canvas.width, CONFIG.bottomBoundary);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        
        // Draw platforms (sloped white rectangles)
        this.platforms.forEach(platform => {
            this.ctx.save();
            this.ctx.translate(platform.position.x, platform.position.y);
            this.ctx.rotate(platform.angle);
            
            const width = platform.originalWidth || (platform.bounds.max.x - platform.bounds.min.x);
            const height = platform.originalHeight || CONFIG.platformHeight;
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillRect(-width / 2, -height / 2, width, height);
            
            this.ctx.restore();
        });
        
        // Draw marbles
        this.raceManager.marbles.forEach(marble => {
            const pos = marble.getPosition();
            this.ctx.fillStyle = marble.color;
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, CONFIG.marbleRadius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.strokeStyle = '#000';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });
    }
    
    resetGame() {
        // Stop fireworks
        this.fireworks.stop();
        
        // Reset race manager
        this.raceManager.reset();
        
        // Reset game state
        this.selectedColorIndex = null;
        this.gameState = 'colorSelection';
        
        // Show color selection screen
        document.getElementById('color-selection-screen').classList.remove('hidden');
        document.getElementById('game-screen').classList.add('hidden');
        document.getElementById('result-screen').classList.add('hidden');
        
        // Reset selected color display
        const selectedColorDisplay = document.getElementById('selected-color-display');
        selectedColorDisplay.textContent = '';
    }
}

