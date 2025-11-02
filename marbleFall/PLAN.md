# Marble Fall - Development Plan

## Project Overview
A prediction-based marble racing game where 8 different colored marbles race through a randomly generated level to reach the bottom. The game features white platforms with holes positioned over a black background. Players choose which color marble they think will win. If their prediction is correct, they see a celebration with "You Win!" If incorrect, they see "Try Again" and can play again.

## Core Features

### Phase 1: Foundation (MVP)
- [ ] Visual design: Black background, white platforms
- [ ] Basic marble physics (gravity, collision detection)
- [ ] 8 different colored marbles (distinct colors)
- [ ] White platform system with holes (marbles fall through holes)
- [ ] Bottom boundary detection (winner = first marble to reach bottom)
- [ ] Marble spawn/drop mechanism (all 8 marbles start together at top)
- [ ] Basic game loop (choose color → race → result)
- [ ] Color selection UI (player picks their prediction before race starts)
- [ ] Winner detection system (which marble reaches bottom first)
- [ ] Basic UI (color selection, restart button)

### Phase 2: Core Gameplay
- [ ] Procedural/randomized level generation system (different platform layouts each game)
- [ ] Platform generation with randomized holes (size, position, spacing)
- [ ] Multiple platform layers/levels (marbles fall from platform to platform)
- [ ] Win/Lose feedback system
  - [ ] Celebration animation/effects when player wins
  - [ ] "You Win!" message display
  - [ ] "Try Again" message when player loses
- [ ] Bottom boundary detection (race ends when first marble reaches bottom)
- [ ] Sound effects (race sounds, win celebration, lose sound)
- [ ] Particle effects for collisions and winner celebration

### Phase 3: Advanced Features
- [ ] Improved procedural generation (more obstacle variety, visual themes)
- [ ] Enhanced celebration effects (confetti, fireworks, special animations)
- [ ] Win streak tracking
- [ ] Statistics tracking (wins/losses, favorite colors chosen)
- [ ] Advanced physics interactions (more realistic marble collisions)
- [ ] Visual polish (animations, UI improvements, marble trails)

### Phase 4: Polish & Release
- [ ] Performance optimization
- [ ] Mobile responsiveness (if web-based)
- [ ] Tutorial/onboarding
- [ ] Settings menu (volume, difficulty)
- [ ] Bug fixes and testing
- [ ] Documentation

## Technology Stack

### Recommended Options:
**Web-based:**
- HTML5 Canvas + JavaScript
- Phaser.js (game framework)
- Matter.js (physics engine)

**Desktop:**
- Unity (C#)
- Godot (GDScript)
- Python + Pygame

**Mobile:**
- Unity
- React Native + Game Engine
- Flutter + Flame

## Project Structure

```
marbleFall/
├── assets/
│   ├── images/
│   ├── sounds/
│   └── fonts/
├── src/
│   ├── game/
│   │   ├── Marble.js
│   │   ├── Physics.js
│   │   ├── LevelGenerator.js
│   │   ├── RaceManager.js
│   │   └── GameManager.js
│   ├── ui/
│   │   ├── ColorSelection.js
│   │   ├── WinScreen.js
│   │   └── HUD.js
│   └── utils/
│       └── constants.js
├── index.html
├── style.css
└── main.js
```

## Development Phases

### Week 1: Setup & Basic Physics
1. Set up project structure
2. Initialize physics engine
3. Set up visual design (black background, white platforms)
4. Create marble object with color property
5. Implement 8 colored marbles
6. Implement gravity and basic physics
7. Create white platform system with hole detection
8. Add bottom boundary detection (finish line at bottom of screen)

### Week 2: Core Game Mechanics
1. Color selection UI (choose prediction before race)
2. Procedural level generation (randomized white platforms with holes)
3. Platform and hole placement algorithm (varied positions and sizes)
4. Race system (all 8 marbles start together at top)
5. Winner detection (first marble to reach bottom boundary)

### Week 3: Win/Lose System & Feedback
1. Win condition check (compare chosen color vs winner - first marble to bottom)
2. Celebration effects for wins (white/colorful effects on black background)
3. "You Win!" message display (white text on black background)
4. "Try Again" message for losses (white text on black background)
5. Game reset/play again functionality (generate new random level)

### Week 4: Polish
1. Visual improvements (celebrations, animations)
2. Sound effects (race, win, lose)
3. UI/UX refinements
4. Particle effects
5. Bug fixes and balancing

## Key Technical Decisions

### Physics Engine Choice
- **Matter.js** (if web): Lightweight, easy to use, good documentation
- **Box2D** (if Unity/Godot): Industry standard, robust

### Game Loop Architecture
- Update loop (physics calculations)
- Render loop (drawing)
- Input handling (color selection)
- State management (color selection, racing, celebrating win, showing lose message, ready for next game)

### Data Structures
- Level generation: Procedural algorithm with seed-based randomization
  - Platform positions (x, y coordinates)
  - Hole positions and sizes within platforms
  - Platform layers/stacks
- Marble colors: Array of 8 distinct colors
- Player selection: Selected color index/identifier
- Game state: Color selection → Racing → Winner determined → Win/Lose feedback → Reset
- Statistics tracking: LocalStorage (web) for wins/losses, streaks
- Settings: Configuration object (hole density, platform spacing, generation parameters)
- Visual constants: Black background (#000000), White platforms (#FFFFFF)

## Performance Considerations
- Object pooling for marbles
- Efficient collision detection (spatial partitioning)
- Rendering optimization (only draw visible platforms and marbles)
- Simple visual design (black/white) reduces rendering complexity
- Frame rate target: 60 FPS

## Testing Strategy
- Unit tests for physics calculations
- Unit tests for winner detection
- Integration tests for game flow (selection → race → result)
- Manual playtesting for feel and balance (ensure fair race outcomes)
- Testing color selection UI responsiveness
- Performance profiling (8 marbles racing simultaneously)

## Future Enhancements (Post-MVP)
- Replay system (watch the race again)
- Platform variations (different widths, angles, moving platforms)
- Hole size variations (small, medium, large holes)
- Different marble styles/themes
- Betting system (virtual currency)
- Social features (share wins, compete with friends)
- Marble customization (patterns, effects)

---

**Next Steps:**
1. Choose technology stack
2. Set up development environment
3. Initialize project structure
4. Start with Phase 1, Week 1 tasks

