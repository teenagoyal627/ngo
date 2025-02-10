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
  PatientsDocuments: [PatientsDocumentsSchema],
  deleted:{type:Boolean, default:false},
  Search_value:{type:String},
  State :{type:String},


});


ReactFormDataSchema.pre("save", function (next) {
  const searchArray = [
    this.UserId,
    this.RegistrationNo,
    this.Name,
    this.FatherName,
    this.Gender,
    this.Address,
    this.RegistrationDate,
    this.MeanOfTransportation,
    this.BroughtBy?.Name,
    this.BroughtBy?.Address,
    this.BroughtBy?.MobileNumber,
    this.BroughtBy?.Aadhar,
    this.PatientCondition,
    this.LanguageKnown,
    this.HospitalDepartment,
    this.AnandamCenter,
    this.SentToHome,
    this.OPD,
    this.InmateNumber,
    this.IONumber,
    this.IOName,
    this.AadharNumber,
    this.State,
    this.ImageUrl,
  ];

  // Include PatientsDocuments details
  if (this.PatientsDocuments && this.PatientsDocuments.length > 0) {
    this.PatientsDocuments.forEach((document) => {
      if (document.name) searchArray.push(document.name);
      if (document.url) searchArray.push(document.url);
    });
  }

  this.Search_value = searchArray.filter(Boolean).join("+");
  next();
});

ReactFormDataSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate();

    const docToUpdate = await this.model.findOne(this.getQuery());

    if (!docToUpdate) {
      return next(new Error("Document not found."));
    }

    const mergedData = {
      ...docToUpdate.toObject(),
      ...update,
      BroughtBy: {
        ...docToUpdate.BroughtBy,
        ...(update.BroughtBy || {}),
      },
      PatientsDocuments: update.PatientsDocuments || docToUpdate.PatientsDocuments,
    };

    const searchArray = [
      mergedData.UserId,
      mergedData.RegistrationNo,
      mergedData.Name,
      mergedData.FatherName,
      mergedData.Gender,
      mergedData.Address,
      mergedData.RegistrationDate,
      mergedData.MeanOfTransportation,
      mergedData.BroughtBy?.Name,
      mergedData.BroughtBy?.Address,
      mergedData.BroughtBy?.MobileNumber,
      mergedData.BroughtBy?.Aadhar,
      mergedData.PatientCondition,
      mergedData.LanguageKnown,
      mergedData.HospitalDepartment,
      mergedData.AnandamCenter,
      mergedData.SentToHome,
      mergedData.OPD,
      mergedData.InmateNumber,
      mergedData.IONumber,
      mergedData.IOName,
      mergedData.AadharNumber,
      mergedData.State,
      mergedData.ImageUrl,
    ];

    if (mergedData.PatientsDocuments && mergedData.PatientsDocuments.length > 0) {
      mergedData.PatientsDocuments.forEach((document) => {
        if (document.name) searchArray.push(document.name);
        if (document.url) searchArray.push(document.url);
      });
    }

    update.Search_value = searchArray.filter(Boolean).join("+");
    next();
  } catch (error) {
    next(error);
  }
});


const UserSchema=new mongoose.Schema({
  userId:{type:String,required:true},
  username:{type:String, required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String, required:true},

})


const Patient = mongoose.model("PatientDetails", ReactFormDataSchema);
const UserData = mongoose.model("UserDetails", UserSchema);

module.exports ={Patient,UserData};
