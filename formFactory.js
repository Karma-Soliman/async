const inputFactory = (type, id, ariaDescribed) => {
  const input = document.createElement("input")
  input.type = type
  input.id = id
  input.classList.add("form-control")
  input.ariaDescribedby = ariaDescribed
  return input
}

const labelFactory = (forr, content) => {
  const label = document.createElement("label")
  label.htmlFor = forr
  label.classList.add("form-label")
  label.textContent = content
  return label
}

export const formFactory = () => {
  const form = document.createElement("form")

  const namelabel = labelFactory("userName", "User's Name")
  const nameinput = inputFactory("text", "userName", "nameHelp")

  const agelabel = labelFactory("userAge", "User's Age")
  const ageinput = inputFactory("number", "userAge", "nameHelp")

  const genderlabel = labelFactory("userGender", "User's Gender")
  const genderinput = inputFactory("text", "userGender", "nameHelp")

    const appendNodeElements = (parentNode, ...childNodes) => {
        childNodes.forEach(child => parentNode.appendChild(child));
    }

    appendNodeElements(form, namelabel, nameinput, agelabel, ageinput, genderlabel, genderinput);

  document.querySelector(".modal-body").appendChild(form)
}
