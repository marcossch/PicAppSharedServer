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
    let result = user.listAux();
    expect(result.code).to.equal(200);
    expect(result.res).to.eventually.equal([]);
    done();
  });

  // it('Cantidad de usuarios es 0, Status=200', async() => {
  //   //call the function we're testing
  //   const result = await user.listAux();
  //   expect(result.code).to.equal(200);
  //   const prom = await result.res;
  //   expect(prom.length).to.equal(0);
  //   done()
  // });

  // it('Pido los usuarios luego de agregar uno, Status=200', async() => {
  //   const req = {body:{"username": "superuser",
  //                   "password": "steelsoft",
  //                   "id": "0",
  //                   "_rev": "asd",
  //                   "applicationOwner": "grupo3"}
  //             }
  //   const res = await user.supercreate(req);
  //   console.log(res);
  //   const result = await user.listAux();
  //   const prom = await result.res;
  //   console.log(prom);
  //   expect(prom.length).to.equal(1);
  //
  // });

});
