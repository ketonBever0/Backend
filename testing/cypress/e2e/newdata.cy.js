describe('template spec', () => {
  it('passes', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:9000/new',
      body: { id: 5, data: "text5" }
    }).as('testreq');
    cy.get('@testreq').then(res => {
      expect(res.status).to.eq(201);
      expect(res.body).has.property('message','New data inserted!')
      // assert.isArray(res.body, "Array/List OK");
    })
  })
})