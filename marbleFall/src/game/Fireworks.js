class Fireworks {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.active = false;
        
        this.setupCanvas();
    }
    
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }
    
    start() {
        this.active = true;
        this.particles = [];
        
        // Create initial fireworks burst
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createFirework(
                    Math.random() * this.canvas.width,
                    Math.random() * (this.canvas.height * 0.3) + 50
                );
            }, i * 300);
        }
        
        // Keep creating fireworks periodically
        this.fireworkInterval = setInterval(() => {
            if (this.active) {
                this.createFirework(
                    Math.random() * this.canvas.width,
                    Math.random() * (this.canvas.height * 0.3) + 50
                );
            }
        }, 800);
        
        this.animate();
    }
    
    createFirework(x, y) {
        const colors = [
            '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
            '#FF00FF', '#00FFFF', '#FFA500', '#FF69B4'
        ];
        
        const numParticles = 50 + Math.random() * 30;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < numParticles; i++) {
            const angle = (Math.PI * 2 * i) / numParticles;
            const speed = 2 + Math.random() * 4;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            
            this.particles.push({
                x: x,
                y: y,
                vx: vx,
                vy: vy,
                color: color,
                life: 1.0,
                decay: 0.015 + Math.random() * 0.01,
                size: 3 + Math.random() * 2
            });
        }
    }
    
    animate() {
        if (!this.active && this.particles.length === 0) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.15; // Gravity
            particle.vx *= 0.99; // Friction
            particle.life -= particle.decay;
            
            // Draw particle
            if (particle.life > 0) {
                const alpha = particle.life;
                this.ctx.save();
                this.ctx.globalAlpha = alpha;
                this.ctx.fillStyle = particle.color;
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = particle.color;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            } else {
                this.particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    stop() {
        this.active = false;
        if (this.fireworkInterval) {
            clearInterval(this.fireworkInterval);
        }
    }
}

