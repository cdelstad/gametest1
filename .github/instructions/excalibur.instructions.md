---
description: 'Excalibur.js game engine patterns, API usage, and architecture conventions'
applyTo: '**/*.ts,**/*.tsx,**/*.js,**/*.jsx'
---

# Excalibur.js Copilot Instructions

## Coding Conventions

- Use named imports: `import { Engine, Actor, vec, ... } from 'excalibur'` — do not use the `import * as ex` namespace alias. Import only the specific symbols each file needs.
- Enums (e.g. `CollisionType`, `DisplayMode`) and runtime-checked classes used in `instanceof` checks (e.g. `TileMap`) must use plain value imports, not `import type`.
- Use `vec(x, y)` shorthand instead of `new Vector(x, y)`. Import `vec` as a named import when needed.
- For pixel art games, pass `pixelArt: true` (or `DefaultPixelArtOptions`) to `EngineOptions` to disable antialiasing and configure filtering correctly. This differs from simply setting `antialiasing: false`.
- UI / HUD elements should use `ScreenElement` or set `coordPlane: CoordPlane.Screen` so they remain fixed to the viewport regardless of camera movement.
- Scene transitions use `Transition` subclasses (`CrossFade`, `Fade`, `Slide`) passed to `director.goToScene()`.

## Lifecycle & Timing Gotchas

- Use `onInitialize(engine)` for setup logic in both `Scene` and `Actor` subclasses — not constructors. The engine, scene, and graphics context are `undefined` at construction time. `this.scene`, `this.engine`, and `engine.graphicsContext` only become available after the entity is added to the scene and initialized.
- `ImageSource`, `Sound`, and other resources **must be fully loaded** before accessing `.toSprite()`, `SpriteSheet.fromImageSource()`, or playing sounds. Accessing before load returns valid objects with zero dimensions — no error, just invisible graphics. Always load resources through a `Loader`/`DefaultLoader` via `game.start(loader)` or `Scene.onPreLoad(loader)`.
- Use `Scene.onPreLoad(loader: DefaultLoader)` to register scene-specific resources. This is called once before `onInitialize`. Add resources via `loader.addResource(resource)`. This is the idiomatic v0.30+ pattern.
- Use `onPreUpdate(engine, delta)` for input-driven, real-time logic. Use `actor.actions` for scripted sequences.

## Common Pitfalls

- `SpriteSheet.getSprite(x, y)` uses **(column, row)** order — `x` is the column index (left-to-right), `y` is the row index (top-to-bottom). This is not row-major despite the grid being defined with `rows`/`columns`.
- Actors default to `CollisionType.PreventCollision` — they do **not** collide. You must explicitly set `collisionType: CollisionType.Active`, `Fixed`, or `Passive` for an actor to participate in physics collisions.
- Actors default to `anchor: vec(0.5, 0.5)` (center). This differs from Tiled's top-left origin for objects. When placing actors from Tiled data, use `anchor: vec(0, 0)` or offset positions by half the width/height to compensate.
- `coroutine` yield semantics: `yield` = wait 1 frame, `yield <number>` = wait N milliseconds, `yield <Promise>` = await the promise. These are not inferable from the type signature.

## v0.32 API Notes

- `Actor` constructor accepts `graphic` and `material` directly in options — no need to set them in `onInitialize`.
- Scenes have `scene.input` for scene-scoped input handlers that only fire when the scene is active. Use instead of `engine.input` for scene-specific input.
- Use `CollisionGroup` to control which actor categories collide with each other.
- Prefer `Animation.fromSpriteSheetCoordinates({ spriteSheet, frameCoordinates: [{x, y, duration}], strategy })` over manually constructing `Animation` with `{ frames: [...] }`.
- This project uses `@excaliburjs/plugin-tiled@0.32.0`. The Tiled plugin API changed significantly between versions: use `TiledResource` (not the older `TiledMapResource`). The plugin version must match the Excalibur version.
