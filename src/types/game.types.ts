// Shared game type definitions — leaf layer, no imports

// Cardinal directions used for character facing and movement
export type Direction = 'up' | 'down' | 'left' | 'right';

// Matches the shape of each entry in spritesheets.json
export interface SpriteSheetConfig {
    readonly sheet: string;
    readonly spriteWidth: number;
    readonly spriteHeight: number;
    readonly rows: number;
    readonly columns: number;
}

// Record of spritesheet configs keyed by asset name
export type SpriteSheetCollection = Record<string, SpriteSheetConfig>;

// Optional per-frame rendering adjustments (e.g. horizontal flip for mirrored walk cycles)
export interface AnimationFrameConfig {
    readonly flipHorizontal?: boolean;
}

// Single frame in an animation sequence — row/col reference a cell on the spritesheet
export interface AnimationFrame {
    readonly row: number;
    readonly col: number;
    readonly duration: number;
    readonly config?: AnimationFrameConfig;
}

// One animation set (e.g. "manaseed") — maps animation names to numbered frame sequences
export type AnimationSetConfig = Record<string, Record<string, AnimationFrame>>;

// Input bindings mapping physical keys/buttons to action names
export interface KeyBindings {
    readonly kb: Record<string, string>;
    readonly gamepad: Record<string, string>;
}
