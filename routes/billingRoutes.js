/**
 * This file contains the server-side route that handles the payment confirmation with Stripe. 
 * When a payment request is made from the client, this route processes the payment using the Stripe API, 
 * updates the user's credits, and sends the updated user information back to the client.
 */

const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    //create a new route handler for the post request to /api/stripe
    //requireLogin is a middleware that checks if the user is logged in
    app.post('/api/stripe', requireLogin, async(req, res) => {
        const charge = await stripe.charges.create( {
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            payment_method: req.body.paymentMethodId,
            source: req.body.id
        });

        req.user.credits += 5;

        //save the user to the database
        const user = await req.user.save();

        //send the user back to the client
        res.send(user);

    });

    

};