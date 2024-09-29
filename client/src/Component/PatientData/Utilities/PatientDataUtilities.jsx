  
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../../Firebase";
import axios from "axios";

export  const getImageForPrint = async (RegistrationNo) => {
    const ImgRef = collection(database, "ImageUrlData");
    const ImgDb = await getDocs(ImgRef);
    const allImgData = ImgDb.docs.map((img) => ({
      ...img.data(),
      id: img.id,
    }));  
    const patientImage = allImgData.find((img) => Number(img.id) === RegistrationNo);
    if (patientImage) {
      return patientImage.imgUrl;
    } else {

      return "no Image found";
    }
  };

 export const printHandler =async (patient,setSelectedPatient,setShowPrintModal) => {
    try{
      // console.log(patient.ImageUrl)
      // const imageUrl=await getImageForPrint(patient.RegistrationNo)
       const imageUrl=patient.ImageUrl
      setSelectedPatient({...patient,imageUrl});
      setShowPrintModal(true);
    }catch(error){
      console.error("Error while get the image url ",error)
    }
  };


  export  const deleteHandler = async (id,setModalContent,setShowModal,setPatientToDelete) => {

    // const apiUrl = import.meta.env.VITE_SERVER_URL;
    setModalContent({
      title: "Confirmation",
      body: "Do you want to delete this patient details.",
    });
    setShowModal(true);
    setPatientToDelete(id)
    //  await axios.put(`${apiUrl}/data/${id}/delete`);
    // setPatients((prevPatients) =>
    //   prevPatients.filter((patient) => patient._id !== id)
    // );
  };
export const deleteAfterConfirmation=async(id,setPatients,history,setShowModal,modalContent)=>{
 
  if (modalContent.title === "Confirmation") {
    const apiUrl = import.meta.env.VITE_SERVER_URL;
    await axios.put(`${apiUrl}/data/${id}/delete`);
    setShowModal(false);
    setPatients((prevPatients) =>
      prevPatients.filter((patient) => patient._id !== id)
    );
    history.replace('/patientdata')
  }

}

  export const closeModal = (setShowModal,setSelectedPatient) => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  export  const editHandler = (id,history) => {
    history.push(`/form/${id}`)
  };