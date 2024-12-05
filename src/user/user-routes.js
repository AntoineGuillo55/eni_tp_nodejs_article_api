const express = require('express');
const router = express.Router();
const userService = require('./user-auth-service');

router.post("/auth", async (request, response) => {

    const email = request.body.email;
    const password = request.body.password;
    
    let result = await userService.authentification(email, password);

    return response.json(result);
    
});

module.exports = router; 