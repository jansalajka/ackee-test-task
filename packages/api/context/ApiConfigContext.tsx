import { createContext, useContext, type ReactNode } from 'react';

/**
 * API configuration context
 */
interface ApiConfigContextValue {
    apiBaseUrl: string;
}

const ApiConfigContext = createContext<ApiConfigContextValue | undefined>(undefined);

/**
 * Provider for API configuration
 */
interface ApiConfigProviderProps {
    apiBaseUrl: string;
    children: ReactNode;
}

/**
 * Provider component for API configuration context
 *
 * @param apiBaseUrl - The API base URL to provide to child components
 * @param children - Child components that can access the API configuration
 */
export function ApiConfigProvider({ apiBaseUrl, children }: ApiConfigProviderProps) {
    return <ApiConfigContext.Provider value={{ apiBaseUrl }}>{children}</ApiConfigContext.Provider>;
}

/**
 * Hook to access API configuration
 *
 * @returns API configuration
 * @throws Error if used outside ApiConfigProvider
 */
export function useApiConfig(): ApiConfigContextValue {
    const context = useContext(ApiConfigContext);

    if (!context) {
        throw new Error('useApiConfig must be used within ApiConfigProvider');
    }

    return context;
}

