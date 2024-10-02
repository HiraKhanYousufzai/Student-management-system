# Student-management-system

A web-based Student Management System (SMS) built using HTML, CSS, Bootstrap, and jQuery with full CRUD (Create, Read, Update, Delete) functionality to manage student records. This application provides an intuitive interface for performing dynamic operations on data retrieved from a backend database, ensuring seamless interaction and a smooth user experience.

Features: Responsive Design: Built using Bootstrap, the system is fully responsive, offering a smooth experience across devices (mobile, tablet, and desktop).

CRUD Operations:

Create: Add new student records to the database using a clean, responsive form.

Read: Display all student records in a dynamic table, with data fetched using AJAX to avoid full page reloads.

Update: Edit student information using a modal or inline form, with changes instantly reflected in the database.

Delete: Remove students from the system with a confirmation prompt and real-time updates.

Dynamic Search and Filter: Using jQuery, users can dynamically search for and filter student records without refreshing the page.

Form Validation: Front-end form validation ensures data integrity and user-friendly error messages.

Real-time Feedback: All actions (create, edit, delete) update the UI in real-time without needing page reloads, thanks to AJAX and jQuery.

Technologies Used:

HTML5: Provides the structural foundation of the system.

CSS3: Custom styling to enhance the look and feel of the application.

Bootstrap 5: Ensures a responsive and mobile-first design.

jQuery: Handles AJAX requests and adds dynamic front-end functionality.

Backend Database: Connects with a database (e.g., MySQL) to perform CRUD operations.

How It Works:

Add Student: A simple form captures student data and submits it via AJAX to the server, storing the information in the database.

View Students: Upon page load, student data is retrieved from the database and displayed in a Bootstrap-styled table.

Edit Student: An edit button opens a modal where the student’s details can be updated and saved.

Delete Student: Records can be deleted with an easy-to-use delete button, instantly removing them from the database and table.

Setup Instructions:

Clone the repository.

Set up the backend database (e.g., MySQL) and configure the connection.

Run the project on a local server to start managing student data.
