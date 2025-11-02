class LevelGenerator {
    // Fixed level configuration - same every time
    static getFixedLevelConfig(world, canvasWidth) {
        const holeSize = CONFIG.holeSize;
        const spacing = CONFIG.platformSpacing;
        const minAngle = Math.PI / 9; // 20 degrees
        const maxAngle = Math.PI / 4; // 45 degrees
        const canvasHeight = CONFIG.canvasHeight;
        
        // Create side walls to bounce marbles back
        const wallThickness = 20;
        const wallHeight = canvasHeight;
        
        // Left wall (position is center, so place at wallThickness/2 from left edge)
        const leftWall = Matter.Bodies.rectangle(
            wallThickness / 2, // x position (center of wall at left edge)
            canvasHeight / 2, // y position at center
            wallThickness,
            wallHeight,
            {
                isStatic: true,
                friction: 0,
                frictionStatic: 0,
                restitution: 1.0, // Full bounce
                render: {
                    fillStyle: '#FFFFFF',
                    visible: false // Invisible walls
                }
            }
        );
        Matter.World.add(world, leftWall);
        
        // Right wall (position is center, so place at canvasWidth - wallThickness/2 from right edge)
        const rightWall = Matter.Bodies.rectangle(
            canvasWidth - wallThickness / 2, // x position (center of wall at right edge)
            canvasHeight / 2, // y position at center
            wallThickness,
            wallHeight,
            {
                isStatic: true,
                friction: 0,
                frictionStatic: 0,
                restitution: 1.0, // Full bounce
                render: {
                    fillStyle: '#FFFFFF',
                    visible: false // Invisible walls
                }
            }
        );
        Matter.World.add(world, rightWall);
        
        // Define fixed hole positions for each platform (normalized to screen width)
        // Each array defines hole positions as percentages of canvas width
        // More holes = more segments, creating the broken platform look
        const fixedHolePositions = [
            [0.15, 0.35, 0.55, 0.75, 0.9],  // Platform 0: 5 holes - more segments
            [0.1, 0.3, 0.5, 0.7, 0.85],     // Platform 1: 5 holes
            [0.2, 0.4, 0.6, 0.8],           // Platform 2: 4 holes
            [0.15, 0.35, 0.55, 0.75, 0.9],  // Platform 3: 5 holes
            [0.1, 0.3, 0.5, 0.7, 0.85],     // Platform 4: 5 holes
            [0.2, 0.4, 0.6, 0.8],           // Platform 5: 4 holes
            [0.15, 0.35, 0.55, 0.75, 0.9],  // Platform 6: 5 holes
            [0.1, 0.3, 0.5, 0.7, 0.85]      // Platform 7: 5 holes
        ];
        
        const platforms = [leftWall, rightWall]; // Include walls in platforms array
        
        // Create first platform as an upside-down V to split marbles (quarter width total)
        const firstPlatformY = 150;
        const centerX = canvasWidth / 2;
        const splitAngle = 0.4; // Angle for the V shape (~23 degrees)
        const eighthWidth = canvasWidth / 8; // Each half is 1/8 of screen width
        
        // Left half of V (slopes left) - positioned so right edge meets center
        // Center is at centerX - eighthWidth/2, so right edge is at centerX
        const leftVPlatform = Matter.Bodies.rectangle(
            centerX - eighthWidth / 2, // Center positioned so right edge is at centerX
            firstPlatformY,
            eighthWidth,
            CONFIG.platformHeight,
            {
                isStatic: true,
                angle: -splitAngle, // Negative angle slopes left
                friction: 0,
                frictionStatic: 0,
                render: {
                    fillStyle: '#FFFFFF'
                }
            }
        );
        leftVPlatform.originalWidth = eighthWidth;
        leftVPlatform.originalHeight = CONFIG.platformHeight;
        Matter.World.add(world, leftVPlatform);
        platforms.push(leftVPlatform);
        
        // Right half of V (slopes right) - positioned so left edge meets center
        // Center is at centerX + eighthWidth/2, so left edge is at centerX
        const rightVPlatform = Matter.Bodies.rectangle(
            centerX + eighthWidth / 2, // Center positioned so left edge is at centerX
            firstPlatformY,
            eighthWidth,
            CONFIG.platformHeight,
            {
                isStatic: true,
                angle: splitAngle, // Positive angle slopes right
                friction: 0,
                frictionStatic: 0,
                render: {
                    fillStyle: '#FFFFFF'
                }
            }
        );
        rightVPlatform.originalWidth = eighthWidth;
        rightVPlatform.originalHeight = CONFIG.platformHeight;
        Matter.World.add(world, rightVPlatform);
        platforms.push(rightVPlatform);
        
        // Calculate how many platforms needed to reach the bottom
        // First platform is at y = 150, bottom is at canvasHeight
        // Need enough platforms so the last one is near the bottom
        const availableHeight = canvasHeight - firstPlatformY;
        const numAdditionalPlatforms = Math.ceil(availableHeight / spacing); // Round up to ensure we reach bottom
        
        // Generate remaining platforms (skip the first one as we've created the V)
        for (let i = 1; i <= numAdditionalPlatforms; i++) {
            const y = 150 + (i * spacing);
            // Use modulo to cycle through hole positions if we need more than available
            const holePositions = fixedHolePositions[i % fixedHolePositions.length].map(pos => pos * canvasWidth);
            
            // Create segments for this platform
            const segments = this.createFixedSegments(holePositions, y, canvasWidth, i);
            
            segments.forEach(segment => {
                const platform = Matter.Bodies.rectangle(
                    segment.x,
                    segment.y,
                    segment.width,
                    CONFIG.platformHeight,
                    {
                        isStatic: true,
                        angle: segment.angle,
                        friction: 0,      // No friction on platforms
                        frictionStatic: 0, // No static friction
                        render: {
                            fillStyle: '#FFFFFF'
                        }
                    }
                );
                platform.originalWidth = segment.width;
                platform.originalHeight = CONFIG.platformHeight;
                Matter.World.add(world, platform);
                platforms.push(platform);
            });
        }
        
        return platforms;
    }
    
    static createFixedSegments(holePositions, y, canvasWidth, platformIndex) {
        const segments = [];
        const holeSize = CONFIG.holeSize;
        
        // Define fixed angles per platform to create varied slopes
        // Each platform has a pattern of angles for its segments
        const platformAngles = [
            [-0.15, 0.1, -0.2, 0.05, -0.1, 0.15],  // Platform 0 angles
            [0.2, -0.1, 0.15, -0.05, 0.1, -0.2],   // Platform 1 angles
            [-0.1, 0.2, -0.15, 0.1, -0.05, 0.15],  // Platform 2 angles
            [0.15, -0.2, 0.1, -0.15, 0.05, -0.1],  // Platform 3 angles
            [-0.2, 0.15, -0.1, 0.2, -0.15, 0.05],  // Platform 4 angles
            [0.1, -0.15, 0.2, -0.1, 0.15, -0.05],  // Platform 5 angles
            [-0.05, 0.2, -0.1, 0.15, -0.2, 0.1],   // Platform 6 angles
            [0.15, -0.1, 0.05, -0.2, 0.1, -0.15]   // Platform 7 angles
        ];
        
        const angles = platformAngles[platformIndex % platformAngles.length];
        let angleIndex = 0;
        
        // Segment before first hole (leftmost - slopes right inward away from left wall)
        const firstHoleX = holePositions[0];
        const beforeFirstWidth = firstHoleX - holeSize / 2;
        if (beforeFirstWidth > 40) {
            // Slopes right (positive angle) away from left wall toward the hole
            const angle = 0.25; // Fixed angle ~14 degrees sloping right
            segments.push({
                x: beforeFirstWidth / 2,
                y: y,
                width: beforeFirstWidth,
                angle: angle
            });
        }
        
        // Segments between holes (varying angles between -15 and +15 degrees, never straight)
        for (let i = 0; i < holePositions.length - 1; i++) {
            const leftHoleX = holePositions[i];
            const rightHoleX = holePositions[i + 1];
            const segmentStartX = leftHoleX + holeSize / 2;
            const segmentEndX = rightHoleX - holeSize / 2;
            const segmentWidth = segmentEndX - segmentStartX;
            
            if (segmentWidth > 40) {
                const segmentCenterX = segmentStartX + segmentWidth / 2;
                
                // Random angle between -15 and +15 degrees, but never 0 (never straight)
                // -15° = -π/12 ≈ -0.262 radians, +15° = π/12 ≈ 0.262 radians
                // Minimum angle of 0.05 radians (~3 degrees) to ensure marbles can fall off
                const minAngle = -Math.PI / 12; // -15 degrees
                const maxAngle = Math.PI / 12;   // +15 degrees
                const minAbsoluteAngle = 0.05; // ~3 degrees minimum
                
                let angle;
                do {
                    angle = minAngle + Math.random() * (maxAngle - minAngle);
                } while (Math.abs(angle) < minAbsoluteAngle); // Ensure never straight or too flat
                
                segments.push({
                    x: segmentCenterX,
                    y: y,
                    width: segmentWidth,
                    angle: angle
                });
            }
        }
        
        // Segment after last hole (rightmost - slopes left inward away from right wall)
        const lastHoleX = holePositions[holePositions.length - 1];
        const afterLastStartX = lastHoleX + holeSize / 2;
        const afterLastWidth = canvasWidth - afterLastStartX;
        if (afterLastWidth > 40) {
            // Slopes left (negative angle) away from right wall toward the hole
            const angle = -0.25; // Fixed angle ~-14 degrees sloping left
            segments.push({
                x: afterLastStartX + afterLastWidth / 2,
                y: y,
                width: afterLastWidth,
                angle: angle
            });
        }
        
        return segments;
    }
    
    static generatePlatforms(world) {
        const canvasWidth = CONFIG.canvasWidth;
        // Use fixed level configuration - same every time
        return this.getFixedLevelConfig(world, canvasWidth);
    }
}

