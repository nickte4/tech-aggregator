/* Server-side code for the tech aggregator */
import express from "express";
import database from "../src/scripts/database.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("../public")); // serve static files from public folder
app.use(express.json({ limit: "1mb" })); // parse JSON data from request body

// GET request handler for /api/articles
app.get("/api/tech-articles", async (request, response) => {
  console.log("GET request received at /api/tech-articles");
  response.json(await database.retrieveData());
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
