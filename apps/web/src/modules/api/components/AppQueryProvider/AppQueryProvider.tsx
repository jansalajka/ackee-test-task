import { useState, type ReactNode } from 'react';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ApiConfigProvider } from '@workspace/api';
import { AppConfig, env } from '@workspace/env';

export interface AppQueryProviderProps {
    children: ReactNode;
    dehydratedState: unknown;
}

/**
 * API base URL from Next.js environment variables
 * In Next.js, NEXT_PUBLIC_ variables are replaced at build time and available in browser
 */
const API_BASE_URL = env.NEXT_PUBLIC_API_BASE_URL ?? 'https://private-anon-916ad51d2d-cookbook3.apiary-mock.com/api/v1';

export function AppQueryProvider({ children, dehydratedState }: AppQueryProviderProps) {
    const [queryClient] = useState(() => new QueryClient({}));

    // Initialize AppConfig once
    const [apiBaseUrl] = useState(() => {
        try {
            return AppConfig.getInstance().getApiBaseUrl();
        } catch {
            AppConfig.initialize(API_BASE_URL);

            return AppConfig.getInstance().getApiBaseUrl();
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                <ApiConfigProvider apiBaseUrl={apiBaseUrl}>{children}</ApiConfigProvider>
            </HydrationBoundary>
        </QueryClientProvider>
    );
}
