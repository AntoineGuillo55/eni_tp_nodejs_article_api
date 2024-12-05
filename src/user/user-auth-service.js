const {User} = require('./user-model');
const jwt = require('jsonwebtoken');
const apiResponseBuilder = require('../utils/api-response-builder');

async function generateToken (email, password) {

    const token = await jwt.sign({email : email, password: password}, "booby", {expiresIn : '2 hours'});

    console.log(token);
    
    return token;
};

module.exports = {

    authentification: async (email, password) => {

        const user = await User.findOne({email: email});

        if(!user) {
            return {message: "Echec de l'authentification"};
        }

        if(user.password != password) {
            return {message: "Echec de l'authentification"};
        }

        if(user.password === password) {
            
            let token = await generateToken(email, password);
            return token;
        }
    }
    
};