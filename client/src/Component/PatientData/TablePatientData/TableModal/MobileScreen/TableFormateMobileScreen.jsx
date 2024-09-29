/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";
import Pagination from "../../../Pagination/Pagination";
import "./TableFormateMobile.css";
const TableFormateMobileScreen = ({
  patients,
  editHandler,
  printHandler,
  deleteHandler,
  printRef,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = patients.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(patients.length / recordsPerPage);
  const numbers = [...Array(numberOfPages).keys()].map((n) => n + 1);
  const startIndex = (currentPage - 1) * recordsPerPage;

  return (
    <>
      <div ref={printRef} className="table-responsive">
        {records.map((patient, index) => (
          <div
            key={patient._id}
            className="patient-card mb-4 p-3 border rounded"
          >
            <h5 className="text-center">Patient Details</h5>
            <div className="d-flex justify-content-around mt-3">
              <FaEdit
                className="icon edit"
                onClick={() => editHandler(patient._id)}
              />
              
              <FaPrint
                className="icon print"
                onClick={() => printHandler(patient)}
              />
              <MdDelete
                className="icon delete"
                onClick={() => deleteHandler(patient._id)}
              />
            </div>
            {/* personal details */}
            <div className="patient-row">
              <strong>Image:</strong>
              {patient.ImageUrl && (
                <img
                  src={patient.ImageUrl}
                  height="50px"
                  width="50px"
                  alt="patient image"
                />
              )}
            </div>
            <div className="patient-row">
              <strong>Sr No:</strong>
              <span>{startIndex + index + 1}</span>
            </div>
            <div className="patient-row">
              <strong>Name:</strong>
              <span>{patient.Name}</span>
            </div>
            <div className="patient-row">
              <strong>Father's Name:</strong>
              <span>{patient.FatherName}</span>
            </div>
            <div className="patient-row">
              <strong>Address:</strong>
              <span>{patient.Address}</span>
            </div>
            <div className="patient-row">
              <strong>Language Known:</strong>
              <span>{patient.LanguageKnown}</span>
            </div>{" "}
            <div className="patient-row">
              <strong>Aadhar Number:</strong>
              <span>{patient.AadharNumber}</span>
            </div>
            <div className="patient-row">
              <strong>Gender:</strong>
              <span>{patient.Gender}</span>
            </div>
            {/* ngo details  */}
            <div className="patient-row">
              <strong>Registration No:</strong>
              <span>{patient.RegistrationNo}</span>
            </div>
            <div className="patient-row">
              <strong>Registration Date:</strong>
              <span>{patient.RegistrationDate}</span>
            </div>
            <div className="patient-row">
              <strong>Mean of Transportation:</strong>
              <span>{patient.MeanOfTransportation}</span>
            </div>
            <div className="patient-row">
              <strong>Patient Condition:</strong>
              <span>{patient.PatientCondition}</span>
            </div>
            <div className="patient-row">
              <strong>Hospital & Department:</strong>
              <span>{patient.Gender}</span>
            </div>
            <div className="patient-row">
              <strong>Anandam Center:</strong>
              <span>{patient.AnandamCenter}</span>
            </div>
            <div className="patient-row">
              <strong>Sent To Home:</strong>
              <span>{patient.SentToHome}</span>
            </div>
            <div className="patient-row">
              <strong>OPD:</strong>
              <span>{patient.OPD}</span>
            </div>
            <div className="patient-row">
              <strong>Inmate Number:</strong>
              <span>{patient.InmateNumber}</span>
            </div>
            <div className="patient-row">
              <strong>Brought By:</strong>
              <span>{`
              ${patient.BroughtBy?.Name || "Not Mention"},
              ${patient.BroughtBy?.Address || "Not Mention"},
              ${patient.BroughtBy?.MobileNumber || "Not Mention"},
              ${patient.BroughtBy?.Aadhar || "Not Mention"},
              `}</span>
            </div>
            <div className="patient-row">
              <strong>IO Number:</strong>
              <span>{patient.IONumber}</span>
            </div>
            <div className="patient-row">
              <strong>IO Name:</strong>
              <span>{patient.IOName}</span>
            </div>
            <div className="patient-row">
              <strong>Uploaded Documents:</strong>
              {patient.PatientsDocuments &&
              patient.PatientsDocuments.length > 0 ? (
                patient.PatientsDocuments.map((doc, docIndex) => (
                  <div key={docIndex}>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      {doc.name}
                    </a>
                  </div>
                ))
              ) : (
                <p>No documents uploaded.</p> // Optional: Display a message if no documents are available
              )}
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        numbers={numbers}
      />
    </>
  );
};
export default TableFormateMobileScreen;
