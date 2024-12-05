const express = require('express');
const router = express.Router();
const authMiddleware = require('../user/auth-middleware');
const jwt = require('jsonwebtoken');
const {Article} = require('./article-model');
const articleService = require('./article-service');



router.get("/all", async (request, response) => {
    
    return response.json(await articleService.getAllArticles());
    
});

router.get("/:id", authMiddleware.middlewareJwtToken, async (request, response) => {
    
    const id = request.params.id;

    return response.json(await articleService.getArticleById(id));
});

router.post("/save", authMiddleware.middlewareJwtToken, async (request, response) => {
    
    const body = request.body;

    let articleFound = await Article.findOne({id: body.id})

    if(!articleFound) {

        let result = await articleService.saveArticle(body);
        return response.json(result);
    }

    let result = await articleService.updateArticle(body, articleFound);

    return response.json(result);

});

router.delete("/:id", authMiddleware.middlewareJwtToken, async (request, response) => {
    
    const id = request.params.id;

    let result = await articleService.deleteArticle(id);

    return response.json(result);
});

module.exports = router; 