const mongoose = require("mongoose");
const BroughtBySchema = new mongoose.Schema(
  {
    Name: { type: String },
    Address: { type: String },
    MobileNumber: { type: String },
    Aadhar: { type: String },
  },
  { _id: false }
);

const PatientsDocumentsSchema = new mongoose.Schema(
  {
    url: { type: String },
    name: { type: String },
    size: { type: String },
  },
  { _id: false }
);

const ReactFormDataSchema = new mongoose.Schema({
  UserId: { type: String,require:true },
  RegistrationNo: { type: Number },
  Name: { type: String },
  FatherName: { type: String },
  Gender: { type: String },
  Address: { type: String },
  RegistrationDate: { type: String,},
  MeanOfTransportation: { type: String },
  BroughtBy: BroughtBySchema,
  PatientCondition: { type: String },
  LanguageKnown: { type: String },
  HospitalDepartment: { type: String },
  AnandamCenter: { type: String },
  SentToHome: { type: String },
  IsSentToHome:{type:Boolean,
    default:false
  },
  OPD: { type: Number },
  InmateNumber: { type: Number },
  IONumber: { type: Number },
  IOName: { type: String },
  AadharNumber: { type: Number },
  ImageUrl: { type: String },
  // PatientsDocuments:{type:[String]}
  PatientsDocuments: [PatientsDocumentsSchema],
  deleted:{type:Boolean, default:false},

  Search_value:{type:String}


});

ReactFormDataSchema.pre("save", function (next) {
  const doc = this;
  
  const searchArray = [
    doc.UserId,
    doc.RegistrationNo,
    doc.Name,
    doc.FatherName,
    doc.Gender,
    doc.Address,
    doc.RegistrationDate,
    doc.MeanOfTransportation,
    doc.BroughtBy?.Name,         
    doc.BroughtBy?.Address,      
    doc.BroughtBy?.MobileNumber,
    doc.BroughtBy?.Aadhar,
    doc.PatientCondition,
    doc.LanguageKnown,
    doc.HospitalDepartment,
    doc.AnandamCenter,
    doc.SentToHome,
    doc.OPD,
    doc.InmateNumber,
    doc.IONumber,
    doc.IOName,
    doc.AadharNumber
  ];

  if (doc.ImageUrl) {
    searchArray.push(doc.ImageUrl);
  }

  if (doc.PatientsDocuments && doc.PatientsDocuments.length > 0) {
    doc.PatientsDocuments.forEach((document) => {
      searchArray.push(document.name, document.url);
    });
  }

  doc.Search_value = searchArray
    .filter(Boolean)    
    .join("\+");        

  next();
});

const User = mongoose.model("ngoportal", ReactFormDataSchema);
module.exports = User;
