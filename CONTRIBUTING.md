# Contributing to Modern Tour

Thanks for taking the time to contribute! Here's everything you need to get started.

## Prerequisites

- **Node.js** >= 18
- **pnpm** >= 8 (`npm install -g pnpm`)

## Setup

```bash
git clone https://github.com/thangdevalone/modern-tour.git
cd modern-tour
pnpm install
```

## Development

Run the demo locally:

```bash
pnpm dev
```

This starts a Vite dev server at `http://localhost:5173` with the full demo/landing page. Hot reload is enabled — edits to `src/` and `demo/` reflect immediately.

## Project Structure

```
modern-tour/
├── src/                    # Library source
│   ├── components/
│   │   ├── Tooltip.tsx     # Positioning + animation wrapper
│   │   └── TourContent.tsx # Rendered step UI (title, desc, buttons)
│   ├── TourProvider.tsx    # Context + state management
│   ├── animations.ts       # Preset animation configs
│   ├── types.ts            # TypeScript types
│   ├── styles.css          # Base CSS variables & styles (auto-injected)
│   └── index.ts            # Public exports
├── demo/                   # Landing page & interactive demo
│   ├── main.tsx
│   ├── landing.css
│   └── i18n.ts
└── .changeset/             # Changeset files for versioning
```

## Making Changes

### Library (`src/`)

- **CSS variables** — all theming goes through variables defined in `styles.css`. The variable names used in component code must match exactly what's documented.
- **Tooltip positioning** — logic lives in `Tooltip.tsx`. Prefer editing `calculatePosition` / `adjustPosition` over adding inline overrides.
- **New CSS variables** — add the default value in `styles.css` and use `var(--tour-xxx, fallback)` in the component.

### Demo (`demo/`)

The demo is **not** published to npm — changes here only affect the landing page at [tour.modern-ui.org](https://tour.modern-ui.org).

## Building

```bash
# Build the library
pnpm build

# Build the demo site
pnpm build:demo
```

## Creating a Changeset

Every PR that changes library behaviour needs a changeset:

```bash
pnpm changeset
```

Follow the prompts — pick the bump type:

| Type | When to use |
|------|-------------|
| `patch` | Bug fixes, internal refactors, doc/demo updates |
| `minor` | New features, new CSS variables, new options |
| `major` | Breaking API changes |

Then commit the generated `.changeset/*.md` file along with your code changes.

## Pull Request Checklist

- [ ] Changes are scoped — one thing per PR
- [ ] A changeset file is included (if touching `src/`)
- [ ] CSS variable names in code match what's documented in `README.md`
- [ ] Tested visually in the dev server
- [ ] No `console.log` left behind

## Commit Style

Use short imperative messages:

```
fix: correct --tour-shadow variable name in Tooltip
feat: add --tour-border-width CSS variable
chore: update demo Theme Recipes section
```

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
