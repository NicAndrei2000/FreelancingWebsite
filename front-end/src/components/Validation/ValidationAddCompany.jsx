export default function ValidationAddCompany(
  enteredCompanyName,
  enteredCompanyIdentifNumber,
  enteredCompanyAccessCode,
  enteredCompanyContact,
  enteredCompanyEmail
) {
  const errors = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  const phone_pattern = /^\d{10}$/;

  if (enteredCompanyName === "") {
    errors.enteredCompanyName = "This field is required!";
  }
  if (enteredCompanyIdentifNumber === "") {
    errors.enteredCompanyIdentifNumber = "This field is required!";
  }
  if (enteredCompanyAccessCode === "") {
    errors.enteredCompanyAccessCode = "This field is required!";
  }
  if (enteredCompanyContact === "") {
    errors.enteredCompanyContact = "This field is required!";
  }else if(!phone_pattern.test(enteredCompanyContact)){
    errors.enteredCompanyContact="The phone number must contain only 10 digits!";
  }
  if (enteredCompanyEmail === "") {
    errors.enteredCompanyEmail = "This field is required!";
  }
  else if(!email_pattern.test(enteredCompanyEmail)){
    errors.enteredCompanyEmail="Email didn't match!";
  }
  return errors;
}
