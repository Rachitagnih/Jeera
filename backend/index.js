const express = require('express');
const app = express();
const cors = require('cors');
const {dbConnection} = require('./Db/dbConn.js');
app.use(cors());
require('dotenv').config();
app.use(express.json());//parse json

//Db connection
dbConnection();

//routes
app.use('/admin', require('./routes/Admin'));

app.use('/user', require('./routes/User.js'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('listening on port : ' + process.env.PORT);
});

