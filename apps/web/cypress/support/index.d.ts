/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable {
            waitForApi(): Chainable<void>;
            waitForPageLoad(): Chainable<void>;
        }
    }
}

export {};
