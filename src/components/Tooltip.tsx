import { useMemo, useRef, useState, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useTour } from '../TourProvider';
import { getAnimationConfig } from '../animations';
import { TourContent } from './TourContent';
import type { TooltipPosition } from '../types';

const TOOLTIP_OFFSET = 16;
const VIEWPORT_PADDING = 16; // Minimum distance from viewport edge

/**
 * Calculate tooltip position based on target element
 */
function calculatePosition(
    targetRect: DOMRect,
    position: TooltipPosition
): { left: number; top: number; transformOrigin: string } {
    const { top, left, width, height, bottom, right } = targetRect;

    const positions: Record<string, { left: number; top: number; transformOrigin: string }> = {
        'top': {
            left: left + width / 2,
            top: top - TOOLTIP_OFFSET,
            transformOrigin: 'bottom center',
        },
        'top-start': {
            left: left,
            top: top - TOOLTIP_OFFSET,
            transformOrigin: 'bottom left',
        },
        'top-end': {
            left: right,
            top: top - TOOLTIP_OFFSET,
            transformOrigin: 'bottom right',
        },
        'bottom': {
            left: left + width / 2,
            top: bottom + TOOLTIP_OFFSET,
            transformOrigin: 'top center',
        },
        'bottom-start': {
            left: left,
            top: bottom + TOOLTIP_OFFSET,
            transformOrigin: 'top left',
        },
        'bottom-end': {
            left: right,
            top: bottom + TOOLTIP_OFFSET,
            transformOrigin: 'top right',
        },
        'left': {
            left: left - TOOLTIP_OFFSET,
            top: top + height / 2,
            transformOrigin: 'right center',
        },
        'left-start': {
            left: left - TOOLTIP_OFFSET,
            top: top,
            transformOrigin: 'right top',
        },
        'left-end': {
            left: left - TOOLTIP_OFFSET,
            top: bottom,
            transformOrigin: 'right bottom',
        },
        'right': {
            left: right + TOOLTIP_OFFSET,
            top: top + height / 2,
            transformOrigin: 'left center',
        },
        'right-start': {
            left: right + TOOLTIP_OFFSET,
            top: top,
            transformOrigin: 'left top',
        },
        'right-end': {
            left: right + TOOLTIP_OFFSET,
            top: bottom,
            transformOrigin: 'left bottom',
        },
    };

    return positions[position] || positions['bottom'];
}

/**
 * Adjust position if it would overflow viewport
 */
function adjustPosition(
    preferredPosition: TooltipPosition,
    targetRect: DOMRect
): TooltipPosition {
    const { innerWidth, innerHeight } = window;
    const margin = 100;

    const spaceTop = targetRect.top;
    const spaceBottom = innerHeight - targetRect.bottom;
    const spaceLeft = targetRect.left;
    const spaceRight = innerWidth - targetRect.right;

    let position = preferredPosition;

    // Flip vertical
    if (position.startsWith('top') && spaceTop < margin) {
        position = position.replace('top', 'bottom') as TooltipPosition;
    } else if (position.startsWith('bottom') && spaceBottom < margin) {
        position = position.replace('bottom', 'top') as TooltipPosition;
    }

    // Flip horizontal
    if (position.startsWith('left') && spaceLeft < margin) {
        position = position.replace('left', 'right') as TooltipPosition;
    } else if (position.startsWith('right') && spaceRight < margin) {
        position = position.replace('right', 'left') as TooltipPosition;
    }

    return position;
}

/**
 * Clamp tooltip position to viewport, avoiding overlap with the target element
 */
function clampToViewport(
    left: number,
    top: number,
    tooltipWidth: number,
    tooltipHeight: number,
    targetRect?: DOMRect
): { left: number; top: number; maxHeight?: number } {
    const { innerWidth, innerHeight } = window;

    // Clamp horizontal
    let clampedLeft = left;
    if (clampedLeft < VIEWPORT_PADDING) {
        clampedLeft = VIEWPORT_PADDING;
    } else if (clampedLeft + tooltipWidth > innerWidth - VIEWPORT_PADDING) {
        clampedLeft = innerWidth - tooltipWidth - VIEWPORT_PADDING;
    }

    // Clamp vertical
    let clampedTop = top;
    if (clampedTop < VIEWPORT_PADDING) {
        clampedTop = VIEWPORT_PADDING;
    } else if (clampedTop + tooltipHeight > innerHeight - VIEWPORT_PADDING) {
        clampedTop = innerHeight - tooltipHeight - VIEWPORT_PADDING;
    }

    // Check if the tooltip overlaps with the target element
    if (targetRect) {
        const tooltipBottom = clampedTop + tooltipHeight;
        const tooltipRight = clampedLeft + tooltipWidth;

        const overlapsVertically = clampedTop < targetRect.bottom && tooltipBottom > targetRect.top;
        const overlapsHorizontally = clampedLeft < targetRect.right && tooltipRight > targetRect.left;

        if (overlapsVertically && overlapsHorizontally) {
            // Tooltip overlaps with target - reposition to avoid it
            const spaceAbove = targetRect.top - TOOLTIP_OFFSET;
            const spaceBelow = innerHeight - targetRect.bottom - TOOLTIP_OFFSET;

            let maxHeight: number | undefined;

            if (spaceBelow >= tooltipHeight) {
                // Place below target
                clampedTop = targetRect.bottom + TOOLTIP_OFFSET;
            } else if (spaceAbove >= tooltipHeight) {
                // Place above target
                clampedTop = targetRect.top - TOOLTIP_OFFSET - tooltipHeight;
            } else if (spaceBelow >= spaceAbove) {
                // More space below - place below and constrain height
                clampedTop = targetRect.bottom + TOOLTIP_OFFSET;
                maxHeight = innerHeight - clampedTop - VIEWPORT_PADDING;
            } else {
                // More space above - place above and constrain height
                maxHeight = spaceAbove - VIEWPORT_PADDING;
                clampedTop = VIEWPORT_PADDING;
            }

            // Re-clamp vertical after repositioning
            if (clampedTop < VIEWPORT_PADDING) {
                clampedTop = VIEWPORT_PADDING;
            }

            return { left: clampedLeft, top: clampedTop, maxHeight };
        }
    }

    return { left: clampedLeft, top: clampedTop };
}

/**
 * Tooltip component that displays step content
 */
export function Tooltip() {
    const { step, targetRect, options, currentStep } = useTour();
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [clampedPosition, setClampedPosition] = useState<{ left: number; top: number; maxHeight?: number } | null>(null);

    const animation = getAnimationConfig(options.animation);

    const calculatedData = useMemo(() => {
        if (!targetRect || !step) return null;

        const preferredPosition = step.position ?? 'bottom';
        const adjustedPosition = adjustPosition(preferredPosition, targetRect);
        const posData = calculatePosition(targetRect, adjustedPosition);

        return {
            ...posData,
            adjustedPosition,
        };
    }, [targetRect, step]);

    // Measure tooltip and clamp to viewport after render
    useLayoutEffect(() => {
        if (!tooltipRef.current || !calculatedData || !targetRect) {
            setClampedPosition(null);
            return;
        }

        const rect = tooltipRef.current.getBoundingClientRect();
        const tooltipWidth = rect.width;
        const tooltipHeight = rect.height;

        // Calculate initial position based on adjusted position type
        let initialLeft = calculatedData.left;
        let initialTop = calculatedData.top;

        // Adjust for transform that would have been applied
        const pos = calculatedData.adjustedPosition;
        if (pos === 'top' || pos === 'bottom') {
            initialLeft -= tooltipWidth / 2;
        }
        if (pos === 'top' || pos.startsWith('top')) {
            initialTop -= tooltipHeight;
        }
        if (pos === 'left' || pos.startsWith('left')) {
            initialLeft -= tooltipWidth;
        }
        if (pos.includes('end') && (pos.startsWith('top') || pos.startsWith('bottom'))) {
            initialLeft -= tooltipWidth;
        }
        if (pos === 'left' || pos === 'right') {
            initialTop -= tooltipHeight / 2;
        }
        if (pos.includes('end') && (pos.startsWith('left') || pos.startsWith('right'))) {
            initialTop -= tooltipHeight;
        }

        // Clamp to viewport, avoiding target overlap
        const clamped = clampToViewport(initialLeft, initialTop, tooltipWidth, tooltipHeight, targetRect);
        setClampedPosition(clamped);
    }, [calculatedData, currentStep, targetRect]);

    if (!step || !targetRect || !calculatedData) return null;

    // Calculate dynamic maxHeight
    const dynamicMaxHeight = clampedPosition?.maxHeight
        ? `${clampedPosition.maxHeight}px`
        : 'calc(100vh - 40px)';

    return (
        <motion.div
            ref={tooltipRef}
            key={`tooltip-${currentStep}`}
            className="framer-tour-tooltip"
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            transition={animation.transition}
            style={{
                position: 'fixed',
                zIndex: 9999,
                width: 'min(var(--tour-tooltip-width, 320px), calc(100vw - 32px))',
                maxHeight: dynamicMaxHeight,
                display: 'flex',
                flexDirection: 'column',
                // Use clamped position if available, otherwise use calculated position with transform
                ...(clampedPosition
                    ? {
                        left: clampedPosition.left,
                        top: clampedPosition.top,
                    }
                    : {
                        left: calculatedData.left,
                        top: calculatedData.top,
                        transform: getTransform(calculatedData.adjustedPosition),
                    }),
                transformOrigin: calculatedData.transformOrigin,
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div
                className="framer-tour-tooltip-content"
                style={{
                    background: 'var(--tour-bg, #ffffff)',
                    color: 'var(--tour-text, #09090b)',
                    borderRadius: 'var(--tour-radius, 8px)',
                    boxShadow: 'var(--tour-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1))',
                    border: '1px solid var(--tour-border, #e4e4e7)',
                    overflow: 'hidden',
                    overflowY: clampedPosition?.maxHeight ? 'auto' : undefined,
                }}
            >
                <TourContent />
            </div>
        </motion.div>
    );
}

/**
 * Get CSS transform for initial positioning (before clamping)
 */
function getTransform(position: TooltipPosition): string {
    const transforms: Record<string, string> = {
        'top': 'translate(-50%, -100%)',
        'top-start': 'translateY(-100%)',
        'top-end': 'translate(-100%, -100%)',
        'bottom': 'translateX(-50%)',
        'bottom-start': 'none',
        'bottom-end': 'translateX(-100%)',
        'left': 'translate(-100%, -50%)',
        'left-start': 'translateX(-100%)',
        'left-end': 'translate(-100%, -100%)',
        'right': 'translateY(-50%)',
        'right-start': 'none',
        'right-end': 'translateY(-100%)',
    };
    return transforms[position] || 'none';
}

