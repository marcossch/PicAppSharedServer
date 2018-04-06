var assert = require('assert');
var app = require('../app');

describe('aplicacion', function() {
    describe('add function', function() {
        it('adds numbers', function () {
            var result = app.get('/api/users/1');
            assert.equal(result, 200);
        });
    });
});