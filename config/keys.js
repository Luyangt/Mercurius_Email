//keys.js - figure out what set of credentials to return

//process.env is Used to store all environment variables
//NODE_ENV Indicates the runtime environment (e.g., production, development). 
if (process.env.NODE_ENV === 'production') {
    //we are in production - return the prod set of keys
    module.exports = require('./prod');
} else {
    //we are in development - return the dev keys!!! (on local machine)
    module.exports = require('./dev');
}



