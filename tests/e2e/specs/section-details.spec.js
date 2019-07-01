import predefinedSections from '../../../src/data/predefinedSections.json';

const section = predefinedSections[0];

const pagePath = `/nyttop/${section.name}`;

const selectors = {
  sectionTitle: 'h1.title',
  sectionDescription: 'p.subtitle',
  articleItem: 'a.card',
};

describe('Section details page', () => {
  beforeEach(() => {
    // Given I am on the section page
    cy.visit(pagePath);
  });

  it('should displays section title and description', () => {
    // Then the title and description should be displayed
    cy.get(selectors.sectionTitle).should('contain', section.title);
    cy.get(selectors.sectionDescription).should('contain', section.description);
  });

  it('should displays articles', () => {
    // Then some articles should be displayed
    cy.get(selectors.articleItem)
      .its('length')
      .should('be.gte', 1);
  });

  it('should enter the first article', () => {
    // When I click on the first article
    cy.get(selectors.articleItem)
      .eq(0)
      .click();

    // Then the URL should contains 'articles'
    cy.url().should('contain', `${pagePath}/`);
  });
});
