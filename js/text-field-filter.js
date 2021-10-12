/**
 * ##############################
 * GENERIC EVENT LISTENER
 * ##############################
 */

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
  filterTextFieldInput(e, /[0-9]/g, /[^0-9]/g);
};

const acceptAlphanumeric = (e) => {
  filterTextFieldInput(e, /[a-zA-Z0-9]/g, /[^a-zA-Z0-9]/g);
};

document.querySelectorAll(`.numeric`).forEach((field) => {
  field.addEventListener("keypress", acceptNumeric);
  field.addEventListener("input", acceptNumeric);
});

document.querySelectorAll(`.alphanumeric`).forEach((field) => {
  field.addEventListener("keypress", acceptAlphanumeric);
  field.addEventListener("input", acceptAlphanumeric);
});

document.querySelectorAll(`input[type="text"]`).forEach((field) => {
  if (field.dataset.hasOwnProperty("minLength")) {
    field.addEventListener("keypress", (e) => {
      if (e.target.value.length < field.dataset.minLength) {
        // add error class
      } else {
        // remove error class
      }
    });
  }

  if (field.dataset.hasOwnProperty("maxLength")) {
    field.addEventListener("keypress", (e) => {
      if (e.target.value.length >= field.dataset.maxLength) e.preventDefault();
    });

    field.addEventListener("input", (e) => {
      if (e.inputType === "insertFromPaste")
        e.target.value = e.target.value.substring(0, field.dataset.maxLength);
    });
  }
});

/**
 * ##############################
 * SPECIFIC EVENT LISTENER
 * ##############################
 */

document.querySelector(`.tin`).addEventListener("keypress", (e) => {
  let fieldValue = e.target.value.trim();
  if (fieldValue.length > 0) {
    if (fieldValue.match(/[0-9]/g).length % 3 === 0 && !/([0-9]{3}-)$/g.test(fieldValue)) {
      if (!/([0-9]{3}-){3}[0-9]{3}/g.test(fieldValue)) e.target.value = `${e.target.value}-`;
    }
  }
});

document.querySelector(`.tin`).addEventListener("input", (e) => {
  if (e.inputType === "insertFromPaste") {
    e.target.value = e.target.value.match(/.{1,3}/g).join("-");

    if (e.target.value.match(/(?<=^.{15})-/g))
      e.target.value = e.target.value.replace(/(?<=^.{15})-/g, "");
    e.target.value = e.target.value.substring(0, e.target.dataset.maxLength);
  }
});
