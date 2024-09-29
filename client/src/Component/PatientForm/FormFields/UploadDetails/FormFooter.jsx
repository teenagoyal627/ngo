/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import DialogBox from "../../DialogBox/ DialogBox";
import "./UploadSection.css";
import Card from "../../../UI/Card";
const FormFooter = ({
  formData,
  setFormData,
  image,
  id,
  setImage }) => {
  return (
    <Card>
      <div>
        <DialogBox
          formData={formData}
          setFormData={setFormData}
          id={id}
          image={image}
          setImage={setImage}
        />
      </div>
    </Card>
  );
};

export default FormFooter;
