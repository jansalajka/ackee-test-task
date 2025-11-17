import 'normalize.css';
import 'reset.css';

import type { AppProps } from 'next/app';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ErrorBoundary } from '@workspace/errors';

import { AppQueryProvider } from '~modules/api/components';
import { FelaProvider } from '~modules/fela';
import { Intl } from '~modules/intl/components';

export interface ExtendedAppProps extends AppProps {}

function App({ Component, pageProps }: ExtendedAppProps) {
    return (
        <ErrorBoundary>
            <FelaProvider>
                <AppQueryProvider dehydratedState={pageProps.dehydratedState}>
                    <Intl>
                        <Component {...pageProps} />
                    </Intl>
                    <ReactQueryDevtools initialIsOpen={false} />
                </AppQueryProvider>
            </FelaProvider>
        </ErrorBoundary>
    );
}

export default App;
