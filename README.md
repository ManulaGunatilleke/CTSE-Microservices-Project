# Manage -  Educational Platform for Online Learning

This website is included as a website where students can gain knowledge through various courses in management. Instructors can manage and add students to share their knowledge and explore the knowledge space of everyday things that was built for the Current Trends in Software Engineering (SE4010) Module in the 2nd Semester of the 4th Year of the BSc. in IT (Specializing in Software Engineering) degree program.

<h2>CTSE Assignment - Group 49</h2>
<p>A full Backend and Frontend implementation of Manage which is a website where users can login as students or instructors. The students can view all the courses that are submitted by the instructors, they can enroll themselves to the course and for that they need to make the payment via Stripe. Once the payment is done, they will enrolled to the course after administrator approval. The instructors can create specific courses to share their knowledge among the students and they can also update and delete the courses accordingly. The users can also view their user profiles and manage them.
<p>The architecture behind Manage is the Microservices architecture which is an architecture that is consisted of small services. All the requests between the client side and the server side is done through the API gateway. Our system has 4 specific microservices,
  <ul>
  <li>User Management System</li>
  <li>Course Management System</li>
  <li>Enrollment Management System</li>
  <li>Payment Management System</li>
</ul>
</p>

System Demonstration Video Link : https://www.youtube.com/watch?v=irYGMlJKooo


<h2>Contributors & Contribution</h2>
<ul>
  <li>IT21321436 - Manula Gunatilleke - Enrollment Management Service and UI's</li>
  <li>IT21345296 - Teshan Jayakody - Course Management Service and UI's</li>
  <li>IT21343216 - Bihesha Dilshan - User Management Service and UI's</li>
  <li>IT21338052 - Keshan Pathirana - Payment Management Service and UI's</li>
</ul>

<h2>Setup Instructions</h2>
<ul>
  <li>Clone the project, open the folder in the command prompt and give the command "code ."</li>
  <li>To Install all the Node Modules: npm install </li>
  <li>Specific Node Packages used : express, mongoose, bodyParser, cors, dotenv, jsonwebtoken, bcrypt, emailjs, nodemon, jest, bootstrap, react-toastify</li>
  <li>Since the Services are dockerized, build by: docker-compose up --build</li>
  <li>After the build is successful, access the specific port; localhost:3000</li>
</ul>

<h2>Technologies Used :</h2>
<ul>
  <li>MERN Stack: MongoDB, Express, React, Node</li>
  <li>Cloud Provider: Azure</li>
  <li>API Testing: Postman</li>
  <li>IDE : Visual Studio Code</li>
  <li>Containerization: Docker</li>
  <li>Container Orchestration System : Kubernetes(AKS)</li>
</ul>
