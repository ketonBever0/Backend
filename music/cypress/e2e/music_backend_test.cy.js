describe('Root endpoint test', () => {
  it('Welcome message OK', () => {
    cy.request('http://localhost:8000/').as('testreq')
    cy.get('@testreq').then(res => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq("Backend vizsgafeladat");
    })
  })
})

describe('Fetch Artists endpoint test', () => {
  it('Artists fetch OK', () => {
    cy.request('http://localhost:8000/artists').as('testreq')
    cy.get('@testreq').then(res => {
      expect(res.status).to.eq(200);
      assert.isArray(res.body);
      expect(res.body).to.not.have.lengthOf(0);

    })
  })
})

describe('Post Artist endpoint test', () => {
  it('Artists post OK', () => {
    
    var name = "L.L. Junior";

    cy.request({
      method: 'POST',
      url: 'http://localhost:8000/artists',
      body: {
        Name: name
      }
    }).as('testreq')
    cy.get('@testreq').then(res => {
      expect(res.status).to.eq(201);
      expect(res.body).has.property('message', `${name} előadó hozzáadva`)
    })
  })
})

describe('Fetch Artists endpoint test', () => {
  it('Artists fetch OK', () => {
    cy.request('http://localhost:8000/genre-tracks/rock and roll').as('testreq')
    cy.get('@testreq').then(res => {
      expect(res.status).to.eq(200);
      assert.isArray(res.body);
      expect(res.body).to.not.have.lengthOf(0);

    })
  })
})