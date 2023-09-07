import puppeteer from "puppeteer"; // import puppeteer

/* 
  General blog scrapper function.
  url: URL to be scraped
  elements: where to find title and link elements
  titleElement: CSS selector for title element
*/
const scrapeBlog = async (url, elements, titleElement, articleList) => {
  const browser = await puppeteer.launch({ headless: "true" }); // launch browser
  const page = await browser.newPage(); // create new page
  await page.goto(url); // go to URL

  const allArticles = await page.evaluate(
    (allElementsSelector, titleSelector) => {
      const articles = document.querySelectorAll(allElementsSelector);

      // grab the first 3 articles' titles and links
      return Array.from(articles)
        .slice(0, 5)
        .map((article) => {
          const title = article.querySelector(titleSelector).innerText;
          const url = article.querySelector("a").href;
          return { title, url };
        });
    },
    elements,
    titleElement
  );
  articleList.push(...allArticles);
  // to view a specific title: console.log(allArticles[i].title);
  // console.log(allArticles);
  await browser.close(); // close browser
};

export default { scrapeBlog };
