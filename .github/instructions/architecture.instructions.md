---
description: 'Architecture patterns: separation of concerns, SRP, DRY, module organization, and configuration management'
applyTo: '**/*.ts,**/*.tsx,**/*.js,**/*.jsx'
---

# Architecture Guidelines

These guidelines define how code is organized, how responsibilities are divided across layers, and when to extract or consolidate logic. The goal is a codebase that is easy to navigate, modify, and reason about — for both humans and AI.

## Separation of Concerns

Keep business logic separate from I/O, UI rendering, and infrastructure code. When these concerns are mixed in a single file, modifications become risky because changes to one concern can silently break another.

### Application Layers

Organize code into these distinct layers. Each layer has a clear responsibility and should not reach into another layer's domain.

| Layer | Responsibility | May Import From |
|-------|----------------|-----------------|
| **UI (`components/`)** | Rendering, user interaction, layout | State, Types, Config |
| **State (`store/`)** | Redux slices, selectors, async thunks | Services, Types, Config |
| **Services (`services/`)** | API calls, data transformation, business logic | Types, Config, Utilities |
| **Config (`config/`)** | Constants, defaults, feature flags, environment values | Types only |
| **Types (`types/`)** | Shared TypeScript interfaces and type definitions | Nothing (leaf layer) |
| **Utilities (`utilities/`)** | Pure helper functions with no side effects | Types only |

### Layer Rules

- **Components must NOT** directly call APIs, manipulate URLs, or perform data transformation beyond what is needed for display
- **Slices must NOT** contain URL parsing, data formatting, or business rules — delegate to services
- **Services must NOT** import React, UI components, or Redux directly
- **Config must NOT** contain logic — only typed constants and default values

## Single Responsibility Principle (SRP)

Every file, function, and component should have **one reason to change**.

### Recognizing SRP Violations

A file likely violates SRP when it:

- Mixes data fetching with rendering logic
- Contains both UI components and helper functions used only by those components
- Handles multiple unrelated user interactions
- Parses configuration AND uses it to render UI
- Exceeds the Sonar file-size limit (245 lines) — this is often a symptom of multiple responsibilities

### Splitting Large Files

When any file grows beyond ~200 lines, split it by responsibility. Keep all extracted files co-located in the same directory. Name each extracted file using `Feature.<capability>.ts` where `<capability>` describes what the file does.

| Extracted File | Contains |
|----------------|----------|
| `Feature.tsx` | The component — rendering and interaction handlers only |
| `Feature.<capability>.ts` | Pure functions grouped by a single responsibility |
| `Feature.types.ts` | Interfaces and type definitions used only within this feature's files |

> **Where do types go?** If a type is used only by files within a single feature, it belongs in `Feature.types.ts` co-located with the component. If a type is imported by two or more features, move it to `types/`.

Good — each name describes what the file does:

| `Feature.test.tsx` | Tests for the component |
| `Feature.<capability>.test.ts` | Tests for the extracted capability file |

Good — each name describes what the file does:

- `Search.formatting.ts` — display formatting, label building, truncation
- `Search.validation.ts` — input validation, constraint checking
- `Search.transform.ts` — API response mapping, data normalization

Bad — do NOT use numbered or vague names:

- ~~`Search2.ts`~~ — meaningless; does not describe what it contains
- ~~`Search.misc.ts`~~ — too vague; attracts unrelated code over time

A feature may have one or many `<capability>` files depending on how many distinct responsibilities need to be extracted. Each must have its own adjacent test file.

### When NOT to Split

- If the extracted file would contain only one trivial function — inline it instead
- If splitting would require passing 5+ parameters between files — the coupling suggests they belong together
- If the helper is only a few lines and will never be reused — a well-named local function is fine

## DRY (Don't Repeat Yourself)

Eliminate duplication of logic, but do not over-abstract.

### When to Extract Shared Code

- **Two or more files** contain the same logic — extract to a shared utility or helper
- **The same type definition** appears in multiple files — move to a shared `types/` file
- **The same configuration pattern** appears in multiple places — centralize in `config/`

### When NOT to Extract

- Two pieces of code look similar but serve different purposes and are likely to diverge — keep them separate
- Extracting requires adding a generic abstraction with multiple type parameters — the abstraction may be harder to understand than the duplication
- The shared code is a single line — the import overhead is not worth it

### DRY vs. Over-Normalization

```typescript
// GOOD: Shared type used in 3+ files — extract to types/
// types/search.types.ts
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type?: string;
  score?: number;
}

// BAD: Over-abstracted utility that saves one line
// utilities/isNotEmpty.ts
export const isNotEmpty = (arr: unknown[]) => arr.length > 0;
// Just use `arr.length > 0` inline
```

## Configuration Management

Configuration values — URLs, timeouts, feature flags, default text, API endpoints — must live in dedicated config files, not inline in components or slices.

### Rules

- Config files export **typed constants** — never untyped JSON imports in component files
- Create a typed config accessor when the shape comes from an external source (API, JSON)
- Environment-specific values must come from environment variables or a config service, not hardcoded strings
- Default values must have a comment explaining why that default was chosen

```typescript
// GOOD: Typed config in a dedicated file
// config/api.config.ts
export const API_CONFIG = {
  /** 60-second timeout — backend search can be slow on large indexes */
  timeoutMs: 60_000,
  /** Base path for all search API calls */
  basePath: "/services/public/v1"
} as const;

// BAD: Hardcoded in component
const response = await fetch("/services/public/v1/search", {
  signal: AbortSignal.timeout(60000)
});
```

## Module Organization

### Grouping Related Code

- Group components, capability files, types, and tests for a feature in the same directory
- Shared utilities that serve multiple features belong in `utilities/`
- Shared types that serve multiple features belong in `types/`
- One-off functions used by a single component belong in `Feature.<capability>.ts` next to that component

### Import Hygiene

- Use path aliases (`@components/`, `@store/`, `@utilities/`) for cross-layer imports
- Relative imports are fine within the same feature directory
- Avoid circular imports — if two modules import each other, one of them has a misplaced responsibility
- Barrel files (`index.ts`) are acceptable for public API surfaces but should not re-export everything indiscriminately

## Architecture Checklist

- [ ] No component directly calls an API or performs data transformation
- [ ] No slice contains URL manipulation or formatting logic
- [ ] Shared types live in `types/`, not duplicated across files
- [ ] Configuration values are in `config/`, not hardcoded inline
- [ ] Files under 200 lines (with 245 as the hard Sonar limit)
- [ ] Each file has a single clear responsibility
- [ ] Duplicated logic across 2+ files has been extracted to a shared location
- [ ] Feature files follow the `Feature.tsx` / `Feature.<capability>.ts` / `Feature.types.ts` pattern when the component exceeds ~200 lines