// Reference: Textbook 13.2.2 Adding Express
const express = require("express");
const path = require("path");
const app = express();
const pathToUi = "../frontend/";

// Server routes
// Process get/post requests and either return data, return .html/.jsx (react) files for UI, or both
app.get("/", (req, resp) => {
    resp.sendFile(path.join(__dirname, pathToUi, "index.html"));
});

app.get("/data", (req, resp) => {
    // Sends a JSON response
    // https://expressjs.com/en/5x/api.html#res.json
    resp.json({
        data: "Hello World",
    });
    // This way we can return data from the database as a JSON to the frontend
    // E.g. /<courseId> returns list of reviews for <courseId> from the database
});

// Start the server
app.listen(8080, () => {
    console.log("Server.js listening on port 8080.");
});
