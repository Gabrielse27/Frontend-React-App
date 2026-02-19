# Frontend - School Dashboard

This is the frontend application for the School Management System. It is built with **React** and communicates with a .NET Web API to handle data.

The project includes features to list students and courses, delete student. The project includes that a student can choose more courses.

### Information about to delete a specific course from a student.
You can remove a specific course from a student directly in the frontend but from backend , SQl Server Object Explorer, from file dbo.Enrollment.
In Swagger we can see Id for student and Id for courses ,that we know what student and what specific course we want to delete.
Every course have a teacher, who can be removed or updated in a specific course in backend in Sql Server Object Explorer, from file dbo.Courses

## Features

- **Student Management:**
  - Lists all students from the database.
  - Ability to delete a student includes a confirmation dialog.
- **Course Management:**
  - Lists available courses with descriptions.
  - The application includes a filtering feature that allows users to easily sort and find available courses based on their specific city.

  **Choose Function:** A simulated checkout displaying a popup with loading status and confirmation when we choose a student who choose a course or more courses.

- **Design:** Responsive layout divided into two columns Students & Courses.

- ### Testing
    A frontend test has been implemented using React Testing Library to verify that the main dashboard renders correctly. The test passes successfully.

## Technologies

- **Framework:** React (Create React App)
- **Languages:** JavaScript (ES6+), CSS
- **Communication:** Fetch API (calls the backend)

---

## How to Run the Project

To run the application locally, follow these steps:

### 1. Prepare the Backend

Ensure your Backend server (.NET API) is running.

- **Important:** The frontend code expects the backend to run on **https://localhost:7005/swagger**.
- If your backend runs on a different port, please adjust the URLs in `src/App.js`.

### 2. Install Dependencies

Open a terminal in the project folder (`FRONTEND-APP` or `frontend-react-app`) and run:

## git bash i Terminal

npm install,
npm start,
after npm start, choose Y , and Frontend its open in a webbsite. Localhost http://localhost:3001/

####  Övrigt

I Git-historiken från den 6 februari finns ett commit-meddelande som nämner ett "simulated Klarna payment flow". Jag experimenterade med att bygga den funktionen under utvecklingen, men valde senare att plocka bort koden igen för att hålla projektet renare och mer fokuserat på inlämningskraven.

