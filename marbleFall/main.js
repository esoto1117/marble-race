// Initialize Matter.js engine
const engine = Matter.Engine.create();
const world = engine.world;

// Set gravity
engine.world.gravity.y = CONFIG.gravity;

// Get canvas element
const canvas = document.getElementById('game-canvas');

// Create game manager
const gameManager = new GameManager(canvas, engine, world);

