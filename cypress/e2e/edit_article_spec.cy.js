//@Reference https://learn.cypress.io/testing-your-first-application/how-to-test-forms-and-custom-cypress-commands
//Test for edit functionality of the article table
describe('Article Table', () => {
  //Allows editing an article via the edit button
  it('Allows editing an article via the Edit button', () => {
    //Visit the base URL of the application
    cy.visit('http://localhost:3001');
    //Verify that the article table is visible
    cy.get('table').should('be.visible'); 
    //Click the first edit button found on the table
    cy.contains('Edit').first().click(); 
    //Make sure that the edit form is displayed after clicking the edit button
    cy.get('form').should('be.visible'); 
    //Updating the article input fields with new values
    cy.get('input[name="title"]').clear().type('Updated Article Title');
    cy.get('input[name="author"]').clear().type('Updated Author Name');
    cy.get('textarea[name="content"]').clear().type('This is the updated content of the article.');
    cy.get('input[name="publish_date"]').clear().type('2024-12-01');
    //Submit the form to save the updated article
    cy.get('form button[type="submit"]').contains('Update Article').click(); 
    //Verify the success message for updating an article
    cy.get('.alert-info').should('contain', 'Article updated successfully!');
  });
});
