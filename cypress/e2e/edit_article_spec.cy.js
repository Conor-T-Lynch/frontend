describe('Article Table', () => {
  it('Allows editing an article via the Edit button', () => {
    cy.visit('http://localhost:3001');

    cy.get('table').should('be.visible'); 

    cy.contains('Edit').first().click(); 

    cy.get('form').should('be.visible'); 

    cy.get('input[name="title"]').clear().type('Updated Article Title');
    cy.get('input[name="author"]').clear().type('Updated Author Name');
    cy.get('textarea[name="content"]').clear().type('This is the updated content of the article.');
    cy.get('input[name="publish_date"]').clear().type('2024-12-01');

    cy.get('form button[type="submit"]').contains('Update Article').click(); 

    cy.get('.alert-info').should('contain', 'Article updated successfully!');
  });
});
