var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async function(req, res, next) {
  console.log(req.body);
  console.log(process.env);
  const nodemailer = require("nodemailer");
  
  let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  let info = transport.sendMail({
    from: '"Boo! 👻" <boo@example.com>', // sender address
    to: `"${req.body.nome}" <${req.body.email}>`, // list of receivers
    subject: "Enviando e-mail com o nodemailer ✔", // Subject line
    text: "Parabéns!\n\n" +
          req.body.nome + "\n\n" +
          "O e-mail foi enviado usando NODEMAILER.\n\n"+
          "O Nodemailer é um módulo para aplicativos Node.js para permitir o envio de e-mails de forma fácil.", // plain text body
    html: "<img src='https://nodemailer.com/nm_logo_200x136.png'>"+
          "<h1>Parabéns</h1>" +
          "<h2>" + req.body.nome + "</h2>" +
          "<p>O e-mail foi enviado usando NODEMAILER.</p>" +
          "<p>O Nodemailer é um módulo para aplicativos Node.js para permitir o envio de e-mails de forma fácil.</p>", // html body
  });

  // res.send("OK");
  res.render('index', { success_msg: 'E-mail enviado com sucesso!' });
});

module.exports = router;
