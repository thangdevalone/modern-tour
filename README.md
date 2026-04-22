# Modern Tour

A lightweight, animated product tour and onboarding library for React. Built with Framer Motion for buttery-smooth transitions, smart positioning, and a stellar developer experience.

[![npm version](https://badge.fury.io/js/modern-tour.svg)](https://badge.fury.io/js/modern-tour)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

![Modern Tour Preview](/shoes.png) <!-- Gợi ý: Bạn có thể thay đường dẫn ảnh demo thật vào đây -->

## Features

- **Smooth Animations:** Powered by `framer-motion` with spring physics.
- **Smart Auto-Positioning:** Tooltip dynamically recalculates coordinates, bounds, and automatically flips if it touches viewport edges.
- **Lazy Loading Support:** Seamlessly handles elements that are rendered asynchronously or lazy-loaded via `MutationObserver` without manual re-triggers.
- **Headless Override:** Render your completely custom React components inside the tooltip while keeping the smart positioning.
- **Keyboard Navigation:** Navigate seamlessly with `Arrow Keys`, `Enter` and close with `Escape`.
- **Zero-CSS Import:** Styles are auto-injected. Just override CSS variables to theme it!
- **Cross-Page Tours:** Continues the tour even when the route changes.

---

## Installation

```bash
npm install modern-tour
```

*(Note: `framer-motion` and `lucide-react` are peer/internal dependencies, make sure you have `react` installed)*

---

## Quick Start

1. Wrap your application with the `<TourProvider>` and define your steps.
2. Use the `useTour` hook anywhere inside to control the tour.

```tsx
import { TourProvider, useTour } from 'modern-tour';

const steps = [
  { target: '#btn-1', content: 'Welcome to our platform!' },
  { target: '#btn-2', title: 'Settings', content: 'Configure your preferences here.' },
];

function YourApp() {
  const { start } = useTour();
  
  return (
    <div>
      <button id="btn-1" onClick={() => start()}>Start Tour</button>
      <button id="btn-2">Settings</button>
    </div>
  );
}

function Root() {
  return (
    <TourProvider options={{ steps, animation: 'smooth' }}>
      <YourApp />
    </TourProvider>
  );
}
```

---

## Theming & Styling

Modern Tour uses pure CSS variables for theming. You don't need to import any CSS files. Just override the variables in your global CSS.

```css
:root {
  /* Default Minimal Style */
  --tour-bg: #ffffff;
  --tour-text: #09090b;
  --tour-text-secondary: #71717a;
  --tour-primary: #18181b;
  --tour-primary-foreground: #fafafa;
  --tour-border: #e4e4e7;
  --tour-radius: 0.5rem;
  --tour-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

/* Dark Mode Example */
.dark {
  --tour-bg: #09090b;
  --tour-text: #fafafa;
  --tour-primary: #fafafa;
  --tour-primary-foreground: #18181b;
  --tour-border: #27272a;
}

/* Neo-Brutalism Example */
.neo-theme {
  --tour-bg: #fffbf0;
  --tour-text: #000;
  --tour-border: #000;
  --tour-border-width: 3px;
  --tour-radius: 0px;
  --tour-shadow: 6px 6px 0px #000000;
}
```

---

## Advanced Usage

### 1. Headless Component Override
If tweaking CSS variables isn't enough, you can entirely override the content of the tooltip with your own React component. 

```tsx
import { TourProvider, useTour } from 'modern-tour';

function MyCustomTooltip() {
  // Access tour state and controls natively
  const { step, currentStep, totalSteps, next, prev, stop } = useTour();

  return (
    <div className="custom-tooltip bg-black text-white p-4 rounded-xl">
      <h2>{step?.title}</h2>
      <p>{step?.content}</p>
      <div className="flex justify-between mt-4">
         <span>{currentStep + 1} / {totalSteps}</span>
         <div>
            <button onClick={prev}>Back</button>
            <button onClick={next}>Next</button>
         </div>
      </div>
    </div>
  );
}

// In your root:
<TourProvider 
  options={{ 
    steps,
    components: { TooltipContent: MyCustomTooltip } 
  }}
>
  <App />
</TourProvider>
```

### 2. Waiting for Lazy-Loaded Components
If your `target` element is rendered lazily (e.g., inside a tab or loaded via network), Modern Tour uses `MutationObserver` to instantly catch it when it mounts.

If your component takes longer than 3 seconds to load, increase the timeout:
```tsx
<TourProvider options={{ 
  steps, 
  waitForTargetTimeout: 10000 // Waits up to 10 seconds before aborting
}}>
```

### 3. Cross-Page Tours
To create a tour that spans multiple routes/pages, assign a `route` to your step and handle the navigation using `onStepChange`:

```tsx
<TourProvider options={{
  steps: [
    { target: '#home-btn', content: 'We are on Home' },
    { target: '#settings-btn', content: 'We are on Settings', route: '/settings' }
  ],
  onStepChange: (stepIndex) => {
    const nextRoute = steps[stepIndex]?.route;
    if (nextRoute) {
       navigate(nextRoute); // Using React Router or Next.js router
    }
  }
}}>
```

---

## API Reference

### `TourOptions`

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `steps` | `TourStep[]` | `[]` | Array of steps defining your tour. |
| `autoStart` | `boolean` | `false` | Start tour automatically when provider mounts. |
| `animation` | `string` / `Config` | `'smooth'` | Preset (`fade`, `scale`, `slide`, `bounce`, `smooth`) or custom Framer Motion config. |
| `components` | `Object` | `undefined` | Custom component overrides (e.g. `{ TooltipContent: MyReactComponent }`). |
| `waitForTargetTimeout` | `number` | `3000` | Max milliseconds to wait for a lazy-loaded target element. |
| `keyboardNavigation` | `boolean` | `true` | Allow `ArrowLeft`, `ArrowRight`, `Enter`, and `Escape` controls. |
| `closeOnOverlayClick` | `boolean` | `true` | Close tour when user clicks the dark background. |
| `spotlightPadding` | `number` | `8` | Pixels of padding around the highlighted target element. |
| `labels` | `Object` | `{...}` | Override default text for buttons (`next`, `prev`, `skip`, `finish`, `close`). |

### `TourStep`

| Property | Type | Description |
|----------|------|-------------|
| `target` | `string` | **Required.** CSS Selector for the element to highlight (e.g., `#my-btn`, `.nav-item`). |
| `content` | `ReactNode` | **Required.** Body content of the step. |
| `title` | `ReactNode` | Optional heading text. |
| `position` | `string` | Preferred placement (`top`, `bottom`, `left`, `right` and `-start`/`-end` variations). Defaults to `bottom`. |
| `route` | `string` | Helpful meta-field to trigger route changes on specific steps. |
| `spotlightPadding` | `number` | Step-specific padding, overrides the global setting. |
| `onActive` | `() => void` | Callback triggered exactly when this step becomes visible. |
| `onLeave` | `() => void` | Callback triggered when leaving this step. |

---

## Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/thangdevalone/modern-tour/issues).

## License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.
