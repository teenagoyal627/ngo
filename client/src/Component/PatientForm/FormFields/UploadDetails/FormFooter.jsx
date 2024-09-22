import React from 'react'
import DialogBox from "../../DialogBox/ DialogBox";
import './UploadSection.css'
import Card from '../../../UI/Card';
const FormFooter = ({formData,setFormData,image,id}) => {
  return (
   
    <Card>
    <div>
      <DialogBox
          formData={formData}
          setFormData={setFormData}
          id={id}
          image={image}
        />
      </div>
    </Card>
  )
}

export default FormFooter
