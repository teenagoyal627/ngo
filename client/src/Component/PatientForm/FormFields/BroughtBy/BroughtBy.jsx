/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import Card from '../../../UI/Card'
import './BroughtBy.css'
const BroughtBy = ({formData,formChangeHandler}) => {
  return (
   <Card>
    <div>
     <fieldset className="form-group">
        <label style={{fontWeight:"bold"}}>Brought By</label>
        <div className="brought-by-container">
          <input
           style={{
             display: "flex",
             width: "15rem",
             flexWrap: "wrap",
             gap: "20px",
             marginLeft:"1rem"
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
             width: "15rem",
             flexWrap: "wrap",
             gap: "20px",
             marginLeft:"1rem"
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
             width: "15rem",
             flexWrap: "wrap",
             gap: "20px",
             marginLeft:"1rem"

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
             width: "15rem",
             flexWrap: "wrap",
             gap: "20px",
             marginLeft:"1rem"
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
   </Card>
  )
}

export default BroughtBy
