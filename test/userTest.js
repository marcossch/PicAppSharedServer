'use strict';
var user = require('../server/controllers/users.js');
const chai = require('chai');
const expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);


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
    expect(result.res).to.eventually.equal([]);
    done();
  });
});
