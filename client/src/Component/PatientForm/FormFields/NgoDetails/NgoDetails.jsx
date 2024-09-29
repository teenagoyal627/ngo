/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import './NgoDetails.css'
import Card from '../../../UI/Card'
const NgoDetails = ({formData,formChangeHandler}) => {
  return (
    <Card>
    <form>
        <h2 className='ngo-heading'>NGO Details</h2>

        <div className="form-row">
    <div className="form-column">
      <label>Registration No.</label>
      <input
        type="number"
        //="Enter registration no."
        required
        name="RegistrationNo"
        value={formData.RegistrationNo}
        onChange={formChangeHandler}
        style={{width:"18rem"}}

      />
    </div>
    <div className="form-column">
      <label>Registration Date</label>
      <input
        type="date"
        // placeholder="Enter the registration date"
        name="RegistrationDate"
        value={formData.RegistrationDate}
        onChange={formChangeHandler}
        style={{width:"18rem"}}

      />
    </div>
    <div className="form-column">
      <label>Mean of Transportation</label>
      <input
        type="text"
        //="Enter mean of transport"
        name="MeanOfTransportation"
        value={formData.MeanOfTransportation}
        onChange={formChangeHandler}
        style={{width:"18rem"}}

      />
    </div>
  </div>

  <div className="form-row">
   
    <div className="form-column">
      <label>Patient Condition</label>
      <input
        type="text"
        //="Enter condition of patient"
        name="PatientCondition"
        value={formData.PatientCondition}
        onChange={formChangeHandler}
        style={{width:"18rem"}}

      />
    </div>
    <div className="form-column">
      <label>Hospital & Department</label>
      <select
        name="HospitalDepartment"
        value={formData.HospitalDepartment}
        onChange={formChangeHandler}
        style={{width:"18rem"}}

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
        style={{width:"18rem"}}

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
        //="Enter sent to home date"
        name="SentToHome"
        value={formData.SentToHome}
        onChange={formChangeHandler}
        style={{width:"18rem"}}

      />
    </div>
    <div className="form-column">
      <label>OPD</label>
      <input
        type="text"
        //="Enter opd"
        name="OPD"
        value={formData.OPD}
        onChange={formChangeHandler}
        style={{width:"18rem"}}

      />
    </div>

    <div className="form-column">
      <label>Inmate Number</label>
      <input
        type="number"
        //="Enter room number"
        name="InmateNumber"
        value={formData.InmateNumber}
        onChange={formChangeHandler}
        style={{width:"18rem"}}

      />
    </div>
  </div>

  <div className="form-row">
  {/* <div className="form-column">
     
     <fieldset className="form-group">
        <label>Brought By</label>
        <div className="brought-by-container">
          <input
           style={{
             display: "flex",
             width: "18rem",
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
             width: "18rem",
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
             width: "18rem",
             flexWrap: "wrap",
             gap: "10px",
           }}
           type="text"
           name="BroughtBy.MobileNumber"
           placeholder="Enter mobile number "
           value={formData.BroughtBy.MobileNumber}
           onChange={formChangeHandler}
         />
         <input
           style={{
             display: "flex",
             width: "18rem",
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
 </div> */}
    <div className="form-column">
      <label>IO Number</label>
      <input
        type="number"
        //="Enter IO number"
        name="IONumber"
        value={formData.IONumber}
        onChange={formChangeHandler}
        style={{width:"18rem"}}
      />
    </div>
    <div className="form-column">
      <label>IO Name</label>
      <input
        type="text"
        //="Enter IO name"
        name="IOName"
        value={formData.IOName}
        onChange={formChangeHandler}
        style={{width:"18rem"}}
      />
    </div>
   
  </div>
       
      </form>
    </Card>

  )
}

export default NgoDetails
