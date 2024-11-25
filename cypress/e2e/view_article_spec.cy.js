describe('Article Table', () => {
  it('Loads the article table and displays articles', () => {
    cy.visit('http://localhost:3001');
    cy.get('table').should('be.visible');
    cy.contains('View').click();
    cy.get('.modal').should('be.visible');
  });
});
