import blogScraper from "./blog-scraper.js";
const URL = "http://www.techcrunch.com"; // URL to be scraped

const techCrunch = async (articleList) => {
  await blogScraper.scrapeBlog(URL, ".post-block__title", "a", articleList);
};

export default { techCrunch };
