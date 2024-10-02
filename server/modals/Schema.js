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

ReactFormDataSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  // Find the current document to get the existing values
  const docToUpdate = await this.model.findOne(this.getQuery());

  // Create a search array with updated or existing values
  const searchArray = [
    update.UserId || docToUpdate.UserId,
    update.RegistrationNo || docToUpdate.RegistrationNo,
    update.Name || docToUpdate.Name,
    update.FatherName || docToUpdate.FatherName,
    update.Gender || docToUpdate.Gender,
    update.Address || docToUpdate.Address,
    update.RegistrationDate || docToUpdate.RegistrationDate,
    update.MeanOfTransportation || docToUpdate.MeanOfTransportation,
    (update.BroughtBy && update.BroughtBy.Name) || docToUpdate.BroughtBy?.Name,
    (update.BroughtBy && update.BroughtBy.Address) || docToUpdate.BroughtBy?.Address,
    (update.BroughtBy && update.BroughtBy.MobileNumber) || docToUpdate.BroughtBy?.MobileNumber,
    (update.BroughtBy && update.BroughtBy.Aadhar) || docToUpdate.BroughtBy?.Aadhar,
    update.PatientCondition || docToUpdate.PatientCondition,
    update.LanguageKnown || docToUpdate.LanguageKnown,
    update.HospitalDepartment || docToUpdate.HospitalDepartment,
    update.AnandamCenter || docToUpdate.AnandamCenter,
    update.SentToHome || docToUpdate.SentToHome,
    update.OPD || docToUpdate.OPD,
    update.InmateNumber || docToUpdate.InmateNumber,
    update.IONumber || docToUpdate.IONumber,
    update.IOName || docToUpdate.IOName,
    update.AadharNumber || docToUpdate.AadharNumber
  ];

  if (update.ImageUrl || docToUpdate.ImageUrl) {
    searchArray.push(update.ImageUrl || docToUpdate.ImageUrl);
  }

  if (update.PatientsDocuments || docToUpdate.PatientsDocuments) {
    (update.PatientsDocuments || docToUpdate.PatientsDocuments).forEach((document) => {
      searchArray.push(document.name, document.url);
    });
  }

  // Update Search_value
  update.Search_value = searchArray.filter(Boolean).join("+");

  next();
});


// ReactFormDataSchema.pre("save", function (next) {
//   const doc = this;
  
//   const searchArray = [
//     doc.UserId,
//     doc.RegistrationNo,
//     doc.Name,
//     doc.FatherName,
//     doc.Gender,
//     doc.Address,
//     doc.RegistrationDate,
//     doc.MeanOfTransportation,
//     doc.BroughtBy?.Name,         
//     doc.BroughtBy?.Address,      
//     doc.BroughtBy?.MobileNumber,
//     doc.BroughtBy?.Aadhar,
//     doc.PatientCondition,
//     doc.LanguageKnown,
//     doc.HospitalDepartment,
//     doc.AnandamCenter,
//     doc.SentToHome,
//     doc.OPD,
//     doc.InmateNumber,
//     doc.IONumber,
//     doc.IOName,
//     doc.AadharNumber
//   ];

//   if (doc.ImageUrl) {
//     searchArray.push(doc.ImageUrl);
//   }

//   if (doc.PatientsDocuments && doc.PatientsDocuments.length > 0) {
//     doc.PatientsDocuments.forEach((document) => {
//       searchArray.push(document.name, document.url);
//     });
//   }

//   doc.Search_value = searchArray
//     .filter(Boolean)    
//     .join("\+");        

//   next();
// });

const User = mongoose.model("ngoportal", ReactFormDataSchema);
module.exports = User;
