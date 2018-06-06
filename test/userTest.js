'use strict';
var user = require('../server/controllers/users.js');
const expect = require('chai').expect;

describe('Test Module: User', () => {

  it('Obtengo todos los usuarios, Status=200', () => {
    let response = user.listAux();
    expect(response.code).to.be.equal(200);
  });

  it('Cantidad de usuarios es 0, Status=200', function(done) {

    //call the function we're testing
    let result = user.listAux();
    expect(result.code).to.equal(200);
    //assertions
    result.res.then(function(data) {
      expect(data.length).to.equal(0);
      done();
    }, function(error) {
      assert.fail(error);
      done();
    });
  });
});
