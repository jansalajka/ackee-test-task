import {
    ErrorBoundary as SentryErrorBoundary,
    type ErrorBoundaryProps as SentryErrorBoundaryProps,
} from '@sentry/nextjs';

export interface ErrorBoundaryProps extends Partial<SentryErrorBoundaryProps> {}

/**
 * Error boundary component that catches React errors and displays a dialog
 *
 * @param children - Child components to wrap with error boundary
 * @param props - Additional Sentry error boundary props
 * @returns Error boundary component
 */
export const ErrorBoundary = ({ children, ...props }: ErrorBoundaryProps) => (
    <SentryErrorBoundary showDialog {...props} children={children} />
);
