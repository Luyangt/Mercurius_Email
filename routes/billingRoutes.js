const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripSecretKey);
const requireLogin = require("../middlewares/requireLogin");
const router = require("express").Router();

router.route("/api/stripe")
    .post(requireLogin, async (req, res) => {  //The requireLogin middleware runs first, and async (req, res) runs second.
        const charge = await stripe.charges.create({ //Without await, charge might be undefined because the function wouldn’t wait for Stripe’s response.
            amount: 500,  // Amount in cents ($5.00)
            currency: 'usd',
            description: '$5 for 5credits',
            source: req.body.id
        });
        req.user.credits += 5;
        /**
         * await ensures that the user’s updated credits are saved before sending a response.
         */
        const user = await req.user.save();

        //Returns the updated user data to the frontend.
        res.send(user);
    });

module.exports = router;