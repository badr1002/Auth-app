const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
//const multer = require('multer');
//const uplead = multer({ dist: 'uploads/' });

class Helper {
    static sendMailerToActiveAcoount = async (key,email) => {
        let transporter = await nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'badrhelal333@gmail.com',
                pass: 'B0R1H2L3M4K5@' 
            }
        }))
        let mailOptions = {
            from: 'badrhelal333@gmail.com',
            to: `${email}`,
            subject: 'activate your account',
            text: 'activate your account open this link',
            html: `<p>Click <a href="https://auth-app1002.herokuapp.com/user/active/${key}">here</a> to active your acount</p>`
        }

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) throw new Error('email not sent')
            else console.log('Email sent: ' + info.response);
        })
    }

    static sendMailerToSetNewPassword = async (id,email) => {
        let transporter = await nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'badrhelal333@gmail.com',
                pass: 'B0R1H2L3M4K5@'
            }
        }))
        let mailOptions = {
            from: 'badrhelal333@gmail.com',
            to: ${email},
            subject: 'Set new password',
            text: 'set new password copy this code',
            html: `<span>Code <h1 style="color:blue;">${id}</h1></span>`
        }

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) throw new Error('email not sent')
            else console.log('Email sent: ' + info.response);
        })
    }

    // static uploadProfileImage = () => {
    //     var storage = multer.diskStorage({
    //         destination: function (req, file, cb) {
    //             cb(null, '/uploads')
    //         },
    //         filename: function (req, file, cb) {
    //             cb(null, file.filename + '.' + Date.new() + (file.originalname.splet('.').pop()))
    //         }
    //     })
 
    //     var upload = multer({
    //         storage: storage,
    //         fileFilter: function (req, file, cb) {
    //             if (path.extname(file.originalname) !== '.jpj') {
    //                 return cb(new Error('Only jpj are allowed'))
    //             }

    //             cb(null, true)
    //         }
       
    //     })
    //     app.post('/profile', upload.single('avatar'), (req, res) => {
    //         res.send(req.uplead)
    //     })
    // }
}


module.exports = Helper
