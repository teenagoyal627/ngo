import  { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./PatientData.css";
import OtherPageNavbar from "../../Navbar/OtherPageNavbar";
import {
  closeModal,
  deleteHandler,
  editHandler,
  printHandler,
} from "../Utilities/PatientDataUtilities";
import TableFormate from "../TablePatientData/TableFormate";
import PrintParticularPatient from "../TablePatientData/PrintParticularPatient";
import FilterData from "../Filter/Filter";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PrintAllPatients from "../TablePatientData/PrintAllPatients";
import './Loading.css'
const AllPatientDetails = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const[loading,setLoading]=useState(true)

const[userId,setUserId]=useState(null)
  const history = useHistory();
  const printTableRef=useRef(null)
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe=onAuthStateChanged(auth,(user)=>{
      if(user){
        document.cookie = `userId=${user.uid};path=/; max-age=86400; SameSite=None; Secure`;
      }
      else{
        console.log("error in storeing the cookies")
      }
      setUserId(user.uid)
    })
    const apiUrl = import.meta.env.VITE_SERVER_URL;

    if (userId) {
      axios
        .get(`${apiUrl}/data`, {
          params: { userId },
        })

        .then((response) => {
          setPatients(response.data);
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false)
        });
    }
   
    return()=>unsubscribe

  }, [auth,userId]);

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
              <PrintAllPatients printTableRef={printTableRef} />
            </div>
          </div>

{console.log(showModal)}
          <TableFormate
            patients={patients}
            editHandler={(id) => editHandler(id, history)}
            printHandler={(patient) =>
              printHandler(patient, setSelectedPatient, setShowModal)
            }
            deleteHandler={(id) => deleteHandler(id, setPatients)}
            printRef={printTableRef}
          />
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
