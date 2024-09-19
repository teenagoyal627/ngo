  
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

 export const printHandler =async (patient,setSelectedPatient,setShowModal) => {
    try{
      // const imageUrl=await getImageForPrint(patient.RegistrationNo)
       const imageUrl=patient.ImageUrl
      setSelectedPatient({...patient,imageUrl});
      setShowModal(true);
    }catch(error){
      console.error("Error while get the image url ",error)
    }
  };


  export  const deleteHandler = async (id,setPatients) => {
    const apiUrl = import.meta.env.VITE_SERVER_URL;
    // console.log("Delete button clicked");
     await axios.delete(`${apiUrl}/data/${id}`);
    // console.log(response);
    setPatients((prevPatients) =>
      prevPatients.filter((patient) => patient._id !== id)
    );
  };


  export const closeModal = (setShowModal,setSelectedPatient) => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  export  const editHandler = (id,history) => {
    history.push(`/form/${id}`)
  };