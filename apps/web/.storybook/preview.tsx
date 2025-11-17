import 'normalize.css';
import 'reset.css';

import React, { useState, type ReactNode } from 'react';
import type { Preview } from '@storybook/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppConfig } from '@workspace/env';
import { ApiConfigProvider } from '@workspace/api';

import { FelaProvider } from '~modules/fela';

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'https://private-anon-916ad51d2d-cookbook3.apiary-mock.com/api/v1';

function StorybookProviders({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({}));

    const [apiBaseUrl] = useState(() => {
        try {
            return AppConfig.getInstance().getApiBaseUrl();
        } catch {
            AppConfig.initialize(API_BASE_URL);
            return AppConfig.getInstance().getApiBaseUrl();
        }
    });

    return (
        <FelaProvider>
            <QueryClientProvider client={queryClient}>
                <ApiConfigProvider apiBaseUrl={apiBaseUrl}>{children}</ApiConfigProvider>
            </QueryClientProvider>
        </FelaProvider>
    );
}

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story) => {
            return (
                <StorybookProviders>
                    <Story />
                </StorybookProviders>
            );
        },
    ],
};

export default preview;