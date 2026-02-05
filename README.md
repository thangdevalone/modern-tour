# Modern Tour

A lightweight, animated product tour library for React. Built with Framer Motion for smooth transitions and smart positioning.

## Features

- **Smooth Animations** - Powered by Framer Motion with spring physics
- **Smart Positioning** - Auto-adjusts tooltip position to stay in viewport
- **Keyboard Support** - Navigate with arrow keys, Enter, and Escape
- **Dark Mode** - Easy theming with CSS variables
- **Headless Mode** - Build your own UI with the `useTour` hook
- **Neo-Brutalism** - Bold styling option via CSS variables

## Installation

```bash
npm install modern-tour
```

## Quick Start

Wrap your app with `TourProvider`:

```tsx
import { TourProvider } from 'modern-tour';
import 'modern-tour/styles.css';

const steps = [
  { target: '#btn-1', content: 'Step 1 description' },
  { target: '#btn-2', title: 'Step 2', content: 'Description here' },
];

function App() {
  return (
    <TourProvider options={{ steps }}>
      <YourApp />
    </TourProvider>
  );
}
```

Start the tour from any component:

```tsx
import { useTour } from 'modern-tour';

function YourComponent() {
  const { start } = useTour();
  
  return <button onClick={() => start()}>Start Tour</button>;
}
```

## Theming

Override CSS variables to match your design:

```css
:root {
  /* Default Shadcn/Zinc Style */
  --tour-bg: #ffffff;
  --tour-text: #09090b;
  --tour-primary: #18181b;
  --tour-radius: 0.5rem;
}

/* Neo-Brutalism Example */
.neo-theme {
  --tour-bg: #fffbf0;
  --tour-border: #000000;
  --tour-radius: 0px;
  --tour-shadow: 4px 4px 0px #000000;
}
```

## Demo

Check out the live demo at [tour.modern-ui.org](https://tour.modern-ui.org)

## License

MIT
