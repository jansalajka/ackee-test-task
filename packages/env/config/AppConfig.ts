import { AppConfigBuilder } from '../models/AppConfigBuilder';
import type { AppConfigModel as AppConfigModelType } from '../types/AppConfig';

/**
 * Singleton class for application configuration
 */
class AppConfig {
    private static instance: AppConfig;

    private readonly config: AppConfigModelType;

    private constructor(apiBaseUrl: string) {
        // Load all config using builder with provided values
        const builder = new AppConfigBuilder();

        this.config = builder.setApiBaseUrl(apiBaseUrl).build();
    }

    /**
     * Initialize the AppConfig singleton with configuration values
     * Must be called before getInstance()
     *
     * @param apiBaseUrl - The API base URL
     */
    public static initialize(apiBaseUrl: string): void {
        if (AppConfig.instance) {
            throw new Error('AppConfig has already been initialized');
        }

        AppConfig.instance = new AppConfig(apiBaseUrl);
    }

    /**
     * Get the singleton instance
     *
     * @returns The AppConfig instance
     * @throws Error if not initialized
     */
    public static getInstance(): AppConfig {
        if (!AppConfig.instance) {
            throw new Error('AppConfig must be initialized before use. Call AppConfig.initialize() first.');
        }

        return AppConfig.instance;
    }

    /**
     * Get the API base URL
     *
     * @returns The API base URL
     */
    public getApiBaseUrl(): string {
        return this.config.apiBaseUrl;
    }

    /**
     * Get the configuration model
     *
     * @returns The AppConfigModel instance
     */
    public getConfig(): AppConfigModelType {
        return this.config;
    }
}

export { AppConfig };

