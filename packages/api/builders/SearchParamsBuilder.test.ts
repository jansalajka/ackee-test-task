import { describe, expect, it } from 'vitest';

import { SearchParamsBuilder } from './SearchParamsBuilder';

describe('SearchParamsBuilder', () => {
    describe('add', () => {
        it('should add a string parameter', () => {
            const builder = new SearchParamsBuilder();

            builder.add('name', 'test');

            expect(builder.build()).toBe('?name=test');
        });

        it('should add a number parameter', () => {
            const builder = new SearchParamsBuilder();

            builder.add('limit', 10);

            expect(builder.build()).toBe('?limit=10');
        });

        it('should skip undefined values', () => {
            const builder = new SearchParamsBuilder();

            builder.add('limit', undefined);

            expect(builder.build()).toBe('');
        });

        it('should chain multiple parameters', () => {
            const builder = new SearchParamsBuilder();

            builder.add('limit', 10).add('offset', 20);

            expect(builder.build()).toBe('?limit=10&offset=20');
        });

        it('should skip undefined values in chain', () => {
            const builder = new SearchParamsBuilder();

            builder.add('limit', 10).add('offset', undefined).add('sort', 'name');

            expect(builder.build()).toBe('?limit=10&sort=name');
        });
    });

    describe('addIfNotNull', () => {
        it('should add a non-null value', () => {
            const builder = new SearchParamsBuilder();

            builder.addIfNotNull('name', 'test');

            expect(builder.build()).toBe('?name=test');
        });

        it('should skip null values', () => {
            const builder = new SearchParamsBuilder();

            builder.addIfNotNull('name', null);

            expect(builder.build()).toBe('');
        });

        it('should skip undefined values', () => {
            const builder = new SearchParamsBuilder();

            builder.addIfNotNull('name', undefined);

            expect(builder.build()).toBe('');
        });

        it('should handle zero as valid value', () => {
            const builder = new SearchParamsBuilder();

            builder.addIfNotNull('offset', 0);

            expect(builder.build()).toBe('?offset=0');
        });
    });

    describe('build', () => {
        it('should return empty string when no parameters added', () => {
            const builder = new SearchParamsBuilder();

            expect(builder.build()).toBe('');
        });

        it('should return query string with leading ? when parameters exist', () => {
            const builder = new SearchParamsBuilder();

            builder.add('limit', 10);

            expect(builder.build()).toBe('?limit=10');
        });
    });

    describe('buildWithEndpoint', () => {
        it('should build full URL with endpoint and query string', () => {
            const builder = new SearchParamsBuilder();

            builder.add('limit', 10).add('offset', 20);

            expect(builder.buildWithEndpoint('/recipes')).toBe('/recipes?limit=10&offset=20');
        });

        it('should build URL without query string when no parameters', () => {
            const builder = new SearchParamsBuilder();

            expect(builder.buildWithEndpoint('/recipes')).toBe('/recipes');
        });

        it('should handle endpoint with trailing slash', () => {
            const builder = new SearchParamsBuilder();

            builder.add('limit', 10);

            expect(builder.buildWithEndpoint('/recipes/')).toBe('/recipes/?limit=10');
        });
    });
});
