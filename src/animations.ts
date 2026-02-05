import type { AnimationPreset, AnimationConfig, TransitionConfig } from './types';

// Snappy but smooth spring (Shadcn style)
const snappySpring: TransitionConfig = {
    type: 'spring',
    stiffness: 450,
    damping: 35,
    mass: 1,
};

const smoothEase: TransitionConfig = {
    type: 'tween',
    ease: [0.32, 0.72, 0, 1],
    duration: 0.35,
};

/**
 * Animation presets for tour components
 */
export const animationPresets: Record<AnimationPreset, AnimationConfig> = {
    // Pure opacity fade - simple and clean
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.4 },
    },

    // Dramatic zoom in/out - very noticeable
    scale: {
        initial: { opacity: 0, scale: 0.3 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.5 },
        transition: snappySpring,
    },

    // Slide from bottom - clear vertical movement
    slide: {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 },
        transition: smoothEase,
    },

    // Bouncy spring - playful overshoot effect
    bounce: {
        initial: { opacity: 0, scale: 0.4, y: 30 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.8 },
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 12,
            mass: 0.8,
        },
    },

    // Balanced combination - default preset
    smooth: {
        initial: { opacity: 0, scale: 0.85, y: 15 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: -10 },
        transition: {
            type: 'tween',
            ease: [0.16, 1, 0.3, 1],
            duration: 0.35,
        },
    },
};

/**
 * Get animation config from preset name or custom config
 */
export function getAnimationConfig(
    animation: AnimationPreset | AnimationConfig = 'smooth'
): AnimationConfig {
    if (typeof animation === 'string') {
        return animationPresets[animation];
    }
    return animation;
}

/**
 * Overlay animation config - faster fade
 */
export const overlayAnimation: AnimationConfig = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.25 },
};
