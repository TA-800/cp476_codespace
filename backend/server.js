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

// Start the server
app.listen(8080, () => {
    console.log("Server.js listening on port 8080.");
});
