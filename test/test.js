var assert = require('assert');
var request = require("request");
var base_url = "https://picappss.herokuapp.com/"

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

        /*it("returns Welcome to the beginning of nothingness.", function() {
            request.get(base_url, function (error, response, body) {
                //expect(body).toBe("Hello World");
                assert.equal("Welcome to the beginning of nothingness.", body);
                done();
            });
        });*/
    });
});
