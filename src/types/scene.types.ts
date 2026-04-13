// Scene-related type definitions — leaf layer, no imports

// Typed structure for scene resources — TiledMap is optional since not all scenes use Tiled
// TiledMap is typed as unknown because the actual TiledResource lives in @excaliburjs/plugin-tiled;
// consuming code should narrow via type guards or assertion at the usage site.
export interface GameSceneResources {
    TiledMap?: unknown;
    [key: string]: unknown;
}

// Tiled object property tuple as returned by the Tiled plugin's parsed data
// Index 0 = property name, index 1 = property value
export type TiledObjectProperty = [string, string];

// Tiled map object data passed to utility functions like addPortal
export interface TiledObjectData {
    readonly x: number;
    readonly y: number;
    readonly width?: number;
    readonly height?: number;
    readonly properties: TiledObjectProperty[];
}
