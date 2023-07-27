export default function ValidationAddProject(
  enteredNumeProiect,
  enteredDetaliiCompanie,
  enteredRezumatProiect,
  enteredDescriereProiectDetaliat,
  enteredTipuriTehnologii,
  enteredTermenLimitaProiect,
  enteredComunicareProiect,
  enteredExperientaEchipa,
  selectedCategory,
  selectedImage

) {
  const errors = {};

  if (enteredNumeProiect === "") {
    errors.enteredNumeProiect = "This field is required!";
  }
  if (enteredDetaliiCompanie === "") {
    errors.enteredDetaliiCompanie = "This field is required!";
  }
  if (enteredRezumatProiect === "") {
    errors.enteredRezumatProiect = "This field is required!";
  }
  if (enteredDescriereProiectDetaliat === "") {
    errors.enteredDescriereProiectDetaliat = "This field is required!";
  }
  if (enteredTipuriTehnologii === "") {
    errors.enteredTipuriTehnologii = "This field is required!";
  }
  if (enteredTermenLimitaProiect === "") {
    errors.enteredTermenLimitaProiect = "This field is required!";
  }
  if (enteredComunicareProiect === "") {
    errors.enteredComunicareProiect = "This field is required!";
  }
  if (enteredExperientaEchipa === "") {
    errors.enteredExperientaEchipa = "This field is required!";
  }
  if (selectedCategory === "" || selectedCategory=="Choose the category") {
    errors.selectedCategory = "This field is required!";
  }
  if (selectedImage === "") {
    errors.selectedImage = "This field is required!";
  }
//   console.log("Din validare!!")

  return errors;
}
