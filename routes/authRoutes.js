const passport = require('passport');

module.exports = (app) => {

    //Initiation Route: Initiates the authentication process.
    //The user asks for a ticket (starts authentication).
    // They’re sent to another window (Google login page).
    app.get(
        //first argument: if anyone visit with this, they should be directed to the next argument
        '/auth/google',   
        //second argument
        passport.authenticate('google', {  
        scope: ['profile', 'email'] //asking google to give us permission for these
    })
    );

    //Callback Route: Handles the response after Google authenticates the user.
    //The user comes back with the ticket, 
    //and the counter processes it (authenticates the user).
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    //This route is used to logout the user.
    app.get('/api/logout', (req, res) => {
        //logout is a function that is attached to the request object by passport
        req.logout();
        res.redirect('/');
    });

    //This route is used to test if the user is authenticated.
    // It sends back the user object stored in the session.
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

};