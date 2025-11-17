import { DateTime } from 'luxon';

function isValidName(name: string): boolean {
    return name.trim().length > 0;
}

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

function setCookie(name: string, value: string, days: number = 365): void {
    if (!isValidName(name)) {
        return;
    }

    const expires = DateTime.now().plus({ days }).toUTC().toHTTP();

    document.cookie = `${name}=${value};expires=${expires};path=/`;
}

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

