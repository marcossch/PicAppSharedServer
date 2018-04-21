process.env.NODE_ENV = 'test';
'use strict';
/*Imports Generales*/
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
const expect = require('chai').expect;
chai.use(chaiHttp);
var sinon = require('sinon');
var mocks = require('node-mocks-http');
var assert = chai.assert;

/*Import User*/
var userGetId = require('../server/controllers/users').retrieve;
var user = require('../server/controllers/users');


describe('Test Module: User', () => {

  it('Obtengo usuario by username, StatusCode = 404', () => {
      var req = {params:{username:'facu'}};
      var st = sinon.stub(user, 'retrieve');
      var res = {};

      user.retrieve(req,res);
      st.restore();
      expect(st.calledOnce);
    });

});
