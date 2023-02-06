describe('template spec', () => {
  it('passes', () => {
    cy.request({
      method: 'DELETE',
      url: 'http://localhost:9000/delete',
      body: { id: 2 }
    }).as('testreq');
    cy.get('@testreq').then(res => {
      expect(res.status).to.eq(201);
      expect(res.body).has.property('message', 'Data deleted!')
      // expect(res.body).has.property('id', 2)

      // cy.request('http://localhost:9000/data').as('testreq');
      // cy.get('@testreq').then(res => {
      //   expect(res.status).to.eq(200);
        
      //   assert.isArray(res.body, "Array/List OK");
      // })

    })
  })
})