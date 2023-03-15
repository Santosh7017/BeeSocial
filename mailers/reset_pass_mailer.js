const nodeMailer = require('../config/nodemailer');


// newResetPassMail is the function that sends the mail to the user
exports.newResetPassMail = (token) => {
 
       
            let htmlString = nodeMailer.renderTemplate({token: token},'/passwordReset/reset_password.ejs');
        // console.log("This is access token",accessToken.accessToken);
            console.log("This is htmlString",htmlString);
        nodeMailer.transporter.sendMail({
            from: 'smorya994@gmail.com',
            to: token.user.email,   // token.user.email is the email of the user
            subject: "Reset Password",
            html: htmlString
        },(err, info)=>{
            // if there is an error in sending the mail
            if(err){
                console.log('error in sending reset email',err);
                return;
            }

            console.log('Message sent', info);
            return;
            
        });
}