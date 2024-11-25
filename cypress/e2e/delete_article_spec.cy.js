describe('Article Management', () => {
  it('should create an article, delete it, and display success messages', () => {
    
    cy.visit('http://localhost:3001');

    cy.get('input[name="title"]').type('Test Article Title');
    cy.get('input[name="author"]').type('Test Author');
    cy.get('textarea[name="content"]').type('This is the content of the test article.');
    cy.get('input[name="publish_date"]').type('2024-12-01');

    cy.get('form button[type="submit"]').contains('Create Article').click(); 

    cy.contains('Test Article Title').should('exist');
    cy.contains('Test Author').should('exist');
    cy.get('.alert-info').should('be.visible');
    cy.get('.alert-info').should('contain.text', 'Article created successfully!');

    cy.contains('Test Article Title')
      .parent('tr')
      .within(() => {
        cy.get('button').contains('Delete').click();
      });

    cy.get('.alert-success').should('be.visible');
    cy.get('.alert-success').should('contain.text', 'Article deleted successfully!');
  });
});
