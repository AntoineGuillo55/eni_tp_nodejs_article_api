const jwt = require('jsonwebtoken');

module.exports = {

    middlewareJwtToken : async (request, response, next) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
       
        const token = request.headers.authorization.substring(7);
        console.log(token);
    
        let result = true;
    
        try{
            await jwt.verify(token, 'booby');
        } catch(e) {
            console.log(e);
            
            result = false;
        }
        
        console.log(result);
    
        if(!result) {
            return response.json({message: "Token invalide"});
            
        }
    
        return next();
        
    }
}

