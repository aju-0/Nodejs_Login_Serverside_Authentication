
const express = require('express');
const app = express();
const path = require("path");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const nocache = require("nocache");
const bodyParser = require('body-parser');
const router = require("./router");
const port = process.env.PORT || 3000;


app.use(express.json())                  //This middleware is used to parse incoming JSON data in HTTP request bodies.

app.use(express.urlencoded({extended:true}))    //This middleware is used to parse incoming URL-encoded data in HTTP request bodies.      
app.use(nocache());
// set view engine and dir
app.set("view engine", "ejs");

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({  //Sessions are used to store user-specific data across multiple requests.
    secret: uuidv4(),
    resave: false,   
    saveUninitialized: false
}));

//route middleware
app.use('/route', router);

// Home route

app.get('/',nocache(), (req, res) => {
    if(req.session.user){
        return res.redirect('/route/dashboard')
    }else{
    return res.render('base', { title: "Login page" });
}
});


   //Start the server
app.listen(port, () => {
    console.log(`server on http://localhost:${port}`);
});