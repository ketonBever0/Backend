describe('template spec', () => {
  it('passes', () => {
    cy.request('http://localhost:9000/data').as('testreq');
    cy.get('@testreq').then(res => {
      expect(res.status).to.eq(200);
      assert.isArray(res.body, "Array/List OK");
    });
  })
})