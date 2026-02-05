# Modern Tour

A beautiful, animated, and fully customizable product tour library for React.

![Modern Tour Demo](https://via.placeholder.com/800x400?text=Modern+Tour+Demo)

## Features

- 🎨 **Shadcn UI Style** - Clean, monochrome, professional design by default
- ⚡ **Framer Motion powered** - Snappy & smooth transitions using spring physics
- 🎯 **Smart positioning** - Auto-adjusts tooltip position to avoid overflow
- ⌨️ **Keyboard navigation** - Arrow keys, Enter, and Escape support
- 🌙 **Dark mode ready** - CSS variables for easy theming
- 🧩 **Headless capable** - Use `useTour` hook for 100% custom UI
- 📦 **Neo-Brutalism Ready** - Supports bold styling via CSS variables (see demo)

## Installation

```bash
npm install modern-tour framer-motion
# or
pnpm add modern-tour framer-motion
```

## Quick Start

1. Wrap your app with `TourProvider`:

```tsx
// main.tsx
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

2. Start the tour:

```tsx
// YourComponent.tsx
import { useTour } from 'modern-tour';

function YourComponent() {
  const { start } = useTour();
  
  return <button onClick={() => start()}>Start Tour</button>;
}
```

## Theming

Modern Tour uses CSS variables. You can override them in your CSS:

```css
:root {
  /* Shadcn/Zinc Style (Default) */
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

## License

MIT
