import type { AppConfigModel as AppConfigModelType } from '../types/AppConfig';

/**
 * Application configuration model
 */
export class AppConfigModel implements AppConfigModelType {
    constructor(public readonly apiBaseUrl: string) {}
}

