//use nodemon to watch changes  

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

//connect to mongoDB database
mongoose.connect(keys.mongoURI);

const app = express();

//tell express to use cookies(authentication)
app.use(
    cookieSession({
        //maxAge is how long the cookie can exist in the browser
        maxAge: 30 * 24 * 60 * 60 *1000,
        //keys is used to encrypt the cookie
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());


// Require routes
require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 3000;
app.listen(PORT);

