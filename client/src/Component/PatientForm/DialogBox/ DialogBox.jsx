import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { MessageBox } from "../../MessageBox";
import { dialogBoxSubmitHandler, dialogBoxConfirm } from "./UtilitiesDialogBox";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import "./DialogBox.css";
import documentIcon from "./documentIcon.jpeg";
import '../../PatientData/MainPage/Loading.css'
// this code is for check that cookies are get or not means userid is stored in cookies or not......
// const getCookies = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) {
//     return parts.pop().split(";").shift();
//   }
//   return null;
// };

function DialogBox({ formData, setFormData, id, image }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });

  const [documents, setDocuments] = useState([]);
  const [userId, setUserId] = useState(null);
  const [fileInputEvent, setFileInputEvent] = useState(null);
 const[loading,setLoading]=useState(false)
  const history = useHistory();
  const auth = getAuth();

  const apiUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    //this is for fetch the documents if id is present
    if (id) {
      axios
        .get(`${apiUrl}/data/${id}`)
        .then((response) => {
          if (response.data.PatientsDocuments) {
            setDocuments(response.data.PatientsDocuments);
          }
        })
        .catch((error) => {
          setModalContent({
            title: "Error",
            body: `Error fetching patient data:${error.message}`,
          });
          setShowModal(true);
        });
    }

    //this is for store the userid in the cookies..
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        document.cookie = `userId=${user.uid};path=/; max-age=86400 ; SameSite=None; Secure`;
        setUserId(user.uid);
      } else {
        history.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [apiUrl, auth, history, id]);

  const handleDocumentChange = (e) => {
    setFileInputEvent(e);

    const files = Array.from(e.target.files);
    const fileDetails = files.map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      type: file.type,
      file: file,
      previewUrl: URL.createObjectURL(file)
    }));
    setDocuments(fileDetails);
  };

  const handleRemoveDocument = (indexToRemove) => {
    setDocuments((prevDocuments) =>
      prevDocuments.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await dialogBoxSubmitHandler(
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
    );
  };

  return (
    <React.Fragment>
    {loading && (
  <div className="loading-backdrop">
    <div className="loading-box">
      <div className="loading-spinner"></div>
      <div className="loading-text">Please wait, data is being submitted...</div>
    </div>
  </div>
)}
      <div className="upload-container">
        <label htmlFor="fileUpload" className="upload-label">
          Upload Documents
        </label>
        <div className="file-upload-box">
          <input
            type="file"
            id="fileUpload"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleDocumentChange}
            className="file-input"
          />
          <label htmlFor="fileUpload" className="file-upload-button">
            Choose Files
          </label>
        </div>
      </div>
      {documents.length > 0 && (
        <div>
          <label>Uploaded Documents</label>
          <ul className="documents-container">
            {documents.map((doc, index) => (
              <li key={index} className="document-preview">
                <div className="document-row">
                  <img src={documentIcon} alt="" />
                  <a href={doc} target="_blank" rel="noopener noreferrer">
                    {doc.name}
                  </a>
                </div>
                <div className="document-info">
                  <span className="file-size">{doc.size}</span>
                  <span
                    className="delete-icon"
                    onClick={() => handleRemoveDocument(index)}
                  >
                    <MdDeleteOutline />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="submitButton" onClick={handleClick}>
        Submit
      </button>

      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={(e) =>
          dialogBoxConfirm(setShowModal, modalContent, history, setFormData, e,id,formData)
        }
        title={modalContent.title}
        body={modalContent.body}
      />
    </React.Fragment>
  );
}

export default DialogBox;
