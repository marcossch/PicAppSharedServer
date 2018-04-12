var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);


describe('Get a la pagina principal', function() {

    it('Check Status 200', function(done) {
        chai.request(server)
            .get('/')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });

	it('Check Return Welcome to PicApp web services.', function(done) {
        chai.request(server)
            .get('/')
            .end(function(err, res){
                res.body.message.should.equal('Welcome to PicApp web services.');
                done();
            });
    });


});
