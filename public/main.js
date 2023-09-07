/*
 *  Client-side script for the main page.
 */

// get articles from server
async function getArticles() {
  const response = await fetch("/api/tech-articles");
  const articles = await response.json();
  return articles;
}

// ON PAGE LOAD
const articleList = getArticles().then((articles) => {
  console.log(articles);
});
