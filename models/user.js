const { default: mongoose } = require("mongoose");

const Schema=mongoose.Schema;

const userSchema=new Schema({
    userpass:{
        type:String,
        required:true,
    },
    adminpass:{
        type:String,
        required:true,
    }
})
const user=mongoose.model("user",userSchema)
module.exports=user;