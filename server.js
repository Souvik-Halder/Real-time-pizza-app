require('dotenv').config();//for using env files
const express =require('express');
const app=express();
const ejs=require('ejs');
const path=require('path');
const PORT=process.env.PORT || 3000;
const expresslayout=require('express-ejs-layouts');
const mongoose=require('mongoose');
const session=require('express-session');
const flash=require('express-flash');
var MongoDBStore = require('connect-mongodb-session')(session);
const passport=require('passport');





//Database connection
const url='mongodb://localhost/pizza';
mongoose.connect(url)

.then(()=>{
    console.log("Connection is Successful");
})
.catch((err)=>{
    console.log(err);
});
const connection=mongoose.connect;

//passport config //for the login
const passportInit=require('./app/config/passport');
passportInit(passport);

app.use(session({ secret: 'COOKIE_SECRET' }))
app.use(passport.initialize());
app.use(passport.session());

let mongoStore=new MongoDBStore({
    uri:url,
    collection:'sessions'
});

//Session config

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized:false,
   store:mongoStore,
    cookie:{maxAge:1000*60*60*24} // 24 hours
    
}))

app.use(flash()); //for flash this function is called cookie session related
//Assests 


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))//To get urlencoded data

//Global middleware//To get the sessions in front-end in the ejs files
app.use((req,res,next)=>{
     res.locals.session=req.session;
     res.locals.user=req.user;
     next()
})

//set template engine
app.use(expresslayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');


 require('./routes/web')(app)//This is just a function call.
    
   
app.listen(PORT,()=>{
    console.log(`Listening on the port ${PORT}`);
})