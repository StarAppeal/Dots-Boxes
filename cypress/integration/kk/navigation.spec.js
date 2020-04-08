context('navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/kaesekaestchen')
  })

  it('zoom', () => {
    cy.get('.page')
      .should('have.css', 'transform', 'matrix(1.1, 0, 0, 1.1, 0, 0)');

    cy.get('.page')
      .trigger('wheel')
      .should('have.css', 'transform', 'matrix(1.65, 0, 0, 1.65, 0, 0)');
  })
})
