import type { ReactNode } from 'react';

/**
 * Position for tooltip placement
 */
export type TooltipPosition =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';

/**
 * Single step definition in the tour
 */
export interface TourStep {
    /** Unique identifier for the step */
    id?: string;
    /** CSS selector or ref to target element */
    target: string;
    /** Title of the step */
    title?: ReactNode;
    /** Main content/description */
    content: ReactNode;
    /** Preferred tooltip position */
    position?: TooltipPosition;
    /** Disable interaction with target element */
    disableInteraction?: boolean;
    /** Custom spotlight padding */
    spotlightPadding?: number;
    /** Callback when step becomes active */
    onActive?: () => void;
    /** Callback when leaving this step */
    onLeave?: () => void;
}

/**
 * Animation preset types
 */
export type AnimationPreset = 'fade' | 'scale' | 'slide' | 'bounce' | 'smooth';

/**
 * Animation values for motion components
 */
export type AnimationValues = {
    opacity?: number;
    scale?: number;
    x?: number;
    y?: number;
    rotate?: number;
};

/**
 * Transition config
 */
export type TransitionConfig = {
    type?: 'spring' | 'tween';
    duration?: number;
    ease?: number[] | string;
    stiffness?: number;
    damping?: number;
    mass?: number;
};

/**
 * Custom animation configuration
 */
export interface AnimationConfig {
    initial: AnimationValues;
    animate: AnimationValues;
    exit: AnimationValues;
    transition?: TransitionConfig;
}

/**
 * Theme configuration
 */
export interface TourTheme {
    /** Background color */
    background?: string;
    /** Text color */
    textColor?: string;
    /** Accent/primary color */
    accentColor?: string;
    /** Overlay background color */
    overlayColor?: string;
    /** Border radius */
    borderRadius?: number | string;
    /** Box shadow */
    shadow?: string;
}

/**
 * Tour configuration options
 */
export interface TourOptions {
    /** Steps to display */
    steps: TourStep[];
    /** Start tour automatically on mount */
    autoStart?: boolean;
    /** Enable keyboard navigation */
    keyboardNavigation?: boolean;
    /** Close on overlay click */
    closeOnOverlayClick?: boolean;
    /** Close on escape key */
    closeOnEscape?: boolean;
    /** Show progress indicator */
    showProgress?: boolean;
    /** Show navigation buttons */
    showNavigation?: boolean;
    /** Show close button */
    showCloseButton?: boolean;
    /** Animation preset or custom config */
    animation?: AnimationPreset | AnimationConfig;
    /** Custom theme */
    theme?: TourTheme;
    /** Spotlight padding around target */
    spotlightPadding?: number;
    /** Scroll behavior when showing step */
    scrollBehavior?: ScrollBehavior;
    /** Scroll margin from viewport edge */
    scrollMargin?: number;
    /** Custom labels for buttons */
    labels?: {
        next?: string;
        prev?: string;
        skip?: string;
        finish?: string;
        close?: string;
    };
    /** Callback when tour starts */
    onStart?: () => void;
    /** Callback when tour ends */
    onEnd?: () => void;
    /** Callback when step changes */
    onStepChange?: (step: number, direction: 'next' | 'prev') => void;
}

/**
 * Tour context state
 */
export interface TourState {
    /** Whether tour is currently active */
    isOpen: boolean;
    /** Current step index */
    currentStep: number;
    /** Total number of steps */
    totalSteps: number;
    /** Current step data */
    step: TourStep | null;
    /** Target element rect */
    targetRect: DOMRect | null;
}

/**
 * Tour context actions
 */
export interface TourActions {
    /** Start the tour */
    start: (stepIndex?: number) => void;
    /** Stop/close the tour */
    stop: () => void;
    /** Go to next step */
    next: () => void;
    /** Go to previous step */
    prev: () => void;
    /** Go to specific step */
    goTo: (index: number) => void;
}

/**
 * Combined tour context value
 */
export interface TourContextValue extends TourState, TourActions {
    options: TourOptions;
}
