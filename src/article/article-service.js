const {Article} = require('./article-model');
const {v4: uuidv4} = require('uuid');
const apiResponseBuilder = require('../utils/api-response-builder');

module.exports = {

    getAllArticles : async () => {
        const articles = await Article.find();

        return apiResponseBuilder.buildAPIResponse("200", "La liste des articles a été récupérés avec succès", articles);
    },

    getArticleById : async (id) => {
        const article = await Article.findOne({id: id});
    
        if(!article) {
            return apiResponseBuilder.buildAPIResponse("702", `Impossible de récupérer un article avec l'UID ${id}`, null);
        }

        return apiResponseBuilder.buildAPIResponse("200", "Article récupéré avec succès", article)
    },

    saveArticle : async (requestBody) => {
        const foundedArticleByTitle = await Article.findOne({title: requestBody.title});

        if(foundedArticleByTitle) {
            return apiResponseBuilder.buildAPIResponse("701", "Impossible d'ajouter un article avec un titre déjà existant", null);
        }

        let article = new Article(requestBody);
        article.id = uuidv4();
        await article.save();

        return apiResponseBuilder.buildAPIResponse("200", "Article ajouté avec succès", article);
    },

    updateArticle : async(body, article) => {

        const foundedArticleByTitle = await Article.findOne({title: body.title, id: {$ne :article.id}});

        if(foundedArticleByTitle) {
            return apiResponseBuilder.buildAPIResponse("701", "Impossible de modifier un article si un autre article possède un titre similaire", null);
        }
    
        article.title = body.title;
        article.content = body.content;
        article.author = body.author;

        await article.save();

        return apiResponseBuilder.buildAPIResponse("200", "Article modifié avec succès", article);
    },

    deleteArticle : async (id) => {

        const foundArticle = await Article.findOne({id: id});

        if(!foundArticle) {
            return apiResponseBuilder.buildAPIResponse("702", "Impossible de supprimer un article dont l'UID n'existe pas", null);
        }

        await foundArticle.deleteOne();

        return apiResponseBuilder.buildAPIResponse("200", `L'article ${id} a été supprimé avec succès`, foundArticle);
    }
}