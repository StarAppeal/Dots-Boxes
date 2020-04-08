context('users', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/kaesekaestchen')
  })

  it('retraction', () => {
    cy.get('#users').should('not.have.class', 'retracted')
    cy.get('#retractor').click()
    cy.get('#users').should('have.class', 'retracted')
  })
})
