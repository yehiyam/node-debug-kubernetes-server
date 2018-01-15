const express = require('express');
const http = require('http');
const config = require('../../config/config');
const podsRoute = require('./routes/pods');

const app = express();
const createServer = async () => {
    const server = http.createServer(app);
    app.use('/pods', podsRoute());
    return new Promise((resolve, reject) => {
        server.listen(config.api_port, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve(server);
        });
    });
};

module.exports = {
    createServer,
};
