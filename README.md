# async
# 🧑‍💻 User Management Dashboard

A simple, responsive **User Management Dashboard** built using **HTML**, **Bootstrap**, and **Vanilla JavaScript (ES Modules)**.  
This app fetches user data from an API, displays each user as a card, and allows editing user details directly from a modal.

---

## 🚀 Features

- Fetches and displays users dynamically using **fetch API**.  
- Handles **loading states** and **error messages** with Bootstrap alerts and spinners.  
- Opens a **Bootstrap modal** to edit user information.  
- Submits updated user data to the API using **PUT requests**.  
- Instantly updates the user card in the UI without reloading the page.  
- Uses modular JavaScript structure with clean separation of concerns.

---

## 🗂️ Project Structure

project/
│
├── index.html # Main HTML page (includes Bootstrap, JS imports, modal, and user cards)
├── fetchData.js # Fetches user data from API and handles errors
├── putData.js # Sends updated user data to the API
├── formFactory.js # Dynamically creates the modal edit form
├── script.js # Main script (imports modules, handles UI updates and event logic)
└── response.json # Local mock data (for offline testing)

## 🧩 Dependencies
- Bootstrap 5
- Vanilla JavaScript (no frameworks)
- REST API (provided by Render)