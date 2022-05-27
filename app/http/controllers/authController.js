const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");



function authController() {
  //factory functions ->  this functions return the object
  return {
    // index : function(){

    // } this is the same thing as lower
    login(req, res) {
      //We can write the whole logic here...
      res.render("auth/login");
    },
    register(req, res) {
      //We can write the whole logic here...
      res.render("auth/register");
    },
    async postRegister(req, res) {
      const { name, email, password } = req.body;
      //Validate request
      if (!name || !email || !password) {
        req.flash("error", "All fiels are requried");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }

      //check if email exists
      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "Email Already Taken");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      });

      //Hash password to use this install a package bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      //Create a user
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      user
        .save()
        .then((user) => {
          //Login

          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "Something went wrong");
          return res.redirect("/register");
        });
      console.log(req.body);
    },
    postlogin(req, res, next) {
        const { name, email, password } = req.body;
        //Validate request
        if ( !email || !password) {
          req.flash("error", "All fiels are requried");
          
          return res.redirect("/login");
        }


      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
          }

          return res.redirect("/");
        });
      })(req,res,next)
    },
    logout(req,res){
        return res.redirect('/login');
    }
  };
}

module.exports = authController;
