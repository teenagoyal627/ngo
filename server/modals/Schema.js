// const mongoose=require('mongoose')



// const ReactFormDataSchema=new mongoose.Schema({
//    name:String,
//    description:String
// })
// const NgoSchema=mongoose.model('ngoportal',ReactFormDataSchema)
// module.exports=NgoSchema



const mongoose=require('mongoose')
const BroughtBySchema=new mongoose.Schema({
    Name:{type:String},
    Address:{type:String},
    MobileNumber:{type:String},
    Aadhar:{type:String},
},{_id:false})
const ReactFormDataSchema=new mongoose.Schema({
    UserId:{type:String},
    RegistrationNo:{type:Number},
    Name:{type:String},
    FatherName:{type:String},
    Gender:{type:String},
    Address:{type:String},
    RegistrationDate:{type:String},
    MeanOfTransportation:{type:String},
    BroughtBy:BroughtBySchema,
    PatientCondition:{type:String},
    LanguageKnown:{type:String},
    HospitalDepartment:{type:String},
    AnandamCenter:{type:String},
    SentToHome:{type:String},
    OPD:{type:Number},
    InmateNumber:{type:Number},
    IONumber:{type:Number},
    IOName:{type:String},
    AadharNumber:{type:Number},
    ImageUrl:{type:String},
    PatientsDocuments:{type:[String]}
})
const User=mongoose.model('ngoportal',ReactFormDataSchema)
module.exports=User