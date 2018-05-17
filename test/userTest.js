'use strict';
var user = require('../server/controllers/users.js');
const expect = require('chai').expect;

describe('Test Module: User', () => {

  it('Obtengo todos los usuarios Status=200', () => {
    var response = user.listAux();
    console.log(response.code);
    expect(response.code).to.be.equal(200);
  })
  //var a = user.retAux();
  //console.log('Expect: 400, and obtain: '+a );
  //if(a == 400){
    //console.log("PASSOOOOOO");
    //return true;
  //}
  //return false;
  /*it('Obtengo usuario by username, StatusCode = 404', () => {
      var req = {params:{username:'facu'}};
      var a = user.retrieve(req);
      console.log(a);
      expect(a).to.be.equal(404);
    });*/

});
