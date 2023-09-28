import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

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
  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--single-process",
      "--no-zygote",
    ],
    headless: "new",
    executablePath:
      process.env.node === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    console.log("browser launched"); // TODO: remove debug
    const page = await browser.newPage(); // create new page
    // go to URL
    await page.goto(url);
    // wait for page to load
    await page.waitForSelector(elements);
    console.log("page loaded"); // TODO: remove debug
    const allArticles = await page.evaluate(
      (allElementsSelector, titleSelector, blog) => {
        const articles = document.querySelectorAll(allElementsSelector);
        console.log("getting articles"); // TODO: remove debug
        // grab the first 5 articles' titles and links
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
    console.log("articles scraped"); // TODO: remove debug
  } catch (err) {
    console.error("Error scraping blog: ", err);
  } finally {
    console.log("browser closing"); // TODO: remove debug
    await browser.close(); // close browser
  }
};

export default { scrapeBlog };
