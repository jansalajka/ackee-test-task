import { DateTime } from 'luxon';

function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || undefined;
    }

    return undefined;
}

function setCookie(name: string, value: string, days: number = 365): void {
    const expires = DateTime.now().plus({ days }).toUTC().toHTTP();

    document.cookie = `${name}=${value};expires=${expires};path=/`;
}

function deleteCookie(name: string): void {
    const expires = DateTime.fromMillis(0).toUTC().toHTTP();

    document.cookie = `${name}=;expires=${expires};path=/;`;
}

export const cookies = {
    get: getCookie,
    set: setCookie,
    delete: deleteCookie,
};

