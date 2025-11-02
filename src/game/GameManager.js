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
        // Clear canvas with dark gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(1, '#000000');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw bottom boundary line (finish line) with glow effect
        this.ctx.shadowColor = '#FFFF00';
        this.ctx.shadowBlur = 15;
        this.ctx.strokeStyle = '#FFFF00';
        this.ctx.lineWidth = 4;
        this.ctx.setLineDash([15, 8]);
        this.ctx.beginPath();
        this.ctx.moveTo(0, CONFIG.bottomBoundary);
        this.ctx.lineTo(this.canvas.width, CONFIG.bottomBoundary);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        this.ctx.shadowBlur = 0;
        
        // Draw platforms (sloped white rectangles with shadows and highlights)
        this.platforms.forEach(platform => {
            this.ctx.save();
            this.ctx.translate(platform.position.x, platform.position.y);
            this.ctx.rotate(platform.angle);
            
            const width = platform.originalWidth || (platform.bounds.max.x - platform.bounds.min.x);
            const height = platform.originalHeight || CONFIG.platformHeight;
            
            // Draw shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.fillRect(-width / 2 + 3, -height / 2 + 3, width, height);
            
            // Draw main platform with gradient
            const platformGradient = this.ctx.createLinearGradient(-width / 2, -height / 2, -width / 2, height / 2);
            platformGradient.addColorStop(0, '#FFFFFF');
            platformGradient.addColorStop(0.5, '#E0E0E0');
            platformGradient.addColorStop(1, '#B0B0B0');
            this.ctx.fillStyle = platformGradient;
            this.ctx.fillRect(-width / 2, -height / 2, width, height);
            
            // Draw top highlight
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            this.ctx.fillRect(-width / 2, -height / 2, width, height * 0.3);
            
            // Draw bottom shadow line
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.fillRect(-width / 2, height / 2 - 2, width, 2);
            
            this.ctx.restore();
        });
        
        // Draw marbles with 3D effect, shadows, and highlights
        this.raceManager.marbles.forEach(marble => {
            const pos = marble.getPosition();
            const radius = CONFIG.marbleRadius;
            
            this.ctx.save();
            
            // Draw shadow below marble
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            this.ctx.beginPath();
            this.ctx.ellipse(pos.x, pos.y + radius + 3, radius * 0.8, radius * 0.3, 0, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw main marble body with gradient for 3D effect
            const marbleGradient = this.ctx.createRadialGradient(
                pos.x - radius * 0.3, 
                pos.y - radius * 0.3, 
                radius * 0.1,
                pos.x, 
                pos.y, 
                radius
            );
            
            // Create lighter version of marble color for highlight
            const rgb = this.hexToRgb(marble.color);
            const lighterColor = `rgb(${Math.min(255, rgb.r + 80)}, ${Math.min(255, rgb.g + 80)}, ${Math.min(255, rgb.b + 80)})`;
            const darkerColor = `rgb(${Math.max(0, rgb.r - 40)}, ${Math.max(0, rgb.g - 40)}, ${Math.max(0, rgb.b - 40)})`;
            
            marbleGradient.addColorStop(0, lighterColor);
            marbleGradient.addColorStop(0.7, marble.color);
            marbleGradient.addColorStop(1, darkerColor);
            
            this.ctx.fillStyle = marbleGradient;
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw highlight (top-left white spot)
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            this.ctx.beginPath();
            this.ctx.arc(pos.x - radius * 0.3, pos.y - radius * 0.3, radius * 0.4, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw smaller inner highlight
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(pos.x - radius * 0.25, pos.y - radius * 0.25, radius * 0.2, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw subtle border
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.lineWidth = 1.5;
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            this.ctx.restore();
        });
    }
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
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

