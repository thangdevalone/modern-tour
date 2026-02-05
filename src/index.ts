// Main exports
export { TourProvider, useTour, useTourActions } from './TourProvider';

// Types
export type {
    TourStep,
    TourOptions,
    TourContextValue,
    TourState,
    TourActions,
    TourTheme,
    TooltipPosition,
    AnimationPreset,
    AnimationConfig,
} from './types';

// Animations
export { animationPresets, getAnimationConfig } from './animations';

// Components (for advanced customization)
export { Spotlight } from './components/Spotlight';
export { Tooltip } from './components/Tooltip';
export { TourContent } from './components/TourContent';

// Styles
import './styles.css';
