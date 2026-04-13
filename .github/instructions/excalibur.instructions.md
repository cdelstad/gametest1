# Excalibur.js Copilot Instructions

## Type Information

Full TypeScript types are available in `node_modules/excalibur`. Refer to these for accurate,
up-to-date constructor options, method signatures, and interface shapes rather than relying on
hardcoded examples. All public API is exported from the `excalibur` package root and namespaced
under `ex` when imported as `import * as ex from 'excalibur'`.

## Architecture & Core Concepts

- **Engine** (`ex.Engine`) — top-level game loop, display, input, and scene management.
- **Scene** (`ex.Scene`) — container for actors, systems, camera, and tilemaps. Navigate between scenes via `game.goToScene()` or `game.director`.
- **Actor** (`ex.Actor`) — the primary game object with transform, graphics, physics, and input built in.
- **Entity/Component/System (ECS)** — `ex.Entity`, `ex.Component`, `ex.System` underpin the engine and are available for custom game logic via `scene.world`.
- **Graphics** — attach via `actor.graphics.use(...)`. Key types: `Sprite`, `SpriteSheet`, `Animation`, `Canvas`, `GraphicsGroup`, `NineSlice`, `Text`, `Font`.
- **Physics** — configured via `EngineOptions.physics`. Collision behavior set per-actor via `CollisionType`. Collider shapes via `ex.Shape.*`.
- **Input** — accessed via `engine.input.keyboard`, `engine.input.pointers`, `engine.input.gamepads`.
- **Actions** — fluent API on `actor.actions` for scripted movement, tweens, and sequencing.
- **Resources** — `ImageSource`, `Sound`, `FontSource` must be added to an `ex.Loader` and loaded via `game.start(loader)` before use.

## Coding Conventions

- Always import as `import * as ex from 'excalibur'` and use the `ex.*` namespace.
- Use `ex.vec(x, y)` shorthand instead of `new ex.Vector(x, y)`.
- Use `onInitialize(engine)` for setup logic in both `Scene` and `Actor` subclasses — not constructors — because the engine may not be ready at construction time.
- Use `onPreUpdate(engine, delta)` for input-driven, real-time logic. Use `actor.actions` for scripted sequences.
- For pixel art games, pass `pixelArt: true` (or `DefaultPixelArtOptions`) to `EngineOptions` to disable antialiasing and configure filtering correctly.
- UI / HUD elements should use `ex.ScreenElement` or set `coordPlane: ex.CoordPlane.Screen` so they remain fixed to the viewport regardless of camera movement.
- Use `ex.CollisionGroup` to control which actor categories collide with each other.
- Scene transitions use `Transition` subclasses (`CrossFade`, `Fade`, `Slide`) passed to `director.goToScene()`.
- Use `ex.coroutine` for readable multi-frame async sequences.

## Resources

- Docs: https://excaliburjs.com/docs/
- API Reference: https://excaliburjs.com/api
- GitHub: https://github.com/excaliburjs/Excalibur
