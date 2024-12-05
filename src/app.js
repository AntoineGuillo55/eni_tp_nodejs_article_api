// Import modules
const express = require('express');
const mongooseConfig = require('./mongoose-config');

mongooseConfig.connectToDatabase();

const cors = require('cors');

// Instanciation du module
const app = express();
app.use(express.json());

app.use(cors());
// SWAGGER
// Init swagger middleware
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
 
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const userRouter = require('./user/user-routes');
app.use('/user', userRouter);

// Injecter routes article
const articleRouter = require('./article/article-routes');
app.use('/article', articleRouter);

// Démarrer le serveur
app.listen(3000, () => {
    console.log("Le serveur a démarré correctement");    
});

