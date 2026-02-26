# cp476_codespace
Repo for Internet Computing Group 6 coursework

Members:
* Indu Aujla
* Tobias Cheung
* Taher Ali

The Kanban board can be viewed in Projects > @TA-800's CP476 IC Kanban link where individual tasks and tickets can be tracked.

# Laurier CS Course Insights Platform

## 📌 Project Overview
A web-based, student-driven platform designed to help Wilfrid Laurier University Computer Science students make informed course selection decisions by sharing real student experiences, ratings, and feedback on CS courses.

---

## 🧠 Problem Statement
The Laurier Computer Science community currently lacks a centralized system that captures in-depth, up-to-date insights about CS course offerings. While the LORIS registration system provides high-level course descriptions, it does not include meaningful information such as workload, difficulty, evaluation styles, or student experiences. As a result, students rely on informal sources like word of mouth or online forums (e.g., Reddit), which are often fragmented, outdated, or unreliable.

---

## 🚀 Motivation
This project is motivated by the shared challenges faced by CS students when planning their academic schedules. By enabling students who have previously completed a course to submit ratings and feedback, the platform empowers future students to choose courses that better align with their interests, strengths, and workload preferences. Ultimately, this project aims to strengthen academic decision-making within the Laurier CS community.

---

## 🎯 Target Users
This application supports two primary user groups:

- **Current CS Students**  
  Students planning their academic schedules who want deeper insights into course content, difficulty, and workload.

- **Past CS Students (Contributors)**  
  Students who have already completed CS courses and wish to share their experiences to help others.

---

## 🧩 Application Concept & Scope

### Concept
- Web-based platform
- Centralized list of Laurier Computer Science courses
- Dedicated course pages featuring student ratings and feedback

### Scope

**In Scope**
- User-submitted ratings, comments, and feedback
- Persistent data storage and retrieval
- Simple and intuitive user interface
- Initial focus on Computer Science courses only

**Out of Scope**
- Courses from non-CS programs (future expansion possible)
- Integration with the official LORIS registration system

---

## ⭐ Features

### Must Have
- Centralized list of Laurier CS courses
- Individual course detail pages
- Ability for users to submit comments and feedback
- Database-backed persistent storage
- Course evaluation criteria:
  - Course topics (freeform text)
  - Content difficulty (1–10)
  - Workload (1–10)
  - Evaluation types (assignments, quizzes, midterms, finals, readings, etc.)
  - Group work (yes/no)
  - Open-ended course comments

### Should Have
- Basic input validation
- Timestamped comments
- Sorting and/or filtering courses (e.g., by difficulty, recency)

### Could Have
- User authentication (restricted to MyLaurier email addresses)
- Upvote/downvote system for comments
- Course comparison view (e.g., compare two CS courses side-by-side)

---

## 🛠️ Tech Stack (TBD)
- **Frontend:**  React, HTML, CSS
- **Backend:**  Node.Js (Express)
- **Database:**  SQLLite (queries written in MS SQL to start but were then converted)
- **Hosting/Deployment:**  

---

## 📂 Project Structure

---

## ⚙️ Setup & Installation
> Instructions will be added as the project is implemented.
> Setup instructions to run locally:
Prerequisites: Node.js, Git
Clone repo:
git clone 
https://github.com/TA800/cp476_codespace.git
cd cp476_codespace


Backend:
cd backend
npm install
node server.js


Frontend:
cd frontend
npm install
npm start

---

## 🧪 Usage
> Usage examples and screenshots will be added in future milestones.

---

## 🔮 Future Enhancements
- Expansion to other academic programs
- Advanced analytics on course trends
- Professor-specific insights
- Integration with official academic systems (if feasible)

---

## Team Contributions
Toby: Created all of the front-end designs. He made sure the webpages looked appealing and professionally designed using various HTML and CSS stylings. He also ensured that the primary workflows outlined in our wireframes were properly implemented.  
Taherali: Set up and ensured the backend is working properly. Integrated the backend connection with the database that Indu created. 
Indu: Created the database schema and translated it to a relationship diagram. Developed the SQL create statement scripts with the appropriate primary keys, foreign keys, data types and constraints. Update and organize Kanban, wiki entries after meetings and readme. 



