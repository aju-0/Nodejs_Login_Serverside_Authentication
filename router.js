var express = require("express");
var router = express.Router();

const credential = {
  email: "ajunair0@gmail.com",
  password: "1234",
};

router.post('/login', (req, res) => {   // route handler
  if (req.body.email == credential.email && req.body.password == credential.password) {
    req.session.user = req.body.email; // Use a single equal sign here
    res.redirect('/route/dashboard');
  } else {
    res.render("base", { message: "Invalid Email or Password" })
  }
});
   //route for dashboard
router.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.render('dashboard', { user: req.session.user }); 
  } else {
    res.render("base")
  }
});

   //route for logout
 router.post('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err); 
            res.send("Error")
        }
        else{
            res.render('base',{title:"logout",logout:"logout Successfully...!"})
        }
    });
 });

module.exports = router;
