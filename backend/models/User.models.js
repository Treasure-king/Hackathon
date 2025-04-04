import mongoose from "mongoose";

const userSchema = mongoose.Schema({
fullName:{
    type:String,
    required:true,
    lowercase:true
},
username:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
    minlength:6,
},
gender:{
    type:String,
    required:true,
    enm:["male","female"],
    deafult:"male",
},
email:{
    type:String,
    default:""
},
bio:{
    type:String,
    default:""
},
profilePic:{
    type:String,
    default:""
},
isAdmin:{
    type:Boolean,
    default:false,
}
},{timestamps:true})

const User = mongoose.model('User',userSchema)

export default User;