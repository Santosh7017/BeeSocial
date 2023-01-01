const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(express.urlencoded());

// setting cookie parser in middleware
app.use(cookieParser());

//  setting assets 
app.use(express.static('.assets'));
 
// use express router 
app.use('/',require('./routes'));

// setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running server : ${err}`);
    }

    console.log("Server is running on port :", port);
});

