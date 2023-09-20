import { validateEmail, validatePhone } from "../../utils";

export const validateSignUpFields = (fields) => {
  const errors = {};
  if (fields.business_name.length === 0) {
    errors.business_name = "This field is required";
  }
  if (fields.business_number.length === 0) {
    errors.business_number = "This field is required";
  }
  if (fields.email.length === 0) {
    errors.email = "This field is required";
  }
  if( validateEmail(fields.email)){
    errors.email = validateEmail(fields.email);
  }
  if (fields.password.length === 0) {
    errors.password = "This field is required";
  }
  if(fields.password.length < 6){
      errors.password= "Please add at least 6 charachter." 
  }
  if (fields.phone_number.length === 0) {
    errors.phone_number = "This field is required";
  }
  if(validatePhone(fields.phone_number)){
      errors.phone_number = validatePhone(fields.phone_number)
  }
  if (fields.contact_details.length === 0) {
    errors.contact_details = "This field is required";
  }

  return errors
};
