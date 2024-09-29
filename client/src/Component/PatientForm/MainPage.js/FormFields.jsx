/* eslint-disable react/prop-types */
import PersonalDetails from "../FormFields/PersonalDetails/PersonalDetails";
import NgoDetails from "../FormFields/NgoDetails/NgoDetails";
import FormFooter from "../FormFields/UploadDetails/FormFooter";
import BroughtBy from "../FormFields/BroughtBy/BroughtBy";

const FormFields = ({
  handleImageChange,
  image,
  formData,
  formChangeHandler,
  setFormData,
  id,
  setImage
}) => {
  return (
    <div>
      <PersonalDetails
        handleImageChange={handleImageChange}
        image={image}
        formData={formData}
        formChangeHandler={formChangeHandler}
      />
      <NgoDetails
       formData={formData}
       formChangeHandler={formChangeHandler} 
       />
       <BroughtBy formData={formData} formChangeHandler={formChangeHandler}/>
      <FormFooter
        formData={formData}
        setFormData={setFormData}
        image={image}
        id={id}
        setImage={setImage}
      />
    </div>
  );
};

export default FormFields;
