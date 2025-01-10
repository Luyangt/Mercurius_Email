module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({error: 'You must log in!'});
    }
    // If the user is logged in, call the next middleware in the chain
    next();

};