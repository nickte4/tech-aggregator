import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core/lib/cjs/puppeteer/puppeteer-core.js"; // import puppeteer

async function getBrowser() {
  return puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(
      `https://github.com/Sparticuz/chromium/releases/download/v112.0.0/chromium-v112.0.0-pack.tar`
    ),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
}

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
  const browser = await getBrowser(); // get browser
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
  await browser.close(); // close browser
};

export default { scrapeBlog };
