import blogScraper from "./blog-scraper.js";
const URL = "https://arstechnica.com/gadgets/"; // URL to be scraped

const arsTechnica = async (articleList) => {
  await blogScraper.scrapeBlog(URL, "li > header", "a", articleList);
};

export default { arsTechnica };
