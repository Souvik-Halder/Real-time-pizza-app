const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{type:String ,required:true},
    email:{type:String,required:true,unique:true},//The email must be unique
    password:{type:String,required:true},
    role:{
      type:String,
     default:'customer',
    }
},{timestamps:true});

const user= mongoose.model('User',userSchema);

module.exports=user;//Exporting the model....