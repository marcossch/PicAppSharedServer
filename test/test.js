var assert = require('assert');
var request = require("request");
var base_url = "https://picappss.herokuapp.com/";

describe('USER', function() {
           assert(200,200);
});

describe('USER', function() {
    describe('GET', function(){

        it('Probamos hacer un get a la pagina principal', function(){
            request.get(base_url,function (error,response,body) {
                assert.equal(200,response.statusCode);
                done();
            });
        });

        it("returns Welcome to PicApp web services.", function() {
            request.get(base_url, function (error, response, body) {
                //expect(body).toBe("Hello World");
                assert.equal("Welcome to PicApp web services.", body);
                done();
            });
        });

        it("returns 200 ok", function () {
            request.get("https://picappss.herokuapp.com/api/users", function (error, response, body) {
                assert.equal(200,response.statusCode);
                done();
            });
        });

        it("returns 200 ok", function () {
            request.get("https://picappss.herokuapp.com/api/users", function (error, response, body) {
                assert.equal(200,response.statusCode);
                done();
            });
        });

        //devuelve todos los usuarios creados
        it("returns 200 ok", function () {
            request.get("https://picappss.herokuapp.com/api/users", function (error, response, body) {
                assert.equal(200,response.statusCode);
                done();
            });
        });

        //devuelve el usario admin con codigo 200
        it("returns 200 ok", function () {
            request.get("https://picappss.herokuapp.com/api/users/admin", function (error, response, body) {
                assert.equal(200,response.statusCode);
                done();
            });
        });

        //no encuentra el usuario buscado
        it("returns 404 ok", function () {
            request.get("https://picappss.herokuapp.com/api/users/admin", function (error, response, body) {
                assert.equal(404,response.statusCode);
                done();
            });
        });

    });
});
