export default {
    prepareArticlesList(articlesObject) {

        let articlesList = [];

        for(let id in articlesObject) {
            articlesList.push({
                id: id,
                ...articlesObject[id]
            });
        }

        // соритровка - сперва более новые статьи
        return articlesList.sort((item1, item2) => item2.timeCreated - item1.timeCreated );
    },

    prepareArticle(articleObj, articleId) {

        articleObj.id = articleId;
        articleObj.commentsList = [];

        return articleObj;
    }
};