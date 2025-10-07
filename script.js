import { fetchData } from "./fetchData.js"
import { formFactory } from "./formFactory.js"
const remoteurl = "http://easy-simple-users-rest-api.onrender.com"
const localurl = "response.json"

const alert = document.querySelector(".alert")
const spinner = document.querySelector(".spinner-border")

const loadData = async () => {
  spinner.classList.remove("d-none")
  try {
    console.log("Fetching data...")
    const data = await fetchData(localurl)
    if (data) {
      spinner.classList.add("d-none")
      const users = data.data
      displayUsers(users)
      addEventListeners()
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
						<li class="list-group-item">
							<strong>Gender:</strong> ${user.gender}
						</li>
					</ul>
					<button data-bs-target="#exampleModal" data-bs-toggle="modal" class="edit-btn btn btn-secondary m-2">Edit</button>
				</div>
			</article>
`
  })
}

const addEventListeners = (e) => {
  const editButton = document.querySelectorAll(".edit-btn")
  editButton.forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".modal-body").innerHTML = ""
      document.querySelector(".modal-body").appendChild(formFactory())
    })
  })
}

loadData()
