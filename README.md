# Frontend - School Dashboard

This is the frontend application for the School Management System. It is built with **React** and communicates with a .NET Web API to handle data.

The project includes features to list students and courses, delete students.  Can choose a student and the student  can choose more courses.

##  Features

* **Student Management:**
    * Lists all students from the database.
    * Ability to delete a student (includes a confirmation dialog).
* **Course Management:**
    * Lists available courses with descriptions.
    * **Coose Function:** A simulated checkout displaying , choose a student who can chose more couses, message its showing after choosment.
* **Design:** Responsive layout divided into two columns (Students & Courses).

## Technologies

* **Framework:** React (Create React App)
* **Languages:** JavaScript (ES6+), CSS
* **Communication:** Fetch API (calls the backend)

---

##  How to Run the Project

To run the application locally, follow these steps:

### 1. Prepare the Backend
Ensure your Backend server (.NET API) is running.
* **Important:** The frontend code expects the backend to run on **https://localhost:7005/swagger**.
* If your backend runs on a different port, please adjust the URLs in `src/App.js`.

### 2. Install Dependencies
Open a terminal in the project folder (`FRONTEND-APP` or `frontend-react-app`) and run:

##  git bash i Terminal
npm install,
npm start,
after npm start, choose Y , and Frontend its open in a webbsite. Localhost  http://localhost:3001/
