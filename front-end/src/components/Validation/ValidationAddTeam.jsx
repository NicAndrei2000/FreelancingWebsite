export default function ValidationAddTeam(
  enteredNumeEchipa,
  enteredFacultate,
  enteredSpecializareEchipa,
  enteredDescriere,
  enteredContact
) {
  const errors = {};

  if (enteredNumeEchipa === "") {
    errors.enteredNumeEchipa = "This field is required!";
  }

  if (enteredFacultate === "") {
    errors.enteredFacultate = "This field is required!";
  }
  if (enteredSpecializareEchipa === "") {
    errors.enteredSpecializareEchipa = "This field is required!";
  }
  if (enteredDescriere === "") {
    errors.enteredDescriere = "This field is required!";
  }
  if (enteredContact === "") {
    errors.enteredContact = "This field is required!";
  }

  return errors;
}
