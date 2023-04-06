// const production = {
// port : process.env.port,

// clientID : process.env.clientID,

// clientSecret : "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",
// user : process.env.user,
// pass : process.env.pass,
// secretOrKey : process.env.secretOrKey,
// sessionSecret : 'pywcki45ZN32YlLhDec1T56NOsYo1hJF'

// }
const fs = require('fs');//we need to write to the file sstem hence we need this
const rfs = require('rotating-file-stream');
const path = require('path');


// const logDirectory = path.join(__dirname, '../production_logs'); // this will basically define where our logs will be stored
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory); // of the log directory exsts we use it else we make the log directory ourselves

// const AccessLogStream = rfs.createStream('access.log', {
//     interval: '1d',
//     path: logDirectory
// })
const logDirectory = path.join(__dirname, '../production_logs'); // this will basically define where our logs will be stored
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory); // of the log directory exsts we use it else we make the log directory ourselves

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {

    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'pywcki45ZN32YlLhDec1T56NOsYo1hJF',
    db: 'BeeSocial', //here we add the db name
    smtp: {

        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: true,
        auth: {
            user: 'smorya994@gmail.com',
            pass: 'nnzuteqtodfeuifh'
        }

    },
    //vars for google oath
    google_client_id: "228605161665-mrmnseik6dj29t0atc9i3mtjskgshnv9.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "http://localhost:3000/users/auth/google/callback",//same as set in google while regesterings
    jwt_secret: "beesocial",
    morgan: {
        mode: "dev",
        options: { stream: accessLogStream }    //we need to add the production variables here

    }
}


const production = {
    //we need to add the production variables here
    // name : process.env.CODIAL_ENVIRONMENT, 
    name: process.env.BEESOCIAL_ENVIRONMENT,
    asset_path: process.env.BEESOCIAL_ASSET_PATH,
    session_cookie_key: process.env.BEESOCIAL_SESSION_COOKIE_KEY, //using random key gen .com
    db: process.env.BEESOCIAL_DB, //here we add the db name
    smtp: {

        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587, //need for tls
        secure: 'false',
        auth: {
            user: process.env.BEESOCIAL_GMAIL_USERNAME,
            pass: process.env.BEESOCIAL_GMAIL_PASSWORD
        }

    },
    //vars for google oath
    google_client_id: process.env.BEESOCIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.BEESOCIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.BEESOCIAL_GOOGLE_CALLBACK_URL,//same as set in google while regesterings
    jwt_secret: process.env.BEESOCIAL_JWT_SECRET,//using random key gen .com
    morgan: {
        mode: "combined",
        options: { stream: accessLogStream }
    }
}

//we choose what needs to be exported 
module.exports = eval(process.env.BEESOCIAL_ENVIRONMENT) == undefined ? development : eval(process.env.BEESOCIAL_ENVIRONMENT);
// module.exports = development;