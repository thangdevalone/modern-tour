# modern-tour

## 0.2.0

### Minor Changes

- - **Feature**: Added Headless Component Override support via `options.components.TooltipContent` to allow full custom UI for tooltips.
  - **Feature**: Added `waitForTargetTimeout` option to customize the maximum wait time for lazy-loaded components (defaults to 3000ms).
  - **Fix**: Resolved Vite Fast Refresh compatibility warnings by extracting hooks from the Provider file.
  - **Chore**: Removed unused `@floating-ui/react` dependency to optimize bundle size.

## 0.1.5

### Patch Changes

- Fix an issue where the Spotlight overlay remained in the DOM and blocked interaction when the tour was skipped or closed.

## 0.1.4

### Patch Changes

- fix: correct CSS variable names in Tooltip

  - `--tour-shadow-lg` was being used internally but the documented variable is `--tour-shadow` — users setting `--tour-shadow` had no effect. Now fixed to use `--tour-shadow`.
  - Tooltip border width was hardcoded to `1px`. Introduced `--tour-border-width` (default: `1px`) so border thickness is now customizable via CSS, enabling styles like Neo Brutalist (`--tour-border-width: 3px`).

## 0.1.3

### Patch Changes

- fix horizontal layout shift

## 0.1.2

### Patch Changes

- f6ca0c2: Enhance animation presets to be highly distinct from each other:
  - Made `fade` smoother and cinematic.
  - Added 3D rotation (`rotateX`, `rotateY`) to `scale` preset.
  - Increased travel distance for `slide`.
  - Increased bounciness and added rotation to `bounce`.
  - Added `rotateX`, `rotateY`, and `rotateZ` to `AnimationValues` type to support these new animations.

## 0.1.1

### Patch Changes

- 2cb7bbd: fix: prevent tooltip from overlapping target element on mobile viewports

## 0.1.0

### Minor Changes

- Move framer-motion to dependencies for easier installation
  Rewrite README documentation
