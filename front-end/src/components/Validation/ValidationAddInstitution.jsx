export default function ValidationAddInstitution(
  enteredInstitutionName,
  enteredInstitutionEmail,
  enteredInstitutionIdentifNumber,
  enteredInstitutionAccessCode,
  enteredInstitutionContact
) {
    const errors={};

    const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const phone_pattern = /^\d{10}$/;
  if (enteredInstitutionName === "") {
    errors.enteredInstitutionName = "This field is required!";
  }
  if (enteredInstitutionEmail === "") {
    errors.enteredInstitutionEmail = "This field is required!";
  }
  else if(!email_pattern.test(enteredInstitutionEmail)){
    errors.enteredInstitutionEmail="Email didn't match!";
  }
  if (enteredInstitutionIdentifNumber === "") {
    errors.enteredInstitutionIdentifNumber = "This field is required!";
  }
  if (enteredInstitutionAccessCode === "") {
    errors.enteredInstitutionAccessCode = "This field is required!";
  }
  if (enteredInstitutionContact === "") {
    errors.enteredInstitutionContact = "This field is required!";
  }else if(!phone_pattern.test(enteredInstitutionContact)){
    errors.enteredInstitutionContact="The phone number must contain only 10 digits!";
  }

  return errors;
}
