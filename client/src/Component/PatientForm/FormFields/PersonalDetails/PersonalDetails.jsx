import './PersonalDetails.css'
import patientAvatar from "./patientAvatar.png"; // Assuming the avatar is saved in the root or 'images' folder

const PersonalDetails = ({
  handleImageChange,
  image,
  formData,
  formChangeHandler,
}) => {
  return (
    <div className="personal-detail-form" >
      <h2 className='personal-details-heading' style={{textAlign:"center"}}>Personal Details</h2>

      <div className='personalForm'>

        <div className="leftSide-section">
          <div className="image-upload-box">
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
                style={{width:"20rem", height:"20rem"}}
              />
              <div className="overlay">
                <h2 className="upload-button-text">
                  Upload Image
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
                placeholder="Enter patient name"
                name="Name"
                value={formData.Name}
                onChange={formChangeHandler}
                style={{width:"28rem"}}
              />
            </div>
            <div className="form-column">
              <label>Father's Name</label>
              <input
                type="text"
                placeholder="Enter father's name"
                name="FatherName"
                value={formData.FatherName}
                onChange={formChangeHandler}
                style={{width:"28rem"}}

              />
            </div>
           
          </div>

          <div className="form-row">
            <div className="form-column">
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter the address"
                name="Address"
                value={formData.Address}
                onChange={formChangeHandler}
                style={{width:"28rem"}}

              />
            </div>
            <div className="form-column">
              <label>Language known</label>
              <input
                type="text"
                placeholder="Enter the known language of the patient"
                name="LanguageKnown"
                value={formData.LanguageKnown}
                onChange={formChangeHandler}
                style={{width:"28rem"}}

              />
            </div>
           
          </div>
          <div className="form-row">
         
            <div className="form-column">
              <label>Aadhar number</label>
              <input
                type="text"
                placeholder="Enter Aadhar number"
                name="AadharNumber"
                value={formData.AadharNumber}
                onChange={formChangeHandler}
                style={{width:"28rem"}}

              />
            </div>
            <div className="form-column">
              <label>Gender</label>
              <select
                name="Gender"
                value={formData.Gender}
                onChange={formChangeHandler}
                style={{height:"2.7rem",marginTop:".5rem"}}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;



