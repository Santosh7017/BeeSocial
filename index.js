const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
// const expressLayouts = require('express-ejs-layouts');
// usec for session and cookie and for authentication
const session = require('express-session');
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// const MongoStore = require('connect-mongo')(session);
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());

// setting cookie parser in middleware
app.use(cookieParser());

//  setting assets 
app.use(express.static('.assets'));
 


// setup the view engine
app.set('view engine','ejs');
app.set('views','./views');
// mongo store is used to store the session cookie in the db
 app.use(session({
    name: 'BeeSocial',
    // todo change secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave:false,
    cookie: {
        maxAge : (1000 * 60 * 100)
    },
    // store: new MongoStore(
    //     {
    //         mongooseConnection: db,
    //         autoRemove: 'disabled'
        
    //     },
    //     function(err){
    //         console.log(err ||  'connect-mongodb setup ok');
    //     }
    // )
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/BeeSocial'
        })
 }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(passport.setAuthenticatedUser);

  // use express router 
app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running server : ${err}`);
    }

    console.log("Server is running on port :", port);
});

