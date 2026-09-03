import { ReactNode } from 'react';

/**
 * The settings and data (props) passed into the ErrorBoundary component.
 */
export interface ErrorBoundaryProps {
    /** The normal app content/components inside this boundary. */
    children: ReactNode;

    /**
     * What to show instead of a crash. Can be a simple element or a function.
     * @example
     * fallback={(error, reset) => <p>Something went wrong!</p>}
     */
    fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);

    /** The main text heading shown on the error screen. */
    title: string;

    /** A function that runs to clean up and try fixing the error. */
    onReset: () => void;
}

/**
 * The internal memory (state) that tracks if the component is broken.
 */
export interface ErrorBoundaryState {
    /** True if a child component crashed; false if everything is fine. */
    hasError: boolean;

    /** Holds the error details if it crashed, otherwise it is empty (null). */
    error: Error | null;
}
