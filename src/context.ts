import { createContext, useContext } from 'react';
import type { TourContextValue } from './types';

export const TourContext = createContext<TourContextValue | null>(null);

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
