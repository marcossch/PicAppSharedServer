process.env.NODE_ENV = 'test';

//let User = require('../server/controllers/users');
//Require the dev-dependencies
let chai = require('chai');
let server = require('../app');


describe("Testing User", function () {


    it('Post Superuser', (done) => {
        chai.request(server)
            .post('/api/user/super')
            .send({username: 'superuser', password: 'steelsoft', id: 0, _rev: 'asd', applicationOwner: 'grupo3'})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });


    /*it('Get by Username: Superuser', (done) => {
        chai.request(server)
            .get('/api/users/superuser')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

    it('Delete Superuser',(done)=> {
        chai.request(server)
            .delete('/api/users/superuser')
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
        });*/
});




/*
superagent

        request
            .post('127.0.0.1:3000/api/user/super')
            .send({username: 'superuser', password: 'steelsoft', id: 0, _rev: 'asd', applicationOwner: 'grupo3'})
            .set('X-API-Key', 'foobar')
            .set('accept', 'json')
            .end((err, res) => {
                console.log(res);
                done();
            });
 */