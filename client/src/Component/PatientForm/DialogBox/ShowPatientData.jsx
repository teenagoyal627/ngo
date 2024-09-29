/* eslint-disable no-unused-vars */

// const ShowPatientData = ({selectedPatient}) => {
//   return (
//     <div
//     className="modal fade show"
//     style={{
//       display: "block",
//       margin: "0",
//       padding: "0",
//       boxSizing: "border-box",
//     }}
//     id="exampleModal"
//     tabIndex="-1"
//     aria-labelledby="exampleModalLabel"
//     aria-hidden="true"
//   >
//     <div className="modal-dialog">
//       <div
//         className="modal-content print-modal-content"
//         style={{
//           position: "absolute",
//           left: "0",
//           top: "0",
//           width: "210mm",
//           minHeight: "297mm",
//           boxSizing: "border-box",
//           background: "white",
//         }}
//       >
//         <div className="modal-header">
//           <img src={SapnaLogo} alt="logo of ngo" className="logo-image1" />
//           <h1 className="modal-title fs-5" id="exampleModalLabel">
//             Aandam-Home for the homeless (
//             {selectedPatient.AnandamCenter
//               ? selectedPatient.AnandamCenter
//               : "No "}
//             )
//           </h1>
//           <button
//             type="button"
//             className="btn-close"
//             onClick={closeModal}
//             aria-label="Close"
//           ></button>
//         </div>
//         <div className="modal-body print-body" id="printable-content">
//           <table className="print-table">
//             <tbody>
//               <tr>
//                 <td>Patient Image</td>
//                 <td>
//                   {selectedPatient.ImageUrl ? (
//                     <img
//                       src={selectedPatient.ImageUrl}
//                       alt="Patient"
//                       style={{ width: "100px", height: "100px" }}
//                     />
//                   ) : (
//                     "No Image Available"
//                   )}
//                 </td>
//               </tr>
//               <tr>
//                 <td>Registration No:</td>
//                 <td>{selectedPatient.RegistrationNo}</td>
//               </tr>
//               <tr>
//                 <td>Name:</td>
//                 <td>{selectedPatient.Name}</td>
//               </tr>
//               <tr>
//                 <td>Father's Name:</td>
//                 <td>{selectedPatient.FatherName}</td>
//               </tr>
//               <tr>
//                 <td>Gender:</td>
//                 <td>{selectedPatient.Gender}</td>
//               </tr>
//               <tr>
//                 <td>Address:</td>
//                 <td>{selectedPatient.Address}</td>
//               </tr>
//               <tr>
//                 <td>Registration Date:</td>
//                 <td>{selectedPatient.RegistrationDate}</td>
//               </tr>
//               <tr>
//                 <td>Mean of Transportation:</td>
//                 <td>{selectedPatient.MeanOfTransportation}</td>
//               </tr>
//               <tr>
//                 <td>Brought By:</td>
//                 <td>{`${selectedPatient.BroughtBy?.Name || "..."}, ${
//                   selectedPatient.BroughtBy?.Address || "..."
//                 }, ${selectedPatient.BroughtBy?.MobileNumber || "..."}, ${
//                   selectedPatient.BroughtBy?.Aadhar || "..."
//                 }`}</td>
//               </tr>
//               <tr>
//                 <td>Patient Condition:</td>
//                 <td>{selectedPatient.PatientCondition}</td>
//               </tr>
//               <tr>
//                 <td>Language Known:</td>
//                 <td>{selectedPatient.LanguageKnown}</td>
//               </tr>
//               <tr>
//                 <td>Hospital Department:</td>
//                 <td>{selectedPatient.HospitalDepartment}</td>
//               </tr>
//               <tr>
//                 <td>Anandam Center: </td>
//                 <td>{selectedPatient.AnandamCenter}</td>
//               </tr>
//               <tr>
//                 <td>Sent to Home:</td>
//                 <td>{selectedPatient.SentToHome}</td>
//               </tr>
//               <tr>
//                 <td>OPD:</td>
//                 <td>{selectedPatient.OPD}</td>
//               </tr>
//               <tr>
//                 <td>Inmate Number:</td>
//                 <td>{selectedPatient.InmateNumber}</td>
//               </tr>
//               <tr>
//                 <td>IO Number:</td>
//                 <td>{selectedPatient.IONumber}</td>
//               </tr>
//               <tr>
//                 <td>IO Name:</td>
//                 <td>{selectedPatient.IOName}</td>
//               </tr>
//               <tr>
//                 <td>Aadhar Number:</td>
//                 <td>{selectedPatient.AadharNumber}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <div className="modal-footer">
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={closeModal}
//           >
//             Close
//           </button>
//           <button
//             type="button"
//             className="btn btn-primary"
//             onClick={handlePrint}
//           >
//             Print
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// }

// export default ShowPatientData




import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ShowPatientData = () => {
  const { id } = useParams();
  const [patientData, setPatientData] = useState(null);
  const apiUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    if (id) {
      axios
        .get(`${apiUrl}/patient/${id}`)
        .then((response) => {
          setPatientData(response.data || {});
        })
        .catch((error) => {
          console.error(`Error fetching patient data: ${error.message}`);
        });
    }
  }, [id, apiUrl]);

  if (!patientData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Patient Details</h1>
      <p>Name: {patientData.Name}</p>
      <p>Registration No: {patientData.RegistrationNo}</p>
      {/* Render other patient details here */}
      {patientData.ImageUrl && (
        <img src={patientData.ImageUrl} alt="Patient" style={{ width: '100px', height: '100px' }} />
      )}
    </div>
  );
};

export default ShowPatientData;
