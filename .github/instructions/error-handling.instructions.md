---
description: 'Error handling patterns and standards for consistent, explicit error management'
applyTo: '**/*.ts,**/*.tsx,**/*.js,**/*.jsx'
---

# Error Handling Guidelines

Errors must be explicit, structured, and traceable. Silent failures make debugging difficult for both humans and AI and hide production issues from monitoring.

## Core Principles

- **Never swallow errors silently** — every `catch` block must log, re-throw, or return a structured error
- **Never return `null` or `undefined` to indicate failure** — use a discriminated union (`Result<T, E>`) or throw a typed error
- **Errors are part of the contract** — if a function can fail, its return type or thrown error type must communicate that clearly
- **One error shape per layer** — transport errors, domain errors, and UI errors should each have a consistent structure

## Structured Error Types

Define a shared error type for the application. Avoid passing raw strings or generic `Error` objects between layers.

```typescript
// GOOD: Structured error with context
interface AppError {
  code: string;        // Machine-readable identifier (e.g., "SEARCH_TIMEOUT")
  message: string;     // Human-readable description
  context?: Record<string, unknown>; // Additional debugging data (URL, params, etc.)
}

// BAD: Raw string error
state.error = "Search failed";

// BAD: Swallowed error
catch (e) {
  // do nothing
}
```

## Async Error Handling

- Wrap every `await` in a `try/catch` or handle the rejection explicitly
- Include the operation context in the error (what was attempted, with what parameters)
- Log errors with enough context to reproduce the issue without needing a debugger

## API Error Handling

- API clients must normalize all responses into a consistent success/error shape
- HTTP error status codes (4xx, 5xx) must not be silently converted to success responses
- Response transformations must preserve error information — never resolve a promise with error data where the consumer expects success data
- Include the request context (URL, method, status code) in every error log

## Redux / State Error Handling

- Async thunks must handle `pending`, `fulfilled`, and `rejected` states explicitly
- Error state in slices must use a typed error object, not a raw string
- The `rejected` case must preserve enough context for the UI to display a meaningful message
- Never set `error: "Something went wrong"` — include what operation failed and why

## Component Error Handling

- Wrap top-level routes or feature areas with an `ErrorBoundary` component
- `ErrorBoundary` must render a user-friendly fallback, not a blank screen
- Async errors in `useEffect` or event handlers must be caught and reflected in component state
- Form validation errors must be associated with the specific field and announced to assistive technology

## Logging Standards

- Use the project's logging utility — avoid bare `console.log` / `console.error` in production code
- Temporary debug logging must include a ticket number or removal date in a comment
