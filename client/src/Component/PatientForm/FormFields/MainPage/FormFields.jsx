import PersonalDetails from "../PersonalDetails/PersonalDetails";
import NgoDetails from "../NgoDetails/NgoDetails";
import FormFooter from "../UploadDetails/FormFooter";

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
      <FormFooter
        formData={formData}
        setFormData={setFormData}
        image={image}
        id={id}
      />
    </div>
  );
};

export default FormFields;
