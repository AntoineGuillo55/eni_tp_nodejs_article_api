
// import
const mongoose = require('mongoose');

module.exports = {

    connectToDatabase : async () => {

        mongoose.connection.once('open', () => {
            console.log("Connection à la base de données effectuée avec succès !");
            
        });
        
        mongoose.connection.on('error', (err) => {
            console.log("La connection à la base de donnée a échoué.");
            
        });

        await mongoose.connect("mongodb://localhost:27017/db_articles");
    }
}

