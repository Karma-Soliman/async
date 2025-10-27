import { fetchData } from "./fetchData.js"
import { formFactory } from "./formFactory.js"
import { putData } from "./putData.js"
const remoteurl = "https://easy-simple-users-rest-api.onrender.com/api/users"
const localurl = "response.json"

const alert = document.querySelector(".alert")
const spinner = document.querySelector(".spinner-border")
let users
const loadData = async () => {
  spinner.classList.remove("d-none")
  try {
    console.log("Fetching data...")
    const data = await fetchData(remoteurl)
    if (data) {
      spinner.classList.add("d-none")
      users = data.data
      displayUsers(users)
      addEventListeners(users)
      console.log("Data loaded successfully:", data)
    }
  } catch (error) {
    console.error("Failed to load data:", error.message)
    spinner.classList.add("d-none")
    alert.classList.remove("d-none")
    alert.classList.add("alert-danger")
    alert.innerHTML = `Failed to load data: ${error.message}`
  }
}
const displayUsers = (localUsers) => {
  console.log("running the display function !", localUsers)
  if (!localUsers || localUsers.length === 0) {
    alert.classList.remove("d-none")
    alert.classList.add("alert-danger")
    alert.innerHTML = "no user found"
    return
  }
  localUsers.forEach((user) => {
    const usersContainer = document.getElementById("users-container")
    usersContainer.innerHTML += `
		<article class="card">
			<div class="card-image">
					<img src="${user.avatar_url}" alt="${user.name}" class="card-img-top" />
					<span class="card-title">${user.name}</span>
				</div>

				<div class="card-content">
					<ul class="list-group">
						<li class="list-group-item"><strong>Name:</strong>${user.name}</li>
						<li class="list-group-item"><strong>Age:</strong>${user.age}</li>
						<li class="list-group-item"><strong>Gender:</strong> ${user.gender}</li>
					</ul>
					<button data-user-id="${user.id}" data-bs-target="#exampleModal" data-bs-toggle="modal" class="edit-btn btn btn-secondary m-2">Edit</button>
				</div>
			</article>`
  })
}

const addEventListeners = (users) => {
  const editButton = document.querySelectorAll(".edit-btn")

  editButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      document.querySelector(".modal-body").innerHTML = ""
      document.querySelector(".modal-body").appendChild(formFactory())
      const foundUsers = users.find(
        (user) => user.id === parseInt(e.target.getAttribute("data-user-id"))
      )
      getModalForm(foundUsers)
    })
  })
}
const getModalForm = (foundUsers) => {
  const modalForm = document.querySelector(".modal-body").querySelector("form")

  modalForm.userName.value = foundUsers.name
  modalForm.userAge.value = foundUsers.age
  modalForm.userGender.value = foundUsers.gender
  modalForm.userImage.value = foundUsers.avatar_url
  submitBut.setAttribute("data-user-id", foundUsers.id)
}

const submitBut = document.querySelector(".submit-btn")
submitBut.addEventListener("click", async () => {
  const dataToSend = {
    name: document.querySelector("#userName").value,
    age: document.querySelector("#userAge").value,
    gender: document.querySelector("#userGender").value,
    avatar_url: document.querySelector("#userImage").value,
    id: document.querySelector(".submit-btn").getAttribute("data-user-id"),
  }
  try {
    const response = await putData(remoteurl, dataToSend)
    if (response) {
      document.querySelector(".modal-body").innerHTML = `
        <div class="d-flex justify-content-center align-items-center" style="height: 312px;">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>`
      
      console.log(response)
      updateCard(dataToSend)
      const Mymodal = document.getElementById("exampleModal")
      const modal = bootstrap.Modal.getInstance(Mymodal)
      setTimeout(() => {
        modal.hide()
        addEventListeners(users)
      }, 700)
    }
  } catch (error) {
    console.log(error)
    document.querySelector(".modal-body").innerHTML = `
		<div class="d-flex flex-column justify-content-center align-items-center" style="height: 312px;">
			<div class="alert alert-danger w-100" role="alert">
				${error.message}
			</div>
			<p class="mark">${error.stack}</p>
		</div>
		`
  }
})
const updateCard = (users) => {
  const cardsArray = Array.from(document.querySelectorAll(".card"))
  const foundCard = cardsArray.find((card) => {
    return (
      parseInt(card.querySelector("button").getAttribute("data-user-id")) ===
      parseInt(users.id)
    )
  })
	foundCard.innerHTML = `
				<div class="card-image p-3">
					<img src="${users.avatar_url}" alt="${users.name}" height="254px" class="card-img-top object-fit-cover" />
					<span class="card-title">${users.name}</span>
				</div>

				<div class="card-content">
					<ul class="list-group">
						<li class="list-group-item"><strong>Name: </strong>${users.name}</li>
						<li class="list-group-item"><strong>Age: </strong>${users.age}</li>
						<li class="list-group-item">
							<strong>Gender: </strong> ${users.gender}
						</li>
					</ul>
					<button data-user-id="${users.id}" data-bs-target="#exampleModal" data-bs-toggle="modal" class="edit-btn btn btn-secondary m-2">Edit</button>
				</div>

`
}

loadData()
