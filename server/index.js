const express=require('express')
const connectDB=require('./db')
const User=require('./modals/Schema')
const cors=require('cors')
require('dotenv').config()
const bodyParser=require("body-parser")


const app=express()
app.use(express.json())
app.use(cors())

app.use(bodyParser.json({limit:'500mb'}))
app.use(bodyParser.urlencoded({limit:"500mb",extended:true}))

// this contains the mongoatlas uri
connectDB()

app.put("/data/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Find the existing user data
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare the updated data by retaining the old documents if none are provided in the request
    const updatedData = {
      ...req.body, // Spread all the new values from the request body
      PatientsDocuments: req.body.PatientsDocuments && req.body.PatientsDocuments.length > 0
        ? req.body.PatientsDocuments  // If new documents are provided, use them
        : existingUser.PatientsDocuments // Otherwise, retain the old documents
    };

    // Update the user with the merged data
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

// app.put("/data/:id", (req, res) => {
//     const id = req.params.id;
//     User.findByIdAndUpdate(id, req.body, { new: true })
//       .then((updatedUser) => res.json(updatedUser))
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });
  
  app.post("/insert", async (req, res) => {
    try {
      const {
        userId,
        RegistrationNo,
        Name,
        FatherName,
        Gender,
        Address,
        RegistrationDate,
        MeanOfTransportation,
        BroughtBy,
        PatientCondition,
        LanguageKnown,
        HospitalDepartment,
        AnandamCenter,
        SentToHome,
        OPD,
        InmateNumber,
        IONumber,
        IOName,
        AadharNumber,
        ImageUrl,
        PatientsDocuments,
      } = req.body;
  
      const formData = new User({
        UserId: userId,
        RegistrationNo,
        Name,
        FatherName,
        Gender,
        Address,
        RegistrationDate,
        MeanOfTransportation,
        BroughtBy,
        PatientCondition,
        LanguageKnown,
        HospitalDepartment,
        AnandamCenter,
        SentToHome,
        OPD,
        InmateNumber,
        IONumber,
        IOName,
        AadharNumber,
        ImageUrl,
        PatientsDocuments,
      });
  
      await formData.save();
      res.status(200).json({ success: true, id: formData._id });
      console.log(res)
      console.log(formData)
    } catch (err) {
      console.error("Error occurred: ", err);
      res.status(500).send("Server error");
    }
  });
  
  app.get("/data", (req, res) => {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "UserId is required" });
    }
    User.find({ UserId: userId })
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
  });
  
  //this is for edit the patient form
  app.get("/data/:id", (req, res) => {
    const { id } = req.params;
    User.findById(id)
      .then((patient) => res.json(patient))
      .catch((err) => res.status(500).json({ message: "Server error" }));
  });
  
  //this code is for delete teh data form the database
  app.delete("/data/:id", (req, res) => {
    const { id } = req.params;
    User.findByIdAndDelete(id)
      .then((deletedPatient) => {
        if (!deletedPatient) {
          return res.status(404).json({ message: "Patient not found" });
        }
        res.json({ deletedPatient });
      })
      .catch((err) => {
        res.status(400).json({ message: "Failed to delete patient" });
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
  
  const PORT = process.env.PORT || 5001; 
   app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });

