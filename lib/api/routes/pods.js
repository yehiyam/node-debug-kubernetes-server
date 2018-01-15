const express = require('express');
const kubernetes = require('../../modules/kubernetes');
module.exports = () => {
    const router = express.Router();
    router.get('/',async (req, res, next) => {
        const pods = await kubernetes.pods();
        res.json(pods);
        next();
    });
    
    return router;
};
