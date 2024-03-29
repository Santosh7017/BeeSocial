const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const env = require('./config/environment');
const logger = require('morgan');
require('./config/view-helpers')(app);

require('dotenv').config();
const port = 8000;
const path = require('path');
// const expressLayouts = require('express-ejs-layouts');
// usec for session and cookie and for authentication
const session = require('express-session');
const db = require('./config/mongoose'); 
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWt = require('./config/passport-jwt-strategy');
const passportgoogle = require('./config/passport-google-oauth2-strategy');
// const MongoStore = require('connect-mongo')(session);
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const environment = require('./config/environment');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
const cors = require('cors');
// const io = require("socket.io")(chatServer, {
//     cors: {
//       origin: "http://localhost:8000",
//     },
//   });

// app.use(cors());
chatServer.listen(5000);
console.log('chat server is listening on port 5000');


// console.log(app.locals.assetPath('css/layout.css'));



if(environment.name == 'development'){
app.use(sassMiddleware({
    // src:'./assets/scss',
    // dest: './assets/css',
    src: path.join(__dirname, environment.asset_path, 'scss'),
    dest: path.join(__dirname, environment.asset_path, 'css'),
    debug: false,
    outputStyle: 'expanded',
    prefix: '/css'

}));
}
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: false }));

// setting cookie parser in middleware
app.use(cookieParser());

//  setting assets 
// app.use(express.static('./assets'));
app.use(express.static(environment.asset_path));
// make the uploads path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));
// app.use(logger(environment.morgan.mode, environment.morgan.options));


app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
 


// setup the view engine
app.set('view engine','ejs');
app.set('views','./views');
// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'BeeSocial',
    // todo change secret before deployment in production mode
    secret: process.env.sessionSecret,
    saveUninitialized: false,
    resave:false,
    cookie: {
        maxAge : (1000 * 60 * 100)
     },
   
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/BeeSocial'
        })
 }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(passport.setAuthenticatedUser);


  app.use(flash());
  app.use(customMware.setFLash);


  // use express router 
app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running server : ${err}`);
    }

    console.log("Server is running on port :", port);
});

