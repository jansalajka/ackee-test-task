import { describe, expect, it } from 'vitest';

import { AppConfigBuilder } from './AppConfigBuilder';
import { AppConfigModel } from './AppConfigModel';

describe('AppConfigBuilder', () => {
    describe('setApiBaseUrl', () => {
        it('should set the API base URL', () => {
            const builder = new AppConfigBuilder();
            const apiBaseUrl = 'https://api.example.com';

            builder.setApiBaseUrl(apiBaseUrl);

            expect(builder).toBeInstanceOf(AppConfigBuilder);
        });

        it('should return the builder instance for method chaining', () => {
            const builder = new AppConfigBuilder();
            const apiBaseUrl = 'https://api.example.com';

            const result = builder.setApiBaseUrl(apiBaseUrl);

            expect(result).toBe(builder);
        });
    });

    describe('build', () => {
        it('should build AppConfigModel with valid apiBaseUrl', () => {
            const builder = new AppConfigBuilder();
            const apiBaseUrl = 'https://api.example.com';

            builder.setApiBaseUrl(apiBaseUrl);
            const config = builder.build();

            expect(config).toBeInstanceOf(AppConfigModel);
            expect(config.apiBaseUrl).toBe(apiBaseUrl);
        });

        it('should throw error when apiBaseUrl is not set', () => {
            const builder = new AppConfigBuilder();

            expect(() => builder.build()).toThrow('apiBaseUrl is required');
        });

        it('should throw error when apiBaseUrl is empty string', () => {
            const builder = new AppConfigBuilder();

            builder.setApiBaseUrl('');

            expect(() => builder.build()).toThrow('apiBaseUrl is required');
        });

        it('should support method chaining', () => {
            const apiBaseUrl = 'https://api.example.com';

            const config = new AppConfigBuilder().setApiBaseUrl(apiBaseUrl).build();

            expect(config).toBeInstanceOf(AppConfigModel);
            expect(config.apiBaseUrl).toBe(apiBaseUrl);
        });
    });
});
