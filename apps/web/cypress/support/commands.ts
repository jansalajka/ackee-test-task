/// <reference types="cypress" />

/**
 * Custom command to set up API intercepts
 */
Cypress.Commands.add('waitForApi', () => {
    cy.intercept('GET', '**/recipes*').as('getRecipes');
    cy.intercept('GET', '**/recipes/**').as('getRecipe');
    cy.intercept('POST', '**/recipes*').as('createRecipe');
    cy.intercept('PUT', '**/recipes/**').as('updateRecipe');
    cy.intercept('DELETE', '**/recipes/**').as('deleteRecipe');
    cy.intercept('POST', '**/recipes/**/ratings').as('rateRecipe');
});

/**
 * Custom command to wait for page to be fully loaded
 */
Cypress.Commands.add('waitForPageLoad', () => {
    cy.get('body').should('be.visible');
    cy.wait(500);
});
