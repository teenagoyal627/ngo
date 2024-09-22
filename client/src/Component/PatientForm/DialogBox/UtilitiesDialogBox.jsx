import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../Firebase";
// import PrintParticularPatient from "../../PatientData/TablePatientData/PrintParticularPatient";
// import ShowPatientData from "./ShowPatientData";

export const validateForm = (formData) => {
  if (!formData.RegistrationNo) {
    return false;
  }
  return true;
};

export const dialogBoxSubmitHandler = async (
  e,
  setModalContent,
  setShowModal,
  formData,
  image,
  id,
  userId,
  documents,
  setDocuments,
  fileInputEvent,
  setLoading
) => {
  e.preventDefault();
  if (!validateForm(formData)) {
    setModalContent({
      title: "Error",
      body: "Registration Number is required",
    });
    setShowModal(true);
    return;
  }

  let registrationNo = String(formData.RegistrationNo);
  if (!registrationNo.trim()) {
    setModalContent({
      title: "Error",
      body: "Invalid Registration Number",
    });
    setShowModal(true);
    return;
  }

  setLoading(true)
  try {
    let uploadedDocumentData = [];
    if(fileInputEvent){
      const files = Array.from(fileInputEvent.target.files);
      if (files.length > 0) {
        const uploadPromises = files.map((file) => {
          const uniqueFileName = `${file.name}`;
          const folderPath = `PatientsDocuments/${formData.RegistrationNo}/`;
          const uploadedDocument = ref(storage, folderPath + uniqueFileName);
          return uploadBytes(uploadedDocument, file).then((snapshot) =>
            getDownloadURL(snapshot.ref)
        ).then((url) => ({
          name: file.name,
          url: url,
          size: (file.size / 1024).toFixed(2) + " KB",
        }));
      });

      uploadedDocumentData = await Promise.all(uploadPromises);
       console.log(uploadedDocumentData)
    }
  }

const apiUrl = import.meta.env.VITE_SERVER_URL;
console.log(apiUrl)
    const axiosMethod = id ? axios.put : axios.post;
    const axiosUrl = id
      ? `${apiUrl}/data/${id}`
      // :"http://localhost:5001/insert"
      : `${apiUrl}/insert`;

    await axiosMethod(axiosUrl, {
      ...formData,
      userId,
      PatientsDocuments:uploadedDocumentData,
      // PatientsDocuments: uploadedDocumentData.map(doc => doc.url), 
      ImageUrl: image,
    });
    setLoading(false)
    setModalContent({
      title: "Success",
      body: "Patient Data successfully submitted.",
    });
    setShowModal(true);
    // console.log(id)

    // const newTabUrl=`http://ngoPatientData/patient/${id}`;
    // window.open(newTabUrl,'_blank')
  
  } catch (error) {
    setLoading(false)
    setModalContent({
      title: "Error",
      body: `Error saving patient data: ${error.message}`,
    });
    setShowModal(true);
  }
};

export const dialogBoxConfirm = (
  setShowModal,
  modalContent,
  history,
  setFormData,
  e,
  id,
) => {
  setShowModal(false);
  if (modalContent.title === "Success") {
    history.replace("/form");
    setFormData({
      image:"",
      RegistrationNo: "",
      Name: "",
      FatherName: "",
      Gender: "",
      Address: "",
      RegistrationDate: "",
      MeanOfTransportation: "",
      BroughtBy: {
      Name: "",
      Address: "",
      MobileNumber: "",
      Aadhar: "",
    },
      PatientCondition: "",
      LanguageKnown: "",
      HospitalDepartment: "",
      AnandamCenter: "",
      SentToHome: "",
      OPD: "",
      InmateNumber: "",
      IONumber: "",
      IOName: "",
      AadharNumber: "",
      ImageUrl: "",
    });

    
  } else {
    e.preventDefault();
    history.replace("/form");
  }
};
