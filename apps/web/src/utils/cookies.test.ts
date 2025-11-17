import { beforeEach, describe, expect, it } from 'vitest';

import { cookies } from './cookies';

describe('cookies', () => {
    beforeEach(() => {
        document.cookie.split(';').forEach(cookie => {
            const name = cookie.split('=')[0].trim();

            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
        });
    });

    describe('get', () => {
        it('should return null when cookie does not exist', () => {
            expect(cookies.get('nonExistent')).toBeNull();
        });

        it('should return cookie value when it exists', () => {
            document.cookie = 'testCookie=testValue;path=/';
            expect(cookies.get('testCookie')).toBe('testValue');
        });

        it('should return null when cookie name is empty', () => {
            expect(cookies.get('')).toBeNull();
        });

        it('should handle cookies with special characters in value', () => {
            const value = 'value with spaces and special chars!@#';

            document.cookie = `testCookie=${value};path=/`;
            expect(cookies.get('testCookie')).toBe(value);
        });

        it('should return the latest value when cookie is set multiple times', () => {
            document.cookie = 'cookie1=value1;path=/';
            document.cookie = 'cookie2=value2;path=/';
            document.cookie = 'cookie1=value3;path=/';
            expect(cookies.get('cookie1')).toBe('value3');
        });
    });

    describe('set', () => {
        it('should set a cookie with default expiration', () => {
            cookies.set('testCookie', 'testValue');
            expect(cookies.get('testCookie')).toBe('testValue');
        });

        it('should set a cookie with custom expiration days', () => {
            cookies.set('testCookie', 'testValue', 30);
            expect(cookies.get('testCookie')).toBe('testValue');
        });

        it('should set a cookie with expiration date in the future', () => {
            const days = 7;

            cookies.set('testCookie', 'testValue', days);
            expect(cookies.get('testCookie')).toBe('testValue');
        });

        it('should overwrite existing cookie with same name', () => {
            cookies.set('testCookie', 'value1');
            expect(cookies.get('testCookie')).toBe('value1');
            cookies.set('testCookie', 'value2');
            expect(cookies.get('testCookie')).toBe('value2');
        });

        it('should handle empty string value', () => {
            cookies.set('testCookie', '');
            const value = cookies.get('testCookie');

            expect(value === '' || value === null).toBe(true);
        });
    });

    describe('delete', () => {
        it('should delete an existing cookie', () => {
            cookies.set('testCookie', 'testValue');
            expect(cookies.get('testCookie')).toBe('testValue');
            cookies.delete('testCookie');
            expect(cookies.get('testCookie')).toBeNull();
        });

        it('should not throw when deleting non-existent cookie', () => {
            expect(() => cookies.delete('nonExistent')).not.toThrow();
        });

        it('should set expiration to past date when deleting', () => {
            cookies.set('testCookie', 'testValue');
            cookies.delete('testCookie');
            const cookie = document.cookie;

            expect(cookie).not.toContain('testCookie=testValue');
        });
    });
});
