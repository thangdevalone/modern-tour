import { motion } from 'framer-motion';
import { overlayAnimation } from '../animations';

interface SpotlightProps {
    targetRect: DOMRect;
    padding?: number;
    onOverlayClick?: () => void;
}

/**
 * Spotlight component that highlights the target element
 * Uses a SVG mask to create a cutout effect
 */
export function Spotlight({ targetRect, padding = 8, onOverlayClick }: SpotlightProps) {
    const { width: windowWidth, height: windowHeight } = {
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    };

    // Calculate spotlight dimensions with padding
    const spotlightX = targetRect.left - padding;
    const spotlightY = targetRect.top - padding;
    const spotlightWidth = targetRect.width + padding * 2;
    const spotlightHeight = targetRect.height + padding * 2;
    const borderRadius = 8;

    return (
        <motion.div
            className="framer-tour-spotlight-container"
            initial={overlayAnimation.initial}
            animate={overlayAnimation.animate}
            exit={overlayAnimation.exit}
            transition={overlayAnimation.transition}
            onClick={onOverlayClick}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9998,
                pointerEvents: 'auto',
            }}
        >
            <svg
                width="100%"
                height="100%"
                style={{
                    position: 'absolute',
                    inset: 0,
                }}
            >
                <defs>
                    <mask id="spotlight-mask">
                        {/* White = visible, Black = hidden */}
                        <rect x="0" y="0" width={windowWidth} height={windowHeight} fill="white" />
                        <motion.rect
                            initial={{
                                x: spotlightX,
                                y: spotlightY,
                                width: spotlightWidth,
                                height: spotlightHeight,
                            }}
                            animate={{
                                x: spotlightX,
                                y: spotlightY,
                                width: spotlightWidth,
                                height: spotlightHeight,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 30,
                            }}
                            rx={borderRadius}
                            ry={borderRadius}
                            fill="black"
                        />
                    </mask>
                </defs>
                <rect
                    x="0"
                    y="0"
                    width={windowWidth}
                    height={windowHeight}
                    fill="var(--tour-overlay, rgba(0, 0, 0, 0.5))"
                    mask="url(#spotlight-mask)"
                />
            </svg>

            {/* Spotlight border glow effect */}
            <motion.div
                className="framer-tour-spotlight-ring"
                initial={{
                    x: spotlightX,
                    y: spotlightY,
                    width: spotlightWidth,
                    height: spotlightHeight,
                    opacity: 0,
                }}
                animate={{
                    x: spotlightX,
                    y: spotlightY,
                    width: spotlightWidth,
                    height: spotlightHeight,
                    opacity: 1,
                }}
                exit={{ opacity: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                }}
                style={{
                    position: 'absolute',
                    borderRadius: borderRadius,
                    boxShadow: '0 0 0 2px var(--tour-primary, #ffffff)',
                    pointerEvents: 'none',
                }}
            />
        </motion.div>
    );
}
