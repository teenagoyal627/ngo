import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import OtherPageNavbar from "../../Navbar/OtherPageNavbar";
import FilterData from "../Filter/Filter";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PrintParticularPatient from "../TablePatientData/PrintModal/PrintParticularPatient";
import "./Loading.css";
import "./PatientData.css";
import {
  closeModal,
  deleteHandler,
  editHandler,
  printHandler,
} from "../Utilities/PatientDataUtilities";
import TableFormateMobileScreen from "../TablePatientData/TableModal/MobileScreen/TableFormateMobileScreen";
import TableFormateFullScreen from "../TablePatientData/TableModal/FullScreen/TableFormateFullScreen";
import Searchbox from "../SearchBox/Searchbox";

const AllPatientDetails = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [userId, setUserId] = useState(null);
  const history = useHistory();
  const printTableRef = useRef(null);
  const auth = getAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        document.cookie = `userId=${user.uid};path=/; max-age=86400; SameSite=None; Secure`;
      } else {
        console.log("error in storeing the cookies");
      }
      setUserId(user.uid);
    });
    const apiUrl = import.meta.env.VITE_SERVER_URL;

    if (userId) {
      axios
        .get(`${apiUrl}/data`, {
          params: { userId },
        })

        .then((response) => {
          setPatients(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }

    return () => unsubscribe;
  }, [auth, userId]);

  return (
    <>
      <OtherPageNavbar />
      {loading && (
        <div className="loading-backdrop">
          <div className="loading-box">
            <div className="loading-spinner"></div>
            <div className="loading-text">Please wait, data is loading...</div>
          </div>
        </div>
      )}
      {!loading && patients.length > 0 && (
        <>
          <div className="header-container">
            <h2 className="header-title">Patient Details</h2>
            <div className="button-container">
              <FilterData patients={patients} setPatients={setPatients} />
            </div>
          </div>
<div>
  <Searchbox/>
</div>
          {isMobile ? (
            <TableFormateMobileScreen
              patients={patients}
              editHandler={(id) => editHandler(id, history)}
              printHandler={(patient) =>
                printHandler(patient, setSelectedPatient, setShowModal)
              }
              deleteHandler={(id) => deleteHandler(id, setPatients)}
              printRef={printTableRef}
            />
          ) : (
            <TableFormateFullScreen
              patients={patients}
              editHandler={(id) => editHandler(id, history)}
              printHandler={(patient) =>
                printHandler(patient, setSelectedPatient, setShowModal)
              }
              deleteHandler={(id) => deleteHandler(id, setPatients)}
              printRef={printTableRef}
            />
          )}

          <PrintParticularPatient
            selectedPatient={selectedPatient}
            closeModal={() => closeModal(setShowModal, setSelectedPatient)}
            showModal={showModal}
          />
        </>
      )}
    </>
  );
};

export default AllPatientDetails;
