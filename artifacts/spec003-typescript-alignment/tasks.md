# Tasks: TypeScript & Instruction Alignment

> Trackable checklist for spec003. Grouped by phase, ordered by dependency.

## Phase 1: Project Configuration

- [ ] 1.1 [P1] Update tsconfig.json: target ES2022, module ES2022, enable strict flags, enable experimentalDecorators — `tsconfig.json`

## Phase 2: Dead Code & Duplicate Removal

- [ ] 2.1 [P2] Delete duplicate JS component file — `src/components/ex-text.js`
- [ ] 2.2 [P2] Delete dead Godot shader code — `src/utils/colorRamp.ts`
- [ ] 2.3 [P2] Remove commented-out code — `src/main.ts`
- [ ] 2.4 [P2] Remove commented-out code — `src/Character.ts`
- [ ] 2.5 [P2] Remove commented-out code — `src/InitialResources.ts`
- [ ] 2.6 [P2] Remove commented-out code — `src/scenes/DemoScene.ts`
- [ ] 2.7 [P2] Remove commented-out code — `src/scenes/GameScene.ts`
- [ ] 2.8 [P2] Remove commented-out code — `src/utils/Outline.ts`
- [ ] 2.9 [P2] Remove commented-out code — `src/utils/utils.ts`
- [ ] 2.10 [P2] Remove debug console.log — `src/components/ExText.ts`

## Phase 3: Shared Type Definitions

- [ ] 3.1 [P3] Create game types (Direction, SpriteSheetConfig, AnimationSetConfig, KeyBindings) — `src/types/game.types.ts`
- [ ] 3.2 [P3] Create scene types (GameSceneResources, TiledObjectData) — `src/types/scene.types.ts`
- [ ] 3.3 [P3] Fix config: UPPER_SNAKE_CASE, as const, add game constants, add comments — `src/config.ts`

## Phase 4: Per-File Compliance

- [ ] 4.1 [P4] Refactor main.ts: fix imports, null guards, magic numbers, async error handling — `src/main.ts`
- [ ] 4.2 [P4] Refactor Character.ts: replace any, abbreviations, override, namespace imports, magic numbers, TODOs — `src/Character.ts`
- [ ] 4.3 [P4] Refactor AnimationManager.ts: replace any params, fix namespace import — `src/AnimationManager.ts`
- [ ] 4.4 [P4] Refactor GameScene.ts: replace any, var→const, override, JSDoc→comment, magic numbers, TODOs — `src/scenes/GameScene.ts`
- [ ] 4.5 [P4] Refactor DemoScene.ts: JSDoc→comment, TODO ticket ref — `src/scenes/DemoScene.ts`
- [ ] 4.6 [P4] Refactor resourcesLoader.ts: replace any, import type, defensive guard, TODO ref — `src/utils/resourcesLoader.ts`
- [ ] 4.7 [P4] Refactor UIManager.ts: fix wrapper types, any, empty stubs, private, DRY, TODOs — `src/utils/UIManager.ts`
- [ ] 4.8 [P4] Refactor utils.ts: replace any, fix case bug, magic numbers, workaround comment, TODOs — `src/utils/utils.ts`
- [ ] 4.9 [P4] Refactor Excalinput.ts: fix definite assignment, stub decision — `src/utils/Excalinput.ts`
- [ ] 4.10 [P4] Fix InitialResources.ts: let→const in for-of — `src/InitialResources.ts`

## Phase 5: Error Handling

- [ ] 5.1 [P5] Fix AudioManager.ts: definite assignment, async play() handling, error logging — `src/utils/AudioManager.ts`

## Phase 6: Verification

- [ ] 6.1 [P6] Run tsc --noEmit and fix compile errors — all `src/**/*.ts`
- [ ] 6.2 [P6] Verify zero any types remain — all `src/**/*.ts`
- [ ] 6.3 [P6] Verify zero commented-out code blocks remain — all `src/**/*.ts`

---

## Dependencies

| Task | Blocked By |
|------|-----------|
| Phase 2 (all) | Task 1.1 |
| Tasks 3.1, 3.2, 3.3 | Phase 2 |
| Task 4.1 | Task 3.3 |
| Task 4.2 | Tasks 3.1, 3.3 |
| Task 4.3 | Task 3.1 |
| Task 4.4 | Tasks 3.2, 3.3 |
| Task 4.5 | Phase 2 |
| Task 4.6 | Task 3.2 |
| Task 4.7 | Phase 2 |
| Task 4.8 | Tasks 3.2, 3.3 |
| Task 4.9 | Phase 2 |
| Task 4.10 | Phase 2 |
| Task 5.1 | Phase 4 |
| Phase 6 (all) | Phase 5 |
