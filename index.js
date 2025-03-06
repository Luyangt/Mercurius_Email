/**
 * 这段代码是一个典型的 Node.js 后端应用程序的入口文件（index.js），
 * 使用 Express.js 框架搭建了一个服务器，集成了 MongoDB 数据库、用户认证（Passport.js）、会话管理（cookie-session）等功能。
 */



const express = require("express")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const passport = require("passport")
const bodyParser = require("body-parser")
require("./models/User");
require("./models/Survey");
require("./services/passport");
const keys = require("./config/keys")

//将后端与数据库连接起来，确保数据可以被读写。
mongoose.connect(keys.mongoURI)

//Sets up the Express framework to handle HTTP requests.

const app = express();

//middleware that parses JSON data from incoming HTTP requests and converts it into a JavaScript object
//When a frontend (e.g., React) sends data as JSON in a POST request, this middleware ensures the backend can read it.
//bodyParser.json(): 解析客户端发送的 JSON 数据（例如 POST 请求中的 { "name": "John" }），将其转换为 JavaScript 对象，存储在 req.body 中
//用途: 前端（比如 React）发送 JSON 数据时，后端可以用这个对象处理请求。
app.use(bodyParser.json());

//cookie-session middleware is responsible for storing and retrieving cookies.
//When a cookie is created, the server encrypts the data using keys.cookieKey.
//When a user makes a request, the cookie is sent back to the server.
//The server uses the same keys.cookieKey to decrypt the cookie and retrieve session data.
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

//sets up Passport middleware.
app.use(passport.initialize());
/**
 * 	User logs in → passport.authenticate() verifies credentials.
	2.	Session is created:
	•	cookieSession stores session data inside a cookie.
	•	passport.serializeUser() saves user info into the session.
	3.	User navigates to a new page:
	•	Browser sends the session cookie back with every request.
	•	cookieSession reads the cookie and restores session data.
	•	passport.session() loads user info and keeps them logged in.
 */
app.use(passport.session());

//Define Routes
//All routes defined inside authRoutes.js will be available from the root (/).
app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/billingRoutes"));
app.use("/", require("./routes/surveyRoutes"));

/**
 * 	•	This code runs only in production (not development mode).
	•	It serves the React frontend from the client/build folder (instead of running npm start).
	•	Any unknown routes (*) return index.html so React can handle them.
	Node.js 提供的一个全局对象（process.env），用于访问环境变量。
 */
if (process.env.NODE_ENV === "production") {
    
    app.use(express.static("client/build"));
    
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

//Sets the port where the server will listen
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});


