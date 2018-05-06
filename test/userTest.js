'use strict';
process.env.NODE_ENV = 'test';
/*Imports Generales*/
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = require('chai').expect;
chai.use(chaiHttp);
var sinon = require('sinon');
var mocks = require('node-mocks-http');
var assert = chai.assert;

/*Import User*/
var userGetId = require('../server/controllers/users').retAux;
var user = require('../server/controllers/users.js');


describe('Test Module: User', () => {

  /*it('Obtengo usuario by username, StatusCode = 404', () => {
      var req = {params:{username:'facu'}};
      var a = user.retrieve(req);
      console.log(a);
      expect(a).to.be.equal(404);
    });*/

});
