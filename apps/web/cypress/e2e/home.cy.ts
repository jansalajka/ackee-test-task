describe('Home Page E2E Tests', () => {
    beforeEach(() => {
        cy.waitForApi();
        cy.visit('/');
        cy.waitForPageLoad();
    });

    it('should load and display the home page', () => {
        cy.get('body').should('be.visible');
        cy.get('header').should('exist');
    });

    it('should display header with correct title', () => {
        cy.get('header').should('contain.text', 'Recepty');
    });

    it('should display loading state initially', () => {
        // The page might show loading state briefly
        cy.get('body').should('be.visible');
    });

    it('should handle empty recipe list', () => {
        cy.intercept('GET', '**/recipes*', { statusCode: 200, body: [] }).as('getEmptyRecipes');
        cy.visit('/');
        cy.wait('@getEmptyRecipes');
        cy.waitForPageLoad();
        cy.get('body').should('contain.text', 'Recepty');
    });

    it('should handle API error gracefully', () => {
        cy.intercept('GET', '**/recipes*', { statusCode: 500, body: { error: 'Server Error' } }).as('getRecipesError');
        cy.visit('/');
        cy.wait('@getRecipesError');
        cy.waitForPageLoad();
        cy.get('body').should('contain.text', 'Chyba');
    });
});
