export default {
    createArticlesListFromObj(articlesObject) {

        const articlesList = [];

        Object.keys(articlesObject).forEach((id) => {
            articlesList.push({
                id: id,
                isArchived: articlesObject[id].timeCreated < 0,
                ...articlesObject[id]
            });
        });

        return articlesList.sort((item1, item2) => item2.timeCreated - item1.timeCreated );
    },

    createUserFavoritesList(articlesList, articlesIdsList) {
        articlesList.forEach((item, index) => {
            item.id = articlesIdsList[index];
            item.isArchived = item.timeCreated < 0;
            item.timeCreated = Math.abs(item.timeCreated);
        });
        return articlesList.sort((item1, item2) => item2.timeCreated - item1.timeCreated );
    },

    createUserArticlesList(articlesObject) {
        const articlesList = this.createArticlesListFromObj(articlesObject);
        return articlesList.filter(articleItem => articleItem.timeCreated > 0);
    },

    createUserArchivedArticlesList(articlesObject) {
        const articlesList = this.createArticlesListFromObj(articlesObject)
            .filter(articleItem => articleItem.timeCreated < 0)
            .map(item => { item.timeCreated *= -1; return item;});
        return articlesList.sort((item1, item2) => item2.timeCreated - item1.timeCreated );

    },

    prepareArticle(articleObj, articleId) {

        articleObj.id = articleId;
        articleObj.commentsList = [];

        return articleObj;
    }
};