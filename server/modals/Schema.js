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

// ReactFormDataSchema.pre("findOneAndUpdate",async function (next){
//   const update=this.getUpdate();
//   const docToUpdate=await this.model.find(this.getQuery())

//   const searchArray=[
//     update.UserId || docToUpdate.UserId,
//     update.RegistrationNo || docToUpdate.RegistrationNo,
//     update.Name || docToUpdate.Name,
//     update.FatherName || docToUpdate.FatherName,
//     update.Gender || docToUpdate.Gender,
//     update.Address || docToUpdate.Address,
//     update.RegistrationDate || docToUpdate.RegistrationDate,
//     update.MeanOfTransportation || docToUpdate.MeanOfTransportation,
//     (update.BroughtBy && update.BroughtBy.Name) || docToUpdate.BroughtBy?.Name,
//     (update.BroughtBy && update.BroughtBy.Address) || docToUpdate.BroughtBy?.Address,
//     (update.BroughtBy && update.BroughtBy.MobileNumber) || docToUpdate.BroughtBy?.MobileNumber,
//     (update.BroughtBy && update.BroughtBy.Aadhar) || docToUpdate.BroughtBy?.Aadhar,
//     update.PatientCondition || docToUpdate.PatientCondition,
//     update.LanguageKnown || docToUpdate.LanguageKnown,
//     update.HospitalDepartment || docToUpdate.HospitalDepartment,
//     update.AnandamCenter || docToUpdate.AnandamCenter,
//     update.SentToHome || docToUpdate.SentToHome,
//     update.OPD || docToUpdate.OPD,
//     update.InmateNumber || docToUpdate.InmateNumber,
//     update.IONumber || docToUpdate.IONumber,
//     update.IOName || docToUpdate.IOName,
//     update.AadharNumber || docToUpdate.AadharNumber,
//     update.State || docToUpdate.State

//   ]

//   if(update.ImageUrl || docToUpdate.ImageUrl){
//     searchArray.push(update.ImageUrl || docToUpdate.ImageUrl)
//   }

//   if(update.PatientsDocuments || docToUpdate.PatientsDocuments){
//     (update.PatientsDocuments || docToUpdate.PatientsDocuments).forEach((document)=>{
//       searchArray.push(document.name,document.url)
//     })
//   }

//   update.Search_value=searchArray.filter(Boolean).join('+')
//   next()

// })


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

  // Create the Search_value by joining non-falsy values with '+'
  this.Search_value = searchArray.filter(Boolean).join("+");
  next();
});

// Middleware to handle the updating of Search_value before findOneAndUpdate
ReactFormDataSchema.pre("findOneAndUpdate", async function (next) {
  try {
    // Get the update object
    const update = this.getUpdate();

    // Fetch the current document based on the query
    const docToUpdate = await this.model.findOne(this.getQuery());

    if (!docToUpdate) {
      return next(new Error("Document not found."));
    }

    // Merge existing fields with updated fields
    const mergedData = {
      ...docToUpdate.toObject(),
      ...update,
      BroughtBy: {
        ...docToUpdate.BroughtBy,
        ...(update.BroughtBy || {}),
      },
      PatientsDocuments: update.PatientsDocuments || docToUpdate.PatientsDocuments,
    };

    // Construct the searchArray with updated values
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

    // Include PatientsDocuments details
    if (mergedData.PatientsDocuments && mergedData.PatientsDocuments.length > 0) {
      mergedData.PatientsDocuments.forEach((document) => {
        if (document.name) searchArray.push(document.name);
        if (document.url) searchArray.push(document.url);
      });
    }

    // Set the Search_value in the update object
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
