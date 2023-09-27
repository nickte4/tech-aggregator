/* simple database functionality */
import aggregator from "../scripts/index.js";
import fs from "fs";
const DB_FILE_NAME = "./src/assets/tech-article-db.txt";

/*
    getTechArticles: web scrape for tech articles 
*/
async function getTechArticles() {
  const articleList = await aggregator.aggregateTechArticles();
  return articleList;
}

/*
    initializeDatabase: if database does not exist, create it and add
    tech articles to it. Otherwise, do nothing.
*/
async function initializeDatabase() {
  if (!fs.existsSync(DB_FILE_NAME)) {
    updateDatabase(await getTechArticles());
  }
}

/* 
    updateDatabase: writes the tech articles to the database file
*/
function updateDatabase(techArticles) {
  // name of database file to write to
  fs.writeFile(DB_FILE_NAME, JSON.stringify(techArticles), (err) => {
    if (err) {
      console.error("Error updating database file: ", err);
    }
  });

  // add a timestamp to the database file
  fs.appendFile(DB_FILE_NAME, `\n${Date.now()}`, (err) => {
    if (err) {
      console.error("Error appending timestamp to database file: ", err);
    }
  });
  return techArticles;
}

/* 
    readDatabase: reads the database file containing the tech articles
    and returns the parsed JSON data with a timestamp
*/
function readDatabase() {
  fs.readFile(DB_FILE_NAME, (err, data) => {
    if (err) {
      console.error("Error reading database file: ", err);
    }
    // split the file contents into an array of strings
    const lines = data.toString().split("\n");
    // exclude the last line
    const techArticles = JSON.parse(lines.slice(0, -1).join("\n"));
    // get last line, which is the timestamp
    const timestamp = lines[lines.length - 1];
    return { techArticles, timestamp };
  });
}

/*
    retrieveData: checks if the database needs to be updated
    based on if 24 hours has passed since the last update
*/
async function retrieveData() {
  await initializeDatabase();
  const { techArticles, timestamp } = await readDatabase();
  const currentDate = Date.now();
  const timeDifferenceInHours = (currentDate - timestamp) / 1000 / 60 / 60;
  if (timeDifferenceInHours >= 24) {
    // update the database and return the updated tech articles
    return updateDatabase(await getTechArticles());
  } else {
    // return the tech articles from the database
    return techArticles;
  }
}

export default { retrieveData };
