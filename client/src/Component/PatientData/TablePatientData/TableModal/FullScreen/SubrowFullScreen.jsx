/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import ImageWithModal from '../../ImageWithModal/ImageWithModal'
const SubrowFullScreen = ({personalDetails,ngoDetails}) => {
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
                    <th>Brought By</th>
                    <th>IO Name</th>
                    <th>IO Number</th>
                    <th>Patients Documents</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{ngoDetails.OPD}</td>
                    <td>{ngoDetails.InmateNumber}</td>
                    <td>{ngoDetails.BroughtBy}</td>
                    <td>{ngoDetails.IOName}</td>
                    <td>{ngoDetails.IONumber}</td>
                    <td>
                    {console.log(ngoDetails.PatientsDocuments)}
                      {ngoDetails.PatientsDocuments.length > 0
                      
                        ? ngoDetails.PatientsDocuments.map(
                            (doc, docIndex) => (
                              <div key={docIndex}>
                              {console.log(doc.name)}
                                <a
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {doc.name}
                                </a>
                              </div>
                            )
                          )
                        : "No Documents"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
  </div>
  )
}

export default SubrowFullScreen
