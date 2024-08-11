const mongoose = require('mongoose');

const dbConnection = () => {
    const uri = process.env.MONGO_URI;
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to Mongo");
    }).catch(err => {
        console.log("Error connecting to Mongo", err);
    });
}
module.exports = {dbConnection};