const express = require("express");
const connectDB = require("./db");
const User = require("./modals/Schema");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://sapnango-d7310.web.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

// this contains the mongoatlas uri
connectDB();

app.put("/data/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const existingUser = await User.findById(id).lean();
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedData = {
      ...req.body,
      PatientsDocuments:
        req.body.PatientsDocuments && req.body.PatientsDocuments.length > 0
          ? req.body.PatientsDocuments
          : existingUser.PatientsDocuments,
    };
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

// app.post("/insert", async (req, res) => {
//   try {
//     const {
//       userId,
//       RegistrationNo,
//       Name,
//       FatherName,
//       Gender,
//       Address,
//       RegistrationDate,
//       MeanOfTransportation,
//       BroughtBy,
//       PatientCondition,
//       LanguageKnown,
//       HospitalDepartment,
//       AnandamCenter,
//       SentToHome,
//       OPD,
//       InmateNumber,
//       IONumber,
//       IOName,
//       AadharNumber,
//       ImageUrl,
//       PatientsDocuments,
//     } = req.body;

//     const formData = new User({
//       UserId: userId,
//       RegistrationNo,
//       Name,
//       FatherName,
//       Gender,
//       Address,
//       RegistrationDate,
//       MeanOfTransportation,
//       BroughtBy,
//       PatientCondition,
//       LanguageKnown,
//       HospitalDepartment,
//       AnandamCenter,
//       SentToHome,
//       OPD,
//       InmateNumber,
//       IONumber,
//       IOName,
//       AadharNumber,
//       ImageUrl,
//       PatientsDocuments,
//     });

//     await formData.save();
//     res.status(200).json({ success: true, id: formData._id });
//     console.log(res)
//     console.log(formData)
//   } catch (err) {
//     console.error("Error occurred: ", err);
//     res.status(500).send("Server error");
//   }
// });

app.post("/insert", async (req, res) => {
  try {
    const formData = new User({
      ...req.body,
      RegistrationDate: req.body.RegistrationDate || new Date().toLocaleDateString('en-US')
    });
    await formData.save();
    res.status(200).json({ success: true, id: formData._id });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).send("Server error");
  }
});

app.get("/data", (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "UserId is required" });
  }
  User.find({ UserId: userId, deleted: false })
    .sort({ RegistrationDate: -1 })
    .then((users) => res.json(users))
    .catch((err) => res.json(err,"error comes to fetch the data"));
});


//this is for edit the patient form
app.get("/data/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((patient) => res.json(patient))
    .catch((err) => res.status(500).json({ message: "Server error" }));
});
// app.put("/data/:id", (req, res) => {
//   const { id } = req.params;

//   const updatedData = req.body;
//   console.log(updatedData)
//   const updatedSearchValue = buildSearchValue(updatedData);
//   console.log(updatedSearchValue);
//   const updatedPatientData = {
//     ...updatedData,
//     Search_value: updatedSearchValue,
//   };

//   User.findByIdAndUpdate(id, updatedPatientData, { new: true })
//     .then((patient) => res.json(patient))
//     .catch((err) => res.status(500).json({ message: "Server error" }));
// });
// const buildSearchValue = (fields) => {
//   const {
//     UserId,
//     Name,
//     FatherName,
//     Gender,
//     Address,
//     AadharNumber,
//     LanguageKnown,
//     RegistrationNo,
//     RegistrationDate,
//     MeanOfTransportation,
//     PatientCondition,
//     HospitalDepartment,
//     AnandamCenter,
//     SentToHome,
//     BroughtBy,
//     OPD,
//     InmateNumber,
//     IONumber,
//     IOName,
//   } = fields;
  
//   const searchValue = [
//     UserId,
//     Name,
//     FatherName,
//     Gender,
//     Address,
//     AadharNumber,
//     LanguageKnown,
//     RegistrationNo,
//     RegistrationDate,
//     MeanOfTransportation,
//     PatientCondition,
//     HospitalDepartment,
//     AnandamCenter,
//     SentToHome,
//     BroughtBy?.Name,
//     BroughtBy?.Address,
//     BroughtBy?.MobileNumber,
//     BroughtBy?.Aadhar,
//     OPD,
//     InmateNumber,
//     IONumber,
//     IOName,
//   ]
//     .filter(Boolean) // This will filter out empty values
//     .join("+")
//     .trim();
  
//   console.log("Constructed Search Value:", searchValue); // Debugging log
//   return searchValue;
// };


//this code is for delete teh data form the database
app.put("/data/:id/delete", (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, { deleted: true }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "user marked as deleted", deleted: updatedUser });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to mark as deleted." });
    });
});

//this is for filter the data
app.post("/filter", async (req, res) => {
  const { startDate, endDate, gender, userId } = req.body;
  // console.log(" filter the start and end and gender are",startDate,endDate,gender,userId)
  const matchStage = { UserId: userId };

  if (startDate || endDate) {
    matchStage.RegistrationDate = {};
    if (startDate) {
      matchStage.RegistrationDate.$gte = startDate;
    }
    if (endDate) {
      matchStage.RegistrationDate.$lte = endDate;
    }
  }
  if (gender) {
    const genderFilter = JSON.parse(gender);
    //  console.log(genderFilter)
    const genders = [];
    if (genderFilter.Male) genders.push("Male");
    if (genderFilter.Female) genders.push("Female");
    if (genders.length > 0) {
      matchStage.Gender = { $in: genders };
    }
  }
  // console.log("matchStage:", matchStage)
  try {
    const filteredPatients = await User.aggregate([{ $match: matchStage }]);
    res.json(filteredPatients);
  } catch (err) {
    console.error("Error in aggregation pipeline:", err);
    res.status(500).send("Server error");
  }
});


//this code is for search the patient..
app.get("/search",async(req,res)=>{
  const searchTerm=req.query.q;
  try{
    const results=await User.find({
      $text:{$search:searchTerm},
      deleted:false,
    }, {UserId: 1, RegistrationNo: 1, Name: 1, FatherName: 1, Address: 1, PatientsDocuments:1,ImageUrl:1 } 
  )
    res.json(results)
  }catch(error){
    res.status(500).json({message:error.message})
  }
})

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
