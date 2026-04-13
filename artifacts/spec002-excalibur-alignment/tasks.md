# Tasks: Excalibur Instruction Alignment Fixes

> Operational checklist for spec002. Check off as tasks complete.

## Phase 1 — Independent Single-File Fixes

- [ ] 1.1 [P1] main.ts: `antialiasing: false` → `pixelArt: true` — `src/main.ts`
- [ ] 1.2 [P1] utils.ts: portal y-offset `obj.width` → `obj.height` — `src/utils/utils.ts`
- [ ] 1.3 [P1] Character.ts: `engine.input` → `this.scene.input` + guard + remove dead imports — `src/Character.ts`
- [ ] 1.4 [P1] Character.ts: add `anchor: vec(0, 0)` for Tiled placement — `src/Character.ts`

## Phase 2 — AnimationManager Overhaul

- [ ] 2.1 [P2] AnimationManager.ts: fix spriteWidth/Height swap + getSprite(col,row) + fromSpriteSheetCoordinates — `src/AnimationManager.ts`
- [ ] 2.2 [P2] Loader pipeline: remove inline .load(), wire through Scene.onPreLoad — `src/AnimationManager.ts`, `src/Character.ts`

## Phase 3 — Verification

- [ ] 3.1 [P3] Visual smoke test: all 8 animations render correctly
- [ ] 3.2 [P3] Tiled placement: character + portal positions correct
- [ ] 3.3 [P3] Loader: sprites visible immediately, no pop-in

## Dependencies

- 1.3 → 1.4 (file conflict: Character.ts)
- 2.1 → 2.2 (file conflict + logical: AnimationManager.ts)
- 1.3, 1.4 → 2.2 (file conflict: Character.ts)
- Phase 3 blocked by all of Phase 1 + Phase 2
