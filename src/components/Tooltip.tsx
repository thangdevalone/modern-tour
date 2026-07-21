import { useMemo, useRef, useState, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useTour } from '../context';
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
 * Adjust position so the tooltip actually fits on the chosen side.
 * Uses estimated tooltip dimensions (320x180) — not an arbitrary margin.
 * Cascade: preferred side -> opposite -> bottom -> top.
 */
function adjustPosition(
    preferredPosition: TooltipPosition,
    targetRect: DOMRect
): TooltipPosition {
    const { innerWidth, innerHeight } = window;

    // Estimated tooltip size (matches default --tour-tooltip-width: 320px)
    const estW = Math.min(320, innerWidth - 32);
    const estH = 180;
    const pad  = TOOLTIP_OFFSET + VIEWPORT_PADDING;

    const fitsTop    = (targetRect.top    - pad) >= estH;
    const fitsBottom = (innerHeight - targetRect.bottom - pad) >= estH;
    const fitsLeft   = (targetRect.left   - pad) >= estW;
    const fitsRight  = (innerWidth - targetRect.right - pad) >= estW;

    let position = preferredPosition;

    if (position.startsWith('top') && !fitsTop) {
        position = position.replace('top', 'bottom') as TooltipPosition;
    } else if (position.startsWith('bottom') && !fitsBottom) {
        position = position.replace('bottom', 'top') as TooltipPosition;
    } else if (position.startsWith('left') && !fitsLeft) {
        if (fitsRight)       position = position.replace('left', 'right') as TooltipPosition;
        else if (fitsBottom) position = 'bottom';
        else                 position = 'top';
    } else if (position.startsWith('right') && !fitsRight) {
        if (fitsLeft)        position = position.replace('right', 'left') as TooltipPosition;
        else if (fitsBottom) position = 'bottom';
        else                 position = 'top';
    }

    return position;
}

/**
 * Clamp tooltip position to stay within viewport.
 * maxHeight is only applied when the tooltip content itself is taller than the viewport.
 * Overlap with the target element is handled by adjustPosition — not here.
 */
function clampToViewport(
    left: number,
    top: number,
    tooltipWidth: number,
    tooltipHeight: number
): { left: number; top: number; maxHeight?: number } {
    const { innerWidth, innerHeight } = window;
    const usableHeight = innerHeight - 2 * VIEWPORT_PADDING;

    // If the tooltip is intrinsically taller than the viewport, constrain its height
    const maxHeight = tooltipHeight > usableHeight ? usableHeight : undefined;
    const effectiveHeight = maxHeight ?? tooltipHeight;

    // Clamp horizontal within viewport
    const clampedLeft = Math.max(
        VIEWPORT_PADDING,
        Math.min(left, innerWidth - tooltipWidth - VIEWPORT_PADDING)
    );

    // Clamp vertical within viewport
    const clampedTop = Math.max(
        VIEWPORT_PADDING,
        Math.min(top, innerHeight - effectiveHeight - VIEWPORT_PADDING)
    );

    return { left: clampedLeft, top: clampedTop, ...(maxHeight ? { maxHeight } : {}) };
}

/**
 * Tooltip component that displays step content.
 *
 * Uses a stable identity (no per-step key) so Framer Motion can spring-animate
 * the tooltip's position between steps instead of destroying and recreating it.
 * The position spring matches the Spotlight's spring for synchronized movement.
 */
export function Tooltip() {
    const { step, targetRect, options, currentStep } = useTour();
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [tooltipSize, setTooltipSize] = useState<{ width: number; height: number } | null>(null);

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

    // Measure tooltip dimensions after render for accurate clamping
    useLayoutEffect(() => {
        if (!tooltipRef.current || !calculatedData || !targetRect) return;

        const w = tooltipRef.current.offsetWidth;
        const h = tooltipRef.current.offsetHeight;
        setTooltipSize((prev) => {
            if (prev && prev.width === w && prev.height === h) return prev;
            return { width: w, height: h };
        });
    }, [calculatedData, currentStep, targetRect]);

    if (!step || !targetRect || !calculatedData) return null;

    // Use measured tooltip dimensions, or estimated size on first render
    const effectiveWidth = tooltipSize?.width ?? Math.min(320, window.innerWidth - 32);
    const effectiveHeight = tooltipSize?.height ?? 180;

    // Compute absolute pixel position (no CSS transforms needed)
    let finalLeft = calculatedData.left;
    let finalTop = calculatedData.top;
    const pos = calculatedData.adjustedPosition;

    if (pos === 'top' || pos === 'bottom') {
        finalLeft -= effectiveWidth / 2;
    }
    if (pos === 'top' || pos.startsWith('top')) {
        finalTop -= effectiveHeight;
    }
    if (pos === 'left' || pos.startsWith('left')) {
        finalLeft -= effectiveWidth;
    }
    if (pos.includes('end') && (pos.startsWith('top') || pos.startsWith('bottom'))) {
        finalLeft -= effectiveWidth;
    }
    if (pos === 'left' || pos === 'right') {
        finalTop -= effectiveHeight / 2;
    }
    if (pos.includes('end') && (pos.startsWith('left') || pos.startsWith('right'))) {
        finalTop -= effectiveHeight;
    }

    // Clamp to viewport
    const clamped = clampToViewport(finalLeft, finalTop, effectiveWidth, effectiveHeight);
    const dynamicMaxHeight = clamped.maxHeight ? `${clamped.maxHeight}px` : undefined;

    // Spring transition matching spotlight for synchronized movement between steps
    const positionSpring = { type: 'spring' as const, stiffness: 300, damping: 30 };

    return (
        <motion.div
            ref={tooltipRef}
            className="framer-tour-tooltip"
            initial={{
                ...animation.initial,
                left: clamped.left,
                top: clamped.top,
            }}
            animate={{
                ...animation.animate,
                left: clamped.left,
                top: clamped.top,
            }}
            exit={animation.exit}
            transition={{
                ...animation.transition,
                left: positionSpring,
                top: positionSpring,
            }}
            style={{
                position: 'fixed',
                zIndex: 9999,
                width: 'min(var(--tour-tooltip-width, 320px), calc(100vw - 32px))',
                maxHeight: dynamicMaxHeight,
                display: 'flex',
                flexDirection: 'column',
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
                    boxShadow: 'var(--tour-shadow, 0 10px 15px -3px rgb(0 0 0 / 0.1))',
                    border: 'var(--tour-border-width, 1px) solid var(--tour-border, #e4e4e7)',
                    overflow: 'hidden',
                    overflowY: clamped.maxHeight ? 'auto' : undefined,
                }}
            >
                {options.components?.TooltipContent ? (
                    <options.components.TooltipContent />
                ) : (
                    <TourContent />
                )}
            </div>
        </motion.div>
    );
}
