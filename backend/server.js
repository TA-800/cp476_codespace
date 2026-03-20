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
    // Pagination, get current page from query string param, use page * 10 as row number (since we're returning 10 results at a time) and return the next 10 rows.
    let page = Number.parseInt(req.query.page ?? "0");
    // Clamp page between 0 and 7 (because we only have 77 courses, if we're returning 10 per page then 77 // 10 = 7)
    page = page > 7 ? 7 : page < 0 ? 0 : page;
    const data = db.prepare("SELECT CourseID, CourseName, CourseCode FROM Courses LIMIT 10 OFFSET ?;").all(page * 10);
    return resp.status(200).json(data);
});

// Get specific course data using its ID (courseDesc, reviews)
app.get("/courses/:id", (req, resp) => {
    const id = Number.parseInt(req.params.id);
    const data = db.prepare("SELECT * FROM Courses WHERE CourseId = ?").get(id);
    if (data === undefined) {
        // Throw an error following HTTP conventions like status codes
        return resp.status(404).json({ message: `Course with ID ${id} not found.` });
    }
    const reviews = db
        .prepare(
            `SELECT UserName, Rating, Comment, Workload, GroupWork, IsCompleted, GradeAchieved, DatePublished, DateEdited FROM Reviews
            JOIN Users on Users.UserID = Reviews.UserID
            WHERE CourseID = ?
            ;`,
        )
        // all => Return all rows retrieved by query, or an empty array if no rows match
        .all(id);
    return resp.status(200).json({
        data,
        reviews,
    });
});

app.get("/evaltypes", (req, resp) => {
    const data = db.prepare("SELECT * FROM EvalTypes;").all();
    return resp.status(200).json(data);
});

app.post("/reviews", (req, resp) => {
    const { UserID, CourseID, Rating, Comment, Workload, GroupWork, IsCompleted, GradeAchieved, DateEditted } = req.body;
    try {
        db.prepare(
            `INSERT INTO Reviews (UserID, CourseID, Rating, Comment, Workload, GroupWork, IsCompleted, GradeAchieved, DateEdited)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL);`,
        ).run(UserID, CourseID, Rating, Comment, Workload, GroupWork, IsCompleted, GradeAchieved, DateEditted);
    } catch (err) {
        // https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#class-sqliteerror => If err is SqliteError, it will contain "code" property which will have information on what went wrong (e.g. foreign key constraint)
        return resp.status(400).json({ message: err.message });
    }
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status#successful_responses => 201 CREATED
    return resp.status(201).send();
});

// Sign in user if username and password match, return UserID
app.post("/login", (req, resp) => {
    const { UserName, Password } = req.body;
    if (!UserName || !Password) {
        return resp.status(400).json({ message: "Some fields are missing data." });
    }
    const data = db.prepare(`SELECT UserID FROM Users WHERE UserName = ? AND Password = ?;`).get(UserName, Password);
    // get => Return first row retrieved by query, or undefined if no row matches
    if (data === undefined) {
        return resp.status(401).json({ message: "Invalid username or password." });
    }

    return resp.status(200).json({ UserID: data.UserID });
});

// Register user with username, password, email
app.post("/register", (req, resp) => {
    const { UserName, Password, Email } = req.body;
    if (!UserName || !Password || !Email) {
        return resp.status(400).json({ message: "Some fields are missing data." });
    }
    try {
        db.prepare(`INSERT INTO Users (UserName, Password, Email) VALUES (?, ?, ?);`).run(UserName, Password, Email);
    } catch (err) {
        return resp.status(400).json({ message: err.message });
    }
    return resp.status(201).send();
});

// Start the server
app.listen(8080, () => {
    console.log("Server.js listening on port 8080.");
});
