const COLORS = [
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FFA500', // Orange
    '#8000FF'  // Purple
];

const COLOR_NAMES = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Cyan', 'Orange', 'Purple'];

const CONFIG = {
    get canvasWidth() { return window.innerWidth; },
    get canvasHeight() { return window.innerHeight; },
    marbleRadius: 12,
    platformHeight: 20,
    holeSize: 60,
    get bottomBoundary() { return window.innerHeight; },
    gravity: 0.8,
    platformSpacing: 150,
    numPlatforms: 8
};

