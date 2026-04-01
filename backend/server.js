// Reference: Textbook 13.2.2 Adding Express
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.get("/courses", (req, resp) =>{
    // Pagination, get current page from query string param, use page * 10 as row number (since we're returning 10 results at a time) and return the next 10 rows.
    let page = Number.parseInt(req.query.page ?? "0");
    // Clamp page between 0 and 7 (because we only have 77 courses, if we're returning 10 per page then 77 // 10 = 7)
    page = page > 7 ? 7 : page < 0 ? 0 : page;
    const data = db.prepare("SELECT CourseID, CourseName, CourseCode FROM Courses LIMIT 10 OFFSET ?;").all(page * 10);
    return resp.status(200).json(data);
});

// Get specific course data using its ID (courseDesc, reviews)
app.get("/courses/:id", (req, resp) =>{
    const id = Number.parseInt(req.params.id);
    const data = db.prepare("SELECT * FROM Courses WHERE CourseID = ?").get(id);
    if (data === undefined) {
        return resp.status(404).json({ message: `Course with ID ${id} not found.` });
    }
    const reviews = db.prepare(
        `SELECT Reviews.ReviewID, UserName, Rating, Comment, Workload, GroupWork, IsCompleted, GradeAchieved, DatePublished, DateEdited
        FROM Reviews
        JOIN Users ON Users.UserID = Reviews.UserID
        WHERE CourseID = ?;`
    ).all(id);

    // attach eval types and keywords to each review
    for (var i = 0; i < reviews.length; i++){
        var et = db.prepare(
            `SELECT EvalTitle FROM EvalTypes
            JOIN ReviewEvalTypes ON EvalTypes.EvalTypeID = ReviewEvalTypes.EvalTypeID
            WHERE ReviewEvalTypes.ReviewID = ?;`
        ).all(reviews[i].ReviewID);
        reviews[i].evalTypes = et.map(function(row) { return row.EvalTitle; });

        var kw = db.prepare(
            `SELECT KeywordTitle FROM Keywords
            JOIN ReviewKeywords ON Keywords.KeywordID = ReviewKeywords.KeywordID
            WHERE ReviewKeywords.ReviewID = ?;`
        ).all(reviews[i].ReviewID);
        reviews[i].keywords = kw.map(function(row) { return row.KeywordTitle; });
    }

    return resp.status(200).json({ data, reviews });
});

app.get("/evaltypes", (req, resp) =>{
    const data = db.prepare("SELECT * FROM EvalTypes;").all();
    return resp.status(200).json(data);
});

app.post("/reviews", (req, resp) =>{
    const body = req.body;
    // server-side validation
    if (!body.CourseID || !body.Rating || !body.Comment){
        return resp.status(400).json({ message: "CourseID, Rating, and Comment are required." });
    }
    if (body.Rating < 1 || body.Rating > 10){
        return resp.status(400).json({ message: "Rating must be between 1 and 10." });
    }
    if (body.Workload && (body.Workload < 1 || body.Workload > 10)) {
        return resp.status(400).json({ message: "Workload must be between 1 and 10." });
    }
    if (body.Comment.trim().length < 10){
        return resp.status(400).json({ message: "Comment must be at least 10 characters." });
    }
    const insertReview = db.prepare(
        `INSERT INTO Reviews (UserID, CourseID, Rating, Comment, Workload, GroupWork, IsCompleted, GradeAchieved)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );
    const insertEvalType = db.prepare(
        "INSERT INTO ReviewEvalTypes (ReviewID, EvalTypeID) VALUES (?, ?)"
    );
    const findKeyword = db.prepare(
        "SELECT KeywordID FROM Keywords WHERE KeywordTitle = ?"
    );
    const insertKeyword = db.prepare(
        "INSERT INTO Keywords (KeywordTitle) VALUES (?)"
    );
    const insertReviewKeyword = db.prepare(
        "INSERT INTO ReviewKeywords (ReviewID, KeywordID) VALUES (?, ?)"
    );

    const doInsert = db.transaction(function(){
        var result = insertReview.run(
            body.UserID || 1,
            body.CourseID,
            body.Rating,
            body.Comment,
            body.Workload || null,
            body.GroupWork ? 1 : 0,
            body.IsCompleted ? 1 : 0,
            body.GradeAchieved || null
        );
        var newReviewID = result.lastInsertRowid;

        if (body.EvalTypeIDs){
            for (var i = 0; i < body.EvalTypeIDs.length; i++) {
                insertEvalType.run(newReviewID, body.EvalTypeIDs[i]);
            }
        }

        if (body.Keywords){
            for (var j = 0; j < body.Keywords.length; j++) {
                var kwTitle = body.Keywords[j].trim();
                if (kwTitle === "") continue;
                var existing = findKeyword.get(kwTitle);
                var kwId;
                if (existing) {
                    kwId = existing.KeywordID;
                } else {
                    var kwResult = insertKeyword.run(kwTitle);
                    kwId = kwResult.lastInsertRowid;
                }
                insertReviewKeyword.run(newReviewID, kwId);
            }
        }

        return newReviewID;
    });

    try {
        var newId = doInsert();
        return resp.status(201).json({ message: "Review submitted.", ReviewID: newId });
    } catch (err) {
        return resp.status(400).json({ message: err.message });
    }
});

// Sign in user if username and password match, return UserID
app.post("/login", (req, resp) =>{
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
app.post("/register", (req, resp) =>{
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
// Update an existing review
app.put("/reviews/:id", (req, resp) =>{
    const reviewId = Number.parseInt(req.params.id);
    const body = req.body;

    var existing = db.prepare("SELECT ReviewID FROM Reviews WHERE ReviewID = ?").get(reviewId);
    if (!existing) {
        return resp.status(404).json({ message: "Review not found." });
    }
    if (!body.Rating || !body.Comment) {
        return resp.status(400).json({ message: "Rating and Comment are required." });
    }

    try {
        db.prepare(
            `UPDATE Reviews SET Rating = ?, Comment = ?, Workload = ?, GroupWork = ?,
             IsCompleted = ?, GradeAchieved = ?, DateEdited = date('now')
             WHERE ReviewID = ?`
        ).run(
            body.Rating,
            body.Comment,
            body.Workload || null,
            body.GroupWork ? 1 : 0,
            body.IsCompleted ? 1 : 0,
            body.GradeAchieved || null,
            reviewId
        );

        db.prepare("DELETE FROM ReviewEvalTypes WHERE ReviewID = ?").run(reviewId);
        if (body.EvalTypeIDs){
            var insertET = db.prepare("INSERT INTO ReviewEvalTypes (ReviewID, EvalTypeID) VALUES (?, ?)");
            for (var i = 0; i < body.EvalTypeIDs.length; i++){
                insertET.run(reviewId, body.EvalTypeIDs[i]);
            }
        }

        db.prepare("DELETE FROM ReviewKeywords WHERE ReviewID = ?").run(reviewId);
        if (body.Keywords){
            var findKw = db.prepare("SELECT KeywordID FROM Keywords WHERE KeywordTitle = ?");
            var insertKw = db.prepare("INSERT INTO Keywords (KeywordTitle) VALUES (?)");
            var insertRK = db.prepare("INSERT INTO ReviewKeywords (ReviewID, KeywordID) VALUES (?, ?)");
            for (var j = 0; j < body.Keywords.length; j++) {
                var kwTitle = body.Keywords[j].trim();
                if (kwTitle === "") continue;
                var kw = findKw.get(kwTitle);
                var kwId;
                if (kw) { kwId = kw.KeywordID; }
                else { kwId = insertKw.run(kwTitle).lastInsertRowid; }
                insertRK.run(reviewId, kwId);
            }
        }

        return resp.status(200).json({ message: "Review updated." });
    } catch (err) {
        return resp.status(400).json({ message: err.message });
    }
});

// delete a review
app.delete("/reviews/:id", (req, resp) =>{
    const reviewId = Number.parseInt(req.params.id);

    var existing = db.prepare("SELECT ReviewID FROM Reviews WHERE ReviewID = ?").get(reviewId);
    if (!existing) {
        return resp.status(404).json({ message: "Review not found." });
    }

    try {
        db.prepare("DELETE FROM ReviewEvalTypes WHERE ReviewID = ?").run(reviewId);
        db.prepare("DELETE FROM ReviewKeywords WHERE ReviewID = ?").run(reviewId);
        db.prepare("DELETE FROM Reviews WHERE ReviewID = ?").run(reviewId);
        return resp.status(200).json({ message: "Review deleted." });
    } catch (err) {
        return resp.status(400).json({ message: err.message });
    }
});

// Start the server
app.listen(8080, () =>{
    console.log("Server.js listening on port 8080.");
});
