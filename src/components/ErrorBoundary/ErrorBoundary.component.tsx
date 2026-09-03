import { Component, ReactNode } from 'react';

import { Button, Typography } from '@mui/material';

import { ActionWrapper, ErrorContainer } from './ErrorBoundary.styles';
import { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';

/**
 * A class component that catches the runtime java script error anywhere in child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the application.
 *
 * @extends {Component<ErrorBoundaryProps,ErrorBoundaryState>}
 * @note You need to pass the title to the Error Boundary component when using.
 */
export class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    /**
     * Initial state of the error state boundary
     */
    public state: ErrorBoundaryState = {
        hasError: false,
        error: null,
    };

    /**
     * Updates the error so the next render will show the fallback UI when an error is caught.
<<<<<<< HEAD
     * @param error - The error that was thrown by the descendent component.
     * @returns The Updated state object indicating an error has occurred.
=======
     * @param {Error} error - The error that was thrown by the descendent component.
     * @returns {ErrorBoundaryState} The Updated state object indicating an error has occurred.
>>>>>>> 9da866d ([RT_A2_01]: fix: fix the box shadow of buttons and alignment of the text in the 404 page.)
     */
    public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    /**
     * Resets the error state and triggers the optional 'onReset' callback from props,
     * allowing the application to attempt recovery or retry rendering.
     *
     * @private
     */
    private handleReset = (): void => {
        this.props.onReset?.();
        this.setState({ hasError: false, error: null });
    };

    /**
     * Renders the fallback UI if an error is caught; otherwise, renders the child components.
     *
     * @returns The rendered element tree.
     */
    public render(): ReactNode {
        const { hasError, error } = this.state;
        const {
            fallback,
            children,
            title = 'Something went Wrong',
        } = this.props;
        if (hasError) {
            if (typeof fallback === 'function' && error) {
                return fallback(error, this.handleReset);
            }
            return (
                <ErrorContainer>
                    <Typography variant="h6" color="error" gutterBottom>
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                    >
                        An Unexpected rendering error occurred.
                    </Typography>
                    <ActionWrapper>
                        <Button variant="contained" onClick={this.handleReset}>
                            Try Again
                        </Button>
                    </ActionWrapper>
                </ErrorContainer>
            );
        }
        return children;
    }
}
