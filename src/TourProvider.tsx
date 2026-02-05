import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    useMemo,
    type ReactNode,
} from 'react';
import { AnimatePresence } from 'framer-motion';
import type { TourOptions, TourContextValue, TourStep } from './types';
import { Spotlight } from './components/Spotlight';
import { Tooltip } from './components/Tooltip';

const TourContext = createContext<TourContextValue | null>(null);

/**
 * Default options for the tour
 */
const defaultOptions: Partial<TourOptions> = {
    autoStart: false,
    keyboardNavigation: true,
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showProgress: true,
    showNavigation: true,
    showCloseButton: true,
    animation: 'smooth',
    spotlightPadding: 8,
    scrollBehavior: 'smooth',
    scrollMargin: 100,
    labels: {
        next: 'Next',
        prev: 'Previous',
        skip: 'Skip',
        finish: 'Finish',
        close: 'Close',
    },
};

interface TourProviderProps {
    children: ReactNode;
    options: TourOptions;
}

/**
 * Tour Provider component that manages tour state
 */
export function TourProvider({ children, options }: TourProviderProps) {
    const mergedOptions = useMemo(
        () => ({
            ...defaultOptions,
            ...options,
            labels: { ...defaultOptions.labels, ...options.labels },
        }),
        [options]
    );

    const [isOpen, setIsOpen] = useState(mergedOptions.autoStart ?? false);
    const [currentStep, setCurrentStep] = useState(0);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    const steps = mergedOptions.steps;
    const totalSteps = steps.length;
    const step: TourStep | null = steps[currentStep] ?? null;

    // Find and observe target element
    useEffect(() => {
        if (!isOpen || !step) {
            setTargetRect(null);
            return;
        }

        const target = document.querySelector(step.target);
        if (!target) {
            console.warn(`[framer-tour] Target element not found: ${step.target}`);
            setTargetRect(null);
            return;
        }

        // Scroll target into view
        target.scrollIntoView({
            behavior: mergedOptions.scrollBehavior,
            block: 'center',
            inline: 'center',
        });

        // Small delay to let scroll complete, then get rect
        const timer = setTimeout(() => {
            const rect = target.getBoundingClientRect();
            setTargetRect(rect);
            step.onActive?.();
        }, 100);

        // Observe resize/scroll to update position
        const updateRect = () => {
            const rect = target.getBoundingClientRect();
            setTargetRect(rect);
        };

        window.addEventListener('resize', updateRect);
        window.addEventListener('scroll', updateRect, true);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateRect);
            window.removeEventListener('scroll', updateRect, true);
        };
    }, [isOpen, step, currentStep, mergedOptions.scrollBehavior]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen || !mergedOptions.keyboardNavigation) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowRight':
                case 'Enter':
                    e.preventDefault();
                    next();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    prev();
                    break;
                case 'Escape':
                    if (mergedOptions.closeOnEscape) {
                        e.preventDefault();
                        stop();
                    }
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, mergedOptions.keyboardNavigation, mergedOptions.closeOnEscape]);

    const start = useCallback(
        (stepIndex = 0) => {
            setCurrentStep(Math.max(0, Math.min(stepIndex, totalSteps - 1)));
            setIsOpen(true);
            mergedOptions.onStart?.();
        },
        [totalSteps, mergedOptions]
    );

    const stop = useCallback(() => {
        step?.onLeave?.();
        setIsOpen(false);
        setCurrentStep(0);
        setTargetRect(null);
        mergedOptions.onEnd?.();
    }, [step, mergedOptions]);

    const next = useCallback(() => {
        if (currentStep >= totalSteps - 1) {
            stop();
            return;
        }
        step?.onLeave?.();
        setCurrentStep((prev) => prev + 1);
        mergedOptions.onStepChange?.(currentStep + 1, 'next');
    }, [currentStep, totalSteps, step, stop, mergedOptions]);

    const prev = useCallback(() => {
        if (currentStep <= 0) return;
        step?.onLeave?.();
        setCurrentStep((prev) => prev - 1);
        mergedOptions.onStepChange?.(currentStep - 1, 'prev');
    }, [currentStep, step, mergedOptions]);

    const goTo = useCallback(
        (index: number) => {
            const direction = index > currentStep ? 'next' : 'prev';
            const targetIndex = Math.max(0, Math.min(index, totalSteps - 1));
            step?.onLeave?.();
            setCurrentStep(targetIndex);
            mergedOptions.onStepChange?.(targetIndex, direction);
        },
        [currentStep, totalSteps, step, mergedOptions]
    );

    const handleOverlayClick = useCallback(() => {
        if (mergedOptions.closeOnOverlayClick) {
            stop();
        }
    }, [mergedOptions.closeOnOverlayClick, stop]);

    const contextValue: TourContextValue = useMemo(
        () => ({
            isOpen,
            currentStep,
            totalSteps,
            step,
            targetRect,
            options: mergedOptions as TourOptions,
            start,
            stop,
            next,
            prev,
            goTo,
        }),
        [isOpen, currentStep, totalSteps, step, targetRect, mergedOptions, start, stop, next, prev, goTo]
    );

    return (
        <TourContext.Provider value={contextValue}>
            {children}
            <AnimatePresence mode="wait">
                {isOpen && targetRect && step && (
                    <>
                        <Spotlight
                            targetRect={targetRect}
                            padding={step.spotlightPadding ?? mergedOptions.spotlightPadding ?? 8}
                            onOverlayClick={handleOverlayClick}
                        />
                        <Tooltip />
                    </>
                )}
            </AnimatePresence>
        </TourContext.Provider>
    );
}

/**
 * Hook to access tour context
 */
export function useTour(): TourContextValue {
    const context = useContext(TourContext);
    if (!context) {
        throw new Error('useTour must be used within a TourProvider');
    }
    return context;
}

/**
 * Hook to access tour actions only (for performance)
 */
export function useTourActions() {
    const { start, stop, next, prev, goTo } = useTour();
    return { start, stop, next, prev, goTo };
}
