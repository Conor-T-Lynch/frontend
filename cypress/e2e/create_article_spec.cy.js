describe('Article Creation', () => {
  it('should create a new article when the form is submitted', () => {
    
    cy.visit('http://localhost:3001');

    const articleData = {
      title: 'New Article Title',
      author: 'John Doe',
      content: 'This is the content of the new article.',
      publish_date: '2024-12-01',
    };

    cy.get('input[name="title"]').type(articleData.title);
    cy.get('input[name="author"]').type(articleData.author);
    cy.get('textarea[name="content"]').type(articleData.content);
    cy.get('input[name="publish_date"]').type(articleData.publish_date);

    cy.get('form button[type="submit"]').contains('Create Article').click(); 

    cy.get('.alert-info').should('contain', 'Article created successfully!');

    cy.get('table tbody')
    
      .contains('td', articleData.title) 
      .should('exist');
  });
});
