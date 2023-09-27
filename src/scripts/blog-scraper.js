import puppeteer from "puppeteer";

/* 
  General blog scrapper function.
  url: URL to be scraped
  elements: where to find title and link elements
  titleElement: CSS selector for title element
*/
const scrapeBlog = async (
  url,
  elements,
  titleElement,
  articleList,
  blogName
) => {
  const browser = await puppeteer.launch({ headless: "new" });
  try {
    const page = await browser.newPage(); // create new page
    await page.goto(url); // go to URL

    const allArticles = await page.evaluate(
      (allElementsSelector, titleSelector, blog) => {
        const articles = document.querySelectorAll(allElementsSelector);

        // grab the first 3 articles' titles and links
        return Array.from(articles)
          .slice(0, 5)
          .map((article) => {
            const title = article.querySelector(titleSelector).innerText;
            const url = article.querySelector("a").href;
            return { title, url, blog }; // return title, link, and blog name
          });
      },
      elements,
      titleElement,
      blogName
    );
    articleList.push(...allArticles);
    // to view a specific title: console.log(allArticles[i].title);
    // console.log(allArticles);
  } catch (err) {
    console.error("Error scraping blog: ", err);
  } finally {
    await browser.close(); // close browser
  }
};

export default { scrapeBlog };
