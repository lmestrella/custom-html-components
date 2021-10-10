const filterTextFieldInput = (event, validCharacterPattern, invalidCharacterPattern) => {
  if (event.type === "keypress") {
    if (!validCharacterPattern.test(event.key)) event.preventDefault();
    return;
  }

  if (event.type === "input" && event.inputType === "insertFromPaste") {
    event.target.value = event.target.value.replace(invalidCharacterPattern, "");
  }
};

const acceptNumeric = (e) => {
  filterTextFieldInput(e, new RegExp("[0-9]", "g"), new RegExp("[^0-9]", "g"));
};

const acceptAlphanumeric = (e) => {
  filterTextFieldInput(e, new RegExp("[a-zA-Z0-9]", "g"), new RegExp("[^a-zA-Z0-9]", "g"));
};

document.querySelectorAll(`.numeric`).forEach((element) => {
  element.addEventListener("keypress", acceptNumeric);
  element.addEventListener("input", acceptNumeric);
});

document.querySelectorAll(`.alphanumeric`).forEach((element) => {
  element.addEventListener("keypress", acceptAlphanumeric);
  element.addEventListener("input", acceptAlphanumeric);
});
