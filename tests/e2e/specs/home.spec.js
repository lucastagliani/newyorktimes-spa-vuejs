const pagePath = '/nyttop';

const selectors = {
  sectionItem: 'a.card',
};

describe('Home page', () => {
  it('should redirect to /nyttop if hit /', () => {
    // Given I am not on the page yet
    // When I visit the root path
    cy.visit('/');

    // Then the URL should be redirected to '/nyttop'
    cy.url().should('contain', '/nyttop');
  });

  it('should redirect to /nyttop if hit /any-valid-path', () => {
    // Given I am not on the page yet
    // When I visit some invalid path
    cy.visit('/any-valid-path');

    // Then the URL should be redirected to '/nyttop'
    cy.url().should('contain', '/nyttop');
  });

  it('should see sections on home page', () => {
    // Given I am at home page
    // When the page is loaded
    cy.visit(pagePath);

    // Then some sections should be displayed.
    cy.get(selectors.sectionItem)
      .its('length')
      .should('be.gte', 1);
  });

  it('should enter the first section', () => {
    // Given I am at home page
    cy.visit(pagePath);

    // When I click on the first section
    cy.get(selectors.sectionItem)
      .eq(0)
      .click();

    // Then the URL should contains 'articles'
    cy.url().should('contain', '/nyttop/');
  });
});
