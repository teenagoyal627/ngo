import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OtherPageNavbar from "../../Navbar/OtherPageNavbar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { MessageBox } from "../../MessageBox";
import FormFields from "./FormFields";
import {
  handleImageChange,
  formChangeHandler,
  formConfirmHandler,
} from "../Utilities/FormUtilities";
import '../../PatientData/MainPage/Loading.css'
const Form = () => {
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
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
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });
  const history = useHistory();
  const apiUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`${apiUrl}/data/${id}`)
        .then((response) => {
          setFormData(response.data || {});
          if (response.data.ImageUrl) {
            setImage(response.data.ImageUrl);
          }
          setLoading(false)
        })
        .catch((error) => {
          setModalContent({
            title: "Error",
            body: `Error fetching patient data:${error.message}`,
          });
          setShowModal(true);
          setLoading(false);
        });
    }
    

  }, [id,apiUrl]);

  return (
    <>
      <OtherPageNavbar />
      {loading && (
          <div className="loading-backdrop">
            <div className="loading-box">
              <div className="loading-spinner"></div>
              <div className="loading-text">Loading data, this will just take a moment...</div>
            </div>
          </div>
        )}

        {!loading && (
          <>
      <FormFields
        handleImageChange={(e) => handleImageChange(formData, id, e, setImage)}
        image={image}
        formData={formData}
        formChangeHandler={(e) => formChangeHandler(e, setFormData, formData)}
        setFormData={setFormData}
        id={id}
        setImage={setImage}
      />

      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() =>
          formConfirmHandler(setShowModal, modalContent, history)
        }
        title={modalContent.title}
        body={modalContent.body}
      />
      </>
        )}
    </>
  );
};

export default Form;
