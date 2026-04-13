---
description: 'Code commenting standards for source files'
applyTo: '**/*.ts,**/*.tsx,**/*.js,**/*.jsx'
---

# Code Comments Guidelines

Write comments that capture intent, not implementation. AI and humans can usually figure out *what* code does — comments should explain *why* it does it. Remove stale comments during refactors.

## When to Comment

- Explain **why** a design decision was made, not what the code does
- Document non-obvious business rules or domain logic
- Warn about potential pitfalls or gotchas
- Explain workarounds for known issues (include a ticket number if one exists)
- Add TODO/FIXME markers with a ticket number or removal date
- Explain hardcoded values — where the value comes from and why it was chosen
- Describe the connection when code depends on framework conventions, runtime configuration, or external systems

## When NOT to Comment

- Do not state the obvious — if the code reads clearly, no comment is needed
- Do not leave commented-out code in the codebase
- Do not use comments as a substitute for clear naming
- This project does not use JSDocs

## CRITICAL DO NOT CHANGE Blocks

Code that must not be modified without explicit human approval must be wrapped in clearly marked comment blocks. Always include the **reason** the code is critical.

```typescript
// CRITICAL DO NOT CHANGE — This UUID is the source-code identifier for
// webpack module federation. Changing it will break all host integrations
// and orphan stored user data.
export const uuid = "f3a77fa0-8853-47b0-8d03-01d3031f05c4";
```

- Use the exact marker `CRITICAL DO NOT CHANGE` so it is searchable
- Always follow the marker with a dash and a plain-language reason
- Apply to: generated identifiers consumed by external systems, security-sensitive logic, values tied to persisted data, and framework wiring that must match external contracts

## AI-Readable Code Comments

AI assistants can parse syntax and infer data flow, but they cannot infer **intent**, **runtime context**, or **invisible external dependencies**. Add comments in these specific situations to make the codebase navigable by both humans and AI:

### Framework and Runtime Connections

When a function's behavior depends on being called by a framework, host application, or runtime convention, add a one-line comment explaining the trigger and expected behavior.

```typescript
// Called by the PXP host at mount time — `base` is the route prefix
// assigned by the host's router configuration
export function getAppRoutes(props: ExtensionPointProps) { ... }
```

### Opaque Provider Data

When data flows through a context provider whose shape is not visible at the usage site, add a comment describing the expected structure or reference the type.

```typescript
// api shape: SearchProviderData — see RemoteProvider.tsx for full interface
const api = useRemoteProvider();
```

### Non-Standard Control Flow

If code uses a non-obvious pattern (throwing objects to short-circuit interceptors, using error paths for success, resolving promises with error data), add a block comment explaining the pattern and why it exists.

```typescript
// Pattern: The mock interceptor throws a resolved-promise object to
// bypass the real HTTP call. The response interceptor catches it and
// returns it as a successful response. This avoids needing a separate
// mock server during local development.
```

### External System Contracts

When a constant, export, or config value is consumed by an external system (webpack federation, PXP, CI/CD, a host application), mark it so future editors understand the blast radius of a change.

```typescript
// EXTERNAL: Consumed by webpack module federation — changing this value
// will prevent the host from loading this remote module
export const scope = "MFE_F3A77FA0_8853_47B0_8D03_01D3031F05C4";
```
