var express = require("express");
var router = express.Router();

var jade = require("jade");

const sgMail = require("@sendgrid/mail");

const apiKey = process.env.SENDGRID_API_KEY || "";
sgMail.setApiKey(apiKey);

var msg = {
  to: ["joseiq91@gmail.com"],
  from: "noReply@rileyandco.com",
  subject: "Test upload an attachment form",
  attachments: [{ content: "", filename: "" }],
  html: ""
};

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource from send Email route");
});

//sending attachedments with sendgrid nodejs
//https://github.com/sendgrid/sendgrid-nodejs/blob/master/use-cases/attachments.md
//base64 encoding
//https://stackoverflow.com/questions/6182315/how-to-do-base64-encoding-in-node-js
router.post("/", (req, res, next) => {
  let uploadFile = req.files.file;
  msg.attachments[0].content = Buffer.from(uploadFile.data).toString("base64");
  msg.attachments[0].filename = uploadFile.name;
  let data = jade.renderFile(process.cwd() + "/views/design.jade", req.body);
  msg.html = data;

  sgMail.send(msg, function(err, json) {
    if (err) {
      throw err;
    }
    res.json(json);
  });
});

module.exports = router;
