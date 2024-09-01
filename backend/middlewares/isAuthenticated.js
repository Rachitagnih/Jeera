const jwt = require('jsonwebtoken');
const isAuthenticated = (req, res, next) => {
    const token = req.headers['auth-token'];
    const check = jwt.decode(token, process.env.JWT_SECRET); // returns the id
    if(!check){
        return res.status(401).send({error:"Please login first"});
    }
    req.body.id = check;
    next();
}

module.exports = isAuthenticated;