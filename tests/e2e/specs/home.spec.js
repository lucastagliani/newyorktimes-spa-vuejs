// https://docs.cypress.io/api/introduction/api.html

const pagePath = "/nyttop";

const selectors = {
  sectionItem: "",
  articleItem: "",
  articleLink: "",
};

describe("Home page", () => {
  it("Should see articles on home page", () => {
    // Given I am at home page
    // When the page is loaded
    cy.visit(pagePath);

    // Then some articles should be displayed.
    cy.get(selectors.articleItem)
      .its("length")
      .should("be.greater", 1);
  });

  it("Enter the first article", () => {
    // Given I am at home page
    cy.visit(pagePath);

    // When I click on the first article
    cy.get(selectors.articleLink)
      .eq(0)
      .click();
    
    // Then the URL should contains 'articles'
    cy.url().should("contain", "articles");
  });
});

// TODO: implement selectors
// POSSIBLE TODO: refact: use beforeEach to visit pagePath
// POSSIBLE TODO: refact: use PageObjects pattern and create file home.po.js with selectors and actions
