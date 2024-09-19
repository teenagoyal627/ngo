import React from 'react'
import DialogBox from "../../DialogBox/ DialogBox";
import './UploadSection.css'
const FormFooter = ({formData,setFormData,image,id}) => {
  return (
   
    <div className="form-container1">
    <div className='footerButton'>
      <DialogBox
          formData={formData}
          setFormData={setFormData}
          id={id}
          image={image}
        />
      </div>
    </div>
  )
}

export default FormFooter
