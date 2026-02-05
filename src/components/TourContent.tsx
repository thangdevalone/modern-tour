import { useTour } from '../TourProvider';
import { ChevronRight, ChevronLeft, X, Check } from 'lucide-react';

/**
 * Modern Tour Content with Lucide Icons
 */
export function TourContent() {
    const { step, currentStep, totalSteps, options, next, prev, stop } = useTour();

    if (!step) return null;

    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === totalSteps - 1;
    const { labels, showProgress, showNavigation, showCloseButton } = options;

    return (
        <div
            className="framer-tour-content"
            style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                {step.title && (
                    <h3
                        className="framer-tour-title"
                        style={{
                            margin: 0,
                            fontSize: '1rem',
                            fontWeight: 600,
                            lineHeight: 1.25,
                            color: 'var(--tour-text)',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        {step.title}
                    </h3>
                )}

                {showCloseButton && (
                    <button
                        type="button"
                        onClick={stop}
                        className="framer-tour-close framer-tour-btn"
                        aria-label={labels?.close}
                        style={{
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--tour-text-muted)',
                            padding: 0,
                            borderRadius: '4px',
                            transition: 'all 0.15s',
                            marginTop: '-4px',
                            marginRight: '-8px',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--tour-text)';
                            e.currentTarget.style.backgroundColor = 'var(--tour-secondary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--tour-text-muted)';
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        <X size={16} strokeWidth={2.5} />
                    </button>
                )}
            </div>

            {/* Description */}
            <div
                className="framer-tour-description"
                style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    color: 'var(--tour-text-secondary)',
                }}
            >
                {step.content}
            </div>

            {/* Footer */}
            {(showProgress || showNavigation) && (
                <div
                    className="framer-tour-footer"
                    style={{
                        marginTop: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                    }}
                >
                    {showProgress && (
                        <div
                            className="framer-tour-progress"
                            style={{
                                fontSize: '0.75rem',
                                color: 'var(--tour-text-muted)',
                                fontWeight: 500,
                                fontVariantNumeric: 'tabular-nums',
                            }}
                        >
                            Step {currentStep + 1} of {totalSteps}
                        </div>
                    )}

                    {showNavigation && (
                        <div
                            className="framer-tour-navigation"
                            style={{
                                display: 'flex',
                                gap: '8px',
                                marginLeft: 'auto',
                            }}
                        >
                            {!isFirstStep && (
                                <button
                                    type="button"
                                    onClick={prev}
                                    className="framer-tour-btn framer-tour-btn-secondary"
                                    style={{
                                        height: '32px',
                                        padding: '0 10px',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        borderRadius: 'var(--tour-radius)',
                                        border: '1px solid var(--tour-border)',
                                        background: 'transparent',
                                        color: 'var(--tour-text)',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '4px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--tour-secondary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    <ChevronLeft size={14} strokeWidth={2.5} />
                                    {labels?.prev}
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={next}
                                className="framer-tour-btn framer-tour-btn-primary"
                                style={{
                                    height: '32px',
                                    padding: '0 14px',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    borderRadius: 'var(--tour-radius)',
                                    border: '1px solid transparent',
                                    background: 'var(--tour-primary)',
                                    color: 'var(--tour-primary-foreground)',
                                    cursor: 'pointer',
                                    transition: 'opacity 0.15s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.opacity = '0.9';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.opacity = '1';
                                }}
                            >
                                {isLastStep ? (
                                    <>
                                        {labels?.finish} <Check size={14} strokeWidth={2.5} />
                                    </>
                                ) : (
                                    <>
                                        {labels?.next} <ChevronRight size={14} strokeWidth={2.5} />
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
