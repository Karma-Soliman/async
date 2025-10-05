import { fetchData } from "./fetchData.js"
const remoteurl= "http://easy-simple-users-rest-api.onrender.com"
const localurl = "response.json"

const alert = document.querySelector(".alert")
const spinner = document.querySelector(".spinner-border")

const loadData = async () => {
    spinner.classList.remove("d-none")
    try{
        console.log("Fetching data...")
        const data = await fetchData(localurl)
        if (data) {
            spinner.classList.add("d-none")
            const users = data.data  
			displayUsers(users) 
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
							<strong>Role:</strong> ${user.role}
						</li>
					</ul>
					<button data-bs-target="#exampleModal" data-bs-toggle="modal" class="btn btn-secondary m-2">Edit</button>
				</div>
			</article>
`
	})
}

window.openEdit = (id) => {
	const user = localUsers.find(user => user.id === id);
	if (user) {
		document.getElementById("userName").value = user.name;
		document.getElementById("userAge").value = user.age;
		document.getElementById("userRole").value = user.role;
	}
}

window.saving = () => {
	const updatedName = document.getElementById("userName").value;
	const updatedAge = document.getElementById("userAge").value;
	const updatedRole = document.getElementById("userRole").value;

	const user = users.find(user => user.id === id);
	if (user) {
		user.name = updatedName;
		user.age = updatedAge;
		user.role = updatedRole;
		displayUsers(users);
	}
}

loadData();  				