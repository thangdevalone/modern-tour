import type { AnimationPreset, AnimationConfig } from './types';

/**
 * Animation presets for tour components
 */
export const animationPresets: Record<AnimationPreset, AnimationConfig> = {
    // Pure opacity fade - simple, slow, and cinematic
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { type: 'tween', duration: 0.6, ease: 'easeInOut' },
    },

    // Dramatic zoom combined with 3D rotation - unmistakable
    scale: {
        initial: { opacity: 0, scale: 0.3, rotateX: 30, rotateY: 30 },
        animate: { opacity: 1, scale: 1, rotateX: 0, rotateY: 0 },
        exit: { opacity: 0, scale: 0.5, rotateX: -30, rotateY: -30 },
        transition: {
            type: 'spring',
            stiffness: 250,
            damping: 20,
        },
    },

    // Huge slide - sweeps in forcefully from a large distance
    slide: {
        initial: { opacity: 0, x: -100, y: 50 },
        animate: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 100, y: -50 },
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 25,
            mass: 0.8,
        },
    },

    // Exaggerated bounce - extremely playful and hyperactive
    bounce: {
        initial: { opacity: 0, scale: 0.1, y: -50, rotate: -20 },
        animate: { opacity: 1, scale: 1, y: 0, rotate: 0 },
        exit: { opacity: 0, scale: 0.1, y: 50, rotate: 20 },
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 8, // Very low damping creates lots of bounces
            mass: 1.2,
        },
    },

    // Balanced combination - default preset, subtle and smooth
    smooth: {
        initial: { opacity: 0, scale: 0.95, y: 15 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.98, y: -5 },
        transition: {
            type: 'tween',
            ease: [0.16, 1, 0.3, 1],
            duration: 0.4,
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
