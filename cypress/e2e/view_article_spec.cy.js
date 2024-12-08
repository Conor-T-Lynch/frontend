//@Reference https://learn.cypress.io/testing-your-first-application/how-to-test-forms-and-custom-cypress-commands
//Test for article table functionality
describe('Article Table', () => {
  //Test for loading the article table and viewing an article
  it('Loads the article table and displays articles', () => {
    //Visit the base URL of the application
    cy.visit('http://localhost:3001');
    //Verify that the article table is visible
    cy.get('table').should('be.visible');
    //Click the view button to open an articles details
    cy.contains('View').click();
    //Verify that a model appears that displays the articles details, and that it is visible
    cy.get('.modal').should('be.visible');
  });
});
