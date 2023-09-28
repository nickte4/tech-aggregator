/*
 *  Client-side script for the main page.
 */

// get articles from server
async function getAndDisplayArticles() {
  try {
    const response = await fetch("/api/tech-articles");
    const articles = await response.json();
    console.log(articles);
    displayArticles(articles);
  } catch (err) {
    console.error("Error fetching articles: ", err);
  }
}

// display articles on web page
function displayArticles(articles) {
  const articleList = document.querySelector(".articles__list");
  articles.forEach((article) => {
    const articleItem = document.createElement("li");
    // create title
    const title = document.createElement("h1");
    title.classList.add("articles__list_item_h1");
    title.textContent = article.title;
    // create link
    const link = document.createElement("a");
    link.href = article.url;
    // create blog label
    const blogLabel = document.createElement("h3");
    blogLabel.textContent = article.blog;
    blogLabel.classList.add("articles__list_item_h3");
    // append tags li > a > h1
    link.appendChild(title);
    link.appendChild(blogLabel);
    articleItem.appendChild(link);
    articleList.appendChild(articleItem);
    const lineBreak = document.createElement("div");
    lineBreak.classList.add("articles__list_line_break");
    articleList.appendChild(lineBreak);
  });
}

// Call the async function when the page is loaded
window.addEventListener("load", () => {
  getAndDisplayArticles();
});
