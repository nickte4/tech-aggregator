import arsTechnica from "./arstechnica.js";
import techCrunch from "./techcrunch.js";
import verge from "./verge.js";
const articleList = [];

// collect articles from all blogs
const aggregateTechArticles = async () => {
  await Promise.all([
    arsTechnica.arsTechnica(articleList),
    techCrunch.techCrunch(articleList),
    verge.verge(articleList),
  ]);
  return articleList;
};

export default { aggregateTechArticles };
