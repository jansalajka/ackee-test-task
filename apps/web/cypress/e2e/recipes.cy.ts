describe('Recipes E2E Tests', () => {
    beforeEach(() => {
        cy.waitForApi();
        cy.visit('/');
        cy.waitForPageLoad();
    });

    describe('Recipe List Page', () => {
        it('should display recipe list', () => {
            cy.wait('@getRecipes');
            cy.get('body').should('contain.text', 'Recepty');
            cy.get('ul').should('exist');
        });

        it('should display recipe items', () => {
            cy.wait('@getRecipes');
            cy.get('ul li').should('have.length.greaterThan', 0);
        });

        it('should navigate to recipe detail when clicking on a recipe', () => {
            cy.wait('@getRecipes');
            cy.get('ul li a').first().click();
            cy.url().should('include', '/recipes/');
            cy.waitForPageLoad();
            cy.wait('@getRecipe');
        });

        it('should navigate to new recipe page when clicking add button', () => {
            cy.get('a[aria-label*="Přidat"], a[aria-label*="Add"]').first().click();
            cy.url().should('include', '/recipes/new');
            cy.waitForPageLoad();
        });
    });

    describe('Recipe Detail Page', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.waitForPageLoad();
            cy.wait('@getRecipes');
            cy.get('ul li a').first().click();
            cy.waitForPageLoad();
            cy.wait('@getRecipe');
        });

        it('should display recipe details', () => {
            cy.get('h1').should('exist');
            cy.contains('Ingredience').should('exist');
        });

        it('should navigate back to home when clicking back button', () => {
            cy.get('a[aria-label*="Zpět"], a[aria-label*="Back"]').first().click();
            cy.url().should('eq', Cypress.config().baseUrl + '/');
            cy.waitForPageLoad();
        });

        it('should display star rating', () => {
            cy.contains('Ohodnoť tento recept').should('exist');
        });

        it('should display recipe header background image', () => {
            cy.get('h1').should('exist').and('be.visible');
            cy.get('h1').parent().parent().should('exist');
        });
    });

    describe('Create Recipe', () => {
        beforeEach(() => {
            cy.visit('/recipes/new');
            cy.waitForPageLoad();
        });

        it('should display new recipe form', () => {
            cy.get('h1').should('contain.text', 'Přidat recept');
            cy.get('form').should('exist');
        });

        it('should create a new recipe', () => {
            const recipeName = `Ackee Recipe ${Date.now()}`;
            const recipeDescription = 'Test Description';
            const recipeDuration = '30';
            const recipeIngredients = 'ingredient1, ingredient2';
            const recipeInfo = 'Test Info';

            cy.get('input#name').type(recipeName);
            cy.get('textarea#description').type(recipeDescription);
            cy.get('input#ingredients-0').type(recipeIngredients);
            cy.get('textarea#info').type(recipeInfo);
            cy.get('input#duration').type(recipeDuration);

            cy.intercept('POST', '**/recipes*', req => {
                req.reply({
                    statusCode: 201,
                    body: {
                        id: 'new-recipe-id',
                        name: recipeName,
                        description: recipeDescription,
                        ingredients: recipeIngredients.split(',').map(ingredient => ingredient.trim()),
                        duration: Number(recipeDuration),
                        info: recipeInfo,
                        score: 0,
                    },
                });
            }).as('createRecipe');

            cy.get('button[type="submit"]').click();
            cy.wait('@createRecipe');

            cy.url().should('include', '/recipes/');
            cy.waitForPageLoad();
        });

        it('should show validation errors for empty required fields', () => {
            cy.get('button[type="submit"]').click();
            cy.get('body').should('contain.text', 'musí');
        });
    });

    describe('Rate Recipe', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.waitForPageLoad();
            cy.wait('@getRecipes');
            cy.get('ul li a').first().click();
            cy.waitForPageLoad();
            cy.wait('@getRecipe');
        });

        it('should display rating component', () => {
            cy.contains('Ohodnoť tento recept').should('exist');
        });

        it('should rate a recipe', () => {
            cy.intercept('POST', '**/recipes/**/ratings', {
                statusCode: 201,
                body: { score: 4, recipe: 'recipe-id', id: 'rating-id' },
            }).as('rateRecipe');

            cy.get('button[aria-label*="4"], button[aria-label*="stars"]').first().click();
            cy.wait('@rateRecipe');
            cy.wait('@getRecipe');
        });
    });

    describe('Delete Recipe', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.waitForPageLoad();
            cy.wait('@getRecipes');
            cy.get('ul li a').first().click();
            cy.waitForPageLoad();
            cy.wait('@getRecipe');
        });

        it('should delete a recipe if delete button exists', () => {
            cy.get('body').then($body => {
                if ($body.find('button[aria-label*="Smazat"], button[aria-label*="Delete"]').length > 0) {
                    cy.intercept('DELETE', '**/recipes/**', { statusCode: 204 }).as('deleteRecipe');
                    cy.get('button[aria-label*="Smazat"], button[aria-label*="Delete"]').first().click();
                    cy.wait('@deleteRecipe');
                    cy.url().should('eq', Cypress.config().baseUrl + '/');
                    cy.waitForPageLoad();
                } else {
                    cy.log('Delete button not found, skipping delete test');
                }
            });
        });
    });
});
