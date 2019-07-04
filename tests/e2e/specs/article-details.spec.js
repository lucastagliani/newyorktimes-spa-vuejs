import predefinedSections from '../../../src/data/predefinedSections.json';

const section = predefinedSections[0];

const sectionPagePath = `/nyttop/${section.name}`;

const selectors = {
  articleItemOnSectionPage: 'a.card',
  articleTitle: 'h2.title',
  backToSectionButton: '.level-left .button',
  readFullArticleButton: '.button.is-dark',
  sectionTitle: 'h1.title',
  sectionDescription: 'p.subtitle',
};

describe('Article details page', () => {
  beforeEach(() => {
    // Given I am on the article page
    cy.visit(sectionPagePath);
    cy.get(selectors.articleItemOnSectionPage)
      .eq(0)
      .click();
  });

  it('should displays article title', () => {
    // Then the title should be displayed
    cy.get(selectors.articleTitle);
  });

  it('should displays read full article button', () => {
    // Then the read full article should be displayed
    cy.get(selectors.readFullArticleButton);
  });

  it('should be able to go back to section page', () => {
    // When I click on the back section article
    cy.get(selectors.backToSectionButton)
      .click();

    // Then section page should be loaded
    cy.get(selectors.sectionTitle).should('contain', section.title);
    cy.get(selectors.sectionDescription).should('contain', section.description);
  });
});
