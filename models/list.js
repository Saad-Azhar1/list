const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const listSchema=new Schema({
    item:{
        type:String,
        required:true,
    },
    color:{
        type:String,
    },
    weight:{
        type:Number,
    },
    price:{
        type:Number,
        required:true,
    }

})

const list=mongoose.model("list",listSchema)
module.exports=list;