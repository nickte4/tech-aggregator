import blogScraper from "./blog-scraper.js";
const URL = "http://www.techcrunch.com"; // URL to be scraped
const blogName = "TechCrunch"; // name of blog

const techCrunch = async (articleList) => {
  await blogScraper.scrapeBlog(
    URL,
    ".post-block__title",
    "a",
    articleList,
    blogName
  );
};

export default { techCrunch };
