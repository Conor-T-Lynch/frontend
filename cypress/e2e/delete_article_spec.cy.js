//@Reference https://learn.cypress.io/testing-your-first-application/how-to-test-forms-and-custom-cypress-commands
//Test for article management functionality
describe('Article Management', () => {
  //Test for creating and deleting and article, with a success message assertions
  it('should create an article, delete it, and display success messages', () => {
    //Visit the base URL of the application
    cy.visit('http://localhost:3001');
    //Fill in the title field
    cy.get('input[name="title"]').type('Test Article Title');
    //Fill in the author field
    cy.get('input[name="author"]').type('Test Author');
    //Fill in the content field
    cy.get('textarea[name="content"]').type('This is the content of the test article.');
    //Fill in the publish_date field
    cy.get('input[name="publish_date"]').type('2024-12-01');
    //Click the create article button
    cy.get('form button[type="submit"]').contains('Create Article').click(); 
    //Verify that the article was created and appears in the list by asserting that the title in visible
    cy.contains('Test Article Title').should('exist');
    //Assert that the author is visable
    cy.contains('Test Author').should('exist');
    //Verify the success message for article creation, locate the alert and make sure its visible
    cy.get('.alert-info').should('be.visible');
    //Assert that there was a success message
    cy.get('.alert-info').should('contain.text', 'Article created successfully!');
    //Locate the row containing the article and delete it
    cy.contains('Test Article Title')
      //Traverse the perent row element
      .parent('tr')
      //Operate within the context of this row
      .within(() => {
        //Click the delete button
        cy.get('button').contains('Delete').click();
      });
    //Verify the success message for article deletion, and it should be visible
    cy.get('.alert-success').should('be.visible');
    //Assert that there was a success message
    cy.get('.alert-success').should('contain.text', 'Article deleted successfully!');
  });
});
