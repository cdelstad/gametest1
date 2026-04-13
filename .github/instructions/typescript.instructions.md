---
description: 'Guidelines for TypeScript Development targeting TypeScript 5.x and ES2022 output'
applyTo: '**/*.ts,**/*.tsx,**/*.js,**/*.jsx'
---

# TypeScript Development Guidelines

> These instructions assume projects are built with TypeScript 5.x (or newer) compiling to an ES2022 JavaScript baseline.

## Core Intent

- Extend current abstractions before inventing new ones
- Target TypeScript / ES2022 and prefer native features over polyfills
- Use pure ES modules; never emit `require`, `module.exports`, or CommonJS helpers

### Naming Clarity

- **No magic numbers or strings** – extract every non-obvious literal into a named `UPPER_SNAKE_CASE` constant with a comment explaining the value's origin
- **No unclear abbreviations** – prefer full words (`configuration` not `cfg`, `searchProviderData` not `api`). Abbreviations are acceptable only when they are industry-standard (`URL`, `HTTP`, `ID`, `UUID`). Abbreviations from the project's game-engine API (`vec`, `pos`, `vel`, `acc`, `x`, `y`) are also permitted when they match the engine's own naming
- **No single-letter variables** – except `i`/`j`/`x`/`y` in trivial loops, coordinate parameters, or arrow function parameters in `.map`/`.filter` where the array name makes intent clear (e.g., `results.map((result) => ...)` is fine)
- **Self-describing names** – if a reader must look at another file to understand what a variable holds, rename it to include the domain context
- **Avoid clever code** – prefer explicit, readable code over concise tricks. Ternary chains longer than one level, comma operators, and bitwise hacks for non-bitwise logic are not acceptable

## Code Simplification

When reviewing or generating code, actively look for and apply these simplifications – but only when the result is equally or more readable and verifiably correct:

- **Collapse redundant branches**: If two branches of an `if/else` or early return produce the same expression, merge them into a single expression
- **Replace imperative loops with declarative equivalents**: Prefer `map`, `filter`, `reduce` over `forEach` + `push` patterns when they reduce line count without hiding intent
- **Eliminate derived state**: If a value can be computed directly from existing state or props (e.g., `!query`), remove the separate `useState` that mirrors it
- **Avoid re-deriving data**: If a value is already computed in the component (e.g., `filterTexts`), pass it as an argument instead of recomputing it inside a helper
- **Precompute over repeated inline filtering**: If the same `array.filter(...)` appears more than once in a function, extract the count into a variable or map first
- **Tighten `any` types**: Replace `any` with `Record<string, unknown>` or a more specific type wherever the shape is knowable

Do not simplify when doing so requires a non-obvious expression, sacrifices debuggability, or makes the code harder to test.

## Type System Expectations

- Avoid `any` (implicit or explicit); prefer `unknown` plus narrowing
- **Progressive tightening**: When modifying a file that contains `any`, replace each `any` you touch with a specific type before committing. You do not need to fix every `any` in the file – only those on lines you are already changing
- Use discriminated unions for realtime events and state machines
- Follow `architecture.instructions.md` for type placement rules (`Feature.types.ts` vs `types/`)

## External Integrations

- Instantiate clients outside hot paths and inject them for testability
