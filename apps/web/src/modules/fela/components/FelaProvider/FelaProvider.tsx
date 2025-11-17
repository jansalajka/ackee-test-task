import type { ReactNode } from 'react';
import { createRenderer } from 'fela';
import { RendererProvider } from 'react-fela';

/**
 * Fela renderer instance
 * Created once per request on server, reused on client
 */
let renderer: ReturnType<typeof createRenderer> | null = null;

/**
 * Get or create Fela renderer
 * On server, creates new renderer per request
 * On client, reuses the same renderer
 */
function getRenderer() {
    if (typeof window === 'undefined') {
        // Server-side: create new renderer for each request
        return createRenderer();
    }

    // Client-side: reuse the same renderer
    if (!renderer) {
        renderer = createRenderer();
    }

    return renderer;
}

export interface FelaProviderProps {
    children: ReactNode;
    renderer?: ReturnType<typeof createRenderer>;
}

/**
 * Provides Fela renderer to child components
 */
export function FelaProvider({ children, renderer: providedRenderer }: FelaProviderProps) {
    const rendererToUse = providedRenderer || getRenderer();

    // Apply global Roboto font to html and body
    rendererToUse.renderStatic(
        {
            fontFamily: "'Roboto', sans-serif",
        },
        'html, body',
    );

    return <RendererProvider renderer={rendererToUse}>{children}</RendererProvider>;
}

