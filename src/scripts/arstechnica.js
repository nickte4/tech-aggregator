import blogScraper from "./blog-scraper.js";
const URL = "https://arstechnica.com/gadgets/"; // URL to be scraped
const blogName = "Ars Technica"; // name of blog

const arsTechnica = async (articleList) => {
  await blogScraper.scrapeBlog(URL, "li > header", "a", articleList, blogName);
};

export default { arsTechnica };
