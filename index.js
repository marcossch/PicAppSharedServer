const axios = require('axios');

module.exports = {

    getUser(username){
        return axios
            .get(`https://127.0.0.1:3000/api/users/${username}`)
            .then(res => res.data)
            .catch(error => console.log(error));
            }

};