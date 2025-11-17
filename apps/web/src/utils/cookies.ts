import { DateTime } from 'luxon';

/**
 * Validates that a cookie name is not empty
 *
 * @param name - Cookie name to validate
 * @returns True if the name is valid (non-empty after trimming)
 */
function isValidName(name: string): boolean {
    return name.trim().length > 0;
}

/**
 * Gets a cookie value by name
 *
 * @param name - Cookie name to retrieve
 * @returns Cookie value or null if not found or name is invalid
 */
function getCookie(name: string): string | null {
    if (!isValidName(name)) {
        return null;
    }

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() ?? null;
    }

    return null;
}

/**
 * Sets a cookie with expiration
 *
 * @param name - Cookie name
 * @param value - Cookie value
 * @param days - Number of days until expiration (default: 365)
 */
function setCookie(name: string, value: string, days: number = 365): void {
    if (!isValidName(name)) {
        return;
    }

    const expires = DateTime.now().plus({ days }).toUTC().toHTTP();

    document.cookie = `${name}=${value};expires=${expires};path=/`;
}

/**
 * Deletes a cookie by setting its expiration to the past
 *
 * @param name - Cookie name to delete
 */
function deleteCookie(name: string): void {
    if (!isValidName(name)) {
        return;
    }

    const expires = DateTime.fromMillis(0).toUTC().toHTTP();

    document.cookie = `${name}=;expires=${expires};path=/;`;
}

export const cookies = {
    get: getCookie,
    set: setCookie,
    delete: deleteCookie,
};
