/* Server-side code for the tech aggregator */
import express from "express";
import database from "../scripts/database.js";

const app = express();
const port = 3000; // Port to listen on

// open port 3000 for listening
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
app.use(express.static("public")); // serve static files from public folder
app.use(express.json({ limit: "1mb" })); // parse JSON data from request body

// GET request handler for /api/articles
app.get("/api/tech-articles", async (request, response) => {
  console.log("GET request received at /api/tech-articles");
  response.json(await database.retrieveData());
});
