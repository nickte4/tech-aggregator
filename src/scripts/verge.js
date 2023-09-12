import blogScraper from "./blog-scraper.js";
const URL = "https://theverge.com/tech"; // URL to be scraped
const blogName = "The Verge"; // name of blog

const verge = async (articleList) => {
  await blogScraper.scrapeBlog(
    URL,
    "div.max-w-content-block-mobile > h2:not(.text-black)",
    "a",
    articleList,
    blogName
  );
};

export default { verge };

// font-polysans text-20 font-bold leading-100 tracking-1 md:text-24
// font-polysans text-20 font-bold leading-100 tracking-1 text-black dark:text-white md:text-24

// max-w-content-block-mobile sm:w-content-block-standard sm:max-w-content-block-standard
