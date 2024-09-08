// import React from "react";
// import "./Form.css";
// import DialogBox from "../DialogBox/ DialogBox";

// const FormFields = ({
//   handleImageChange,
//   image,
//   formData,
//   formChangeHandler,
//   setFormData,
//   id,
// }) => {
//   return (
//     <div>
//     <div className="form-container">
//       <div className="top-section">
        
//         <div className="image-upload-section">
//           <div className="image-upload-box">
//             <input
//               type="file"
//               accept="image/*"
//               name="ImageUrl"
//               onChange={handleImageChange}
//             />
//             {!image && (
//               <div className="upload-placeholder">
//                 Upload the image of patient
//               </div>
//             )}
//             {image && (
//               <img
//                 src={image}
//                 alt="Patient Preview"
//                 className="image-preview"
//                 style={{ width: "200px", height: "200px" }}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//       <br />
//       <form> 
//       <h2 style={{textAlign:"center"}}>Personal Details</h2>
        

      
//         <label>Name</label>
//         <input 
//         style={{width:"25rem"}}
//           type="text"
//           placeholder="Enter patient name"
//           name="Name"
//           value={formData.Name}
//           onChange={formChangeHandler}
//         />
//         <label>Father's Name</label>
//         <input
//           type="text"
//           placeholder="Enter father name"
//           name="FatherName"
//           value={formData.FatherName}
//           onChange={formChangeHandler}
//         />
//         <label>Gender</label>
//         <select
//           name="Gender"
//           value={formData.Gender}
//           onChange={formChangeHandler}
//         >
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//         </select>
//         <label>Address</label>
//         <input
//           type="text"
//           placeholder="Enter the address"
//           name="Address"
//           value={formData.Address}
//           onChange={formChangeHandler}
//         />
       
//         <label>Language known</label>
//         <input
//           type="text"
//           placeholder="Enter the known language of patient"
//           name="LanguageKnown"
//           value={formData.LanguageKnown}
//           onChange={formChangeHandler}
//         />
       
//         <label>Aadhar number</label>
//         <input
//           type="text"
//           placeholder="If aadhar available then upload the aadhar number"
//           name="AadharNumber"
//           value={formData.AadharNumber}
//           onChange={formChangeHandler}
//         />

//         <DialogBox
//           formData={formData}
//           setFormData={setFormData}
//           id={id}
//           image={image}
//         />
//       </form>
//     </div>
//     <div className="form-container">

//     <form>
//       <h2 style={{textAlign:"center"}}>NGO Details</h2>
//         <label>Registration No.</label>
//         <input
//           type="number"
//           placeholder="Enter registration no."
//           required
//           name="RegistrationNo"
//           value={formData.RegistrationNo}
//           onChange={formChangeHandler}
//         />
       
//         <label>Registration Date</label>
//         <input
//           type="date"
//           placeholder="Enter the registration date"
//           name="RegistrationDate"
//           value={formData.RegistrationDate}
//           onChange={formChangeHandler}
//         />
//         <label>Mean of Transportation</label>
//         <input
//           type="text"
//           placeholder="Enter mean of transport"
//           name="MeanOfTransportation"
//           value={formData.MeanOfTransportation}
//           onChange={formChangeHandler}
//         />

//         <fieldset className="form-group">
//           <label>Brought By</label>
//           <div className="brought-by-container">
//             <input
//               style={{
//                 display: "flex",
//                 width: "48%",
//                 flexWrap: "wrap",
//                 gap: "10px",
//               }}
//               type="text"
//               name="BroughtBy.Name"
//               placeholder="Enter name of person"
//               value={formData.BroughtBy.Name}
//               onChange={formChangeHandler}
//             />
//             <input
//               style={{
//                 display: "flex",
//                 width: "48%",
//                 flexWrap: "wrap",
//                 gap: "10px",
//               }}
//               type="text"
//               name="BroughtBy.Address"
//               placeholder="Enter address of person"
//               value={formData.BroughtBy.Address}
//               onChange={formChangeHandler}
//             />
//             <input
//               style={{
//                 display: "flex",
//                 width: "48%",
//                 flexWrap: "wrap",
//                 gap: "10px",
//               }}
//               type="text"
//               name="BroughtBy.MobileNumber"
//               placeholder="Enter mobile number of person"
//               value={formData.BroughtBy.MobileNumber}
//               onChange={formChangeHandler}
//             />
//             <input
//               style={{
//                 display: "flex",
//                 width: "48%",
//                 flexWrap: "wrap",
//                 gap: "10px",
//               }}
//               type="text"
//               name="BroughtBy.Aadhar"
//               placeholder="Enter Aadhar of person"
//               value={formData.BroughtBy.Aadhar}
//               onChange={formChangeHandler}
//             />
//           </div>
//         </fieldset>

//         <label>Patient Condition</label>
//         <input
//           type="text"
//           placeholder="Enter condition of patient"
//           name="PatientCondition"
//           value={formData.PatientCondition}
//           onChange={formChangeHandler}
//         />
      
//         <label>Hospital & Department</label>
//         <select
//           name="HospitalDepartment"
//           value={formData.HospitalDepartment}
//           onChange={formChangeHandler}
//         >
//           <option value="">Hospital & Department</option>
//           <option value="Safdarjung Hospital">Safdarjung Hospital</option>
//           <option value="AIIMS">AIIMS</option>
//           <option value="JPNATC">JPNATC</option>
//           <option value="RML">RML</option>
//           <option value="Rajiv Gandhi Govt.Hospital, Alwar">
//             Rajiv Gandhi Govt.Hospital, Alwar
//           </option>
//           <option value="Road side">Road side</option>
//         </select>
//         <label>Aandam Center</label>
//         <select
//           name="AnandamCenter"
//           value={formData.AnandamCenter}
//           onChange={formChangeHandler}
//         >
//           <option value="">Select Aandam Center</option>
//           <option value="Noida">Noida</option>
//           <option value="Kaduki">Kaduki</option>
//           <option value="Vijay Mandir">Vijay Mandir</option>
//           <option value="Dadikar">Dadikar</option>
//         </select>
//         <label>Sent to Home</label>
//         <input
//           type="date"
//           placeholder="Enter sent to home date"
//           name="SentToHome"
//           value={formData.SentToHome}
//           onChange={formChangeHandler}
//         />
//         <label>OPD</label>
//         <input
//           type="text"
//           placeholder="Enter opd"
//           name="OPD"
//           value={formData.OPD}
//           onChange={formChangeHandler}
//         />
//         <label>Inmate Number</label>
//         <input
//           type="number"
//           placeholder="Enter room number"
//           name="InmateNumber"
//           value={formData.InmateNumber}
//           onChange={formChangeHandler}
//         />
//         <label>IO Number</label>
//         <input
//           type="number"
//           placeholder="Enter IO number"
//           name="IONumber"
//           value={formData.IONumber}
//           onChange={formChangeHandler}
//         />
//         <label>IO Name</label>
//         <input
//           type="text"
//           placeholder="Enter IO name"
//           name="IOName"
//           value={formData.IOName}
//           onChange={formChangeHandler}
//         />
       
//         <DialogBox
//           formData={formData}
//           setFormData={setFormData}
//           id={id}
//           image={image}
//         />
//       </form>
//     </div>
//     </div>
//   );
// };

// export default FormFields;



import './Form.css'
import DialogBox from "../DialogBox/ DialogBox";

const FormFields = ({
  handleImageChange,
  image,
  formData,
  formChangeHandler,
  setFormData,
  id,
}) => {
  return (
   <div>
    <div className="form-container">
      <div className="top-section">
        <div className="image-upload-section">
          <div className="image-upload-box">
            <input
              type="file"
              accept="image/*"
              name="ImageUrl"
              onChange={handleImageChange}
            />
            {!image && (
              <div className="upload-placeholder">
                Upload the image of the patient
              </div>
            )}
            {image && (
              <img
                src={image}
                alt="Patient Preview"
                className="image-preview"
                style={{ width: "200px", height: "200px" }}
              />
            )}
          </div>
        </div>
      </div>
      <br />
      <form>
        <h2 style={{ textAlign: "center" }}>Personal Details</h2>

        <div className="form-row">
          <div className="form-column">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter patient name"
              name="Name"
              value={formData.Name}
              onChange={formChangeHandler}
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
            />
          </div>
          <div className="form-column">
            <label>Gender</label>
            <select
              name="Gender"
              value={formData.Gender}
              onChange={formChangeHandler}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
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
            />
          </div>
          <div className="form-column">
            <label>Aadhar number</label>
            <input
              type="text"
              placeholder="Enter Aadhar number"
              name="AadharNumber"
              value={formData.AadharNumber}
              onChange={formChangeHandler}
            />
          </div>
        </div>

        
      </form>

     
    </div>

    <div className="form-container">
    <form>
        <h2 style={{ textAlign: "center" }}>NGO Details</h2>

        <div className="form-row">
    <div className="form-column">
      <label>Registration No.</label>
      <input
        type="number"
        placeholder="Enter registration no."
        required
        name="RegistrationNo"
        value={formData.RegistrationNo}
        onChange={formChangeHandler}
      />
    </div>
    <div className="form-column">
      <label>Registration Date</label>
      <input
        type="date"
        placeholder="Enter the registration date"
        name="RegistrationDate"
        value={formData.RegistrationDate}
        onChange={formChangeHandler}
      />
    </div>
    <div className="form-column">
      <label>Mean of Transportation</label>
      <input
        type="text"
        placeholder="Enter mean of transport"
        name="MeanOfTransportation"
        value={formData.MeanOfTransportation}
        onChange={formChangeHandler}
      />
    </div>
  </div>

  <div className="form-row">
   
    <div className="form-column">
      <label>Patient Condition</label>
      <input
        type="text"
        placeholder="Enter condition of patient"
        name="PatientCondition"
        value={formData.PatientCondition}
        onChange={formChangeHandler}
      />
    </div>
    <div className="form-column">
      <label>Hospital & Department</label>
      <select
        name="HospitalDepartment"
        value={formData.HospitalDepartment}
        onChange={formChangeHandler}
      >
        <option value="">Hospital & Department</option>
        <option value="Safdarjung Hospital">Safdarjung Hospital</option>
        <option value="AIIMS">AIIMS</option>
        <option value="JPNATC">JPNATC</option>
        <option value="RML">RML</option>
        <option value="Rajiv Gandhi Govt.Hospital, Alwar">
          Rajiv Gandhi Govt.Hospital, Alwar
        </option>
        <option value="Road side">Road side</option>
      </select>
    </div>

    <div className="form-column">
      <label>Anandam Center</label>
      <select
        name="AnandamCenter"
        value={formData.AnandamCenter}
        onChange={formChangeHandler}
      >
        <option value="">Select Anandam Center</option>
        <option value="Noida">Noida</option>
        <option value="Kaduki">Kaduki</option>
        <option value="Vijay Mandir">Vijay Mandir</option>
        <option value="Dadikar">Dadikar</option>
      </select>
    </div>
  </div>

  <div className="form-row">
   
    <div className="form-column">
      <label>Sent to Home</label>
      <input
        type="date"
        placeholder="Enter sent to home date"
        name="SentToHome"
        value={formData.SentToHome}
        onChange={formChangeHandler}
      />
    </div>
    <div className="form-column">
      <label>OPD</label>
      <input
        type="text"
        placeholder="Enter opd"
        name="OPD"
        value={formData.OPD}
        onChange={formChangeHandler}
      />
    </div>

    <div className="form-column">
      <label>Inmate Number</label>
      <input
        type="number"
        placeholder="Enter room number"
        name="InmateNumber"
        value={formData.InmateNumber}
        onChange={formChangeHandler}
      />
    </div>
  </div>

  <div className="form-row">
  <div className="form-column">
     
     <fieldset className="form-group">
        <label>Brought By</label>
        <div className="brought-by-container">
          <input
           style={{
             display: "flex",
             width: "48%",
             flexWrap: "wrap",
             gap: "10px",
           }}
           type="text"
           name="BroughtBy.Name"
           placeholder="Enter name of person"
           value={formData.BroughtBy.Name}
           onChange={formChangeHandler}
         />
         <input
           style={{
             display: "flex",
             width: "48%",
             flexWrap: "wrap",
             gap: "10px",
           }}
           type="text"
           name="BroughtBy.Address"
           placeholder="Enter address of person"
           value={formData.BroughtBy.Address}
           onChange={formChangeHandler}
         />
         <input
           style={{
             display: "flex",
             width: "48%",
             flexWrap: "wrap",
             gap: "10px",
           }}
           type="text"
           name="BroughtBy.MobileNumber"
           placeholder="Enter mobile number of person"
           value={formData.BroughtBy.MobileNumber}
           onChange={formChangeHandler}
         />
         <input
           style={{
             display: "flex",
             width: "48%",
             flexWrap: "wrap",
             gap: "10px",
           }}
           type="text"
           name="BroughtBy.Aadhar"
           placeholder="Enter Aadhar of person"
           value={formData.BroughtBy.Aadhar}
           onChange={formChangeHandler}
         />
       </div>
     </fieldset>
 </div>
    <div className="form-column">
      <label>IO Number</label>
      <input
        type="number"
        placeholder="Enter IO number"
        name="IONumber"
        value={formData.IONumber}
        onChange={formChangeHandler}
      />
    </div>
    <div className="form-column">
      <label>IO Name</label>
      <input
        type="text"
        placeholder="Enter IO name"
        name="IOName"
        value={formData.IOName}
        onChange={formChangeHandler}
      />
    </div>
   
  </div>
       
      </form>
    </div>

    <div className="form-container">
      <form>
      <DialogBox
          formData={formData}
          setFormData={setFormData}
          id={id}
          image={image}
        />
      </form>
    </div>
    </div>
  );
};

export default FormFields;
