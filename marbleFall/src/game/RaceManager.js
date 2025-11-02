class RaceManager {
    constructor(world, engine) {
        this.world = world;
        this.engine = engine;
        this.marbles = [];
        this.winner = null;
        this.raceStarted = false;
        this.raceFinished = false;
        this.startTime = 0;
        this.finishedMarbles = []; // Array of {marble, time} objects
    }
    
    createMarbles() {
        const startX = CONFIG.canvasWidth / 2;
        const startY = 100; // Start above the V platform (which is at y=150)
        const spacing = 30;
        
        // Clear existing marbles
        this.marbles.forEach(marble => marble.destroy());
        this.marbles = [];
        
        // Create array of colors with their indices and shuffle
        const colorsWithIndices = COLORS.map((color, index) => ({
            color: color,
            index: index
        }));
        
        // Shuffle the array
        for (let i = colorsWithIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [colorsWithIndices[i], colorsWithIndices[j]] = [colorsWithIndices[j], colorsWithIndices[i]];
        }
        
        // Create 8 marbles in randomized order
        colorsWithIndices.forEach((item, positionIndex) => {
            const x = startX + (positionIndex - 3.5) * spacing;
            const marble = new Marble(this.world, x, startY, item.color, item.index);
            this.marbles.push(marble);
        });
    }
    
    startRace() {
        this.raceStarted = true;
        this.raceFinished = false;
        this.winner = null;
        this.startTime = Date.now();
        this.finishedMarbles = [];
    }
    
    update() {
        if (!this.raceStarted) return false;
        
        const currentTime = Date.now();
        
        // Check if any marble reached the bottom
        for (let marble of this.marbles) {
            // Skip if already finished
            if (marble.finished) continue;
            
            if (marble.hasReachedBottom()) {
                const finishTime = (currentTime - this.startTime) / 1000; // Convert to seconds
                marble.finished = true;
                
                // Set winner as first marble to finish
                if (!this.winner) {
                    this.winner = marble;
                }
                
                this.finishedMarbles.push({
                    marble: marble,
                    time: finishTime
                });
            }
        }
        
        // Sort finished marbles by time
        this.finishedMarbles.sort((a, b) => a.time - b.time);
        
        // Race is finished only when ALL marbles have finished (8 marbles)
        const allFinished = this.finishedMarbles.length === this.marbles.length;
        if (allFinished && !this.raceFinished) {
            this.raceFinished = true;
        }
        
        return this.raceFinished;
    }
    
    getWinner() {
        return this.winner;
    }
    
    getFinishedMarbles() {
        return this.finishedMarbles;
    }
    
    isRaceFinished() {
        return this.raceFinished;
    }
    
    reset() {
        this.marbles.forEach(marble => {
            marble.finished = false;
            marble.destroy();
        });
        this.marbles = [];
        this.winner = null;
        this.raceStarted = false;
        this.raceFinished = false;
        this.finishedMarbles = [];
    }
}

