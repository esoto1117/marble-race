class Marble {
    constructor(world, x, y, color, colorIndex) {
        this.world = world;
        this.color = color;
        this.colorIndex = colorIndex;
        this.colorName = COLOR_NAMES[colorIndex];
        this.finished = false;
        
        // Create Matter.js body with identical physics for all marbles
        this.body = Matter.Bodies.circle(x, y, CONFIG.marbleRadius, {
            restitution: 0.6,
            friction: 0,        // No friction between marbles
            frictionAir: 0,     // No air resistance - all fall at same rate
            density: 0.001,     // Same density for all marbles
            frictionStatic: 0,  // No static friction
            render: {
                fillStyle: color
            }
        });
        
        // Add color label to body for identification
        this.body.marbleColor = color;
        this.body.colorIndex = colorIndex;
        
        Matter.World.add(world, this.body);
    }
    
    update() {
        // Marble updates are handled by Matter.js physics engine
    }
    
    getPosition() {
        return {
            x: this.body.position.x,
            y: this.body.position.y
        };
    }
    
    hasReachedBottom() {
        return this.body.position.y >= CONFIG.bottomBoundary;
    }
    
    destroy() {
        Matter.World.remove(this.world, this.body);
    }
}

