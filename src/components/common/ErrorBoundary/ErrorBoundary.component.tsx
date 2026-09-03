import { Component, ReactNode } from 'react';

import { Typography } from '@mui/material';

import { ActionWrapper, ErrorContainer } from './ErrorBoundary.styles';
import { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';
import { ButtonPrimary } from '../Button';

/**
 * A class component that catches the typescript error anywhere in child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the application.
 *
 * @extends {Component<ErrorBoundaryProps,ErrorBoundaryState>}
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
     * @param {Error} error - The error that was thrown by the descendent component.
     * @returns {ErrorBoundaryState} The Updated state object indicating an error has occured.
     */
    public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    /**
     * Resets the error state and triggers the optional 'onReset' callback from props,
     * allowing the application to attempt recovery or retry rendering.
     *
     * @private
     * @returns {void}
     */
    private handleReset = (): void => {
        this.props.onReset?.();
        this.setState({ hasError: false, error: null });
    };

    /**
     * Renders the fallback UI if an error is caught; otherwise, renders the child components.
     *
     * @returns {ReactNode} The rendered element tree.
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
                <ErrorContainer elevation={1}>
                    <Typography variant="h6" color="error" gutterBottom>
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                    >
                        {error?.message ||
                            'An Unexpected rendering error occured.'}
                    </Typography>
                    <ActionWrapper>
                        <ButtonPrimary onClick={this.handleReset}>
                            Try Again
                        </ButtonPrimary>
                    </ActionWrapper>
                </ErrorContainer>
            );
        }
        return children;
    }
}
