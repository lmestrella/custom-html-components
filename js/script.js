const customDropdown = document.querySelectorAll(`.custom-dropdown`);

customDropdown.forEach((dropdown) => {
  const dropdownField = dropdown.querySelector(`input`);
  const dropdownList = dropdown.querySelector(`ul`);
  const initialDropdownListItems = dropdownList.innerHTML;

  const showDropdownList = (e) => {
    dropdownList.classList.add("visible");
    dropdownList
      .querySelector(`li[data-value="${dropdownField.dataset.selected}"]`)
      ?.classList.add("selected");
  };

  const setDropdownValue = (e) => {
    if (dropdownList.querySelector(`li.selected`))
      dropdownList.querySelector(`li.selected`).classList.remove("selected");

    dropdown.classList.remove("custom-dropdown--error");
    dropdownField.value = e.target.innerText.trim();
    dropdownField.dataset.selected = e.target.dataset.value;
    dropdownList.classList.remove("visible");
  };

  const hideDropdownListOnFocusOut = (e) => {
    if ([dropdown, ...dropdown.children].includes(e.relatedTarget)) return;

    if (dropdownField.dataset.selected)
      dropdownField.value = dropdownList.querySelector(`li.selected`).innerText;
    else dropdown.classList.add("custom-dropdown--error");

    dropdownList.classList.remove("visible");
    dropdownList.innerHTML = initialDropdownListItems;
  };

  const filterDropdownList = (e) => {
    let newDropdownListItems = "";

    dropdownList.innerHTML = initialDropdownListItems;
    dropdownList.querySelectorAll(`li`).forEach((item) => {
      let itemText = item.innerText.toLowerCase().trim();
      let fieldText = e.target.value.toLowerCase().trim();
      if (itemText.indexOf(fieldText) === 0) newDropdownListItems += item.outerHTML;
    });

    dropdownList.innerHTML = newDropdownListItems;
    dropdownList
      .querySelector(`li[data-value="${dropdownField.dataset.selected}"]`)
      ?.classList.add("selected");
  };

  dropdown.setAttribute("tabindex", 0);
  dropdownField.addEventListener("click", showDropdownList);
  dropdownList.addEventListener("click", setDropdownValue);
  dropdown.addEventListener("focusout", hideDropdownListOnFocusOut);
  dropdownField.addEventListener("input", filterDropdownList);
});
