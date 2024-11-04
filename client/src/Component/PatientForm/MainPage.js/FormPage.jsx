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
import "../../PatientData/MainPage/Loading.css";
import AcceptCookiesModal from "./AcceptCookiesModal/AcceptCookies";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";

const Form = () => {
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    RegistrationNo: "",
    Name: "",
    FatherName: "",
    HusbandName:"",
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
    State: "",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });
  const history = useHistory();
  const apiUrl = import.meta.env.VITE_SERVER_URL;

  const [showCookieModal, setShowCookieModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const auth = getAuth();

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        if (!localStorage.getItem("cookiesConsent")) {
          setShowCookieModal(true);
        } else {
          if (localStorage.getItem("cookiesConsent") === "accepted") {
            Cookies.set("userId", user.uid, {
              path: "/",  //it is a type of attribute which specify the validity of the cookies
              expires: 7,  //it shows that after how many days the cookies be expire
              sameSite: "None",  //cookies sent to same site or not means same system or any other system
              secure: true, //the cookie should only be sent over secure connections, specifically HTTPS.
            });
          }
        }
      } else {
        history.replace("/login");
      }
    });

    if (id) {
      setLoading(true);
      axios
        .get(`${apiUrl}/data/${id}`)
        .then((response) => {
          setFormData(response.data || {});
          if (response.data.ImageUrl) {
            setImage(response.data.ImageUrl);
          }
          setLoading(false);
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

    return () => unsubscribe();
  }, [id, apiUrl, history, auth]);

  const handleCookieAccept = () => {
    console.log(userId)
    Cookies.set("userId", userId, {
      path: "/",
      expires: 7,
      sameSite: "None",
      secure: true,
    });

    localStorage.setItem("cookiesConsent", "accepted");
    setShowCookieModal(false);
};

  const handleCookieDeny = () => {
    localStorage.setItem("cookiesConsent", "denied");
    Cookies.remove('userId');
    setShowCookieModal(false);
  };

  return (
    <>
      <OtherPageNavbar />
      {loading && (
        <div className="loading-backdrop">
          <div className="loading-box">
            <div className="loading-spinner"></div>
            <div className="loading-text">
              Loading data, this will just take a moment...
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <>
          <FormFields
            handleImageChange={(e) =>
              handleImageChange(formData, id, e, setImage)
            }
            image={image}
            formData={formData}
            formChangeHandler={(e) =>
              formChangeHandler(e, setFormData, formData)
            }
            setFormData={setFormData}
            id={id}
            setImage={setImage}
            userId={userId}
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
          {showCookieModal && (
            <AcceptCookiesModal
              showModal={showCookieModal}
              handleDeny={handleCookieDeny}
              handleAccept={handleCookieAccept}
            />
          )}
        </>
      )}
    </>
  );
};

export default Form;
