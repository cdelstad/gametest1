export const Config = {
    // Base walk speed (50) doubled for responsive movement feel
    PLAYER_SPEED: 50 * 2, // pixels/sec

    // Frame duration for walk cycle — 200ms (~12 frames at 60fps) balances
    // smooth animation with readable sprite detail
    PLAYER_FRAME_SPEED: 200, // ms per animation frame

    // Viewport dimensions — 800x600 matches a 4:3 base resolution that
    // FitScreenAndFill scales to the actual display
    GAME_WIDTH: 800,
    GAME_HEIGHT: 600,

    // Player draw order — above ground tiles and objects but below UI overlays
    PLAYER_Z_INDEX: 100,

    // Camera zoom factor — 1.8x brings 16px sprites to a readable size
    // without excessive pixelation
    CAMERA_ZOOM: 1.8,

    // Fallback radius when a Tiled portal object has no width defined
    DEFAULT_PORTAL_RADIUS_FALLBACK: 20,

    // Default sound-effect volume (0–1 range) — 0.7 keeps SFX audible
    // without overpowering background music
    DEFAULT_SFX_VOLUME: 0.7,

    // Starting z-index for HTML UI elements managed by UIManager
    BASE_Z_INDEX: 1000,

    // Mana Seed sprite cell size — all farmer sprite sheets use 16x16 cells
    CHARACTER_SPRITE_SIZE: 16,

    // Pixels to nudge the player per frame during diagonal slide around
    // solid tiles — keeps movement smooth without snapping
    COLLISION_NUDGE_PX: 1,
} as const;