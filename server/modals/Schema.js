const mongoose=require('mongoose')



const ReactFormDataSchema=new mongoose.Schema({
   name:String,
   description:String
})
const NgoSchema=mongoose.model('ngoportal',ReactFormDataSchema)
module.exports=NgoSchema