/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import Card from '../../../UI/Card';
import './PersonalDetails.css'
import patientAvatar from "./patientAvatar.png"; // Assuming the avatar is saved in the root or 'images' folder

const PersonalDetails = ({
  handleImageChange,
  image,
  formData,
  formChangeHandler,
}) => {
  return (
    <Card>
      <h2 className='personal-details-heading'>Personal Details</h2>
      <div className='personalForm'>
        <div className="leftSide-section">
          <div className="image-upload-box">
          <label className='labelHeading'>Patient Image</label>
            <input
              type="file"
              accept="image/*"
              name="ImageUrl"
              id="imageUpload"
              onChange={handleImageChange}
              style={{ display: "none" }} // Hide the default input
            />
            <label htmlFor="imageUpload" className="upload-button">
              <img
                src={image || patientAvatar} // Use default avatar if no image
                alt="Patient"
                className="image-preview"
                style={{cursor:'pointer'}}
                // style={{width:"20rem", height:"20rem"}}
              />
              <div className="overlay">
                <h2 className="upload-button-text">
                 { image ? "Edit Image" : "Upload Image"}
                </h2>
              </div>
            </label>
          </div>
        </div>

        <div className="right-section">
          <div className="form-row">
            <div className="form-column">
              <label>Name</label>
              <input
                type="text"
                // //="Patient Name"
                name="Name"
                value={formData.Name}
                onChange={formChangeHandler}
                style={{width:"18rem"}}
              />
            </div>
            <div className="form-column">
              <label>Father's Name</label>
              <input
                type="text"
                //="Father's Name"
                name="FatherName"
                value={formData.FatherName}
                onChange={formChangeHandler}
                style={{width:"18rem"}}

              />
            </div>
           
          </div>

          <div className="form-row">
            <div className="form-column">
              <label>Address</label>
              <input
                type="text"
                //="Enter the address"
                name="Address"
                value={formData.Address}
                onChange={formChangeHandler}
                style={{width:"18rem"}}

              />
            </div>
            <div className="form-column">
              <label>Language known</label>
              <input
                type="text"
                //="Enter the known language of the patient"
                name="LanguageKnown"
                value={formData.LanguageKnown}
                onChange={formChangeHandler}
                style={{width:"18rem"}}

              />
            </div>
           
          </div>
          <div className="form-row">
         
            <div className="form-column">
              <label>Aadhar number</label>
              <input
                type="text"
                //="Enter Aadhar number"
                name="AadharNumber"
                value={formData.AadharNumber}
                onChange={formChangeHandler}
                style={{width:"18rem"}}

              />
            </div>
            <div className="form-column">
              <label>Gender</label>
              <select
                name="Gender"
                value={formData.Gender}
                onChange={formChangeHandler}
                style={{cursor:'pointer',height:"2.7rem",marginTop:".5rem"}}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PersonalDetails;



