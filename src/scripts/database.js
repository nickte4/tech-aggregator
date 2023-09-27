/* simple database functionality */
import aggregator from "../scripts/index.js";
import fsSync from "fs";
import fs from "fs/promises";
const DB_FILE_NAME = "../assets/tech-article-db.txt";
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
  if (!fsSync.existsSync(DB_FILE_NAME)) {
    let articleList = await getTechArticles();
    await updateDatabase(articleList);
  }
}

/* 
    updateDatabase: writes the tech articles to the database file
*/
async function updateDatabase(techArticles) {
  const data = JSON.stringify(techArticles);
  // name of database file to write to
  await fs.writeFile(DB_FILE_NAME, data, (writeErr) => {
    if (writeErr) {
      console.error("Error updating database file: ", writeErr);
    }
  });
  // append timestamp to database file
  await fs.appendFile(DB_FILE_NAME, `\n${Date.now()}`, (appendErr) => {
    if (appendErr) {
      console.error("Error appending timestamp to database file: ", appendErr);
    }
  });

  return techArticles;
}

/* 
    readDatabase: reads the database file containing the tech articles
    and returns the parsed JSON data with a timestamp
*/
async function readDatabase() {
  const data = await fs.readFile(DB_FILE_NAME, (err) => {
    if (err) {
      console.error("Error reading database file: ", err);
    }
  });
  // split the file contents into an array of strings
  const lines = data.toString().split("\n");
  // exclude the last line
  const techArticles = JSON.parse(lines.slice(0, -1).join("\n"));
  // get last line, which is the timestamp
  const timestamp = lines[lines.length - 1];
  return { techArticles, timestamp };
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
    let articleList = await getTechArticles();
    return await updateDatabase(articleList);
  } else {
    // return the tech articles from the database
    return techArticles;
  }
}

export default { retrieveData };
