const mailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const smtpTransport = mailer.createTransport({
host: process.env.SMTP_SERVER,
port: parseInt(process.env.SMTP_PORT),
auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
}
});

smtpTransport.use('compile', hbs({
viewEngine: { 
    layoutsDir: __dirname+'/views/emails',
    defaultLayout : 'layout',
    extname: '.ejs'
},
viewPath: __dirname+'/views/emails/',
extName: ".ejs",
partialsDir:__dirname+'/views/emails/partials/' 
}));

module.exports = smtpTransport;