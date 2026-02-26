// Reference: Textbook 13.2.2 Adding Express
const express = require("express");
const path = require("path");
const app = express();
const pathToUi = "../frontend/";
// Reference: https://github.com/WiseLibs/better-sqlite3
const Database = require("better-sqlite3");
const db = new Database(path.join(__dirname, "..", "project.db"), { fileMustExist: true, verbose: console.log });

// For parsing application/json data
app.use(express.json());
// For parsing application/x-www-form-urlencoded data
app.use(express.urlencoded({ extended: true }));

// Server routes
// Process get/post requests and either return data, return .html/.jsx (react) files for UI, or both
app.get("/", (req, resp) => {
    resp.sendFile(path.join(__dirname, pathToUi, "index.html"));
});

// Get all courses
app.get("/courses", (req, resp) => {
    // Pagination, get offset from current page, use page * 10 as row number (since we're returning 10 results at a time) and return the next 10 rows.
    let page = Number.parseInt(req.query.page ?? "0");
    // Clamp page between 0 and 7 (because we only have 77 courses, if we're returning 10 per page then 77 // 10 = 7)
    page = page > 7 ? 7 : page < 0 ? 0 : page;
    const data = db.prepare("SELECT CourseID, CourseName, CourseCode FROM Courses LIMIT 10 OFFSET ?;").all(page * 10);
    return resp.json(data);
});

// Get specific course data using its ID
app.get("/courses/:id", (req, resp) => {
    const id = Number.parseInt(req.params.id);
    const data = db.prepare("SELECT * FROM Courses WHERE CourseID = ?;").get(id);
    if (data === undefined) {
        // Throw an error following HTTP conventions like status codes
        return resp.status(404).json({ message: `Course with ID ${id} not found.` });
    }
    return resp.json(data);
});

// Start the server
app.listen(8080, () => {
    console.log("Server.js listening on port 8080.");
});
