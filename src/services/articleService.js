export default {
    prepareArticlesList(articlesObject) {
        let articlesList = [];
        for(let id in articlesObject) {
            articlesList.push({
                id: id,
                commentList: [],
                ...articlesObject[id]
            });
        }
        return articlesList.reverse();
    },
    prepareArticle(articleObj, articleId) {
        articleObj.id = articleId;
        articleObj.commentList = [];
        return articleObj;
    }
};