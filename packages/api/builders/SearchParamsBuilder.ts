/**
 * Builder pattern for constructing URL search parameters
 */
export class SearchParamsBuilder {
    private params = new URLSearchParams();

    /**
     * Add a parameter if the value is defined
     *
     * @param key - The query parameter key
     * @param value - The query parameter value (string, number, or undefined to skip)
     * @returns The builder instance for method chaining
     */
    add(key: string, value?: string | number): this {
        if (value !== undefined) {
            this.params.set(key, value.toString());
        }

        return this;
    }

    /**
     * Add a parameter if the value is defined and not null
     *
     * @param key - The query parameter key
     * @param value - The query parameter value (string, number, null, or undefined to skip)
     * @returns The builder instance for method chaining
     */
    addIfNotNull(key: string, value?: string | number | null): this {
        if (value !== null && value !== undefined) {
            this.params.set(key, value.toString());
        }

        return this;
    }

    /**
     * Build the query string with leading '?' if parameters exist
     *
     * @returns The query string (e.g., "?limit=10&offset=0" or empty string)
     */
    build(): string {
        const queryString = this.params.toString();

        return queryString ? `?${queryString}` : '';
    }

    /**
     * Build the full URL with endpoint and query string
     *
     * @param endpoint - The API endpoint path
     * @returns The full URL with query string (e.g., "/recipes?limit=10&offset=0")
     */
    buildWithEndpoint(endpoint: string): string {
        return `${endpoint}${this.build()}`;
    }
}
