const passport = require("passport");
//Creates a new Express router for handling routes.
const router = require("express").Router();

//When a user visits /auth/google, this starts the Google login process.(直接在passport官网找)
/**
 * The path is inside .route() to make it more modular, and the function inside .get(...) is the callback.
 */
router.route("/auth/google")
    .get(
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
router.route("/auth/google/callback")
    .get(
        passport.authenticate('google', { failureRedirect: "/" }),  //If authentication fails, the user is redirected to / (home page).
        //req, res This allows more custom logic after login (e.g., logging user info, setting additional session data, etc.).
        (req,res) => {
            res.redirect("/surveys"); //If login is successful, the user is redirected to /surveys.
        }
    );

router.route("/api/logout")
    .get((req, res) => {
        req.logout();
        res.redirect("/")
    });

router.route("/api/current_user")
    .get((req, res) => {
        res.send(req.user);
    });

/**
 * module.exports = router; makes the router object available for use in other files.
	It is part of Node.js module system and allows sharing routes between different parts of an Express app.
    in index.js:
    require("./routes/authRoutes") imports the router from authRoutes.js.
    app.use("/", authRoutes); registers all routes inside authRoutes.js.
 */
module.exports = router;