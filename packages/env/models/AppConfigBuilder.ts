import { AppConfigModel } from './AppConfigModel';

/**
 * Builder for AppConfigModel
 */
export class AppConfigBuilder {
    private apiBaseUrl?: string;

    /**
     * Set the API base URL
     *
     * @param apiBaseUrl - The base URL for the API
     * @returns The builder instance for method chaining
     */
    setApiBaseUrl(apiBaseUrl: string): this {
        this.apiBaseUrl = apiBaseUrl;

        return this;
    }

    /**
     * Build the AppConfigModel instance
     *
     * @returns The configured AppConfigModel
     * @throws Error if required fields are missing
     */
    build(): AppConfigModel {
        if (!this.apiBaseUrl) {
            throw new Error('apiBaseUrl is required');
        }

        return new AppConfigModel(this.apiBaseUrl);
    }
}

