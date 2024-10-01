/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import ImageWithModal from "../../ImageWithModal/ImageWithModal";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";
import { useState } from "react";
const SubrowFullScreen = ({ personalDetails, ngoDetails }) => {
  const [messageVisible, setMessageVisible] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setMessageVisible(true);
        setTimeout(() => {
          setMessageVisible(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {personalDetails && (
        <div className="subrow-section">
          <h4>Personal Details</h4>
          <table className="subrow-table">
            <thead>
              <tr>
                <th>Image of Patient</th>
                <th>Name</th>
                <th>Father's Name</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Language Known</th>
                <th>Aadhar Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {personalDetails.ImageUrl ? (
                    <ImageWithModal
                      imageUrl={personalDetails.ImageUrl}
                      showIcon={false}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{personalDetails.Name}</td>
                <td>{personalDetails.FatherName}</td>
                <td>{personalDetails.Gender}</td>
                <td>{personalDetails.Address}</td>
                <td>{personalDetails.LanguageKnown}</td>
                <td>{personalDetails.AadharNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {ngoDetails && (
        <div className="subrow-section">
          <h4>NGO Details</h4>
          <table className="subrow-table">
            <thead>
              <tr>
                <th>Registration No</th>
                <th>Registration Date</th>
                <th>Mean Of Transportation</th>
                <th>Patient Condition</th>
                <th>Hospital Department</th>
                <th>Anandam Center</th>
                <th>Sent To Home</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ngoDetails.RegistrationNo}</td>
                <td>{ngoDetails.RegistrationDate}</td>
                <td>{ngoDetails.MeanOfTransportation}</td>
                <td>{ngoDetails.PatientCondition}</td>
                <td>{ngoDetails.HospitalDepartment}</td>
                <td>{ngoDetails.AnandamCenter}</td>
                <td>{ngoDetails.SentToHome}</td>
              </tr>
            </tbody>
          </table>

          <table className="subrow-table">
            <thead>
              <tr>
                <th>OPD</th>
                <th>Inmate Number</th>
                <th>IO Name</th>
                <th>IO Number</th>
                <th>Patients Documents</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ngoDetails.OPD}</td>
                <td>{ngoDetails.InmateNumber}</td>
                <td>{ngoDetails.IOName}</td>
                <td>{ngoDetails.IONumber}</td>
                <td>
                  {ngoDetails.PatientsDocuments.length > 0
                    ? ngoDetails.PatientsDocuments.map((doc, docIndex) => (
                        <div key={docIndex}>
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {doc.name}
                          </a>
                        </div>
                      ))
                    : "No Documents"}
                </td>
              </tr>
            </tbody>
          </table>

          {ngoDetails.BroughtBy && (
            <div className="subrow-section">
              <h5>Brought By Details</h5>
              <table className="subrow-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Mobile</th>
                    <th>Aadhar Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{ngoDetails.BroughtBy.Name}</td>
                    <td>
                      <div className="icon-container">
                        <span>{ngoDetails.BroughtBy.Address}</span>

                        {/* /search is for the endpoint to the google map
                      2. api=1 means it tells to google map that request is coming from an api instead of normal browser search
                      3. ? is used for as a delimeter which separate the base url from the query parameter
                      4. &query that specifies a search term or parameter that the server should process.
                      5.  encodeURIComponent this is used for passing the certain charaters with their corresponding utf-8 encoded */}
                        {/* {console.log(encodeURIComponent(ngoDetails.BroughtBy.Address))} */}

                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            ngoDetails.BroughtBy.Address
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon location-icon"
                        >
                          <FaLocationDot />
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="icon-container">
                        <span>{ngoDetails.BroughtBy.Mobile}</span>
                        <FaRegCopy
                          className="icon copy-icon"
                          onClick={() => {
                            copyToClipboard(ngoDetails.BroughtBy.Mobile);
                            setMessageVisible(true);
                          }}
                        />
                        {/* `${} is a template literals also called template stirngs..make it esier to construct dynamic string... */}
                        <a
                          href={`https://web.whatsapp.com/send?phone=${ngoDetails.BroughtBy.Mobile}&text=नमस्ते, हम सपना ngo की तरफ से मैसेज कर रहे है`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon whatsapp-icon"
                        >
                          <BsWhatsapp />
                        </a>
                      </div>
                    </td>
                    <td>{ngoDetails.BroughtBy.Aadhar}</td>
                  </tr>
                </tbody>
              </table>
              {messageVisible && (
                <span
                  style={{
                    marginLeft: "50rem",
                    marginTop: "1rem",
                    color: "green",
                  }}
                >
                  Phone number copied!
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubrowFullScreen;
