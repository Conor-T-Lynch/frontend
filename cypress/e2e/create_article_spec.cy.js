//@Reference https://learn.cypress.io/testing-your-first-application/how-to-test-forms-and-custom-cypress-commands
//Test for article creation
describe('Article Creation', () => {
  //Verify that an article can be created successfully
  it('should create a new article when the form is submitted', () => {
    //Visit the base URL of the application
    cy.visit('http://localhost:3001');
    //Defines the data required for the creation of a new article
    const articleData = {
      title: 'New Article Title',
      author: 'John Doe',
      content: 'This is the content of the new article.',
      publish_date: '2024-12-01',
    };
    //Fill in the title field
    cy.get('input[name="title"]').type(articleData.title);
    //Fill in the author field
    cy.get('input[name="author"]').type(articleData.author);
    //Fill in the content field
    cy.get('textarea[name="content"]').type(articleData.content);
    //Fill in the publish_date field
    cy.get('input[name="publish_date"]').type(articleData.publish_date);
    //Click the create article button
    cy.get('form button[type="submit"]').contains('Create Article').click(); 
    //Assert that there was a success message
    cy.get('.alert-info').should('contain', 'Article created successfully!');
    //Verify that the created article appears in the table of articles
    cy.get('table tbody')
      //Look for the article ina table cell
      .contains('td', articleData.title) 
      //Ensure the article exists in the table
      .should('exist');
  });
});
