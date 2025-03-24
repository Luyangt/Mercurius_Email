const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const route = require("express").Router();
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const _ = require("lodash");

//创建和发送调查
route.route("/api/surveys").post(requireLogin,requireCredits, async (req, res) => {
       // 提取字段
        const { title, subject, body, recipients } = req.body;

        // 构造 Survey 对象
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(",").map(email => ({ email: email.trim() })),
            _user: req.user.id, // 关联到当前用户
            dateSent: Date.now()
        });

        // 构造 Mailer 发送邮件
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send(); // 发邮件
            await survey.save(); // 存数据库
            req.user.credits -= 1; // 扣积分
            const user = await req.user.save(); // 保存用户
            res.send(user); // 把新用户数据返回给前端
        } catch (err) {
            console.log(err)
            res.status(422).send
        }

    })

route.route("/api/surveys/:surveyId/:choice")
    .get((req, res) => {
        res.send("Thanks for voting!");
    })


// version of the sendgrid webhook handler that uses lodash chain
route.route('api/surveys/webhooks')
.post((req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    _.chain(req.body)
        .map(({ email, url }) => {
            const match = p.test(new URL(url).pathname);
            if (match) {
                return { email, surveyId: match.surveyId, choice: match.choice };
            }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({ surveyId, email, choice }) => {
            Survey.updateOne(
                {
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false },
                    },
                },
                {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date(),
                }
            ).exec();
        })
        .value();
});

module.exports = route;